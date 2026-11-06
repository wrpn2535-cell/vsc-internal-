import React, { useState } from 'react';
import {
  Printer,
  AlertOctagon,
  CheckCircle,
  Clock,
  Save,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  HelpCircle,
  Calendar,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { AppState, CapaRecord, CapaStatus, CauseCategory, SixMCategory, UserProfile } from '../types';
import { ApiService } from '../services/api';

interface CapaWorkflowViewProps {
  state: AppState;
  currentUser: UserProfile;
  selectedCapaId?: string | null;
  onOpenPrint: (capaId?: string) => void;
}

export const CapaWorkflowView: React.FC<CapaWorkflowViewProps> = ({
  state,
  currentUser,
  selectedCapaId,
  onOpenPrint,
}) => {
  const createBlankCapa = (idNumber?: number): CapaRecord => {
    const num = idNumber || state.capas.length + 1;
    return {
      id: `CAR-2569-${String(num).padStart(3, '0')}`,
      type: 'CAR',
      severity: 'MAJOR',
      departmentCode: 'PT',
      departmentName: 'ฝ่ายผลิตและไลน์ L1-L9',
      sourceItemCode: '',
      sourceClause: '',
      findingDescription: '',
      causeCategory: 'Practice',
      sixM: 'Method',
      fiveWhy: { why1: '', why2: '', why3: '', why4: '', why5: '', rootCause: '' },
      containment: '',
      correctiveAction: '',
      assignedAuditee: '',
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      leadAuditor: currentUser.name || '',
      qmrName: 'คุณชวิน พาพิทักษ์',
      status: 'OPEN',
      createdAt: new Date().toISOString().split('T')[0],
    };
  };

  const [activeCapa, setActiveCapa] = useState<CapaRecord>(
    (selectedCapaId && state.capas.find((c) => c.id === selectedCapaId)) ||
      state.capas[0] ||
      createBlankCapa()
  );

  const handleCreateNewCapa = () => {
    const newDraft = createBlankCapa(state.capas.length + 1);
    setActiveCapa(newDraft);
  };

  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [savedAlert, setSavedAlert] = useState(false);

  const filteredCapas = state.capas.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.departmentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.findingDescription.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSaveCapa = async () => {
    await ApiService.saveCapa(activeCapa);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleCloseCapa = async () => {
    const closed: CapaRecord = {
      ...activeCapa,
      status: 'CLOSED',
      verifiedBy: currentUser.name,
      verifiedDate: new Date().toISOString().split('T')[0],
      closedDate: new Date().toISOString().split('T')[0],
    };
    setActiveCapa(closed);
    await ApiService.saveCapa(closed);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  // Due date status
  const today = new Date().toISOString().split('T')[0];
  const isOverdue = activeCapa.status !== 'CLOSED' && activeCapa.dueDate < today;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 font-bold">
              CAPA Workflow
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              5-Why Analysis & 6M Root Cause Elimination
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            ระบบบันทึกมาตรการแก้ไขข้อบกพร่องและตอบใบ CAR / PAR
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            วิเคราะห์สาเหตุที่แท้จริง กำหนดการแก้ไขเบื้องต้น มาตรการป้องกันการเกิดซ้ำ และทวนสอบปิดข้อบกพร่อง
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCreateNewCapa}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            ออกใบ CAR/PAR ใหม่
          </button>

          <button
            onClick={() => onOpenPrint(activeCapa.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            พิมพ์ใบ CAR/PAR ({activeCapa.id})
          </button>

          <button
            onClick={handleSaveCapa}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            บันทึก CAPA
          </button>
        </div>
      </div>

      {savedAlert && (
        <div className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 px-4 py-2 rounded-lg border border-indigo-300 dark:border-indigo-800 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>บันทึกข้อมูลและอัปเดตสถานะ CAR/PAR แบบเรียลไทม์แล้ว</span>
        </div>
      )}

      {/* Main Layout: List on Left (4 cols), Form on Right (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: CAPA List */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-2xs flex flex-col max-h-[800px]">
          <div className="mb-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                รายการ CAR / PAR ({state.capas.length})
              </span>
              <button
                onClick={handleCreateNewCapa}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                ออกใบใหม่
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="ค้นหารหัส CAR, แผนก..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-1 flex-wrap">
              {['ALL', 'OPEN', 'IN_PROGRESS', 'PENDING_VERIFICATION', 'CLOSED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                    statusFilter === st
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {st === 'ALL' ? 'ทั้งหมด' : st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredCapas.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl space-y-2 my-auto">
                <AlertOctagon className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  ยังไม่มีรายการ CAR / PAR ในระบบ
                </p>
                <p className="text-[11px] text-slate-400">
                  สามารถกรอกข้อมูลแบบฟอร์มฝั่งขวาเพื่อออกใบ CAR/PAR ใหม่ได้ทันที
                </p>
                <button
                  type="button"
                  onClick={handleCreateNewCapa}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-xs transition-colors cursor-pointer mt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  ออกใบ CAR/PAR ใหม่
                </button>
              </div>
            ) : (
              filteredCapas.map((capa) => {
                const isSelected = capa.id === activeCapa.id;
                const overdue = capa.status !== 'CLOSED' && capa.dueDate < today;

                return (
                  <div
                    key={capa.id}
                    onClick={() => setActiveCapa(capa)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                        {capa.id}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                          capa.severity === 'MAJOR'
                            ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                            : capa.severity === 'MINOR'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                        }`}
                      >
                        {capa.severity}
                      </span>
                    </div>

                    <div className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                      {capa.departmentName}
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-snug">
                      {capa.findingDescription || '(ยังไม่ได้ระบุรายละเอียดข้อบกพร่อง)'}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono">
                      <span className="text-slate-400">{capa.status}</span>
                      <span className={overdue ? 'text-red-600 font-bold' : 'text-slate-500'}>
                        {overdue ? '⚠️ เลยกำหนด: ' : 'ครบกำหนด: '} {capa.dueDate}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Active CAPA Editor */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-5">
          {/* Top Info Strip */}
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-3">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="text"
                  value={activeCapa.id}
                  onChange={(e) => setActiveCapa({ ...activeCapa, id: e.target.value })}
                  className="text-base font-bold font-mono text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 w-36"
                />
                <select
                  value={activeCapa.type}
                  onChange={(e) => setActiveCapa({ ...activeCapa, type: e.target.value as 'CAR' | 'PAR' })}
                  className="text-xs px-2 py-1 rounded font-mono font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  <option value="CAR">CAR (ใบข้อบกพร่อง)</option>
                  <option value="PAR">PAR (ใบข้อสังเกต)</option>
                </select>

                <select
                  value={activeCapa.severity}
                  onChange={(e) => setActiveCapa({ ...activeCapa, severity: e.target.value as any })}
                  className="text-xs px-2 py-1 rounded font-mono font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  <option value="MAJOR">MAJOR NC</option>
                  <option value="MINOR">MINOR NC</option>
                  <option value="OBSERVATION">OBSERVATION</option>
                </select>

                <select
                  value={activeCapa.departmentCode}
                  onChange={(e) => {
                    const dept = state.departments.find(d => d.code === e.target.value);
                    setActiveCapa({
                      ...activeCapa,
                      departmentCode: e.target.value,
                      departmentName: dept?.nameTh || e.target.value,
                    });
                  }}
                  className="text-xs px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {state.departments.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.code} - {d.nameTh}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap pt-1">
                <div className="flex items-center gap-1">
                  <span>ข้อกำหนด:</span>
                  <input
                    type="text"
                    placeholder="เช่น ISO 9001: 8.5.1"
                    value={activeCapa.sourceClause}
                    onChange={(e) => setActiveCapa({ ...activeCapa, sourceClause: e.target.value })}
                    className="px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs w-40"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span>รหัสข้อตรวจ:</span>
                  <input
                    type="text"
                    placeholder="เช่น PT-01"
                    value={activeCapa.sourceItemCode}
                    onChange={(e) => setActiveCapa({ ...activeCapa, sourceItemCode: e.target.value })}
                    className="px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs w-28"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={activeCapa.status}
                onChange={(e) => setActiveCapa({ ...activeCapa, status: e.target.value as CapaStatus })}
                className="text-xs font-mono font-bold px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="OPEN">OPEN (เปิดอยู่)</option>
                <option value="IN_PROGRESS">IN_PROGRESS (กำลังแก้ไข)</option>
                <option value="PENDING_VERIFICATION">PENDING_VERIFICATION (รอทวนสอบ)</option>
                <option value="CLOSED">CLOSED (ปิดข้อบกพร่องแล้ว)</option>
              </select>

              {activeCapa.status !== 'CLOSED' && (
                <button
                  type="button"
                  onClick={handleCloseCapa}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  อนุมัติปิด CAR
                </button>
              )}
            </div>
          </div>

          {isOverdue && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 rounded-xl text-xs text-red-800 dark:text-red-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>
                <strong>แจ้งเตือน:</strong> ใบ CAR นี้เลยกำหนดแล้วเสร็จ (Due Date: {activeCapa.dueDate}) กรุณาเร่งรัดผู้รับการตรวจส่งมาตรการแก้ไข
              </span>
            </div>
          )}

          {/* Part 1: Finding Details */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>ส่วนที่ 1: รายละเอียดข้อบกพร่องที่พบ (Finding Statement)</span>
            </h4>
            <textarea
              rows={2}
              value={activeCapa.findingDescription}
              onChange={(e) => setActiveCapa({ ...activeCapa, findingDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Part 2: 5-Why Analysis & 6M */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                ส่วนที่ 2: วิเคราะห์หาสาเหตุที่แท้จริง (5-Why Analysis & 6M)
              </h4>

              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-slate-500">กลุ่มสาเหตุ 6 ด้าน:</span>
                  <select
                    value={activeCapa.causeCategory}
                    onChange={(e) => setActiveCapa({ ...activeCapa, causeCategory: e.target.value as CauseCategory })}
                    className="font-medium text-xs px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="Document">Document (เอกสาร)</option>
                    <option value="Practice">Practice (ปฏิบัติตามระบบ)</option>
                    <option value="Communicate">Communicate (ประสานงาน)</option>
                    <option value="Machine">Machine (เครื่องจักร/อุปกรณ์)</option>
                    <option value="Material">Material (วัตถุดิบ/บรรจุภัณฑ์)</option>
                    <option value="Other">Other (ด้านอื่น ๆ)</option>
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-slate-500">6M:</span>
                  <select
                    value={activeCapa.sixM}
                    onChange={(e) => setActiveCapa({ ...activeCapa, sixM: e.target.value as SixMCategory })}
                    className="font-medium text-xs px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="Man">Man (คน)</option>
                    <option value="Machine">Machine (เครื่องจักร)</option>
                    <option value="Material">Material (วัตถุดิบ)</option>
                    <option value="Method">Method (วิธีปฏิบัติงาน)</option>
                    <option value="Measurement">Measurement (การวัด)</option>
                    <option value="Milieu">Milieu (สภาพแวดล้อม)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 5-Why Inputs */}
            <div className="space-y-2 text-xs">
              {[1, 2, 3, 4, 5].map((num) => {
                const whyKey = `why${num}` as keyof typeof activeCapa.fiveWhy;
                return (
                  <div key={num} className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-500 w-14 shrink-0">
                      Why {num}:
                    </span>
                    <input
                      type="text"
                      placeholder={`ทำไมจึงเกิดเหตุการณ์นี้ (ขั้นตอนที่ ${num})...`}
                      value={activeCapa.fiveWhy[whyKey]}
                      onChange={(e) =>
                        setActiveCapa({
                          ...activeCapa,
                          fiveWhy: { ...activeCapa.fiveWhy, [whyKey]: e.target.value },
                        })
                      }
                      className="flex-1 px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white"
                    />
                  </div>
                );
              })}

              <div className="pt-2">
                <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                  สาเหตุที่แท้จริง (Root Cause):
                </label>
                <input
                  type="text"
                  placeholder="สรุปสาเหตุต้นตอที่ต้องแก้ไขเพื่อป้องกันไม่ให้เกิดขึ้นซ้ำ..."
                  value={activeCapa.fiveWhy.rootCause}
                  onChange={(e) =>
                    setActiveCapa({
                      ...activeCapa,
                      fiveWhy: { ...activeCapa.fiveWhy, rootCause: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-emerald-400 dark:border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-900 dark:text-white font-medium"
                />
              </div>
            </div>
          </div>

          {/* Part 3: Correction & Corrective Action */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                การแก้ไขปัญหาเบื้องต้น (Correction / Containment Action):
              </label>
              <textarea
                rows={2}
                placeholder="การกักสินค้า, แยกชิ้นงาน, ปรับแต่งหน้างานทันที..."
                value={activeCapa.containment}
                onChange={(e) => setActiveCapa({ ...activeCapa, containment: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                มาตรการป้องกันการเกิดซ้ำ (Corrective Action to Prevent Recurrence):
              </label>
              <textarea
                rows={2}
                placeholder="ปรับปรุง SOP, ติดตั้ง Sensor ป้องกัน, ฝึกอบรมทบทวน..."
                value={activeCapa.correctiveAction}
                onChange={(e) => setActiveCapa({ ...activeCapa, correctiveAction: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ผู้รับผิดชอบดำเนินการ (Auditee)
                </label>
                <input
                  type="text"
                  value={activeCapa.assignedAuditee}
                  onChange={(e) => setActiveCapa({ ...activeCapa, assignedAuditee: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  กำหนดแล้วเสร็จ (Due Date)
                </label>
                <input
                  type="date"
                  value={activeCapa.dueDate}
                  onChange={(e) => setActiveCapa({ ...activeCapa, dueDate: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ผู้ตรวจติดตาม (Lead Auditor)
                </label>
                <input
                  type="text"
                  value={activeCapa.leadAuditor}
                  onChange={(e) => setActiveCapa({ ...activeCapa, leadAuditor: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Part 4: Verification & Closure */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white">
              ส่วนที่ 4: การตรวจติดตามผลและการปิดข้อบกพร่อง (Verification & Closure)
            </h4>
            <textarea
              rows={2}
              placeholder="บันทึกผลการตรวจสอบ ณ วันครบกำหนด หลักฐานยืนยันว่ามาตรการมีประสิทธิภาพและสามารถป้องกันการเกิดซ้ำได้..."
              value={activeCapa.verificationEvidence || ''}
              onChange={(e) => setActiveCapa({ ...activeCapa, verificationEvidence: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleSaveCapa}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              บันทึกการแก้ไข CAPA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
