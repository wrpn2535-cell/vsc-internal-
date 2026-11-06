import React, { useState, useEffect } from 'react';
import {
  Printer,
  Save,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Building2,
  Calendar,
  PenTool,
  PlusCircle,
  ExternalLink,
  ChevronDown,
  Info,
  Clock,
  Sparkles,
  Check,
  XCircle,
  AlertOctagon,
  Eye,
  FileText,
  Edit3,
  Plus,
  Trash2,
  X
} from 'lucide-react';
import {
  AppState,
  AuditRating,
  ChecklistAssessmentRecord,
  StandardType,
  UserProfile,
  AuditScheduleItem,
  ChecklistItem
} from '../types';
import { ApiService } from '../services/api';
import { SignaturePad } from './SignaturePad';

interface ChecklistViewProps {
  state: AppState;
  currentUser: UserProfile;
  initialSchedule?: AuditScheduleItem | null;
  onOpenPrint: (checklistId?: string) => void;
  onNavigateToCapa: (capaId: string) => void;
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({
  state,
  currentUser,
  initialSchedule,
  onOpenPrint,
  onNavigateToCapa,
}) => {
  const [selectedDeptCode, setSelectedDeptCode] = useState<string>(
    initialSchedule?.departmentCode || 'QMR'
  );
  const [auditCycle, setAuditCycle] = useState<string>(
    initialSchedule?.cycle || '1/2569'
  );
  const [auditDate, setAuditDate] = useState<string>(
    initialSchedule?.date || new Date().toISOString().split('T')[0]
  );
  const [auditTime, setAuditTime] = useState<string>(
    initialSchedule?.time || '09:00 - 12:00'
  );
  const [auditorName, setAuditorName] = useState<string>(
    initialSchedule?.leadAuditorName || currentUser.name
  );
  const [auditeeName, setAuditeeName] = useState<string>(
    initialSchedule?.auditeeName || 'คุณชวิน พาพิทักษ์'
  );
  const [appliedStandards, setAppliedStandards] = useState<StandardType[]>([
    'ISO 9001',
    'GHPs/HACCP',
    'FAMI-QS'
  ]);
  const activeFormRev = 'Rev.08';
  const canManageQuestions = ['ADMIN', 'QMR', 'LEAD_AUDITOR', 'AUDITOR'].includes(currentUser.role);

  // Items state
  const [items, setItems] = useState<
    ChecklistAssessmentRecord['items']
  >([]);

  // Signatures
  const [auditorSig, setAuditorSig] = useState<{ name: string; date: string; dataUrl?: string } | undefined>();
  const [auditeeSig, setAuditeeSig] = useState<{ name: string; date: string; dataUrl?: string } | undefined>();
  const [qmrSig, setQmrSig] = useState<{ name: string; date: string; dataUrl?: string } | undefined>();

  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Question Management Modal State (Admin / Lead Auditor / Auditor)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [draftItemCode, setDraftItemCode] = useState('');
  const [draftClauseSummary, setDraftClauseSummary] = useState('');
  const [draftQuestionTh, setDraftQuestionTh] = useState('');
  const [draftEvidence, setDraftEvidence] = useState('');
  const [draftDepthLevel, setDraftDepthLevel] = useState<'standard' | 'deep_dive'>('standard');
  const [questionFeedback, setQuestionFeedback] = useState<string | null>(null);

  // When selectedDeptCode changes or schedule changes, load questions for that department
  useEffect(() => {
    const existing = state.checklistAssessments.find(
      (a) => a.departmentCode === selectedDeptCode && a.auditCycle === auditCycle
    );

    if (existing) {
      setItems(existing.items);
      setAuditorName(existing.auditorName);
      setAuditeeName(existing.auditeeName);
      setAuditDate(existing.auditDate);
      setAuditTime(existing.auditTime);
      setAppliedStandards(existing.appliedStandards);
      setAuditorSig(existing.auditorSignature);
      setAuditeeSig(existing.auditeeSignature);
      setQmrSig(existing.qmrSignature);
    } else {
      const deptQuestions = state.checklistBank.filter(
        (q) => q.departmentCode === selectedDeptCode
      );

      const generatedItems = deptQuestions.map((q) => ({
        checklistItemId: q.id,
        itemCode: q.itemCode,
        clause: q.clauseSummary,
        question: q.questionTh,
        rating: 'UNRATED' as AuditRating,
        findings: '',
        remarks: q.evidenceExamples.join(' • '),
        linkedCapaId: undefined
      }));

      setItems(generatedItems);
      setAuditorSig(undefined);
      setAuditeeSig(undefined);
      setQmrSig(undefined);
    }
  }, [selectedDeptCode, auditCycle, state.checklistAssessments, state.checklistBank]);

  const handleUpdateItemRating = (index: number, rating: AuditRating) => {
    const updated = [...items];
    const currentItem = updated[index];
    
    // Auto generate CAPA ID preview if rating is NC or OBS and no capa id yet
    let capaId = currentItem.linkedCapaId;
    if ((rating === 'NC_MAJOR' || rating === 'NC_MINOR' || rating === 'OBS') && !capaId) {
      capaId = `CAR-${auditCycle.replace('/', '-')}-${selectedDeptCode}-${index + 1}`;
    } else if (rating === 'C' || rating === 'NA' || rating === 'UNRATED') {
      // Keep or clear based on preference
    }

    updated[index] = { ...currentItem, rating, linkedCapaId: capaId };
    setItems(updated);
  };

  const handleUpdateItemFindings = (index: number, findings: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], findings };
    setItems(updated);
  };

  const handleAppendFindingPreset = (index: number, presetText: string) => {
    const updated = [...items];
    const current = updated[index].findings || '';
    const newFindings = current ? `${current} | ${presetText}` : presetText;
    updated[index] = { ...updated[index], findings: newFindings };
    setItems(updated);
  };

  // Open modal to add a new question
  const handleOpenAddQuestion = () => {
    setEditingQuestionId(null);
    setEditingItemIndex(null);
    const nextNum = items.length + 1;
    const formattedNum = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
    setDraftItemCode(`${selectedDeptCode}-${formattedNum}`);
    setDraftClauseSummary('ISO 9001: 8.5.1 | FAMI-QS: 8.4 | DLD GHPs: ข้อ 13');
    setDraftQuestionTh('');
    setDraftEvidence('');
    setDraftDepthLevel('standard');
    setQuestionFeedback(null);
    setIsQuestionModalOpen(true);
  };

  // Open modal to edit existing question
  const handleOpenEditQuestion = (item: ChecklistAssessmentRecord['items'][0], index: number) => {
    setEditingQuestionId(item.checklistItemId || null);
    setEditingItemIndex(index);
    setDraftItemCode(item.itemCode);
    setDraftClauseSummary(item.clause);
    setDraftQuestionTh(item.question);
    setDraftEvidence(item.remarks ? item.remarks.split(' • ').join('\n') : '');
    const bankItem = state.checklistBank.find(b => b.id === item.checklistItemId || b.itemCode === item.itemCode);
    setDraftDepthLevel(bankItem?.depthLevel || 'standard');
    setQuestionFeedback(null);
    setIsQuestionModalOpen(true);
  };

  // Save question (Add or Edit)
  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftQuestionTh.trim() || !draftItemCode.trim()) return;

    const evidenceList = draftEvidence.split('\n').map(s => s.trim()).filter(Boolean);
    const qId = editingQuestionId || `chk-${selectedDeptCode.toLowerCase()}-${Date.now().toString().slice(-6)}`;

    const checklistItem: ChecklistItem = {
      id: qId,
      departmentCode: selectedDeptCode,
      itemCode: draftItemCode.trim(),
      clauses: {
        iso9001: '',
        famiQs: '',
        dldGhpsHaccp: ''
      },
      clauseSummary: draftClauseSummary.trim() || 'ข้อกำหนดคุณภาพและความปลอดภัย',
      questionTh: draftQuestionTh.trim(),
      evidenceExamples: evidenceList.length > 0 ? evidenceList : ['เอกสารขั้นตอนการปฏิบัติงานและบันทึกหน้างาน'],
      depthLevel: draftDepthLevel
    };

    await ApiService.saveChecklistItem(checklistItem);

    // Update in-memory items in current assessment
    if (editingItemIndex !== null && editingItemIndex >= 0 && editingItemIndex < items.length) {
      const updated = [...items];
      updated[editingItemIndex] = {
        ...updated[editingItemIndex],
        itemCode: checklistItem.itemCode,
        clause: checklistItem.clauseSummary,
        question: checklistItem.questionTh,
        remarks: checklistItem.evidenceExamples.join(' • ')
      };
      setItems(updated);
    } else {
      // New item added to current assessment
      const newItem = {
        checklistItemId: checklistItem.id,
        itemCode: checklistItem.itemCode,
        clause: checklistItem.clauseSummary,
        question: checklistItem.questionTh,
        rating: 'UNRATED' as AuditRating,
        findings: '',
        remarks: checklistItem.evidenceExamples.join(' • '),
        linkedCapaId: undefined
      };
      setItems([...items, newItem]);
    }

    setQuestionFeedback(editingQuestionId ? 'บันทึกการแก้ไขคำถามสำเร็จแล้ว' : 'เพิ่มข้อคำถามใหม่เรียบร้อยแล้ว');
    setTimeout(() => {
      setQuestionFeedback(null);
      setIsQuestionModalOpen(false);
    }, 1000);
  };

  // Delete question
  const handleDeleteQuestion = async () => {
    if (!editingQuestionId && editingItemIndex === null) return;
    if (!window.confirm('คุณต้องการลบข้อคำถามนี้ออกจาก Checklist ใช่หรือไม่?')) return;

    if (editingQuestionId) {
      await ApiService.deleteChecklistItem(editingQuestionId);
    }

    if (editingItemIndex !== null) {
      const updated = items.filter((_, idx) => idx !== editingItemIndex);
      setItems(updated);
    }

    setIsQuestionModalOpen(false);
  };

  const handleSaveAssessment = async () => {
    const assessmentId = `assess-${selectedDeptCode}-${auditCycle.replace('/', '-')}`;
    const record: ChecklistAssessmentRecord = {
      id: assessmentId,
      scheduleId: initialSchedule?.id,
      auditCycle,
      departmentCode: selectedDeptCode,
      auditDate,
      auditTime,
      auditorId: currentUser.id,
      auditorName,
      auditeeId: 'usr-auditee',
      auditeeName,
      appliedStandards,
      formRev: `FM-QM-014 ${activeFormRev}`,
      items,
      auditorSignature: auditorSig,
      auditeeSignature: auditeeSig,
      qmrSignature: qmrSig,
      status: 'COMPLETED',
      updatedAt: new Date().toISOString()
    };

    await ApiService.saveChecklistAssessment(record);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  // Metrics for current checklist
  const total = items.length;
  const conformCount = items.filter((i) => i.rating === 'C').length;
  const majorNcCount = items.filter((i) => i.rating === 'NC_MAJOR').length;
  const minorNcCount = items.filter((i) => i.rating === 'NC_MINOR').length;
  const obsCount = items.filter((i) => i.rating === 'OBS').length;
  const naCount = items.filter((i) => i.rating === 'NA').length;
  const assessedCount = total - items.filter((i) => i.rating === 'UNRATED').length;
  const percentComplete = total > 0 ? Math.round((assessedCount / total) * 100) : 0;

  const currentDept = state.departments.find((d) => d.code === selectedDeptCode);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Form Title & Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
              FM-QM-014 {activeFormRev}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {activeFormRev === 'Rev.08' ? 'วันที่บังคับใช้: 01/11/2569' : 'วันที่บังคับใช้: 01/11/2565'}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
              ฝ่าย{selectedDeptCode} ({currentDept?.nameTh})
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1.5 flex items-center gap-2">
            <span>ใบรายการตรวจติดตามคุณภาพภายใน (Checklist)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            โครงสร้างการประเมินแบบ 2 ฝั่ง (ฝั่งซ้าย: คำถาม & เกณฑ์มาตรฐาน | ฝั่งขวา: ผลการประเมิน & บันทึกหลักฐาน)
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {canManageQuestions && (
            <button
              onClick={handleOpenAddQuestion}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              + เพิ่มคำถามตรวจประเมิน
            </button>
          )}

          <button
            onClick={handleSaveAssessment}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl shadow-sm transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            บันทึก Checklist
          </button>

          <button
            onClick={() => onOpenPrint(`assess-${selectedDeptCode}-${auditCycle.replace('/', '-')}`)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            พิมพ์ FM-QM-014
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 px-4 py-3 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="font-medium">
              บันทึกผลการตรวจฝ่าย {selectedDeptCode} รอบ {auditCycle} และอัปเดตระบบเรียลไทม์เรียบร้อยแล้ว
            </span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
            Synced
          </span>
        </div>
      )}

      {/* Checklist Header Inputs & Context Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 text-xs">
          {/* Dept selector */}
          <div className="lg:col-span-2">
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              ฝ่าย / แผนกที่รับการตรวจ (18 แผนก)
            </label>
            <select
              value={selectedDeptCode}
              onChange={(e) => setSelectedDeptCode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {state.departments.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.code} - {d.nameTh} ({d.nameEn})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              ครั้งที่ตรวจ (Cycle)
            </label>
            <input
              type="text"
              value={auditCycle}
              onChange={(e) => setAuditCycle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              วันที่ตรวจประเมิน
            </label>
            <input
              type="date"
              value={auditDate}
              onChange={(e) => setAuditDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              ผู้ตรวจประเมิน (Auditor)
            </label>
            <input
              type="text"
              value={auditorName}
              onChange={(e) => setAuditorName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              ผู้รับการตรวจ (Auditee)
            </label>
            <input
              type="text"
              value={auditeeName}
              onChange={(e) => setAuditeeName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Applied Standards checkboxes & Progress bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-semibold text-slate-700 dark:text-slate-300">มาตรฐานที่ประยุกต์ใช้:</span>
            {(['ISO 9001', 'GHPs/HACCP', 'FAMI-QS', 'Other'] as StandardType[]).map((std) => (
              <label key={std} className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={appliedStandards.includes(std)}
                  onChange={() => {
                    if (appliedStandards.includes(std)) {
                      setAppliedStandards(appliedStandards.filter((s) => s !== std));
                    } else {
                      setAppliedStandards([...appliedStandards, std]);
                    }
                  }}
                  className="accent-indigo-600 rounded"
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium">{std}</span>
              </label>
            ))}
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] font-mono flex-wrap">
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              ตรวจแล้ว: <strong>{assessedCount}/{total}</strong> ({percentComplete}%)
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
              C: {conformCount}
            </span>
            <span className="px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 font-bold border border-red-200 dark:border-red-800">
              Major: {majorNcCount}
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold border border-amber-200 dark:border-amber-800">
              Minor: {minorNcCount}
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800">
              OBS: {obsCount}
            </span>
          </div>
        </div>
      </div>

      {/* Main Checklist Section with Side-by-Side 2-Column Item Cards */}
      <div className="space-y-4">
        {/* Section Banner */}
        <div className="bg-slate-900 text-white p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse"></span>
            <span className="font-bold text-sm">
              รายการคำถามตรวจประเมินฝ่าย {selectedDeptCode} ({items.length} ข้อตามแฟ้ม Binder 1)
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <span className="hidden sm:inline font-medium text-indigo-300">
              👈 ฝั่งซ้าย: คำถาม & แนวทางหลักฐาน
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline font-medium text-blue-300">
              👉 ฝั่งขวา: ผลการประเมิน & บันทึกข้อเท็จจริง
            </span>
          </div>
        </div>

        {/* List of Checklist Items in Side-by-Side Split View */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const hasCapa = Boolean(item.linkedCapaId);
            const isAssessed = item.rating !== 'UNRATED';

            return (
              <div
                key={idx}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
                  item.rating === 'C'
                    ? 'border-emerald-200 dark:border-emerald-900/60'
                    : item.rating === 'NC_MAJOR'
                    ? 'border-red-300 dark:border-red-900/70 shadow-red-500/5'
                    : item.rating === 'NC_MINOR'
                    ? 'border-amber-300 dark:border-amber-900/70 shadow-amber-500/5'
                    : item.rating === 'OBS'
                    ? 'border-blue-300 dark:border-blue-900/70'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Item Top Bar: Index, Code, Clauses & Current Assessment Badge */}
                <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-mono text-xs font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200/60 dark:border-indigo-800">
                      {item.itemCode}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-mono font-medium">
                      {item.clause}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {canManageQuestions && (
                      <button
                        type="button"
                        onClick={() => handleOpenEditQuestion(item, idx)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 rounded-lg transition-colors cursor-pointer mr-1 shadow-2xs"
                        title="แก้ไขข้อคำถามและหลักฐาน"
                      >
                        <Edit3 className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                        <span>แก้ไขคำถาม</span>
                      </button>
                    )}
                    {/* Status Badge */}
                    {item.rating === 'C' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                        <Check className="w-3 h-3 text-emerald-600" /> สอดคล้อง (Conform)
                      </span>
                    )}
                    {item.rating === 'NC_MAJOR' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300">
                        <AlertOctagon className="w-3 h-3 text-red-600" /> Major NC
                      </span>
                    )}
                    {item.rating === 'NC_MINOR' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                        <AlertTriangle className="w-3 h-3 text-amber-600" /> Minor NC
                      </span>
                    )}
                    {item.rating === 'OBS' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                        <Eye className="w-3 h-3 text-blue-600" /> ข้อสังเกต (Observation)
                      </span>
                    )}
                    {item.rating === 'NA' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        ไม่เกี่ยวข้อง (N/A)
                      </span>
                    )}
                    {item.rating === 'UNRATED' && (
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                        ยังไม่ได้รับการประเมิน
                      </span>
                    )}
                  </div>
                </div>

                {/* 2-Column Split: Questions on Left (col-span-6), Answers on Right (col-span-6) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
                  {/* LEFT COLUMN: คำถาม & เกณฑ์มาตรฐาน (col-span-6) */}
                  <div className="lg:col-span-6 p-4 sm:p-5 space-y-3.5 bg-slate-50/40 dark:bg-slate-900/40 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                        <FileText className="w-3.5 h-3.5" />
                        <span>ข้อคำถามการตรวจประเมิน (Audit Question)</span>
                      </div>

                      {/* Main Question Text */}
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                        {item.question}
                      </p>
                    </div>

                    {/* Guidance / Evidence Examples Box */}
                    {item.remarks && (
                      <div className="bg-white dark:bg-slate-800/80 rounded-xl p-3 border border-slate-200 dark:border-slate-700/80 text-xs space-y-1.5 shadow-2xs">
                        <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 text-[11px]">
                          <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                          <span>แนวทาง & ตัวอย่างหลักฐานที่ต้องขอดู (Guidance & Objective Evidence) :</span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal pl-5">
                          {item.remarks}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* RIGHT COLUMN: ผลการประเมิน & บันทึกหลักฐาน (col-span-6) */}
                  <div className="lg:col-span-6 p-4 sm:p-5 space-y-3.5 bg-white dark:bg-slate-900 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          ผลการประเมิน (Audit Assessment)
                        </span>
                        <span className="text-[10px] text-slate-400">
                          คลิกเลือกสถานะเพื่อบันทึกทันที
                        </span>
                      </div>

                      {/* Prominent Rating Buttons */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                        {/* [ C ] Conform */}
                        <button
                          type="button"
                          onClick={() => handleUpdateItemRating(idx, 'C')}
                          className={`px-2.5 py-2 text-xs font-semibold rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                            item.rating === 'C'
                              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-700/20 ring-2 ring-emerald-500'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/30'
                          }`}
                        >
                          <span className="font-mono text-xs font-bold">[ C ]</span>
                          <span className="text-[10px]">สอดคล้อง</span>
                        </button>

                        {/* [ NC Major ] */}
                        <button
                          type="button"
                          onClick={() => handleUpdateItemRating(idx, 'NC_MAJOR')}
                          className={`px-2.5 py-2 text-xs font-semibold rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                            item.rating === 'NC_MAJOR'
                              ? 'bg-red-600 text-white font-bold shadow-md shadow-red-700/20 ring-2 ring-red-500'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30'
                          }`}
                        >
                          <span className="font-mono text-xs font-bold">[ NC ]</span>
                          <span className="text-[10px]">Major (MJ)</span>
                        </button>

                        {/* [ NC Minor ] */}
                        <button
                          type="button"
                          onClick={() => handleUpdateItemRating(idx, 'NC_MINOR')}
                          className={`px-2.5 py-2 text-xs font-semibold rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                            item.rating === 'NC_MINOR'
                              ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-700/20 ring-2 ring-amber-500'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-950/30'
                          }`}
                        >
                          <span className="font-mono text-xs font-bold">[ NC ]</span>
                          <span className="text-[10px]">Minor (MN)</span>
                        </button>

                        {/* [ OBS ] Observation */}
                        <button
                          type="button"
                          onClick={() => handleUpdateItemRating(idx, 'OBS')}
                          className={`px-2.5 py-2 text-xs font-semibold rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                            item.rating === 'OBS'
                              ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-700/20 ring-2 ring-blue-500'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/30'
                          }`}
                        >
                          <span className="font-mono text-xs font-bold">[ OBS ]</span>
                          <span className="text-[10px]">ข้อสังเกต</span>
                        </button>

                        {/* [ NA ] Not Applicable */}
                        <button
                          type="button"
                          onClick={() => handleUpdateItemRating(idx, 'NA')}
                          className={`px-2.5 py-2 text-xs font-semibold rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                            item.rating === 'NA'
                              ? 'bg-slate-700 text-white font-bold ring-2 ring-slate-600'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          <span className="font-mono text-xs font-bold">[ NA ]</span>
                          <span className="text-[10px]">ไม่เกี่ยวกับฝ่าย</span>
                        </button>
                      </div>

                      {/* Auto CAR/PAR Link Notification */}
                      {(item.rating === 'NC_MAJOR' || item.rating === 'NC_MINOR' || item.rating === 'OBS') && (
                        <div className="bg-red-50 dark:bg-red-950/40 p-2.5 rounded-xl border border-red-200 dark:border-red-900/60 flex items-center justify-between text-xs animate-fadeIn">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                            <div>
                              <span className="font-bold text-red-900 dark:text-red-200">
                                {item.rating === 'OBS' ? 'PAR ที่ต้องเปิด:' : 'CAR ที่ต้องเปิด:'}
                              </span>
                              <span className="font-mono ml-1.5 font-bold text-red-700 dark:text-red-300">
                                {item.linkedCapaId || `CAR-${auditCycle.replace('/', '-')}-${selectedDeptCode}-${idx + 1}`}
                              </span>
                            </div>
                          </div>
                          {item.linkedCapaId && (
                            <button
                              type="button"
                              onClick={() => item.linkedCapaId && onNavigateToCapa(item.linkedCapaId)}
                              className="px-2 py-1 text-[11px] font-semibold bg-white dark:bg-slate-800 text-red-700 dark:text-red-300 rounded-lg border border-red-300 dark:border-red-700 hover:underline flex items-center gap-1 shrink-0"
                            >
                              <span>ไปยังแบบฟอร์ม CAR</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Findings Input Area */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                            บันทึกหลักฐานเชิงประจักษ์ / ข้อเท็จจริง (Findings & Objective Evidence) :
                          </label>
                        </div>
                        <textarea
                          rows={2}
                          placeholder="บันทึกสิ่งที่ตรวจพบจริงหน้างาน เช่น เอกสารเลขที่... สุ่มตรวจบันทึก 5 ฉบับพบครบถ้วน หรือระบุรายละเอียดข้อบกพร่อง..."
                          value={item.findings}
                          onChange={(e) => handleUpdateItemFindings(idx, e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-sans placeholder:text-slate-400"
                        />

                        {/* Quick Presets for Auditor typing efficiency */}
                        <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] text-slate-400 font-medium">ข้อความด่วน:</span>
                          <button
                            type="button"
                            onClick={() => handleAppendFindingPreset(idx, 'ตรวจสอบเอกสารถูกต้อง ครบถ้วนตามขั้นตอน')}
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 transition-colors"
                          >
                            + เอกสารถูกต้องครบถ้วน
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAppendFindingPreset(idx, 'สุ่มตรวจบันทึก 5 รายการ ไม่พบข้อผิดพลาด')}
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 transition-colors"
                          >
                            + สุ่ม 5 รายการผ่าน
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAppendFindingPreset(idx, 'ไม่พบหลักฐานการลงนามหรือการบันทึกตามรอบ')}
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 transition-colors"
                          >
                            + ไม่พบบันทึกตามรอบ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 Digital Signatures Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-5">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PenTool className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            การลงลายมือชื่อดิจิทัลรับรองผลการตรวจ (Digital Signatures 3 ฝ่าย)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            ลงนามดิจิทัล 3 ฝ่าย ตามข้อกำหนดมาตรฐาน FM-QM-014 {activeFormRev} (ผู้ตรวจ, ผู้รับการตรวจ, และ QMR)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Sign 1: Auditor */}
          <SignaturePad
            label="ผู้ตรวจประเมิน (Auditor)"
            signeeName={auditorName}
            signeeTitle="หัวหน้าผู้ตรวจประเมิน (Lead Auditor)"
            initialDataUrl={auditorSig?.dataUrl}
            onSave={(dataUrl, name) => {
              setAuditorSig({
                name,
                date: new Date().toLocaleDateString('th-TH'),
                dataUrl
              });
            }}
          />

          {/* Sign 2: Auditee Representative */}
          <SignaturePad
            label="ตัวแทนผู้รับการตรวจ (Auditee Representative)"
            signeeName={auditeeName}
            signeeTitle={`ตัวแทนฝ่าย ${selectedDeptCode}`}
            initialDataUrl={auditeeSig?.dataUrl}
            onSave={(dataUrl, name) => {
              setAuditeeSig({
                name,
                date: new Date().toLocaleDateString('th-TH'),
                dataUrl
              });
            }}
          />

          {/* Sign 3: QMR */}
          <SignaturePad
            label="ตัวแทนฝ่ายบริหาร (QMR)"
            signeeName="คุณชะเวง สุวรรณ์มณี"
            signeeTitle="ผู้แทนฝ่ายบริหารระบบคุณภาพ (QMR)"
            initialDataUrl={qmrSig?.dataUrl}
            onSave={(dataUrl, name) => {
              setQmrSig({
                name,
                date: new Date().toLocaleDateString('th-TH'),
                dataUrl
              });
            }}
          />
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            * ผลการตรวจจะถูกบันทึกและซิงค์ไปยังสรุปรายงาน QMR (FM-QM-021) และแดชบอร์ดทันที
          </span>
          <button
            onClick={handleSaveAssessment}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            บันทึกการตรวจประเมินและปิดผลรอบนี้
          </button>
        </div>
      </div>

      {/* Add / Edit Question Modal (Admin / Lead Auditor / Auditor) */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {editingQuestionId ? 'แก้ไขข้อคำถามตรวจประเมิน' : 'เพิ่มข้อคำถามตรวจประเมินใหม่'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    ฝ่าย/แผนก: {selectedDeptCode} ({currentDept?.nameTh}) • FM-QM-014 {activeFormRev}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsQuestionModalOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveQuestion} className="p-5 overflow-y-auto space-y-4 text-xs">
              {questionFeedback && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{questionFeedback}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    รหัสข้อคำถาม (Item Code) *
                  </label>
                  <input
                    type="text"
                    required
                    value={draftItemCode}
                    onChange={(e) => setDraftItemCode(e.target.value)}
                    placeholder="เช่น PT-L1-01, QMR-06"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ระดับการตรวจ (Audit Depth)
                  </label>
                  <select
                    value={draftDepthLevel}
                    onChange={(e) => setDraftDepthLevel(e.target.value as 'standard' | 'deep_dive')}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="standard">Standard Audit (ตรวจประเมินทั่วไปตามรอบ)</option>
                    <option value="deep_dive">Deep Dive / High Risk (จุดตรวจเจาะลึกความเสี่ยงสูง)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ข้อกำหนดและมาตรฐานที่อ้างอิง (Clauses & Standards) *
                </label>
                <input
                  type="text"
                  required
                  value={draftClauseSummary}
                  onChange={(e) => setDraftClauseSummary(e.target.value)}
                  placeholder="เช่น ISO 9001: 8.5.1 | FAMI-QS: 8.4 | DLD GHPs: ข้อ 13"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ข้อคำถามการตรวจประเมิน (Audit Question) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={draftQuestionTh}
                  onChange={(e) => setDraftQuestionTh(e.target.value)}
                  placeholder="ระบุคำถามตรวจประเมินให้ชัดเจน ครอบคลุมขั้นตอนการทำงาน การควบคุม หรือเกณฑ์ที่ต้องตรวจสอบ..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  แนวทาง & ตัวอย่างหลักฐานเชิงประจักษ์ที่ต้องขอดู (Objective Evidence - ใส่บรรทัดละ 1 รายการ)
                </label>
                <textarea
                  rows={3}
                  value={draftEvidence}
                  onChange={(e) => setDraftEvidence(e.target.value)}
                  placeholder="เช่น:
บันทึกการควบคุมกระบวนการผลิตประจำวัน (Production Batch Record)
ใบรับรองการสอบเทียบเครื่องมือวัดที่ยังไม่หมดอายุ
รายงานผลการทดสอบการล้างทำความสะอาด (CIP Log)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed placeholder:text-slate-400 font-sans"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                {editingQuestionId || editingItemIndex !== null ? (
                  <button
                    type="button"
                    onClick={handleDeleteQuestion}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    ลบคำถามนี้
                  </button>
                ) : (
                  <div></div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsQuestionModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    บันทึกข้อคำถาม
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
