import React, { useState } from 'react';
import { Printer, Bell, Search, Shield, RefreshCw, CheckCircle2, AlertTriangle, Clock, LogOut, ShieldAlert } from 'lucide-react';
import { AppState, UserProfile, AppNotification } from '../types';
import { NavTab } from './Sidebar';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  onLogout?: () => void;
  onOpenPrint: (type: 'FM-QM-013' | 'FM-QM-018' | 'FM-QM-014' | 'FM-QM-021' | 'CAR-PAR') => void;
  state: AppState;
  onRefreshSync: () => void;
  isSyncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenPrint,
  state,
  onRefreshSync,
  isSyncing = false,
}) => {
  const [showPrintMenu, setShowPrintMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const tabTitles: Record<NavTab, { title: string; subtitle: string }> = {
    'dashboard': { title: 'แดชบอร์ดภาพรวมการตรวจติดตามคุณภาพภายใน', subtitle: 'Compliance KPIs & 6-Cause Analysis' },
    'annual-plan': { title: 'แผนการตรวจติดตามระบบคุณภาพภายใน (ประจำปี)', subtitle: 'FM-QM-013 Rev.16 / 17-04-2562' },
    'schedule': { title: 'แผนกำหนดการตรวจติดตามคุณภาพภายใน', subtitle: 'FM-QM-018 Rev.07 / 31-05-2565' },
    'checklist': { title: 'ใบรายงานการตรวจติดตามคุณภาพภายใน (Checklist)', subtitle: 'FM-QM-014 Rev.08 / 01-11-2569' },
    'iqa-report': { title: 'รายงานการตรวจติดตามคุณภาพภายใน (IQA Report)', subtitle: 'FM-QM-021 Rev.04 / 26-11-2559 (เรียน ประธานบริษัทฯ)' },
    'capa': { title: 'ระบบจัดการข้อบกพร่อง & มาตรการแก้ไข (CAR / PAR)', subtitle: '5-Why Analysis & Containment Workflow' },
    'question-bank': { title: 'คลังข้อคำถามตรวจประเมิน 18 ฝ่าย', subtitle: 'Binder 1 Integrated Question Database' },
    'standards': { title: 'ฐานข้อมูลข้อกำหนดมาตรฐานสากล', subtitle: 'ISO 9001:2015 · GHPs/HACCP · FAMI-QS V.6' },
    'audit-team': { title: 'ทำเนียบผู้ตรวจประเมินภายใน (Audit Team)', subtitle: 'Qualified Auditor & Technical Expert Pool (29 ท่าน)' },
    'admin': { title: 'จัดการระบบและปรับแต่งแบบฟอร์ม (Admin Console)', subtitle: 'Document Headers, Roles & Field Customization' },
  };

  const unreadNotifs = state.notifications.filter(n => !n.read);

  return (
    <header className="h-16 px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0 no-print">
      {/* Zone 1: Brand title & Context Breadcrumb (One line) */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
              {tabTitles[activeTab]?.title}
            </h1>
            <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 hidden md:inline border border-indigo-200/50 dark:border-indigo-800">
              โรงงานสมุทรสาคร
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate hidden sm:block">
            {tabTitles[activeTab]?.subtitle}
          </p>
        </div>
      </div>

      {/* Zone 2: Navigation Quick Switches / Shortcuts */}
      <div className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300">
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`px-2.5 py-1 rounded-md transition-colors ${activeTab === 'dashboard' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/40' : 'hover:text-slate-900 dark:hover:text-white'}`}
        >
          แดชบอร์ด
        </button>
        <button
          onClick={() => onSelectTab('annual-plan')}
          className={`px-2.5 py-1 rounded-md transition-colors ${activeTab === 'annual-plan' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/40' : 'hover:text-slate-900 dark:hover:text-white'}`}
        >
          แผนประจำปี
        </button>
        <button
          onClick={() => onSelectTab('checklist')}
          className={`px-2.5 py-1 rounded-md transition-colors ${activeTab === 'checklist' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/40' : 'hover:text-slate-900 dark:hover:text-white'}`}
        >
          Checklist
        </button>
        <button
          onClick={() => onSelectTab('capa')}
          className={`px-2.5 py-1 rounded-md transition-colors ${activeTab === 'capa' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/40' : 'hover:text-slate-900 dark:hover:text-white'}`}
        >
          CAR/PAR
        </button>
        <button
          onClick={() => onSelectTab('standards')}
          className={`px-2.5 py-1 rounded-md transition-colors ${activeTab === 'standards' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/40' : 'hover:text-slate-900 dark:hover:text-white'}`}
        >
          ค้นหาข้อกำหนด
        </button>
      </div>

      {/* Zone 3: Actions & Notifications & Google User Profile */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Sync button */}
        <button
          onClick={onRefreshSync}
          disabled={isSyncing}
          className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="ซิงค์ข้อมูลเรียลไทม์"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-indigo-600' : ''}`} />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            title="การแจ้งเตือน"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">การแจ้งเตือนระบบ (Alerts)</span>
                <span className="text-[10px] text-slate-500 font-mono">{unreadNotifs.length} รายการ</span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {state.notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      if (notif.linkTab) onSelectTab(notif.linkTab as NavTab);
                      setShowNotifications(false);
                    }}
                    className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      {notif.type === 'UPCOMING_AUDIT' && <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />}
                      {notif.type === 'CAPA_DUE' && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />}
                      {notif.type === 'ACK_REQUIRED' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />}
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-900 dark:text-white">{notif.title}</div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">{notif.message}</div>
                        <div className="text-[9px] text-slate-400 mt-1 font-mono">{notif.timestamp}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Print Menu Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowPrintMenu(!showPrintMenu)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            <span className="hidden sm:inline">พิมพ์เอกสาร</span>
          </button>

          {showPrintMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 text-xs">
              <div className="text-[10px] text-slate-400 px-2 py-1 font-semibold uppercase">เลือกแบบฟอร์มคุณภาพ</div>
              <button
                onClick={() => {
                  onOpenPrint('FM-QM-013');
                  setShowPrintMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>FM-QM-013 (แผนประจำปี)</span>
                <span className="font-mono text-[10px] text-slate-400">Rev.16</span>
              </button>
              <button
                onClick={() => {
                  onOpenPrint('FM-QM-018');
                  setShowPrintMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>FM-QM-018 (กำหนดการ)</span>
                <span className="font-mono text-[10px] text-slate-400">Rev.07</span>
              </button>
              <button
                onClick={() => {
                  onOpenPrint('FM-QM-014');
                  setShowPrintMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>FM-QM-014 (Checklist)</span>
                <span className="font-mono text-[10px] text-slate-400">Rev.08</span>
              </button>
              <button
                onClick={() => {
                  onOpenPrint('FM-QM-021');
                  setShowPrintMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>FM-QM-021 (IQA Report)</span>
                <span className="font-mono text-[10px] text-slate-400">Rev.04</span>
              </button>
              <button
                onClick={() => {
                  onOpenPrint('CAR-PAR');
                  setShowPrintMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-red-600 dark:text-red-400"
              >
                <span>ใบ CAR / PAR ล่าสุด</span>
                <span className="font-mono text-[10px]">CAPA</span>
              </button>
            </div>
          )}
        </div>

        {/* Primary Action: Google Account button & Role badge */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={onOpenAuth}
            className="inline-flex items-center gap-2 px-2.5 py-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors shrink-0"
            title="คลิกเพื่อสลับบัญชีผู้ใช้งาน"
          >
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 shadow-2xs">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <div className="text-left hidden sm:block">
              <div className="truncate max-w-[120px] leading-tight font-bold">{currentUser.name.split(' ')[0]}</div>
              <div className="text-[10px] text-slate-400 font-mono leading-none">{currentUser.role}</div>
            </div>
          </button>

          {/* Sign Out Button */}
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            title="ลงชื่อออกจากระบบ (Sign Out)"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">ยืนยันการลงชื่อออกจากระบบ?</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              คุณกำลังใช้งานในฐานะ <strong className="text-slate-900 dark:text-white">{currentUser.name}</strong> ({currentUser.departmentName}) การลงชื่อออกจะนำคุณกลับสู่หน้าเลือกผู้เข้าใช้งาน
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:underline"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  if (onLogout) onLogout();
                }}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                ลงชื่อออกทันที
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
