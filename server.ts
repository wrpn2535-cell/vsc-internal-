import express, { Request, Response } from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_APP_STATE } from './src/data/initialData';
import { AppState } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory state initialized from file or default
let appState: AppState = (() => {
  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed.capas?.some((c: any) => c.id === 'CAR-2569-001') || parsed.schedules?.some((s: any) => s.id === 'sch-01')) {
        return INITIAL_APP_STATE;
      }
      return parsed;
    } catch (err) {
      console.error('Error reading database.json, initializing from seed', err);
    }
  }
  return INITIAL_APP_STATE;
})();

function persistState() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(appState, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write database.json:', err);
  }
}

// Save initial file if not present
if (!fs.existsSync(DB_FILE)) {
  persistState();
}

// SSE Connected Clients (fallback)
const sseClients: Response[] = [];

function broadcastSseStateUpdate(updatedState: AppState) {
  const data = JSON.stringify({ type: 'STATE_UPDATE', state: updatedState });
  sseClients.forEach((client) => {
    client.write(`data: ${data}\n\n`);
  });
}

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = process.env.PORT || 3000;

  // Initialize WebSocket Server on /ws path
  const wss = new WebSocketServer({ server, path: '/ws' });

  interface ExtWebSocket extends WebSocket {
    isAlive?: boolean;
    userId?: string;
    userName?: string;
  }

  function broadcastWsStateUpdate(updatedState: AppState, senderWs?: WebSocket) {
    const payload = JSON.stringify({
      type: 'STATE_UPDATE',
      state: updatedState,
      timestamp: new Date().toISOString()
    });
    wss.clients.forEach((client) => {
      if (client !== senderWs && client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }

  function broadcastWsClientCount() {
    const payload = JSON.stringify({
      type: 'CLIENT_COUNT',
      count: wss.clients.size,
      timestamp: new Date().toISOString()
    });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }

  // Heartbeat interval to check alive connections
  const heartbeatInterval = setInterval(() => {
    wss.clients.forEach((ws) => {
      const extWs = ws as ExtWebSocket;
      if (extWs.isAlive === false) {
        return extWs.terminate();
      }
      extWs.isAlive = false;
      extWs.ping();
    });
  }, 30000);

  wss.on('close', () => {
    clearInterval(heartbeatInterval);
  });

  wss.on('connection', (ws: ExtWebSocket, req) => {
    ws.isAlive = true;
    ws.on('pong', () => {
      ws.isAlive = true;
    });

    console.log(`[WebSocket] Client connected from ${req.socket.remoteAddress}. Active: ${wss.clients.size}`);

    // Send initial handshake and full current state
    ws.send(
      JSON.stringify({
        type: 'WS_CONNECTED',
        message: 'Connected to Vet Superior IQA WebSocket Server',
        clientCount: wss.clients.size,
        lastUpdated: appState.lastUpdated,
        state: appState
      })
    );

    // Broadcast client count
    broadcastWsClientCount();

    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.type === 'STATE_UPDATE' && data.state) {
          appState = {
            ...data.state,
            lastUpdated: new Date().toISOString()
          };
          persistState();
          broadcastWsStateUpdate(appState, ws);
          broadcastSseStateUpdate(appState);
        } else if (data.type === 'PATCH_STATE' && data.patch) {
          appState = {
            ...appState,
            ...data.patch,
            lastUpdated: new Date().toISOString()
          };
          persistState();
          broadcastWsStateUpdate(appState, ws);
          broadcastSseStateUpdate(appState);
        } else if (data.type === 'PING') {
          ws.send(JSON.stringify({ type: 'PONG', timestamp: Date.now() }));
        } else if (data.type === 'USER_JOIN') {
          ws.userId = data.userId;
          ws.userName = data.userName;
        }
      } catch (err) {
        console.error('[WebSocket] Failed to parse message:', err);
      }
    });

    ws.on('close', () => {
      console.log(`[WebSocket] Client disconnected. Active: ${wss.clients.size}`);
      broadcastWsClientCount();
    });

    ws.on('error', (err) => {
      console.warn('[WebSocket] Client error:', err);
    });
  });

  app.use(express.json({ limit: '10mb' }));

  // WebSocket Server Diagnostics Endpoint
  app.get('/api/ws-info', (req: Request, res: Response) => {
    res.json({
      status: 'ACTIVE',
      protocol: 'WebSocket',
      path: '/ws',
      port: PORT,
      connectedClients: wss.clients.size,
      vercelSupport: {
        nativeWs: true,
        recommendedExternal: 'Pusher / Ably / PartyKit / Custom WebSocket Server',
        instructions: 'Vercel Serverless Lambdas have execution timeouts. Use this full-duplex Node.js server or connect an external WSS URL.'
      },
      lastUpdated: appState.lastUpdated,
      timestamp: new Date().toISOString()
    });
  });

  // REST API Routes
  app.get('/api/state', (req: Request, res: Response) => {
    res.json(appState);
  });

  app.post('/api/state', (req: Request, res: Response) => {
    try {
      const newState = req.body;
      if (!newState || typeof newState !== 'object') {
        res.status(400).json({ error: 'Invalid state body' });
        return;
      }
      appState = {
        ...newState,
        lastUpdated: new Date().toISOString()
      };
      persistState();
      broadcastWsStateUpdate(appState);
      broadcastSseStateUpdate(appState);
      res.json({ success: true, lastUpdated: appState.lastUpdated });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update state' });
    }
  });

  // Selective Patch Endpoint
  app.post('/api/state/patch', (req: Request, res: Response) => {
    try {
      const patch = req.body;
      appState = {
        ...appState,
        ...patch,
        lastUpdated: new Date().toISOString()
      };
      persistState();
      broadcastWsStateUpdate(appState);
      broadcastSseStateUpdate(appState);
      res.json({ success: true, lastUpdated: appState.lastUpdated });
    } catch (err) {
      res.status(500).json({ error: 'Failed to patch state' });
    }
  });

  // Server-Sent Events Endpoint (Secondary Fallback)
  app.get('/api/events', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    res.write(`data: ${JSON.stringify({ type: 'CONNECTED', lastUpdated: appState.lastUpdated })}\n\n`);

    sseClients.push(res);

    req.on('close', () => {
      const index = sseClients.indexOf(res);
      if (index !== -1) {
        sseClients.splice(index, 1);
      }
    });
  });

  // Reset to default seed endpoint
  app.post('/api/state/reset', (req: Request, res: Response) => {
    appState = {
      ...INITIAL_APP_STATE,
      lastUpdated: new Date().toISOString()
    };
    persistState();
    broadcastWsStateUpdate(appState);
    broadcastSseStateUpdate(appState);
    res.json({ success: true, message: 'Database reset to default seed' });
  });

  // Mount Vite in Dev Mode
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Vet Superior IQA Management Server running with WebSocket on port ${PORT}`);
  });
}

startServer();
