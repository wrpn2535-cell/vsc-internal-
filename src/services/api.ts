import { AppState, ChecklistAssessmentRecord, CapaRecord, UserRole, FormTemplateCustomizer, AnnualPlanDepartment, AuditScheduleItem, UserProfile, ChecklistItem } from '../types';
import { INITIAL_APP_STATE } from '../data/initialData';
import { FirebaseService } from './firebase';

const STORAGE_KEY = 'vet_superior_iqa_state_v6_fresh';
const WS_URL_STORAGE_KEY = 'vet_superior_custom_ws_url';
const broadcastChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('vet_superior_iqa_sync') : null;

type StateListener = (state: AppState) => void;
const listeners: Set<StateListener> = new Set();

export type WebSocketConnectionStatus = 'CONNECTING' | 'CONNECTED' | 'DISCONNECTED' | 'ERROR';

export interface WebSocketInfo {
  status: WebSocketConnectionStatus;
  url: string;
  isCustomUrl: boolean;
  connectedClients: number;
  latencyMs?: number;
  lastPingTime?: string;
  reconnectAttempts: number;
}

type WsStatusListener = (info: WebSocketInfo) => void;
const wsListeners: Set<WsStatusListener> = new Set();

function sanitizeState(state: any): AppState {
  if (!state || typeof state !== 'object') return INITIAL_APP_STATE;
  
  // Clean out any legacy mock CARs
  const cleanCapas = Array.isArray(state.capas) ? state.capas.filter(
    (c: any) => !c.id.startsWith('CAR-2569-') && !c.id.startsWith('PAR-2569-')
  ) : [];

  const cleanAssessments = Array.isArray(state.checklistAssessments) ? state.checklistAssessments.filter(
    (a: any) => a.id !== 'ass-01'
  ) : [];

  // Reset users to Admin only (or any manually created custom user)
  const cleanUsers = Array.isArray(state.users)
    ? state.users.filter((u: any) => u.id === 'usr-admin' || (!u.id.match(/^usr-(0[1-9]|1[0-9]|2[0-9])$/)))
    : INITIAL_APP_STATE.users;

  return {
    ...INITIAL_APP_STATE,
    ...state,
    capas: cleanCapas,
    checklistAssessments: cleanAssessments,
    notifications: [],
    users: cleanUsers.length > 0 ? cleanUsers : INITIAL_APP_STATE.users,
    checklistBank: (state.checklistBank && state.checklistBank.length > 50) ? state.checklistBank : INITIAL_APP_STATE.checklistBank,
    standardsDatabase: (state.standardsDatabase && state.standardsDatabase.length > 0) ? state.standardsDatabase : INITIAL_APP_STATE.standardsDatabase,
    departments: (state.departments && state.departments.length > 10) ? state.departments : INITIAL_APP_STATE.departments,
  };
}

let currentState: AppState = (() => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      return sanitizeState(parsed);
    }
  } catch (e) {
    console.warn('Could not read cached state from localStorage', e);
  }
  return INITIAL_APP_STATE;
})();

function notifyListeners(state: AppState) {
  currentState = state;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Ignore quota errors
  }
  listeners.forEach((listener) => {
    try {
      listener(state);
    } catch (err) {
      console.error('Error notifying listener', err);
    }
  });
}

// Setup BroadcastChannel for multi-tab immediate sync
if (broadcastChannel) {
  broadcastChannel.onmessage = (event) => {
    if (event.data?.type === 'STATE_UPDATE' && event.data?.state) {
      notifyListeners(event.data.state);
    }
  };
}

// =========================================================================
// WEBSOCKET CLIENT IMPLEMENTATION (Vercel & Full-Duplex Real-Time Sync)
// =========================================================================
let activeWs: WebSocket | null = null;
let reconnectTimer: any = null;
let pingIntervalTimer: any = null;
let pingStartTime = 0;
let reconnectCount = 0;

let currentWsInfo: WebSocketInfo = {
  status: 'DISCONNECTED',
  url: '',
  isCustomUrl: false,
  connectedClients: 1,
  reconnectAttempts: 0,
};

function notifyWsListeners() {
  wsListeners.forEach((listener) => {
    try {
      listener({ ...currentWsInfo });
    } catch (err) {
      console.error('Error notifying ws listener', err);
    }
  });
}

function resolveWsUrl(): { url: string; isCustom: boolean } {
  if (typeof window === 'undefined') return { url: '', isCustom: false };

  const customUrl = localStorage.getItem(WS_URL_STORAGE_KEY);
  if (customUrl && customUrl.trim()) {
    return { url: customUrl.trim(), isCustom: true };
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const defaultUrl = `${protocol}//${window.location.host}/ws`;
  return { url: defaultUrl, isCustom: false };
}

function initWebSocket() {
  if (typeof window === 'undefined' || typeof WebSocket === 'undefined') return;

  if (activeWs) {
    try {
      activeWs.close();
    } catch (e) {
      // Ignore
    }
    activeWs = null;
  }

  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }

  if (pingIntervalTimer) {
    clearInterval(pingIntervalTimer);
    pingIntervalTimer = null;
  }

  const { url, isCustom } = resolveWsUrl();
  currentWsInfo = {
    ...currentWsInfo,
    status: 'CONNECTING',
    url,
    isCustomUrl: isCustom,
    reconnectAttempts: reconnectCount,
  };
  notifyWsListeners();

  try {
    const ws = new WebSocket(url);
    activeWs = ws;

    ws.onopen = () => {
      console.log(`[WebSocket Client] Connected to ${url}`);
      reconnectCount = 0;
      currentWsInfo = {
        ...currentWsInfo,
        status: 'CONNECTED',
        reconnectAttempts: 0,
      };
      notifyWsListeners();

      // Announce current user presence if authenticated
      if (currentState.currentUser && currentState.isAuthenticated) {
        ws.send(
          JSON.stringify({
            type: 'USER_JOIN',
            userId: currentState.currentUser.id,
            userName: currentState.currentUser.name,
          })
        );
      }

      // Start periodic ping for latency measurement
      pingIntervalTimer = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          pingStartTime = Date.now();
          ws.send(JSON.stringify({ type: 'PING' }));
        }
      }, 15000);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'PONG') {
          if (pingStartTime > 0) {
            const latency = Date.now() - pingStartTime;
            currentWsInfo = {
              ...currentWsInfo,
              latencyMs: latency,
              lastPingTime: new Date().toLocaleTimeString('th-TH'),
            };
            notifyWsListeners();
          }
        } else if (data.type === 'STATE_UPDATE' && data.state) {
          notifyListeners(data.state);
        } else if (data.type === 'CLIENT_COUNT' && typeof data.count === 'number') {
          currentWsInfo = {
            ...currentWsInfo,
            connectedClients: data.count,
          };
          notifyWsListeners();
        } else if (data.type === 'WS_CONNECTED') {
          if (typeof data.clientCount === 'number') {
            currentWsInfo = {
              ...currentWsInfo,
              connectedClients: data.clientCount,
            };
            notifyWsListeners();
          }
          if (data.state) {
            notifyListeners(data.state);
          }
        }
      } catch (err) {
        console.warn('[WebSocket Client] Failed to parse message', err);
      }
    };

    ws.onerror = (err) => {
      console.warn('[WebSocket Client] Error event received', err);
      currentWsInfo = {
        ...currentWsInfo,
        status: 'ERROR',
      };
      notifyWsListeners();
    };

    ws.onclose = () => {
      console.log('[WebSocket Client] Connection closed. Will schedule reconnect.');
      currentWsInfo = {
        ...currentWsInfo,
        status: 'DISCONNECTED',
      };
      notifyWsListeners();

      if (pingIntervalTimer) {
        clearInterval(pingIntervalTimer);
        pingIntervalTimer = null;
      }

      // Schedule reconnect with backoff
      reconnectCount++;
      const delay = Math.min(1000 * Math.pow(1.5, reconnectCount), 10000);
      reconnectTimer = setTimeout(() => {
        initWebSocket();
      }, delay);
    };
  } catch (err) {
    console.warn('[WebSocket Client] Failed to initialize WebSocket:', err);
    currentWsInfo = {
      ...currentWsInfo,
      status: 'ERROR',
    };
    notifyWsListeners();
  }
}

// Fallback Server-Sent Events (SSE)
function initSSE() {
  if (typeof window === 'undefined' || typeof EventSource === 'undefined') return;

  try {
    const eventSource = new EventSource('/api/events');

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === 'STATE_UPDATE' && payload.state) {
          notifyListeners(payload.state);
        }
      } catch (err) {
        console.warn('Failed to parse SSE event data', err);
      }
    };
  } catch (err) {
    console.warn('SSE fallback error', err);
  }
}

// Start WebSocket & SSE
initWebSocket();
initSSE();

// Start Firebase Firestore Real-Time WebSocket Synchronization (Vercel-Compatible)
if (typeof window !== 'undefined') {
  try {
    FirebaseService.subscribeToAppState((firestoreData) => {
      if (firestoreData && typeof firestoreData === 'object') {
        const merged: AppState = sanitizeState({
          ...currentState,
          ...firestoreData,
        });
        notifyListeners(merged);
      }
    });
  } catch (err) {
    console.warn('[Firebase WebSocket] Realtime subscription init error:', err);
  }
}

export const ApiService = {
  subscribe(listener: StateListener): () => void {
    listeners.add(listener);
    listener(currentState);
    return () => {
      listeners.delete(listener);
    };
  },

  subscribeWs(listener: WsStatusListener): () => void {
    wsListeners.add(listener);
    listener({ ...currentWsInfo });
    return () => {
      wsListeners.delete(listener);
    };
  },

  getWsInfo(): WebSocketInfo {
    return { ...currentWsInfo };
  },

  setCustomWsUrl(customUrl: string | null): void {
    if (customUrl && customUrl.trim()) {
      localStorage.setItem(WS_URL_STORAGE_KEY, customUrl.trim());
    } else {
      localStorage.removeItem(WS_URL_STORAGE_KEY);
    }
    reconnectCount = 0;
    initWebSocket();
  },

  reconnectWs(): void {
    reconnectCount = 0;
    initWebSocket();
  },

  sendWsMessage(message: any): boolean {
    if (activeWs && activeWs.readyState === WebSocket.OPEN) {
      try {
        activeWs.send(JSON.stringify(message));
        return true;
      } catch (e) {
        console.error('Failed to send WebSocket message', e);
      }
    }
    return false;
  },

  getCurrentState(): AppState {
    return currentState;
  },

  async resetSampleDataToBlank(): Promise<void> {
    const cleanBlankState: AppState = {
      ...INITIAL_APP_STATE,
      lastUpdated: new Date().toISOString(),
    };
    await this.updateState(cleanBlankState);
  },

  async fetchRemoteState(): Promise<AppState> {
    // 1. Try Firebase Firestore first (handles Vercel and multi-device persistence)
    try {
      const fbState = await FirebaseService.getInitialState();
      if (fbState) {
        const sanitized = sanitizeState(fbState);
        notifyListeners(sanitized);
        return sanitized;
      }
    } catch (fbErr) {
      console.warn('Could not load initial state from Firestore:', fbErr);
    }

    // 2. Try Node.js Express backend /api/state
    try {
      const res = await fetch('/api/state');
      if (res.ok) {
        const data = await res.json();
        const sanitized = sanitizeState(data);
        notifyListeners(sanitized);
        // Also seed to Firebase if empty
        FirebaseService.saveAppState(sanitized).catch(() => {});
        return sanitized;
      }
    } catch (err) {
      console.warn('Backend /api/state not reached, using local state', err);
    }
    return currentState;
  },

  async updateState(newState: AppState): Promise<void> {
    notifyListeners(newState);

    if (broadcastChannel) {
      broadcastChannel.postMessage({ type: 'STATE_UPDATE', state: newState });
    }

    // 1. Sync over Firebase Firestore (Google Cloud WebSocket Real-Time Channel)
    FirebaseService.saveAppState(newState).catch((fbErr) => {
      console.warn('[Firebase] Background state sync warning:', fbErr);
    });

    // 2. Attempt sending over custom Node.js WebSocket
    const sentWs = this.sendWsMessage({ type: 'STATE_UPDATE', state: newState });

    // 3. Also persist to Node.js backend HTTP /api/state
    try {
      await fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newState),
      });
    } catch (err) {
      if (!sentWs) {
        console.warn('Could not persist to server /api/state', err);
      }
    }
  },

  async patchState(patch: Partial<AppState>): Promise<void> {
    const updated: AppState = {
      ...currentState,
      ...patch,
      lastUpdated: new Date().toISOString()
    };
    return this.updateState(updated);
  },

  async toggleAnnualPlan(departmentCode: string, month: number, type: 'plan' | 'actual'): Promise<void> {
    const newRows = currentState.annualPlanRows.map((row) => {
      if (row.departmentCode === departmentCode) {
        const currentMonthData = row.months[month] || { plan: false, actual: false };
        return {
          ...row,
          months: {
            ...row.months,
            [month]: {
              ...currentMonthData,
              [type]: !currentMonthData[type]
            }
          }
        };
      }
      return row;
    });

    return this.patchState({ annualPlanRows: newRows });
  },

  async updateAnnualPlanRow(departmentCode: string, updated: Partial<AnnualPlanDepartment>): Promise<void> {
    const newRows = currentState.annualPlanRows.map((row) => {
      if (row.departmentCode === departmentCode) {
        return { ...row, ...updated };
      }
      return row;
    });
    return this.patchState({ annualPlanRows: newRows });
  },

  async addAnnualPlanRow(newRow: AnnualPlanDepartment): Promise<void> {
    const existing = currentState.annualPlanRows.some((r) => r.departmentCode === newRow.departmentCode);
    if (existing) {
      return this.updateAnnualPlanRow(newRow.departmentCode, newRow);
    }
    return this.patchState({ annualPlanRows: [...currentState.annualPlanRows, newRow] });
  },

  async deleteAnnualPlanRow(departmentCode: string): Promise<void> {
    const newRows = currentState.annualPlanRows.filter((r) => r.departmentCode !== departmentCode);
    return this.patchState({ annualPlanRows: newRows });
  },

  async updateSchedule(scheduleId: string, updated: Partial<AuditScheduleItem>): Promise<void> {
    const updatedSchedules = currentState.schedules.map((sch) => {
      if (sch.id === scheduleId) {
        return { ...sch, ...updated };
      }
      return sch;
    });
    return this.patchState({ schedules: updatedSchedules });
  },

  async deleteSchedule(scheduleId: string): Promise<void> {
    const updatedSchedules = currentState.schedules.filter((s) => s.id !== scheduleId);
    return this.patchState({ schedules: updatedSchedules });
  },

  async loginUser(user: UserProfile): Promise<void> {
    const nowStr = new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' });
    this.sendWsMessage({
      type: 'USER_JOIN',
      userId: user.id,
      userName: user.name,
    });
    return this.patchState({
      currentUser: user,
      isAuthenticated: true,
      loginTimestamp: nowStr,
    });
  },

  async loginWithFirebaseGoogle(): Promise<UserProfile> {
    const profile = await FirebaseService.loginWithGoogle();
    await this.loginUser(profile);
    return profile;
  },

  async logoutUser(): Promise<void> {
    FirebaseService.logout().catch(() => {});
    return this.patchState({
      isAuthenticated: false,
    });
  },

  async acknowledgeSchedule(scheduleId: string, roleType: 'lead' | 'auditee', userName: string): Promise<void> {
    const nowStr = new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' });
    const updatedSchedules = currentState.schedules.map((sch) => {
      if (sch.id === scheduleId) {
        if (roleType === 'lead') {
          return {
            ...sch,
            leadAuditorAck: true,
            leadAuditorAckDate: nowStr
          };
        } else {
          return {
            ...sch,
            auditeeAck: true,
            auditeeAckDate: nowStr
          };
        }
      }
      return sch;
    });

    return this.patchState({ schedules: updatedSchedules });
  },

  async saveChecklistAssessment(record: ChecklistAssessmentRecord): Promise<void> {
    const existingIndex = currentState.checklistAssessments.findIndex((a) => a.id === record.id);
    let newAssessments = [...currentState.checklistAssessments];
    if (existingIndex >= 0) {
      newAssessments[existingIndex] = record;
    } else {
      newAssessments.push(record);
    }

    let newCapas = [...currentState.capas];
    let capaCounter = newCapas.length + 1;

    const updatedItems = record.items.map((item) => {
      if (['NC_MAJOR', 'NC_MINOR', 'OBS'].includes(item.rating) && !item.linkedCapaId) {
        const isNC = item.rating === 'NC_MAJOR' || item.rating === 'NC_MINOR';
        const prefix = isNC ? 'CAR' : 'PAR';
        const capaId = `${prefix}-2569-${String(capaCounter++).padStart(3, '0')}`;

        const newCapa: CapaRecord = {
          id: capaId,
          type: isNC ? 'CAR' : 'PAR',
          severity: item.rating === 'NC_MAJOR' ? 'MAJOR' : item.rating === 'NC_MINOR' ? 'MINOR' : 'OBSERVATION',
          departmentCode: record.departmentCode,
          departmentName: currentState.departments.find(d => d.code === record.departmentCode)?.nameTh || record.departmentCode,
          sourceItemCode: item.itemCode,
          sourceClause: item.clause,
          findingDescription: item.findings || 'พบข้อบกพร่องจากการตรวจประเมินภายใน',
          causeCategory: 'Practice',
          sixM: 'Method',
          fiveWhy: {
            why1: '',
            why2: '',
            why3: '',
            why4: '',
            why5: '',
            rootCause: ''
          },
          containment: '',
          correctiveAction: '',
          assignedAuditee: record.auditeeName,
          dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
          leadAuditor: record.auditorName,
          qmrName: 'คุณชวิน พาพิทักษ์',
          status: 'OPEN',
          createdAt: new Date().toISOString().split('T')[0]
        };

        newCapas.push(newCapa);
        return { ...item, linkedCapaId: capaId };
      }
      return item;
    });

    const finalRecord = { ...record, items: updatedItems, updatedAt: new Date().toISOString() };
    if (existingIndex >= 0) {
      newAssessments[existingIndex] = finalRecord;
    } else {
      newAssessments[newAssessments.length - 1] = finalRecord;
    }

    return this.patchState({
      checklistAssessments: newAssessments,
      capas: newCapas
    });
  },

  async saveCapa(capa: CapaRecord): Promise<void> {
    const existingIndex = currentState.capas.findIndex(c => c.id === capa.id);
    let updatedCapas = [...currentState.capas];
    if (existingIndex >= 0) {
      updatedCapas[existingIndex] = capa;
    } else {
      updatedCapas.unshift(capa);
    }
    return this.patchState({ capas: updatedCapas });
  },

  async updateUserRole(userId: string, newRole: UserRole, departmentCode?: string): Promise<void> {
    const updatedUsers = currentState.users.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          role: newRole,
          ...(departmentCode ? {
            departmentCode,
            departmentName: currentState.departments.find(d => d.code === departmentCode)?.nameTh || u.departmentName
          } : {})
        };
      }
      return u;
    });

    const currentUpdated = updatedUsers.find(u => u.id === currentState.currentUser.id) || currentState.currentUser;

    return this.patchState({
      users: updatedUsers,
      currentUser: currentUpdated
    });
  },

  async saveUser(user: UserProfile): Promise<void> {
    const existingIndex = currentState.users.findIndex((u) => u.id === user.id);
    let updatedUsers = [...currentState.users];
    if (existingIndex >= 0) {
      updatedUsers[existingIndex] = user;
    } else {
      updatedUsers.push(user);
    }
    const currentUpdated = updatedUsers.find(u => u.id === currentState.currentUser.id) || currentState.currentUser;
    return this.patchState({
      users: updatedUsers,
      currentUser: currentUpdated
    });
  },

  async deleteUser(userId: string): Promise<void> {
    const updatedUsers = currentState.users.filter((u) => u.id !== userId);
    return this.patchState({
      users: updatedUsers
    });
  },

  async saveChecklistItem(item: ChecklistItem): Promise<void> {
    const existingIndex = currentState.checklistBank.findIndex((q) => q.id === item.id);
    let updatedBank = [...currentState.checklistBank];
    if (existingIndex >= 0) {
      updatedBank[existingIndex] = item;
    } else {
      updatedBank.push(item);
    }
    return this.patchState({ checklistBank: updatedBank });
  },

  async deleteChecklistItem(itemId: string): Promise<void> {
    const updatedBank = currentState.checklistBank.filter((q) => q.id !== itemId);
    return this.patchState({ checklistBank: updatedBank });
  },

  async updateTemplateConfig(config: FormTemplateCustomizer): Promise<void> {
    return this.patchState({ templateConfig: config });
  },

  async resetToSeed(): Promise<void> {
    try {
      const res = await fetch('/api/state/reset', { method: 'POST' });
      if (res.ok) {
        const data = await fetch('/api/state');
        if (data.ok) {
          const fresh = await data.json();
          notifyListeners(fresh);
          return;
        }
      }
    } catch (e) {
      console.warn('Reset error, falling back to local initial state', e);
    }
    notifyListeners(INITIAL_APP_STATE);
  }
};
