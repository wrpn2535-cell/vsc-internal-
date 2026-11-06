import React, { useState } from 'react';
import { Printer, Edit3, Check, RotateCcw, Calendar, Save, Filter, Plus, Trash2, Settings, ShieldAlert, Sparkles, CheckSquare, Square } from 'lucide-react';
import { AppState, AnnualPlanHeader, AnnualPlanDepartment, UserProfile } from '../types';
import { ApiService } from '../services/api';

interface AnnualPlanViewProps {
  state: AppState;
  onOpenPrint: () => void;
}

export const AnnualPlanView: React.FC<AnnualPlanViewProps> = ({ state, onOpenPrint }) => {
  const currentUser = state.currentUser;
  const isAdminOrQmr = currentUser.role === 'ADMIN' || currentUser.role === 'QMR';

  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [headerDraft, setHeaderDraft] = useState<AnnualPlanHeader>(state.annualPlanHeader);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  // Edit / Add Row Modal States
  const [isRowModalOpen, setIsRowModalOpen] = useState(false);
  const [editingRowCode, setEditingRowCode] = useState<string | null>(null); // null = adding new
  const [rowDraftCode, setRowDraftCode] = useState('');
  const [rowDraftName, setRowDraftName] = useState('');
  const [rowDraftClauses, setRowDraftClauses] = useState('');
  const [rowDraftRemarks, setRowDraftRemarks] = useState('');
  const [rowDraftMonths, setRowDraftMonths] = useState<{ [month: number]: { plan: boolean; actual: boolean } }>({});

  // Delete Confirmation State
  const [deletingRowCode, setDeletingRowCode] = useState<string | null>(null);

  const monthNames = [
    { num: 1, name: 'ม.ค.', full: 'มกราคม' },
    { num: 2, name: 'ก.พ.', full: 'กุมภาพันธ์' },
    { num: 3, name: 'มี.ค.', full: 'มีนาคม' },
    { num: 4, name: 'เม.ย.', full: 'เมษายน' },
    { num: 5, name: 'พ.ค.', full: 'พฤษภาคม' },
    { num: 6, name: 'มิ.ย.', full: 'มิถุนายน' },
    { num: 7, name: 'ก.ค.', full: 'กรกฎาคม' },
    { num: 8, name: 'ส.ค.', full: 'สิงหาคม' },
    { num: 9, name: 'ก.ย.', full: 'กันยายน' },
    { num: 10, name: 'ต.ค.', full: 'ตุลาคม' },
    { num: 11, name: 'พ.ย.', full: 'พฤศจิกายน' },
    { num: 12, name: 'ธ.ค.', full: 'ธันวาคม' },
  ];

  const handleToggleCell = (deptCode: string, month: number, type: 'plan' | 'actual') => {
    ApiService.toggleAnnualPlan(deptCode, month, type);
  };

  const handleSaveHeader = async () => {
    await ApiService.patchState({ annualPlanHeader: headerDraft });
    setIsEditingHeader(false);
  };

  // Open Edit Row Modal
  const handleOpenEditRow = (row: AnnualPlanDepartment) => {
    setEditingRowCode(row.departmentCode);
    setRowDraftCode(row.departmentCode);
    setRowDraftName(row.departmentName);
    setRowDraftClauses(row.standardsClause);
    setRowDraftRemarks(row.remarks || '');
    setRowDraftMonths(JSON.parse(JSON.stringify(row.months || {})));
    setIsRowModalOpen(true);
  };

  // Open Add Row Modal
  const handleOpenAddRow = () => {
    setEditingRowCode(null);
    setRowDraftCode('NEW');
    setRowDraftName('ฝ่ายงาน / สายการผลิตใหม่');
    setRowDraftClauses('ISO 9001: 8.5 | FAMI-QS: 8.4 | DLD GHPs: ข้อ 13');
    setRowDraftRemarks('เพิ่มใหม่โดย Admin');
    const initialM: any = {};
    for (let m = 1; m <= 12; m++) {
      initialM[m] = { plan: m === 3 || m === 9, actual: false };
    }
    setRowDraftMonths(initialM);
    setIsRowModalOpen(true);
  };

  // Save Row (Edit or Add)
  const handleSaveRow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rowDraftCode || !rowDraftName) return;

    const rowData: AnnualPlanDepartment = {
      departmentCode: rowDraftCode.toUpperCase().trim(),
      departmentName: rowDraftName.trim(),
      standardsClause: rowDraftClauses.trim(),
      remarks: rowDraftRemarks.trim(),
      months: rowDraftMonths,
    };

    if (editingRowCode) {
      // Update existing
      if (editingRowCode === rowData.departmentCode) {
        await ApiService.updateAnnualPlanRow(editingRowCode, rowData);
      } else {
        // Code changed: delete old and add new
        await ApiService.deleteAnnualPlanRow(editingRowCode);
        await ApiService.addAnnualPlanRow(rowData);
      }
    } else {
      // Add new
      await ApiService.addAnnualPlanRow(rowData);
    }

    setIsRowModalOpen(false);
  };

  // Delete Row
  const handleConfirmDelete = async () => {
    if (!deletingRowCode) return;
    await ApiService.deleteAnnualPlanRow(deletingRowCode);
    setDeletingRowCode(null);
  };

  // Batch toggle months in Draft
  const handleToggleDraftMonth = (month: number, type: 'plan' | 'actual') => {
    const current = rowDraftMonths[month] || { plan: false, actual: false };
    setRowDraftMonths({
      ...rowDraftMonths,
      [month]: {
        ...current,
        [type]: !current[type],
      },
    });
  };

  const handleBatchSetDraftMonths = (cycle: 'cycle1' | 'cycle2' | 'allPlan' | 'clear') => {
    const updated: any = { ...rowDraftMonths };
    for (let m = 1; m <= 12; m++) {
      if (!updated[m]) updated[m] = { plan: false, actual: false };
      if (cycle === 'cycle1') {
        updated[m].plan = m === 3 || m === 4;
      } else if (cycle === 'cycle2') {
        updated[m].plan = m === 9 || m === 10;
      } else if (cycle === 'allPlan') {
        updated[m].plan = m === 3 || m === 4 || m === 9 || m === 10;
      } else if (cycle === 'clear') {
        updated[m].plan = false;
        updated[m].actual = false;
      }
    }
    setRowDraftMonths(updated);
  };

  const filteredRows = state.annualPlanRows.filter((r) => {
    if (filterCategory === 'ALL') return true;
    const dept = state.departments.find((d) => d.code === r.departmentCode);
    return dept?.category === filterCategory;
  });

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
              {state.annualPlanHeader.formNumber} Rev.{state.annualPlanHeader.revisionNumber}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              บังคับใช้: {state.annualPlanHeader.effectiveDate}
            </span>
            {isAdminOrQmr && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold">
                Admin Mode: สามารถแก้ไข/เพิ่ม/ลบแถวตรวจได้
              </span>
            )}
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            แผนการตรวจติดตามระบบคุณภาพภายใน ประจำปี พ.ศ. {state.annualPlanHeader.yearBe}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            คลิกที่ช่องเดือนเพื่อสลับสถานะแผนงาน <strong className="text-blue-600 dark:text-blue-400">P (Plan)</strong> หรือผลตรวจจริง <strong className="text-indigo-600 dark:text-indigo-400">A (Actual)</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {isAdminOrQmr && (
            <>
              <button
                onClick={handleOpenAddRow}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-lg border border-indigo-200 dark:border-indigo-800 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                เพิ่มแถวตรวจใหม่
              </button>

              <button
                onClick={() => setIsEditingHeader(!isEditingHeader)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                {isEditingHeader ? 'ปิดแก้ไขหัวเอกสาร' : 'แก้ไขหัวเอกสาร/ปี พ.ศ.'}
              </button>
            </>
          )}

          <button
            onClick={onOpenPrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            สั่งพิมพ์ FM-QM-013
          </button>
        </div>
      </div>

      {/* Editable Header Box */}
      {isEditingHeader && (
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-300 dark:border-slate-700 space-y-3">
          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>แก้ไขข้อมูลหัวเอกสาร FM-QM-013 (สำหรับ Admin / QMR)</span>
            <span className="text-[11px] text-slate-500">บันทึกแล้วจะมีผลต่อการพิมพ์เอกสารทันที</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ปี พ.ศ. ของแผนงาน
              </label>
              <input
                type="number"
                value={headerDraft.yearBe}
                onChange={(e) => setHeaderDraft({ ...headerDraft, yearBe: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                เลขที่เอกสาร & Revision
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={headerDraft.formNumber}
                  onChange={(e) => setHeaderDraft({ ...headerDraft, formNumber: e.target.value })}
                  className="w-2/3 px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                />
                <input
                  type="text"
                  value={headerDraft.revisionNumber}
                  onChange={(e) => setHeaderDraft({ ...headerDraft, revisionNumber: e.target.value })}
                  className="w-1/3 px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                  placeholder="Rev"
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
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ระบบมาตรฐานที่ครอบคลุม
              </label>
              <input
                type="text"
                value={headerDraft.systemText}
                onChange={(e) => setHeaderDraft({ ...headerDraft, systemText: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ผู้จัดทำ (Prepared By)
              </label>
              <input
                type="text"
                value={headerDraft.preparedBy}
                onChange={(e) => setHeaderDraft({ ...headerDraft, preparedBy: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
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
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ผู้อนุมัติ (Approved By)
              </label>
              <input
                type="text"
                value={headerDraft.approvedBy}
                onChange={(e) => setHeaderDraft({ ...headerDraft, approvedBy: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
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
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setHeaderDraft(state.annualPlanHeader);
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
              บันทึกการแก้ไขหัวเอกสาร
            </button>
          </div>
        </div>
      )}

      {/* Department Filter & Legend */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">กรองกลุ่มฝ่ายงาน:</span>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg flex-wrap">
            {['ALL', 'Management', 'Quality', 'Operations', 'Support', 'Commercial'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  filterCategory === cat
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {cat === 'ALL' ? `ทั้งหมด (${state.annualPlanRows.length} ฝ่าย)` : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded flex items-center justify-center font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-300">
              P
            </span>
            <span>= แผนการตรวจ (Plan)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded flex items-center justify-center font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300">
              A
            </span>
            <span>= ตรวจเสร็จจริง (Actual)</span>
          </div>
        </div>
      </div>

      {/* 12-Month Matrix Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-200">
                <th className="py-2.5 px-3 w-12 text-center">ลำดับ</th>
                <th className="py-2.5 px-3 min-w-[220px]">
                  ข้อกำหนดที่ถูกตรวจติดตามภายใน ({filteredRows.length} รายการ)
                </th>
                {monthNames.map((m) => (
                  <th key={m.num} className="py-2.5 px-1.5 w-14 text-center font-mono">
                    <div>{m.name}</div>
                    <div className="text-[9px] font-normal text-slate-400">{m.num}</div>
                  </th>
                ))}
                <th className="py-2.5 px-3 min-w-[140px]">หมายเหตุ / การติดตาม</th>
                {isAdminOrQmr && (
                  <th className="py-2.5 px-3 w-24 text-center">จัดการ (Admin)</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredRows.map((row, idx) => (
                <tr key={row.departmentCode} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-2 px-3 text-center font-mono text-slate-500">
                    {idx + 1}
                  </td>
                  <td className="py-2 px-3">
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{row.departmentName}</span>
                      <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        [{row.departmentCode}]
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {row.standardsClause}
                    </div>
                  </td>

                  {/* 12 Months Columns */}
                  {monthNames.map((m) => {
                    const mData = row.months?.[m.num] || { plan: false, actual: false };
                    return (
                      <td key={m.num} className="py-1 px-1 text-center align-middle">
                        <div className="flex flex-col items-center gap-1">
                          {/* Plan Button */}
                          <button
                            type="button"
                            onClick={() => handleToggleCell(row.departmentCode, m.num, 'plan')}
                            className={`w-6 h-5 rounded text-[10px] font-bold font-mono transition-all ${
                              mData.plan
                                ? 'bg-blue-600 text-white shadow-2xs'
                                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                            title={`คลิกเพื่อสลับสถานะ Plan เดือน ${m.full}`}
                          >
                            P
                          </button>

                          {/* Actual Button */}
                          <button
                            type="button"
                            onClick={() => handleToggleCell(row.departmentCode, m.num, 'actual')}
                            className={`w-6 h-5 rounded text-[10px] font-bold font-mono transition-all ${
                              mData.actual
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                            title={`คลิกเพื่อสลับสถานะ Actual เดือน ${m.full}`}
                          >
                            A
                          </button>
                        </div>
                      </td>
                    );
                  })}

                  <td className="py-2 px-3 text-xs text-slate-500 dark:text-slate-400">
                    {row.remarks || '-'}
                  </td>

                  {/* Admin Row Actions */}
                  {isAdminOrQmr && (
                    <td className="py-2 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditRow(row)}
                          className="p-1 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="แก้ไขแถวนี้"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingRowCode(row.departmentCode)}
                          className="p-1 text-slate-500 hover:text-red-600 dark:hover:text-red-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="ลบแถวนี้"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer signoff preview */}
        <div className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">จัดทำโดย:</span>
            <span className="text-slate-600 dark:text-slate-400">{state.annualPlanHeader.preparedBy}</span>
            <span className="text-[11px] text-slate-400 font-mono">({state.annualPlanHeader.preparedDate})</span>
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <span className="font-semibold text-slate-700 dark:text-slate-300">อนุมัติโดย:</span>
            <span className="text-slate-600 dark:text-slate-400">{state.annualPlanHeader.approvedBy}</span>
            <span className="text-[11px] text-slate-400 font-mono">({state.annualPlanHeader.approvedDate})</span>
          </div>
        </div>
      </div>

      {/* Row Edit / Add Modal */}
      {isRowModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {editingRowCode ? `แก้ไขแถวตรวจ: ${rowDraftName} [${editingRowCode}]` : 'เพิ่มแถวการตรวจประเมินใหม่ (FM-QM-013)'}
                </h3>
                <p className="text-xs text-slate-500">
                  กำหนดรหัสแผนก, ชื่อฝ่าย, ข้อกำหนดที่เกี่ยวข้อง และสถานะแผนงานประจำเดือน
                </p>
              </div>
              <button
                onClick={() => setIsRowModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveRow} className="p-5 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    รหัสแผนก (Code) *
                  </label>
                  <input
                    type="text"
                    required
                    value={rowDraftCode}
                    onChange={(e) => setRowDraftCode(e.target.value.toUpperCase())}
                    placeholder="เช่น QA, PT, WH, EN"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ชื่อฝ่าย / แผนก / สายการผลิต *
                  </label>
                  <input
                    type="text"
                    required
                    value={rowDraftName}
                    onChange={(e) => setRowDraftName(e.target.value)}
                    placeholder="เช่น ฝ่ายประกันคุณภาพ (QA) หรือ ฝ่ายผลิต Line 1"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ข้อกำหนดที่เกี่ยวข้อง (Standards Clause Summary)
                </label>
                <input
                  type="text"
                  value={rowDraftClauses}
                  onChange={(e) => setRowDraftClauses(e.target.value)}
                  placeholder="เช่น ISO 9001: 8.5, 8.6 | FAMI-QS: 8.4, 8.5 | DLD GHPs: ข้อ 13"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  หมายเหตุ / วัตถุประสงค์การตรวจ
                </label>
                <input
                  type="text"
                  value={rowDraftRemarks}
                  onChange={(e) => setRowDraftRemarks(e.target.value)}
                  placeholder="เช่น ตรวจตามรอบ FAMI-QS หรือ ตรวจสุขลักษณะโรงงานประจำไตรมาส"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              {/* 12 Months Fast Config */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    กำหนดสถานะ 12 เดือน (Plan / Actual):
                  </label>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span className="text-slate-400">ปุ่มลัด:</span>
                    <button
                      type="button"
                      onClick={() => handleBatchSetDraftMonths('cycle1')}
                      className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 hover:bg-blue-200 font-medium"
                    >
                      รอบ 1 (มี.ค.-เม.ย.)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBatchSetDraftMonths('cycle2')}
                      className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 hover:bg-blue-200 font-medium"
                    >
                      รอบ 2 (ก.ย.-ต.ค.)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBatchSetDraftMonths('allPlan')}
                      className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-medium"
                    >
                      ทั้ง 2 รอบ
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBatchSetDraftMonths('clear')}
                      className="px-2 py-0.5 rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      ล้างทั้งหมด
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 text-center">
                  {monthNames.map((m) => {
                    const mData = rowDraftMonths[m.num] || { plan: false, actual: false };
                    return (
                      <div key={m.num} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                        <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">{m.name}</div>
                        <div className="flex flex-col gap-1 items-center">
                          <button
                            type="button"
                            onClick={() => handleToggleDraftMonth(m.num, 'plan')}
                            className={`w-6 h-5 rounded text-[10px] font-bold font-mono transition-all ${
                              mData.plan
                                ? 'bg-blue-600 text-white shadow-2xs'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 hover:text-slate-700'
                            }`}
                            title="สลับสถานะ Plan"
                          >
                            P
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleDraftMonth(m.num, 'actual')}
                            className={`w-6 h-5 rounded text-[10px] font-bold font-mono transition-all ${
                              mData.actual
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 hover:text-slate-700'
                            }`}
                            title="สลับสถานะ Actual"
                          >
                            A
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRowModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:underline"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  {editingRowCode ? 'บันทึกการแก้ไขแถว' : 'เพิ่มแถวตรวจ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Row Confirmation Modal */}
      {deletingRowCode && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">ยืนยันการลบแถวตรวจ?</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              คุณต้องการลบแถวแผนก <strong className="font-mono text-slate-900 dark:text-white">[{deletingRowCode}]</strong> ออกจากตารางแผนประจำปี FM-QM-013 ใช่หรือไม่? การลบนี้จะถูกซิงค์ไปยังฐานข้อมูลกลาง
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingRowCode(null)}
                className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:underline"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold shadow-xs"
              >
                ลบแถวนี้ทันที
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
