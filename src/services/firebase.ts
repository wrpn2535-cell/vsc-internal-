/**
 * Firebase Firestore & Authentication Service
 * Provides real-time WebSocket syncing for Vercel and web clients, persistent storage,
 * and Google Authentication.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  onSnapshot,
  Firestore,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { AppState, UserProfile } from '../types';
import { USERS_DATA } from '../data/initialData';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific databaseId as configured
export const db: Firestore = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Firebase Auth & Google Provider
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: 'select_account' });

// Test connection on boot as mandated by the Firebase skill
async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('[Firebase] Connection verified with Firestore Enterprise database');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firebase] Client is currently offline; operating with cached/fallback state.');
      return false;
    }
    // Missing doc in 'test/connection' is expected on first boot
    return true;
  }
}

// Run test connection asynchronously
testConnection().catch(() => {});

export const FirebaseService = {
  isConfigured(): boolean {
    return Boolean(firebaseConfig.projectId && firebaseConfig.apiKey);
  },

  getProjectInfo() {
    return {
      projectId: firebaseConfig.projectId,
      firestoreDatabaseId: firebaseConfig.firestoreDatabaseId,
      authDomain: firebaseConfig.authDomain,
      realtimeProtocol: 'Firebase Firestore WebSockets (wss://firestore.googleapis.com)',
      vercelSupported: true,
    };
  },

  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  },

  onAuthChange(callback: (user: FirebaseUser | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  },

  async loginWithGoogle(): Promise<UserProfile> {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;

      // CRITICAL SECURITY REQUIREMENT:
      // Must verify that user.emailVerified is true
      if (!user.emailVerified) {
        await signOut(auth);
        throw new Error(
          'บัญชี Google นี้ยังไม่ได้รับการยืนยันอีเมล (Email Not Verified) ระบบกำหนดให้ต้องยืนยันอีเมลก่อนเข้าสู่ระบบเสมอ กรุณายืนยันอีเมลใน Google Account ของท่านก่อนเข้าใช้งาน'
        );
      }

      const userEmail = (user.email || '').toLowerCase().trim();

      // Check if email matches company roster or admin
      const matchedRosterUser = USERS_DATA.find(
        (u) => u.email.toLowerCase().trim() === userEmail
      );

      const isAdminUser =
        userEmail === 'wrpn2535@gmail.com' ||
        matchedRosterUser?.role === 'ADMIN';

      const profile: UserProfile = {
        id: user.uid,
        email: user.email || 'user@vetsuperior.com',
        name: user.displayName || matchedRosterUser?.name || user.email?.split('@')[0] || 'Google User',
        departmentCode: matchedRosterUser?.departmentCode || (isAdminUser ? 'QMR' : 'QA'),
        departmentName: matchedRosterUser?.departmentName || (isAdminUser ? 'ฝ่ายบริหารคุณภาพ (QMR)' : 'ฝ่ายประกันคุณภาพ (QA)'),
        role: isAdminUser
          ? 'ADMIN'
          : (matchedRosterUser?.role || 'AUDITOR'),
        title: isAdminUser
          ? 'System Administrator / Super Auditor'
          : (matchedRosterUser?.title || 'ผู้ตรวจประเมินคุณภาพ (Verified Google User)'),
        avatarUrl: user.photoURL || undefined,
        isCustom: !matchedRosterUser,
      };

      // Sync user profile to Firestore
      try {
        await setDoc(doc(db, 'users', user.uid), profile, { merge: true });
      } catch (err) {
        console.warn('[Firebase] Could not save user profile to Firestore:', err);
      }

      return profile;
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user' || error?.code === 'auth/cancelled-popup-request') {
        // User voluntarily closed the Google login popup or clicked away; treat as cancellation
        const cancelErr = new Error('ผู้ใช้ยกเลิกหน้าต่างลงชื่อเข้าใช้ Google');
        (cancelErr as any).code = 'auth/popup-closed-by-user';
        throw cancelErr;
      }
      console.error('[Firebase] Google Sign-in error:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('[Firebase] Sign-out error:', error);
      throw error;
    }
  },

  /**
   * Listen to real-time state updates using Firestore's WebSocket connection
   * Essential for Vercel deployments where serverless functions cannot hold active sockets
   */
  subscribeToAppState(
    onData: (data: Partial<AppState>) => void,
    onError?: (error: Error) => void
  ): () => void {
    const docPath = 'app_state/default';
    try {
      const docRef = doc(db, 'app_state', 'default');
      const unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            console.log('[Firebase onSnapshot] Received real-time update from Firestore WebSocket:', data.lastUpdated);
            onData(data as Partial<AppState>);
          }
        },
        (error) => {
          console.error('[Firebase onSnapshot error]', error);
          if (onError) onError(error);
          handleFirestoreError(error, OperationType.GET, docPath);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.error('[Firebase subscribe error]', err);
      return () => {};
    }
  },

  /**
   * Persist AppState directly to Firestore database
   */
  async saveAppState(state: Partial<AppState>): Promise<boolean> {
    const docPath = 'app_state/default';
    try {
      const docRef = doc(db, 'app_state', 'default');
      const payload = {
        ...state,
        lastUpdated: new Date().toISOString(),
        updatedBy: auth.currentUser?.email || 'wrpn2535@gmail.com',
      };
      await setDoc(docRef, payload, { merge: true });
      console.log('[Firebase] Successfully wrote state update to Firestore');
      return true;
    } catch (error) {
      console.error('[Firebase] Failed to write state update to Firestore:', error);
      handleFirestoreError(error, OperationType.WRITE, docPath);
    }
  },

  /**
   * Fetch initial state from Firestore directly
   */
  async getInitialState(): Promise<AppState | null> {
    const docPath = 'app_state/default';
    try {
      const docRef = doc(db, 'app_state', 'default');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data() as AppState;
      }
      return null;
    } catch (error) {
      console.warn('[Firebase] Could not fetch initial state from Firestore:', error);
      return null;
    }
  },
};
