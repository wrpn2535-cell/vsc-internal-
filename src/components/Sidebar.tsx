import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  Clock,
  ClipboardCheck,
  FileSpreadsheet,
  AlertOctagon,
  Database,
  BookOpen,
  Users,
  Sliders,
  Bell,
  Sun,
  Moon,
  ShieldCheck,
  Building2,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { UserProfile } from '../types';

export type NavTab =
  | 'dashboard'
  | 'annual-plan'
  | 'schedule'
  | 'checklist'
  | 'iqa-report'
  | 'capa'
  | 'question-bank'
  | 'standards'
  | 'audit-team'
  | 'admin';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  onLogout?: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  unreadNotificationCount: number;
  openCapaCount: number;
  pendingScheduleAckCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  currentUser,
  onOpenAuth,
  onLogout,
  isDarkMode,
  onToggleDarkMode,
  unreadNotificationCount,
  openCapaCount,
  pendingScheduleAckCount,
}) => {
  const navItems: { id: NavTab; label: string; subLabel: string; icon: React.ReactNode; badge?: number; adminOnly?: boolean }[] = [
    {
      id: 'dashboard',
      label: 'แดชบอร์ดภาพรวม',
      subLabel: 'Overall Compliance & KPIs',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'annual-plan',
      label: 'แผนประจำปี 12 เดือน',
      subLabel: 'FM-QM-013 Rev.16',
      icon: <CalendarDays className="w-4 h-4" />,
    },
    {
      id: 'schedule',
      label: 'กำหนดการตรวจประเมิน',
      subLabel: 'FM-QM-018 Rev.07',
      icon: <Clock className="w-4 h-4" />,
      badge: pendingScheduleAckCount > 0 ? pendingScheduleAckCount : undefined,
    },
    {
      id: 'checklist',
      label: 'Checklist ตรวจประเมิน',
      subLabel: 'FM-QM-014 Rev.08',
      icon: <ClipboardCheck className="w-4 h-4" />,
    },
    {
      id: 'iqa-report',
      label: 'สรุปผลรายงาน QMR',
      subLabel: 'FM-QM-021 Rev.04 (ประธานฯ)',
      icon: <FileSpreadsheet className="w-4 h-4" />,
    },
    {
      id: 'capa',
      label: 'ระบบตอบ CAR / PAR',
      subLabel: '5-Why & CAPA Workflow',
      icon: <AlertOctagon className="w-4 h-4" />,
      badge: openCapaCount > 0 ? openCapaCount : undefined,
    },
    {
      id: 'question-bank',
      label: 'คลังคำถาม 18 ฝ่าย',
      subLabel: 'Checklist Bank (Binder 1)',
      icon: <Database className="w-4 h-4" />,
    },
    {
      id: 'standards',
      label: 'ฐานข้อมูลข้อกำหนด',
      subLabel: 'ISO 9001 / FAMI-QS / GHPs',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'audit-team',
      label: 'ทำเนียบทีมตรวจ (29 ท่าน)',
      subLabel: 'Audit Team & Qualified Pool',
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'admin',
      label: 'จัดการระบบ & แบบฟอร์ม',
      subLabel: 'Admin Layouts & Roles',
      icon: <Sliders className="w-4 h-4" />,
      adminOnly: true,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-indigo-950/40 shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-sm text-white tracking-wide">VET SUPERIOR</span>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono font-bold">IQA</span>
          </div>
          <p className="text-[11px] text-slate-400 truncate">บจก. เวท ซุปพีเรีย คอนซัลแตนท์</p>
          <p className="text-[10px] text-indigo-400 font-medium">โรงงาน : สมุทรสาคร</p>
        </div>
      </div>

      {/* Standards Bar */}
      <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/40 text-[10px] text-slate-400 flex items-center justify-between">
        <span className="truncate">ISO 9001 · GHPs/HACCP · FAMI-QS</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-2.5 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-950'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`${isActive ? 'text-white' : 'text-slate-400'}`}>{item.icon}</span>
                <div className="truncate">
                  <div className="truncate leading-tight">{item.label}</div>
                  <div className={`text-[10px] truncate ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {item.subLabel}
                  </div>
                </div>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                    isActive ? 'bg-white text-indigo-700' : 'bg-red-500 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Card & Google Auth Switcher */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-1.5">
          <div
            onClick={onOpenAuth}
            className="flex-1 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between group min-w-0"
            title="คลิกเพื่อสลับผู้ใช้งาน"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-indigo-700/60 border border-indigo-500/50 flex items-center justify-center text-xs font-bold text-white shrink-0">
                {currentUser.name.slice(0, 2)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">
                  {currentUser.name.split(' ')[0]}
                </div>
                <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                  <span className="font-mono text-indigo-400 font-bold">{currentUser.role}</span>
                  <span>•</span>
                  <span className="truncate">{currentUser.departmentCode}</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-800 hover:bg-red-950/40 text-slate-400 hover:text-red-400 transition-all shrink-0 cursor-pointer"
              title="ลงชื่อออกจากระบบ (Sign Out)"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Theme and Sync indicator */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span className="text-[10px]">ซิงค์ฐานข้อมูลกลาง</span>
          </div>

          <button
            onClick={onToggleDarkMode}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="สลับโหมด มืด / สว่าง"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
};
