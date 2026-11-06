import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { LogIn, Search, CheckCircle, Shield, Building2, Mail, UserCheck, AlertCircle, ArrowLeft, Clock, Zap } from 'lucide-react';
import { ApiService } from '../services/api';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: UserProfile[];
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  users,
  currentUser,
  onSelectUser,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('ALL');
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [customRole, setCustomRole] = useState<UserRole>('AUDITOR');
  const [customDept, setCustomDept] = useState('QA');
  const [activeTab, setActiveTab] = useState<'roster' | 'custom'>('roster');

  // Confirmation step state
  const [pendingUser, setPendingUser] = useState<UserProfile | null>(null);
  const [isLoggingInGoogle, setIsLoggingInGoogle] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  const handleDirectGoogleLogin = async () => {
    setIsLoggingInGoogle(true);
    setGoogleError(null);
    try {
      const profile = await ApiService.loginWithFirebaseGoogle();
      onSelectUser(profile);
      onClose();
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user' || err?.message?.includes('popup-closed-by-user') || err?.message?.includes('ผู้ใช้ยกเลิก')) {
        // User closed or dismissed the popup intentionally; do not log error or show error box
        return;
      }
      console.warn('Google popup sign-in did not complete:', err?.message || err);
      setGoogleError(err.message || 'ไม่สามารถเปิดหน้าต่าง Google Login ได้');
    } finally {
      setIsLoggingInGoogle(false);
    }
  };

  if (!isOpen) return null;

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.departmentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'ALL' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handlePromptConfirmation = (user: UserProfile) => {
    setPendingUser(user);
  };

  const handleConfirmLogin = () => {
    if (!pendingUser) return;
    onSelectUser(pendingUser);
    setPendingUser(null);
    onClose();
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customName) return;

    const newUser: UserProfile = {
      id: `usr-custom-${Date.now()}`,
      email: customEmail,
      name: customName,
      departmentCode: customDept,
      departmentName: customDept,
      role: customRole,
      title: `${customRole} (Google Signed-in)`,
      isCustom: true
    };

    setPendingUser(newUser);
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'ADMIN': return 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300';
      case 'QMR': return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300';
      case 'LEAD_AUDITOR': return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300';
      case 'TECHNICAL_EXPERT': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-300';
      case 'AUDITOR': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300';
      case 'AUDITEE': return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'ADMIN': return 'สิทธิ์สูงสุด: จัดการและแก้ไขแผนประจำปี (FM-QM-013), กำหนดการตรวจ (FM-QM-018), ฐานข้อมูล และโครงสร้างระบบทั้งหมด';
      case 'QMR': return 'ตัวแทนฝ่ายบริหาร: อนุมัติแผนงาน, เซ็นรับทราบรายงานการตรวจ (FM-QM-021), และติดตามการปิดใบ CAR/PAR';
      case 'LEAD_AUDITOR': return 'หัวหน้าทีมตรวจ: กดรับทราบกำหนดการ, ดำเนินการตรวจ Checklist (FM-QM-014), และออกใบ CAR/PAR';
      case 'TECHNICAL_EXPERT': return 'ผู้เชี่ยวชาญเทคนิค: ให้ความเห็นทางวิชาการและการวิเคราะห์ความสอดคล้อง FAMI-QS/HACCP';
      case 'AUDITOR': return 'ผู้ตรวจประเมิน: ดำเนินการบันทึกผลการตรวจใน Checklist และบันทึกหลักฐานเชิงประจักษ์';
      case 'AUDITEE': return 'ผู้รับการตรวจ: กดรับทราบกำหนดการนัดหมาย, ให้ข้อมูลหน้างาน และตอบมาตรการแก้ไข 5-Why ใน CAR/PAR';
      default: return 'ผู้ใช้งานทั่วไป';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {pendingUser ? 'ยืนยันการเข้าสู่ระบบ (Confirm Login)' : 'เข้าสู่ระบบด้วย Google Account'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                บริษัท เวท ซุปพีเรีย คอนซัลแตนท์ จำกัด (โรงงาน: สมุทรสาคร)
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setPendingUser(null);
              onClose();
            }}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        {/* If Confirmation Screen is active */}
        {pendingUser ? (
          <div className="p-6 flex-1 overflow-y-auto space-y-5">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800/80 dark:to-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-indigo-600 text-white font-bold text-xl flex items-center justify-center shadow-md shrink-0">
                  {pendingUser.name.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {pendingUser.name}
                    </h4>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border ${getRoleBadgeColor(pendingUser.role)}`}>
                      {pendingUser.role}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-2 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {pendingUser.email}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {pendingUser.departmentName} ({pendingUser.departmentCode})
                    </span>
                  </div>
                </div>
              </div>

              {/* Roles & Permissions Explanation */}
              <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-indigo-100 dark:border-indigo-900/60 text-xs space-y-1.5">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>ขอบเขตสิทธิ์ในการปฏิบัติงาน (Assigned Role & Permissions):</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  {getRoleDescription(pendingUser.role)}
                </p>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1 font-mono">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>เวลาเข้าใช้งาน: {new Date().toLocaleString('th-TH')}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-start gap-2.5 text-xs text-blue-800 dark:text-blue-200">
              <Shield className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
              <span>
                <strong>นโยบายความปลอดภัยการเข้าสู่ระบบ:</strong> ระบบกำหนดให้ต้องยืนยันตัวตนผ่าน Google Account และตรวจสอบว่าอีเมลได้รับการยืนยันแล้ว (<code className="font-mono text-emerald-600 font-bold">email_verified == true</code>) เสมอ เมื่อท่านคลิกปุ่มด้านล่าง ระบบจะเปิดหน้าต่าง Google เพื่อยืนยันตัวตนจริงของท่าน
              </span>
            </div>

            {googleError && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{googleError}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setPendingUser(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                ย้อนกลับ
              </button>

              <button
                type="button"
                onClick={handleDirectGoogleLogin}
                disabled={isLoggingInGoogle}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoggingInGoogle ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>กำลังยืนยันตัวตน...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>ยืนยันเข้าสู่ระบบด้วย Google Account</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Real Firebase Google Authentication One-Click Button */}
            <div className="p-4 mx-5 mt-4 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-indigo-950/40 dark:to-slate-850 border border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-xs">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>เข้าสู่ระบบด้วย Google Account จริง (Firebase Auth)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.2 rounded font-mono font-bold">
                      Live
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    เข้าสู่ระบบด้วยอีเมล Google และบันทึกข้อมูลเรียลไทม์ลง Firebase Firestore
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDirectGoogleLogin}
                disabled={isLoggingInGoogle}
                className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all shrink-0"
              >
                {isLoggingInGoogle ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>กำลังเปิด Popup...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    <span>ลงชื่อเข้าใช้ด้วย Google</span>
                  </>
                )}
              </button>
            </div>

            {googleError && (
              <div className="mx-5 mt-2 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{googleError}</span>
              </div>
            )}

            {/* Tab switch */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 px-5 pt-3 gap-4">
              <button
                onClick={() => setActiveTab('roster')}
                className={`pb-2.5 text-xs font-semibold transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'roster'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                รายชื่อพนักงานในระบบ (29 บัญชีตามทำเนียบ)
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`pb-2.5 text-xs font-semibold transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'custom'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                เข้าสู่ระบบด้วย Google Account อื่น
              </button>
            </div>

            {activeTab === 'roster' ? (
              <div className="p-5 flex-1 overflow-hidden flex flex-col">
                {/* Search & Role Filter */}
                <div className="flex flex-col sm:flex-row gap-2.5 mb-3.5">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="ค้นหาชื่อ, แผนก, หรืออีเมล..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
                  >
                    <option value="ALL">ทุกบทบาทหน้าที่</option>
                    <option value="ADMIN">Admin / ผู้ดูแลระบบ</option>
                    <option value="QMR">QMR (บริหารคุณภาพ)</option>
                    <option value="LEAD_AUDITOR">Lead Auditor</option>
                    <option value="AUDITOR">Auditor</option>
                    <option value="AUDITEE">Auditee</option>
                    <option value="TECHNICAL_EXPERT">Technical Expert</option>
                  </select>
                </div>

                {/* User List */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                  {filteredUsers.map((u) => {
                    const isCurrent = u.id === currentUser.id;
                    return (
                      <div
                        key={u.id}
                        onClick={() => handlePromptConfirmation(u)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isCurrent
                            ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/30'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300 uppercase shrink-0">
                            {u.name.slice(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                                {u.name}
                              </span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium border ${getRoleBadgeColor(u.role)}`}>
                                {u.role}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-slate-400" />
                                {u.email}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-slate-400" />
                                {u.departmentName}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isCurrent ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                              <CheckCircle className="w-4 h-4" />
                              กำลังใช้งาน
                            </span>
                          ) : (
                            <button
                              type="button"
                              className="px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                            >
                              เลือกบัญชีนี้
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {filteredUsers.length === 0 && (
                    <div className="text-center py-8 text-xs text-slate-500">
                      ไม่พบรายชื่อที่ค้นหา
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleCustomGoogleSubmit} className="p-5 flex-1 overflow-y-auto space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Google Account Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@gmail.com or @vetsuperior.com"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ชื่อ-นามสกุล / ตำแหน่ง *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น ดร.สมชาย ใจดี"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      บทบาท (Role)
                    </label>
                    <select
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value as UserRole)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="AUDITOR">Auditor (ผู้ตรวจประเมิน)</option>
                      <option value="LEAD_AUDITOR">Lead Auditor (หัวหน้าผู้ตรวจ)</option>
                      <option value="AUDITEE">Auditee (ผู้รับการตรวจ)</option>
                      <option value="QMR">QMR (ตัวแทนฝ่ายบริหาร)</option>
                      <option value="TECHNICAL_EXPERT">Technical Expert (ผู้เชี่ยวชาญ)</option>
                      <option value="ADMIN">Admin (ผู้ดูแลระบบ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      ฝ่าย/แผนก (Department)
                    </label>
                    <select
                      value={customDept}
                      onChange={(e) => setCustomDept(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="QMR">QMR (บริหารคุณภาพ)</option>
                      <option value="DC">DC (ควบคุมเอกสาร)</option>
                      <option value="QA">QA (ประกันคุณภาพ)</option>
                      <option value="PT">PT (ฝ่ายผลิต)</option>
                      <option value="WH">WH (คลังวัตถุดิบ)</option>
                      <option value="PK">PK (คลังบรรจุภัณฑ์)</option>
                      <option value="EN">EN (วิศวกรรม)</option>
                      <option value="HR">HR (บุคคล)</option>
                      <option value="IT">IT (สารสนเทศ)</option>
                      <option value="RD">RD (วิจัยพัฒนา)</option>
                      <option value="PR">PR (จัดซื้อ)</option>
                      <option value="MK">MK (การตลาด)</option>
                      <option value="SR">SR (ขายในประเทศ)</option>
                      <option value="FR">FR (ขายต่างประเทศ)</option>
                      <option value="LG">LG (จัดส่ง)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    ไปยังหน้ายืนยันการเข้าสู่ระบบ
                  </button>
                </div>
              </form>
            )}

            {/* Footer */}
            <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>ระบบซิงค์ข้อมูลส่วนกลางแบบเรียลไทม์ (Centralized Real-Time Sync)</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                ปิด
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
