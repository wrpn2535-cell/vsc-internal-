import React, { useState } from 'react';
import { Database, Search, Filter, Plus, Edit3, Trash2, Check, BookOpen, Layers } from 'lucide-react';
import { AppState, ChecklistItem, StandardType } from '../types';
import { ApiService } from '../services/api';

interface QuestionBankViewProps {
  state: AppState;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({ state }) => {
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedStandard, setSelectedStandard] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null);

  // Form draft
  const [draftDept, setDraftDept] = useState('PT');
  const [draftCode, setDraftCode] = useState('PT-06');
  const [draftSummary, setDraftSummary] = useState('ISO 9001: 8.5.1 | FAMI-QS: 8.4');
  const [draftQuestion, setDraftQuestion] = useState('');
  const [draftEvidence, setDraftEvidence] = useState('');

  const filteredItems = state.checklistBank.filter((item) => {
    const matchesDept = selectedDept === 'ALL' || item.departmentCode === selectedDept;
    const matchesStandard =
      selectedStandard === 'ALL' ||
      item.clauseSummary.toLowerCase().includes(selectedStandard.toLowerCase()) ||
      (selectedStandard === 'ISO 9001' && Boolean(item.clauses.iso9001)) ||
      (selectedStandard === 'FAMI-QS' && Boolean(item.clauses.famiQs)) ||
      (selectedStandard === 'GHPs/HACCP' && Boolean(item.clauses.dldGhpsHaccp));
    const matchesSearch =
      item.questionTh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clauseSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.evidenceExamples.some((e) => e.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDept && matchesStandard && matchesSearch;
  });

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    const evidenceArray = draftEvidence.split('\n').filter((s) => s.trim().length > 0);

    if (editingItem) {
      const updated = state.checklistBank.map((q) =>
        q.id === editingItem.id
          ? {
              ...q,
              departmentCode: draftDept,
              itemCode: draftCode,
              clauseSummary: draftSummary,
              questionTh: draftQuestion,
              evidenceExamples: evidenceArray.length > 0 ? evidenceArray : q.evidenceExamples,
            }
          : q
      );
      await ApiService.patchState({ checklistBank: updated });
    } else {
      const newItem: ChecklistItem = {
        id: `chk-custom-${Date.now()}`,
        departmentCode: draftDept,
        itemCode: draftCode,
        clauses: { iso9001: draftSummary },
        clauseSummary: draftSummary,
        questionTh: draftQuestion,
        evidenceExamples: evidenceArray.length > 0 ? evidenceArray : ['เอกสารขั้นตอนการปฏิบัติงาน (SOP)'],
      };
      await ApiService.patchState({ checklistBank: [...state.checklistBank, newItem] });
    }

    setIsAddModalOpen(false);
    setEditingItem(null);
  };

  const handleOpenEdit = (item: ChecklistItem) => {
    setEditingItem(item);
    setDraftDept(item.departmentCode);
    setDraftCode(item.itemCode);
    setDraftSummary(item.clauseSummary);
    setDraftQuestion(item.questionTh);
    setDraftEvidence(item.evidenceExamples.join('\n'));
    setIsAddModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
              Checklist Bank (Binder 1)
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ครอบคลุม 18 ฝ่ายงาน และ 3 มาตรฐานหลัก
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            คลังคำถามและประเด็นการตรวจประเมินภายใน
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            บรรจุคำถาม ข้อกำหนดอ้างอิง และตัวอย่างหลักฐานเชิงประจักษ์ที่ต้องตรวจหน้างานจริง
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setDraftQuestion('');
            setDraftEvidence('');
            setDraftCode(`${selectedDept !== 'ALL' ? selectedDept : 'PT'}-0${state.checklistBank.length + 1}`);
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          เพิ่มคำถามตรวจใหม่
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาตามข้อกำหนด, คำถาม, หรือคำสำคัญ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="ALL">ทุกฝ่ายงาน (18 แผนก)</option>
              {state.departments.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.code} - {d.nameTh}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="ALL">ทุกมาตรฐาน (All Standards)</option>
              <option value="ISO 9001">ISO 9001:2015</option>
              <option value="FAMI-QS">FAMI-QS V.6</option>
              <option value="GHPs">DLD GHPs/HACCP (ปศุสัตว์)</option>
            </select>
          </div>
        </div>

        {/* 18 Departments fast buttons */}
        <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px]">
          <button
            onClick={() => setSelectedDept('ALL')}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              selectedDept === 'ALL'
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            ทั้งหมด ({state.checklistBank.length})
          </button>
          {state.departments.map((d) => {
            const count = state.checklistBank.filter((q) => q.departmentCode === d.code).length;
            return (
              <button
                key={d.code}
                onClick={() => setSelectedDept(d.code)}
                className={`px-2 py-1 rounded font-mono transition-colors cursor-pointer ${
                  selectedDept === d.code
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {d.code} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {item.itemCode}
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {state.departments.find((d) => d.code === item.departmentCode)?.nameTh}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  [{item.departmentCode}]
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-600 dark:text-slate-300 font-medium">
                  {item.clauseSummary}
                </span>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="แก้ไขคำถามนี้"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-900 dark:text-white leading-relaxed font-medium">
              {item.questionTh}
            </div>

            {/* Evidence details */}
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-lg p-2.5 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <span className="font-semibold text-slate-700 dark:text-slate-200 text-[11px] block">
                ตัวอย่างหลักฐานที่ต้องตรวจ (Objective Evidence):
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                {item.evidenceExamples.map((ev, i) => (
                  <li key={i}>{ev}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-xl p-8 text-center text-xs text-slate-500 border border-slate-200 dark:border-slate-800">
            ไม่พบข้อคำถามตามเงื่อนไขที่เลือก
          </div>
        )}
      </div>

      {/* Add / Edit Question Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {editingItem ? 'แก้ไขคำถามตรวจประเมิน' : 'เพิ่มคำถามตรวจประเมินใหม่'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ฝ่าย/แผนก
                  </label>
                  <select
                    value={draftDept}
                    onChange={(e) => setDraftDept(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
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
                    รหัสข้อตรวจ (Item Code)
                  </label>
                  <input
                    type="text"
                    required
                    value={draftCode}
                    onChange={(e) => setDraftCode(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ข้อกำหนดอ้างอิง (Clauses Reference)
                </label>
                <input
                  type="text"
                  required
                  value={draftSummary}
                  onChange={(e) => setDraftSummary(e.target.value)}
                  placeholder="เช่น ISO 9001: 8.5.1 | FAMI-QS: 8.4 | DLD GHPs: ข้อ 13"
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  คำถามและประเด็นการตรวจประเมิน
                </label>
                <textarea
                  rows={3}
                  required
                  value={draftQuestion}
                  onChange={(e) => setDraftQuestion(e.target.value)}
                  placeholder="ระบุข้อคำถามที่ชัดเจนและเจาะลึกตามมาตรฐาน..."
                  className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ตัวอย่างหลักฐานที่ต้องตรวจ (บรรทัดละ 1 รายการ)
                </label>
                <textarea
                  rows={2}
                  value={draftEvidence}
                  onChange={(e) => setDraftEvidence(e.target.value)}
                  placeholder="• ขั้นตอนการปฏิบัติงาน (SOP)&#10;• ทะเบียนบันทึกการผลิต"
                  className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:underline"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-xs"
                >
                  บันทึกคำถาม
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
