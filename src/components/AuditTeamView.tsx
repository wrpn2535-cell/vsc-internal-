import React, { useState } from 'react';
import { Users, Search, Mail, Building2, Shield, UserCheck, CheckCircle2, Award, Plus, Edit3, Trash2, X, Save } from 'lucide-react';
import { AppState, UserProfile, UserRole } from '../types';
import { ApiService } from '../services/api';

interface AuditTeamViewProps {
  state: AppState;
  currentUser: UserProfile;
  onSwitchUser: (user: UserProfile) => void;
}

export const AuditTeamView: React.FC<AuditTeamViewProps> = ({
  state,
  currentUser,
  onSwitchUser,
}) => {
  const isAdmin = currentUser.role === 'ADMIN';
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('ALL');

  // User Management Modal State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [draftName, setDraftName] = useState('');
  const [draftEmail, setDraftEmail] = useState('');
  const [draftDeptCode, setDraftDeptCode] = useState('QA');
  const [draftRole, setDraftRole] = useState<UserRole>('AUDITOR');
  const [draftTitle, setDraftTitle] = useState('');
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  const handleOpenAddUser = () => {
    setEditingUser(null);
    setDraftName('');
    setDraftEmail('');
    setDraftDeptCode('QA');
    setDraftRole('AUDITOR');
    setDraftTitle('ผู้ตรวจประเมินคุณภาพภายใน');
    setFormFeedback(null);
    setIsUserModalOpen(true);
  };

  const handleOpenEditUser = (user: UserProfile) => {
    setEditingUser(user);
    setDraftName(user.name);
    setDraftEmail(user.email);
    setDraftDeptCode(user.departmentCode);
    setDraftRole(user.role);
    setDraftTitle(user.title);
    setFormFeedback(null);
    setIsUserModalOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftName.trim() || !draftEmail.trim()) return;

    const dept = state.departments.find(d => d.code === draftDeptCode);
    const userToSave: UserProfile = {
      id: editingUser?.id || `usr-${Date.now().toString().slice(-6)}`,
      name: draftName.trim(),
      email: draftEmail.trim().toLowerCase(),
      departmentCode: draftDeptCode,
      departmentName: dept?.nameTh || draftDeptCode,
      role: draftRole,
      title: draftTitle.trim() || 'ผู้ตรวจประเมินคุณภาพภายใน'
    };

    await ApiService.saveUser(userToSave);
    setFormFeedback(editingUser ? 'บันทึกการแก้ไขข้อมูลสำเร็จ' : 'เพิ่มบุคลากรใหม่เรียบร้อยแล้ว');
    setTimeout(() => {
      setFormFeedback(null);
      setIsUserModalOpen(false);
    }, 900);
  };

  const handleDeleteUser = async (user: UserProfile) => {
    if (user.id === currentUser.id) {
      alert('ไม่สามารถลบบัญชีผู้ดูแลระบบที่กำลังใช้งานอยู่ในปัจจุบันได้');
      return;
    }
    if (!window.confirm(`ยืนยันการลบ ${user.name} (${user.email}) ออกจากทำเนียบผู้ตรวจประเมิน?`)) return;
    await ApiService.deleteUser(user.id);
  };

  const filteredUsers = state.users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'ALL' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const roleCount = (role: UserRole) => state.users.filter((u) => u.role === role).length;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
              Qualified Auditor Pool
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              รายชื่อบุคลากรที่ผ่านการรับรองและได้รับมอบหมาย ({state.users.length} บัญชี)
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            ทำเนียบทีมผู้ตรวจประเมินคุณภาพภายใน (Audit Team Directory)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            บริษัท เวท ซุปพีเรีย คอนซัลแตนท์ จำกัด (โรงงาน: สมุทรสาคร)
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={handleOpenAddUser}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl shadow-sm transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            + เพิ่มบุคลากรในทำเนียบ
          </button>
        )}
      </div>

      {/* Role Counts Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div
          onClick={() => setFilterRole('ALL')}
          className={`p-3 rounded-xl border cursor-pointer transition-all ${
            filterRole === 'ALL'
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 font-bold shadow-xs'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
          }`}
        >
          <div className="text-slate-500">บุคลากรทั้งหมด</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            {state.users.length} ท่าน
          </div>
        </div>

        <div
          onClick={() => setFilterRole('AUDITOR')}
          className={`p-3 rounded-xl border cursor-pointer transition-all ${
            filterRole === 'AUDITOR'
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 font-bold shadow-xs'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
          }`}
        >
          <div className="text-slate-500">Auditor</div>
          <div className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
            {roleCount('AUDITOR')} ท่าน
          </div>
        </div>

        <div
          onClick={() => setFilterRole('AUDITEE')}
          className={`p-3 rounded-xl border cursor-pointer transition-all ${
            filterRole === 'AUDITEE'
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 font-bold shadow-xs'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
          }`}
        >
          <div className="text-slate-500">Auditee</div>
          <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">
            {roleCount('AUDITEE')} ท่าน
          </div>
        </div>

        <div
          onClick={() => setFilterRole('TECHNICAL_EXPERT')}
          className={`p-3 rounded-xl border cursor-pointer transition-all ${
            filterRole === 'TECHNICAL_EXPERT'
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 font-bold shadow-xs'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
          }`}
        >
          <div className="text-slate-500">Technical Expert</div>
          <div className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-1">
            {roleCount('TECHNICAL_EXPERT')} ท่าน
          </div>
        </div>

        <div
          onClick={() => setFilterRole('QMR')}
          className={`p-3 rounded-xl border cursor-pointer transition-all ${
            filterRole === 'QMR'
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 font-bold shadow-xs'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
          }`}
        >
          <div className="text-slate-500">ตัวแทน QMR</div>
          <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
            {roleCount('QMR')} ท่าน
          </div>
        </div>

        <div
          onClick={() => setFilterRole('ADMIN')}
          className={`p-3 rounded-xl border cursor-pointer transition-all ${
            filterRole === 'ADMIN'
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 font-bold shadow-xs'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
          }`}
        >
          <div className="text-slate-500">System Admin</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            {roleCount('ADMIN')} ท่าน
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาชื่อผู้ตรวจ, แผนก, ตำแหน่ง, หรืออีเมล..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredUsers.map((u) => {
          const isCurrent = u.id === currentUser.id;
          return (
            <div
              key={u.id}
              className={`bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-2xs transition-all flex flex-col justify-between ${
                isCurrent
                  ? 'border-emerald-500 ring-1 ring-emerald-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-300">
                      {u.name.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {u.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {u.title}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold shrink-0 ${
                      u.role === 'ADMIN'
                        ? 'bg-slate-900 text-white dark:bg-slate-700'
                        : u.role === 'QMR'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        : u.role === 'AUDITOR'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : u.role === 'TECHNICAL_EXPERT'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                    }`}
                  >
                    {u.role}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 truncate">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{u.departmentName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono text-[11px] truncate">{u.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                {isCurrent ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    กำลังใช้งานบัญชีนี้
                  </span>
                ) : (
                  <button
                    onClick={() => onSwitchUser(u)}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 cursor-pointer"
                  >
                    สลับบัญชีด้วย Google Auth →
                  </button>
                )}

                {isAdmin && (
                  <div className="flex items-center gap-1.5 ml-auto">
                    <button
                      onClick={() => handleOpenEditUser(u)}
                      className="p-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="แก้ไขข้อมูลบุคลากร"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    {!isCurrent && (
                      <button
                        onClick={() => handleDeleteUser(u)}
                        className="p-1.5 text-xs text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                        title="ลบออกจากทำเนียบ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit User Modal (Admin) */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {editingUser ? 'แก้ไขข้อมูลบุคลากรในทำเนียบ' : 'เพิ่มบุคลากรใหม่ในทำเนียบ'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    จัดการสิทธิ์และข้อมูลผู้ตรวจประเมิน / ผู้รับการตรวจ (Admin)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsUserModalOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveUser} className="p-5 overflow-y-auto space-y-4 text-xs">
              {formFeedback && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{formFeedback}</span>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ชื่อ-นามสกุล *
                </label>
                <input
                  type="text"
                  required
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  placeholder="เช่น คุณสมชาย มุ่งมั่น"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  อีเมล (สำหรับเข้าสู่ระบบด้วย Google Auth) *
                </label>
                <input
                  type="email"
                  required
                  value={draftEmail}
                  onChange={(e) => setDraftEmail(e.target.value)}
                  placeholder="example@vetsuperior.com หรือ @gmail.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ฝ่าย / แผนก *
                  </label>
                  <select
                    value={draftDeptCode}
                    onChange={(e) => setDraftDeptCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    {state.departments.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.code} - {d.nameTh}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    บทบาทในระบบ (Role) *
                  </label>
                  <select
                    value={draftRole}
                    onChange={(e) => setDraftRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="ADMIN">ADMIN (ผู้ดูแลระบบสูงสุด)</option>
                    <option value="QMR">QMR (ตัวแทนฝ่ายบริหารคุณภาพ)</option>
                    <option value="LEAD_AUDITOR">LEAD_AUDITOR (หัวหน้าทีมผู้ตรวจ)</option>
                    <option value="AUDITOR">AUDITOR (ผู้ตรวจประเมิน)</option>
                    <option value="TECHNICAL_EXPERT">TECHNICAL_EXPERT (ผู้เชี่ยวชาญเทคนิค)</option>
                    <option value="AUDITEE">AUDITEE (ผู้รับการตรวจประเมิน)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ตำแหน่งงาน / หน้าที่รับผิดชอบ
                </label>
                <input
                  type="text"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  placeholder="เช่น ผู้จัดการฝ่ายประกันคุณภาพ / Lead Auditor"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  บันทึกข้อมูลบุคลากร
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
