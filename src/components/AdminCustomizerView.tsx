import React, { useState } from 'react';
import { Sliders, Save, Shield, Users, FileText, CheckCircle2, Download, RotateCcw } from 'lucide-react';
import { AppState, FormTemplateCustomizer, UserProfile, UserRole } from '../types';
import { ApiService } from '../services/api';

interface AdminCustomizerViewProps {
  state: AppState;
  currentUser: UserProfile;
}

export const AdminCustomizerView: React.FC<AdminCustomizerViewProps> = ({ state, currentUser }) => {
  const [templateDraft, setTemplateDraft] = useState<FormTemplateCustomizer>(state.templateConfig);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [userRoleDrafts, setUserRoleDrafts] = useState<Record<string, UserRole>>(
    state.users.reduce((acc, u) => ({ ...acc, [u.id]: u.role }), {})
  );

  const handleSaveTemplates = async (e: React.FormEvent) => {
    e.preventDefault();
    await ApiService.updateTemplateConfig(templateDraft);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChangeRole = async (userId: string, newRole: UserRole) => {
    setUserRoleDrafts((prev) => ({ ...prev, [userId]: newRole }));
    await ApiService.updateUserRole(userId, newRole);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `vet_superior_iqa_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetToSeed = async () => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตข้อมูลทั้งหมดกลับสู่ค่าเริ่มต้นจากโรงงาน (Default Seed)?')) {
      await ApiService.resetToSeed();
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-indigo-600 text-white font-bold">
              Admin Control Panel
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              สำหรับผู้ดูแลระบบและ QMR (เข้าถึงได้เฉพาะสิทธิ์ Admin)
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            ปรับแต่งรูปแบบการนำเสนอรายงาน และกำหนดบทบาทผู้ใช้งาน (RBAC)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ปรับแต่งค่าฟิลด์ หัวเอกสาร วันที่เริ่มบังคับใช้ และจัดการสิทธิ์ผู้ใช้งาน 29 ท่าน
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportBackup}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            สำรองข้อมูล (JSON)
          </button>

          <button
            onClick={handleResetToSeed}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            รีเซ็ตค่าเริ่มต้น
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 px-4 py-2 rounded-xl border border-indigo-300 dark:border-indigo-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>บันทึกการตั้งค่าระบบและบทบาทผู้ใช้งานเรียบร้อยแล้ว</span>
        </div>
      )}

      {/* Section 1: Form Templates and Document Control (FM-QM-013, 018, 014, 021) */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              กำหนดข้อมูลหัวเอกสารควบคุมคุณภาพ (Document Control Header Formats)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ค่าเหล่านี้จะถูกนำไปจัดหน้าเอกสารและแสดงในหน้าพิมพ์/PDF ทุกฉบับ
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveTemplates} className="space-y-4 text-xs">
          {/* General Company info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ชื่อบริษัท (ภาษาไทย)
              </label>
              <input
                type="text"
                value={templateDraft.companyNameTh}
                onChange={(e) => setTemplateDraft({ ...templateDraft, companyNameTh: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                สถานที่ปฏิบัติงาน / โรงงาน
              </label>
              <input
                type="text"
                value={templateDraft.plantLocationTh}
                onChange={(e) => setTemplateDraft({ ...templateDraft, plantLocationTh: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Form revision matrices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* FM-QM-013 */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">
                แบบฟอร์ม FM-QM-013 (แผนการตรวจติดตามระบบคุณภาพภายใน)
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500">เลขที่เอกสาร</span>
                  <input
                    type="text"
                    value={templateDraft.fmQm013.docNumber}
                    onChange={(e) =>
                      setTemplateDraft({
                        ...templateDraft,
                        fmQm013: { ...templateDraft.fmQm013, docNumber: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">แก้ไขครั้งที่</span>
                  <input
                    type="text"
                    value={templateDraft.fmQm013.revision}
                    onChange={(e) =>
                      setTemplateDraft({
                        ...templateDraft,
                        fmQm013: { ...templateDraft.fmQm013, revision: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">วันที่เริ่มบังคับใช้</span>
                  <input
                    type="text"
                    value={templateDraft.fmQm013.effectiveDate}
                    onChange={(e) =>
                      setTemplateDraft({
                        ...templateDraft,
                        fmQm013: { ...templateDraft.fmQm013, effectiveDate: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* FM-QM-018 */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">
                แบบฟอร์ม FM-QM-018 (แผนกำหนดการตรวจติดตามคุณภาพภายใน)
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500">เลขที่เอกสาร</span>
                  <input
                    type="text"
                    value={templateDraft.fmQm018.docNumber}
                    onChange={(e) =>
                      setTemplateDraft({
                        ...templateDraft,
                        fmQm018: { ...templateDraft.fmQm018, docNumber: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">แก้ไขครั้งที่</span>
                  <input
                    type="text"
                    value={templateDraft.fmQm018.revision}
                    onChange={(e) =>
                      setTemplateDraft({
                        ...templateDraft,
                        fmQm018: { ...templateDraft.fmQm018, revision: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">วันที่เริ่มบังคับใช้</span>
                  <input
                    type="text"
                    value={templateDraft.fmQm018.effectiveDate}
                    onChange={(e) =>
                      setTemplateDraft({
                        ...templateDraft,
                        fmQm018: { ...templateDraft.fmQm018, effectiveDate: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* FM-QM-014 */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">
                แบบฟอร์ม FM-QM-014 (ใบรายงานการตรวจติดตามคุณภาพภายใน Checklist)
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500">เลขที่เอกสาร</span>
                  <input
                    type="text"
                    value={templateDraft.fmQm014.docNumber}
                    onChange={(e) =>
                      setTemplateDraft({
                        ...templateDraft,
                        fmQm014: { ...templateDraft.fmQm014, docNumber: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">แก้ไขครั้งที่</span>
                  <input
                    type="text"
                    value={templateDraft.fmQm014.revision}
                    onChange={(e) =>
                      setTemplateDraft({
                        ...templateDraft,
                        fmQm014: { ...templateDraft.fmQm014, revision: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">วันที่เริ่มบังคับใช้</span>
                  <input
                    type="text"
                    value={templateDraft.fmQm014.effectiveDate}
                    onChange={(e) =>
                      setTemplateDraft({
                        ...templateDraft,
                        fmQm014: { ...templateDraft.fmQm014, effectiveDate: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* FM-QM-021 */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">
                แบบฟอร์ม FM-QM-021 (รายงานการตรวจติดตามคุณภาพภายใน IQA Report ถึงประธานฯ)
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500">เลขที่เอกสาร</span>
                  <input
                    type="text"
                    value={templateDraft.fmQm021.docNumber}
                    onChange={(e) =>
                      setTemplateDraft({
                        ...templateDraft,
                        fmQm021: { ...templateDraft.fmQm021, docNumber: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">แก้ไขครั้งที่</span>
                  <input
                    type="text"
                    value={templateDraft.fmQm021.revision}
                    onChange={(e) =>
                      setTemplateDraft({
                        ...templateDraft,
                        fmQm021: { ...templateDraft.fmQm021, revision: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">วันที่เริ่มบังคับใช้</span>
                  <input
                    type="text"
                    value={templateDraft.fmQm021.effectiveDate}
                    onChange={(e) =>
                      setTemplateDraft({
                        ...templateDraft,
                        fmQm021: { ...templateDraft.fmQm021, effectiveDate: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              บันทึกการจัดหน้าเอกสาร
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: User Role & Permissions Management (Requirement 16) */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              กำหนดบทบาทและสิทธิ์การใช้งาน (User Role Assignment)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Admin สามารถเปลี่ยนบทบาทของบุคลากรทั้ง 29 ท่านได้ตามโครงสร้างทีมตรวจ
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                <th className="py-2.5 px-3">ชื่อ-นามสกุล</th>
                <th className="py-2.5 px-3">อีเมล (Google Account)</th>
                <th className="py-2.5 px-3">แผนก</th>
                <th className="py-2.5 px-3 w-52">บทบาทที่กำหนด</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {state.users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-2 px-3 font-medium text-slate-900 dark:text-white">
                    {user.name}
                  </td>
                  <td className="py-2 px-3 font-mono text-[11px] text-slate-500">
                    {user.email}
                  </td>
                  <td className="py-2 px-3 text-slate-600 dark:text-slate-300">
                    {user.departmentName}
                  </td>
                  <td className="py-2 px-3">
                    <select
                      value={userRoleDrafts[user.id] || user.role}
                      onChange={(e) => handleChangeRole(user.id, e.target.value as UserRole)}
                      className="w-full px-2.5 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                    >
                      <option value="AUDITOR">Auditor (ผู้ตรวจประเมิน)</option>
                      <option value="LEAD_AUDITOR">Lead Auditor (หัวหน้าผู้ตรวจ)</option>
                      <option value="AUDITEE">Auditee (ผู้รับการตรวจ)</option>
                      <option value="QMR">QMR (ตัวแทนฝ่ายบริหาร)</option>
                      <option value="TECHNICAL_EXPERT">Technical Expert (ผู้เชี่ยวชาญ)</option>
                      <option value="ADMIN">ADMIN (ผู้ดูแลระบบสูงสุด)</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
