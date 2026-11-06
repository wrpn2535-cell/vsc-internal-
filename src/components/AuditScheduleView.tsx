import React, { useState } from 'react';
import { Printer, CheckCircle, Clock, Calendar, Plus, Play, UserCheck, Shield, Filter, Edit3, Trash2, Save, ShieldAlert, CheckSquare } from 'lucide-react';
import { AppState, AuditScheduleItem, UserProfile, ScheduleHeader } from '../types';
import { ApiService } from '../services/api';

interface AuditScheduleViewProps {
  state: AppState;
  currentUser: UserProfile;
  onOpenPrint: () => void;
  onStartChecklist: (schedule: AuditScheduleItem) => void;
}

export const AuditScheduleView: React.FC<AuditScheduleViewProps> = ({
  state,
  currentUser,
  onOpenPrint,
  onStartChecklist,
}) => {
  const isAdminOrQmr = currentUser.role === 'ADMIN' || currentUser.role === 'QMR';
  const [selectedCycle, setSelectedCycle] = useState<string>('1/2569');

  // Header editing state
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [headerDraft, setHeaderDraft] = useState<ScheduleHeader>(state.scheduleHeader);

  // Add / Edit Schedule Item Modal state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null); // null = new

  // Item Draft Fields
  const [itemDraftCycle, setItemDraftCycle] = useState('1/2569');
  const [itemDraftDeptCode, setItemDraftDeptCode] = useState('QA');
  const [itemDraftDate, setItemDraftDate] = useState('2026-11-20');
  const [itemDraftTime, setItemDraftTime] = useState('09:00 - 12:00');
  const [itemDraftLeadId, setItemDraftLeadId] = useState(state.users[0]?.id || '');
  const [itemDraftAuditeeId, setItemDraftAuditeeId] = useState(state.users[1]?.id || state.users[0]?.id || '');
  const [itemDraftReqs, setItemDraftReqs] = useState('ISO 9001: 8.5 | FAMI-QS: 8.4 | DLD GHPs: ข้อ 13');
  const [itemDraftStatus, setItemDraftStatus] = useState<'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'>('SCHEDULED');
  const [itemDraftLeadAck, setItemDraftLeadAck] = useState(false);
  const [itemDraftAuditeeAck, setItemDraftAuditeeAck] = useState(false);

  // Delete Confirmation State
  const [deletingSchedule, setDeletingSchedule] = useState<AuditScheduleItem | null>(null);

  const filteredSchedules = state.schedules.filter((s) => s.cycle === selectedCycle);

  const handleAck = async (scheduleId: string, roleType: 'lead' | 'auditee') => {
    await ApiService.acknowledgeSchedule(scheduleId, roleType, currentUser.name);
  };

  const handleSaveHeader = async () => {
    await ApiService.patchState({ scheduleHeader: headerDraft });
    setIsEditingHeader(false);
  };

  const handleOpenAddModal = () => {
    setEditingScheduleId(null);
    setItemDraftCycle(selectedCycle);
    setItemDraftDeptCode('QA');
    setItemDraftDate('2026-11-20');
    setItemDraftTime('09:00 - 12:00');
    const lead = state.users.find(u => u.role === 'LEAD_AUDITOR' || u.role === 'TECHNICAL_EXPERT') || state.users[0];
    const auditee = state.users.find(u => u.role === 'AUDITEE') || state.users[1] || state.users[0];
    setItemDraftLeadId(lead?.id || '');
    setItemDraftAuditeeId(auditee?.id || lead?.id || '');
    setItemDraftReqs('ISO 9001: 8.5 | FAMI-QS: 8.4 | DLD GHPs: ข้อ 13');
    setItemDraftStatus('SCHEDULED');
    setItemDraftLeadAck(false);
    setItemDraftAuditeeAck(false);
    setIsScheduleModalOpen(true);
  };

  const handleOpenEditModal = (sch: AuditScheduleItem) => {
    setEditingScheduleId(sch.id);
    setItemDraftCycle(sch.cycle);
    setItemDraftDeptCode(sch.departmentCode);
    setItemDraftDate(sch.date);
    setItemDraftTime(sch.time);
    setItemDraftLeadId(sch.leadAuditorId);
    setItemDraftAuditeeId(sch.auditeeId);
    setItemDraftReqs(sch.requirements);
    setItemDraftStatus(sch.status);
    setItemDraftLeadAck(sch.leadAuditorAck);
    setItemDraftAuditeeAck(sch.auditeeAck);
    setIsScheduleModalOpen(true);
  };

  const handleSaveScheduleItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const dept = state.departments.find(d => d.code === itemDraftDeptCode);
    const leadUser = state.users.find(u => u.id === itemDraftLeadId);
    const auditeeUser = state.users.find(u => u.id === itemDraftAuditeeId);

    const nowStr = new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' });

    if (editingScheduleId) {
      // Update existing item
      const updated: Partial<AuditScheduleItem> = {
        cycle: itemDraftCycle,
        date: itemDraftDate,
        time: itemDraftTime,
        departmentCode: itemDraftDeptCode,
        departmentName: dept?.nameTh || itemDraftDeptCode,
        requirements: itemDraftReqs,
        leadAuditorId: itemDraftLeadId,
        leadAuditorName: leadUser?.name || 'Lead Auditor',
        auditeeId: itemDraftAuditeeId,
        auditeeName: auditeeUser?.name || 'Auditee',
        status: itemDraftStatus,
        leadAuditorAck: itemDraftLeadAck,
        leadAuditorAckDate: itemDraftLeadAck ? nowStr : undefined,
        auditeeAck: itemDraftAuditeeAck,
        auditeeAckDate: itemDraftAuditeeAck ? nowStr : undefined,
      };
      await ApiService.updateSchedule(editingScheduleId, updated);
    } else {
      // Add new schedule
      const newSchedule: AuditScheduleItem = {
        id: `sch-${Date.now()}`,
        cycle: itemDraftCycle,
        date: itemDraftDate,
        time: itemDraftTime,
        departmentCode: itemDraftDeptCode,
        departmentName: dept?.nameTh || itemDraftDeptCode,
        requirements: itemDraftReqs,
        leadAuditorId: itemDraftLeadId,
        leadAuditorName: leadUser?.name || 'Lead Auditor',
        auditeeId: itemDraftAuditeeId,
        auditeeName: auditeeUser?.name || 'Auditee',
        leadAuditorAck: itemDraftLeadAck,
        leadAuditorAckDate: itemDraftLeadAck ? nowStr : undefined,
        auditeeAck: itemDraftAuditeeAck,
        auditeeAckDate: itemDraftAuditeeAck ? nowStr : undefined,
        status: itemDraftStatus,
      };
      await ApiService.patchState({
        schedules: [...state.schedules, newSchedule],
      });
    }

    setIsScheduleModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!deletingSchedule) return;
    await ApiService.deleteSchedule(deletingSchedule.id);
    setDeletingSchedule(null);
  };

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
              {state.scheduleHeader.formNumber} Rev.{state.scheduleHeader.revisionNumber}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              บังคับใช้: {state.scheduleHeader.effectiveDate}
            </span>
            {isAdminOrQmr && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold">
                Admin Mode: สามารถแก้ไขกำหนดการ/หัวเอกสารได้
              </span>
            )}
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            แผนกำหนดการตรวจติดตามคุณภาพภายใน (Audit Schedule)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ระบบตรวจสอบการรับทราบกำหนดการ (Lead Auditor Ack / Auditee Ack) และปุ่มเริ่มตรวจ Checklist ประจำแผนก
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Cycle Filter */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-slate-500">รอบการตรวจ:</span>
            <select
              value={selectedCycle}
              onChange={(e) => setSelectedCycle(e.target.value)}
              className="bg-transparent font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="1/2569">ครั้งที่ 1/2569</option>
              <option value="2/2569">ครั้งที่ 2/2569</option>
              <option value="1/2568">ครั้งที่ 1/2568</option>
            </select>
          </div>

          {isAdminOrQmr && (
            <>
              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-lg border border-indigo-200 dark:border-indigo-800 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                เพิ่มกำหนดการ
              </button>

              <button
                onClick={() => setIsEditingHeader(!isEditingHeader)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                {isEditingHeader ? 'ปิดแก้ไขหัวเอกสาร' : 'แก้ไขหัวเอกสาร FM-QM-018'}
              </button>
            </>
          )}

          <button
            onClick={onOpenPrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            พิมพ์ FM-QM-018
          </button>
        </div>
      </div>

      {/* Header Editor for FM-QM-018 */}
      {isEditingHeader && (
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-300 dark:border-slate-700 space-y-3">
          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>แก้ไขหัวเอกสาร FM-QM-018 (สำหรับ Admin / QMR)</span>
            <span className="text-[11px] text-slate-500">การเปลี่ยนแปลงจะมีผลต่อเอกสารพิมพ์และรอบการตรวจทันที</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                รอบการตรวจประเมิน
              </label>
              <input
                type="text"
                value={headerDraft.cycleText}
                onChange={(e) => setHeaderDraft({ ...headerDraft, cycleText: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                เลขที่เอกสาร & Rev.
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={headerDraft.formNumber}
                  onChange={(e) => setHeaderDraft({ ...headerDraft, formNumber: e.target.value })}
                  className="w-2/3 px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                />
                <input
                  type="text"
                  value={headerDraft.revisionNumber}
                  onChange={(e) => setHeaderDraft({ ...headerDraft, revisionNumber: e.target.value })}
                  className="w-1/3 px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                วันที่เริ่มบังคับใช้
              </label>
              <input
                type="text"
                value={headerDraft.effectiveDate}
                onChange={(e) => setHeaderDraft({ ...headerDraft, effectiveDate: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ผู้จัดทำ (Lead Auditor)
              </label>
              <input
                type="text"
                value={headerDraft.preparedBy}
                onChange={(e) => setHeaderDraft({ ...headerDraft, preparedBy: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                วันที่จัดทำ
              </label>
              <input
                type="text"
                value={headerDraft.preparedDate}
                onChange={(e) => setHeaderDraft({ ...headerDraft, preparedDate: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ผู้อนุมัติ (QMR)
              </label>
              <input
                type="text"
                value={headerDraft.approvedBy}
                onChange={(e) => setHeaderDraft({ ...headerDraft, approvedBy: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                วันที่อนุมัติ
              </label>
              <input
                type="text"
                value={headerDraft.approvedDate}
                onChange={(e) => setHeaderDraft({ ...headerDraft, approvedDate: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                มาตรฐานที่ครอบคลุม
              </label>
              <div className="flex items-center gap-3 pt-1 text-xs">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={headerDraft.appliedStandards.iso9001}
                    onChange={(e) => setHeaderDraft({
                      ...headerDraft,
                      appliedStandards: { ...headerDraft.appliedStandards, iso9001: e.target.checked }
                    })}
                  />
                  <span>ISO 9001</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={headerDraft.appliedStandards.ghpsHaccp}
                    onChange={(e) => setHeaderDraft({
                      ...headerDraft,
                      appliedStandards: { ...headerDraft.appliedStandards, ghpsHaccp: e.target.checked }
                    })}
                  />
                  <span>GHPs</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={headerDraft.appliedStandards.famiQs}
                    onChange={(e) => setHeaderDraft({
                      ...headerDraft,
                      appliedStandards: { ...headerDraft.appliedStandards, famiQs: e.target.checked }
                    })}
                  />
                  <span>FAMI-QS</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setHeaderDraft(state.scheduleHeader);
                setIsEditingHeader(false);
              }}
              className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:underline"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSaveHeader}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              บันทึกการแก้ไขหัวเอกสาร FM-QM-018
            </button>
          </div>
        </div>
      )}

      {/* Standards Covered Banner */}
      <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-slate-700 dark:text-slate-300">ระบบที่ประยุกต์ใช้:</span>
          {state.scheduleHeader.appliedStandards.iso9001 && (
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> ISO 9001:2015
            </span>
          )}
          {state.scheduleHeader.appliedStandards.ghpsHaccp && (
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> GHPs & HACCP กรมปศุสัตว์
            </span>
          )}
          {state.scheduleHeader.appliedStandards.famiQs && (
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> FAMI-QS Code of Practice V.6
            </span>
          )}
        </div>

        <div className="text-[11px] text-slate-500 font-mono">
          จัดทำ: {state.scheduleHeader.preparedBy} | อนุมัติ: {state.scheduleHeader.approvedBy}
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-200">
                <th className="py-3 px-3 w-28">วัน/เดือน/ปี<br /><span className="text-[10px] text-slate-400 font-normal">(DATE)</span></th>
                <th className="py-3 px-2 w-24">เวลา<br /><span className="text-[10px] text-slate-400 font-normal">(TIME)</span></th>
                <th className="py-3 px-3 min-w-[160px]">ฝ่าย/แผนก<br /><span className="text-[10px] text-slate-400 font-normal">(DEPARTMENT)</span></th>
                <th className="py-3 px-3 min-w-[200px]">ข้อกำหนดที่ตรวจ<br /><span className="text-[10px] text-slate-400 font-normal">(REQUIREMENTS)</span></th>
                <th className="py-3 px-3 w-36">หัวหน้าทีมตรวจ<br /><span className="text-[10px] text-slate-400 font-normal">(LEAD AUDITOR)</span></th>
                <th className="py-3 px-3 w-36">ผู้รับการตรวจ<br /><span className="text-[10px] text-slate-400 font-normal">(AUDITEE)</span></th>
                <th className="py-3 px-2 w-28 text-center">LEAD รับทราบ</th>
                <th className="py-3 px-2 w-28 text-center">AUDITEE รับทราบ</th>
                <th className="py-3 px-3 w-32 text-center">การดำเนินการ</th>
                {isAdminOrQmr && (
                  <th className="py-3 px-2 w-20 text-center">Admin</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredSchedules.map((sch) => {
                const isUserLead = currentUser.id === sch.leadAuditorId || currentUser.role === 'ADMIN' || currentUser.role === 'QMR';
                const isUserAuditee = currentUser.id === sch.auditeeId || currentUser.departmentCode === sch.departmentCode || currentUser.role === 'ADMIN';

                return (
                  <tr key={sch.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-mono font-medium text-slate-900 dark:text-white">
                      {sch.date}
                    </td>
                    <td className="py-3 px-2 font-mono text-slate-600 dark:text-slate-300">
                      {sch.time}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {sch.departmentName}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                        [{sch.departmentCode}]
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                      {sch.requirements}
                    </td>
                    <td className="py-3 px-3 text-slate-800 dark:text-slate-200">
                      <div className="font-medium">{sch.leadAuditorName}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-800 dark:text-slate-200">
                      <div className="font-medium">{sch.auditeeName}</div>
                    </td>

                    {/* Lead Ack Button */}
                    <td className="py-3 px-2 text-center">
                      {sch.leadAuditorAck ? (
                        <div className="inline-flex flex-col items-center">
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            <CheckCircle className="w-3.5 h-3.5" />
                            รับทราบแล้ว
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">{sch.leadAuditorAckDate}</span>
                        </div>
                      ) : isUserLead ? (
                        <button
                          onClick={() => handleAck(sch.id, 'lead')}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold rounded shadow-2xs transition-colors"
                        >
                          กดรับทราบ
                        </button>
                      ) : (
                        <span className="text-[11px] text-amber-500 italic">รอยืนยัน</span>
                      )}
                    </td>

                    {/* Auditee Ack Button */}
                    <td className="py-3 px-2 text-center">
                      {sch.auditeeAck ? (
                        <div className="inline-flex flex-col items-center">
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            <CheckCircle className="w-3.5 h-3.5" />
                            รับทราบแล้ว
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">{sch.auditeeAckDate}</span>
                        </div>
                      ) : isUserAuditee ? (
                        <button
                          onClick={() => handleAck(sch.id, 'auditee')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold rounded shadow-2xs transition-colors"
                        >
                          กดรับทราบ
                        </button>
                      ) : (
                        <span className="text-[11px] text-amber-500 italic">รอยืนยัน</span>
                      )}
                    </td>

                    {/* Quick Start Checklist */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => onStartChecklist(sch)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        เริ่มทำ Checklist
                      </button>
                    </td>

                    {/* Admin Actions: Edit & Delete */}
                    {isAdminOrQmr && (
                      <td className="py-3 px-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(sch)}
                            className="p-1 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="แก้ไขกำหนดการนี้"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingSchedule(sch)}
                            className="p-1 text-slate-500 hover:text-red-600 dark:hover:text-red-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="ลบกำหนดการนี้"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}

              {filteredSchedules.length === 0 && (
                <tr>
                  <td colSpan={isAdminOrQmr ? 10 : 9} className="py-12 text-center">
                    <div className="max-w-md mx-auto space-y-2">
                      <Calendar className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        ยังไม่มีกำหนดการตรวจในรอบ {selectedCycle} (เริ่มต้นใหม่)
                      </p>
                      <p className="text-[11px] text-slate-400">
                        สามารถกดปุ่มเพื่อเริ่มคีย์ข้อมูลกำหนดการตรวจติดตามคุณภาพภายในได้ทันที
                      </p>
                      {isAdminOrQmr && (
                        <button
                          type="button"
                          onClick={handleOpenAddModal}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-xs transition-colors cursor-pointer mt-2"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          เพิ่มกำหนดการตรวจรอบนี้
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add or Edit Schedule Item */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {editingScheduleId ? 'แก้ไขกำหนดการตรวจติดตาม' : `เพิ่มกำหนดการตรวจติดตามใหม่ (${itemDraftCycle})`}
              </h3>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveScheduleItem} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    รอบการตรวจ (Cycle)
                  </label>
                  <input
                    type="text"
                    required
                    value={itemDraftCycle}
                    onChange={(e) => setItemDraftCycle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ฝ่าย/แผนกที่รับการตรวจ
                  </label>
                  <select
                    value={itemDraftDeptCode}
                    onChange={(e) => {
                      setItemDraftDeptCode(e.target.value);
                      const auditee = state.users.find(u => u.departmentCode === e.target.value);
                      if (auditee) setItemDraftAuditeeId(auditee.id);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    {state.departments.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.code} - {d.nameTh}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    วันที่ตรวจ
                  </label>
                  <input
                    type="date"
                    required
                    value={itemDraftDate}
                    onChange={(e) => setItemDraftDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    เวลาที่ตรวจ
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น 09:00 - 12:00"
                    value={itemDraftTime}
                    onChange={(e) => setItemDraftTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    หัวหน้าทีมตรวจ (Lead Auditor)
                  </label>
                  <select
                    value={itemDraftLeadId}
                    onChange={(e) => setItemDraftLeadId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    {state.users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ผู้รับการตรวจ (Auditee)
                  </label>
                  <select
                    value={itemDraftAuditeeId}
                    onChange={(e) => setItemDraftAuditeeId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    {state.users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.departmentName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ข้อกำหนดที่ตรวจประเมิน
                </label>
                <input
                  type="text"
                  required
                  value={itemDraftReqs}
                  onChange={(e) => setItemDraftReqs(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    สถานะการตรวจ
                  </label>
                  <select
                    value={itemDraftStatus}
                    onChange={(e) => setItemDraftStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="SCHEDULED">SCHEDULED (ตามแผน)</option>
                    <option value="IN_PROGRESS">IN_PROGRESS (กำลังตรวจ)</option>
                    <option value="COMPLETED">COMPLETED (เสร็จสิ้นแล้ว)</option>
                    <option value="CANCELLED">CANCELLED (ยกเลิก)</option>
                  </select>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    สถานะการรับทราบ (Admin Override)
                  </label>
                  <div className="flex items-center gap-4 text-xs pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={itemDraftLeadAck}
                        onChange={(e) => setItemDraftLeadAck(e.target.checked)}
                      />
                      <span>Lead Ack</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={itemDraftAuditeeAck}
                        onChange={(e) => setItemDraftAuditeeAck(e.target.checked)}
                      />
                      <span>Auditee Ack</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:underline"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  {editingScheduleId ? 'บันทึกการแก้ไข' : 'เพิ่มลงในกำหนดการ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete Schedule Confirmation */}
      {deletingSchedule && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">ยืนยันการลบกำหนดการ?</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              คุณต้องการลบกำหนดการตรวจของแผนก <strong className="text-slate-900 dark:text-white">{deletingSchedule.departmentName}</strong> วันที่ {deletingSchedule.date} ใช่หรือไม่?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingSchedule(null)}
                className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:underline"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold shadow-xs"
              >
                ลบกำหนดการนี้
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
