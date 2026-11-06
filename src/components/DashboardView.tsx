import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  ShieldCheck,
  CalendarCheck,
  ExternalLink
} from 'lucide-react';
import { AppState, AuditScheduleItem, CapaRecord } from '../types';
import { NavTab } from './Sidebar';

interface DashboardViewProps {
  state: AppState;
  onSelectTab: (tab: NavTab) => void;
  onStartChecklist: (schedule: AuditScheduleItem) => void;
  onOpenCapaDetail: (capa: CapaRecord) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  state,
  onSelectTab,
  onStartChecklist,
  onOpenCapaDetail,
}) => {
  // 1. Calculate Plan vs Actual
  let totalPlannedMonths = 0;
  let totalActualMonths = 0;

  state.annualPlanRows.forEach((row) => {
    Object.values(row.months).forEach((m) => {
      if (m.plan) totalPlannedMonths++;
      if (m.actual) totalActualMonths++;
    });
  });

  const planProgressPct = totalPlannedMonths > 0 ? Math.round((totalActualMonths / totalPlannedMonths) * 100) : 0;

  // 2. Calculate Compliance Rate from assessments
  let totalAuditedItems = 0;
  let totalConformingItems = 0;

  state.checklistAssessments.forEach((assessment) => {
    assessment.items.forEach((item) => {
      if (item.rating && item.rating !== 'UNRATED' && item.rating !== 'NA') {
        totalAuditedItems++;
        if (item.rating === 'C') {
          totalConformingItems++;
        }
      }
    });
  });

  // If no assessments yet, default to 100%
  const complianceRate = totalAuditedItems > 0 ? Math.round((totalConformingItems / totalAuditedItems) * 100) : 100;

  // 3. CAPA breakdown by severity
  const openCapas = state.capas.filter((c) => c.status !== 'CLOSED');
  const majorNcCount = openCapas.filter((c) => c.severity === 'MAJOR').length;
  const minorNcCount = openCapas.filter((c) => c.severity === 'MINOR').length;
  const obsCount = openCapas.filter((c) => c.severity === 'OBSERVATION').length;

  // 4. 6-Cause Analysis
  const causeCategories = [
    { key: 'Document', label: '1. Document (การจัดทำเอกสาร)', desc: 'เอกสารไม่เป็นปัจจุบัน / ขาดการทบทวน' },
    { key: 'Practice', label: '2. Practice (การปฏิบัติตามระบบ)', desc: 'ไม่ปฏิบัติตาม SOP / ขาดบันทึก' },
    { key: 'Communicate', label: '3. Communicate (การประสานงาน)', desc: 'สื่อสารข้ามแผนก / ข้อมูลตกหล่น' },
    { key: 'Machine', label: '4. Machine (เครื่องมือ/เครื่องจักร)', desc: 'ขาดการสอบเทียบ / ชำรุดเสียหาย' },
    { key: 'Material', label: '5. Material (วัตถุดิบ/บรรจุภัณฑ์)', desc: 'การชี้บ่ง Lot / ปนเปื้อนข้าม' },
    { key: 'Other', label: '6. Other (ด้านอื่น ๆ)', desc: 'ปัจจัยภายนอกและสิ่งแวดล้อม' },
  ];

  const causeCounts = causeCategories.map((c) => {
    const count = state.capas.filter((capa) => capa.causeCategory === c.key).length;
    return { ...c, count };
  });

  const totalCauses = state.capas.length || 1;

  // 5. Upcoming Schedules (Sorted by date)
  const upcomingSchedules = [...state.schedules]
    .filter((s) => s.status !== 'COMPLETED')
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Alert (SAMUT SAKHON PLANT) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono font-semibold border border-indigo-500/30">
              รอบการตรวจประจำปี 2569 (Cycle 1/2569)
            </span>
            <span className="text-xs text-slate-400">
              · โรงงานสมุทรสาคร (Vet Superior Plant)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            ระบบตรวจติดตามคุณภาพภายใน 3 มาตรฐานหลัก
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            บูรณาการ ISO 9001:2015, GHPs/HACCP กรมปศุสัตว์, และ FAMI-QS V.6 ครอบคลุม 18 แผนกงานและสายการผลิต L1-L9
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onSelectTab('annual-plan')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            เปิดตารางแผนงาน (FM-QM-013)
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Compliance Rate */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>อัตราความสอดคล้อง (% Compliance)</span>
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {complianceRate}%
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>เกณฑ์เป้าหมายองค์กร $\ge$ 90%</span>
          </div>
        </div>

        {/* Card 2: Annual Plan Progress */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>ความคืบหน้าตามแผน (Planned vs Actual)</span>
            <CalendarCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {planProgressPct}%
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span>ตรวจจริง {totalActualMonths} / {totalPlannedMonths} แผนก-เดือน</span>
          </div>
        </div>

        {/* Card 3: Open Major & Minor NCs */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>ข้อบกพร่องที่เปิดอยู่ (Active CARs)</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-red-600 font-mono tabular-nums">
              {majorNcCount}
            </span>
            <span className="text-xs text-red-600 font-medium font-mono">Major NC</span>
            <span className="text-2xl font-bold text-amber-600 font-mono tabular-nums ml-2">
              {minorNcCount}
            </span>
            <span className="text-xs text-amber-600 font-medium font-mono">Minor NC</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>อยู่ในระหว่างขั้นตอน CAPA & 5-Why</span>
          </div>
        </div>

        {/* Card 4: Observations / PAR */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>ข้อสังเกตและข้อเสนอแนะ (PAR/OBS)</span>
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tabular-nums">
            {obsCount}
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>โอกาสในการปรับปรุงกระบวนการต่อเนื่อง</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Upcoming Schedule & 6-Cause Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upcoming Audits (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                กำหนดการตรวจที่กำลังจะมาถึง (Upcoming Schedule)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                พร้อมปุ่มลัดเริ่มตรวจทำ Checklist (FM-QM-014) ประจำแผนกได้ทันที
              </p>
            </div>
            <button
              onClick={() => onSelectTab('schedule')}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              ดูทั้งหมด ({state.schedules.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingSchedules.slice(0, 4).map((sch) => (
              <div
                key={sch.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {sch.departmentName}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      รอบ {sch.cycle}
                    </span>
                    {sch.leadAuditorAck && sch.auditeeAck ? (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> รับทราบแล้ว
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                        รอยืนยันรับทราบ
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap gap-x-3 gap-y-1">
                    <span>วันที่: <strong className="text-slate-700 dark:text-slate-300 font-mono">{sch.date}</strong></span>
                    <span>เวลา: <strong className="text-slate-700 dark:text-slate-300 font-mono">{sch.time}</strong></span>
                    <span>Lead: <strong className="text-slate-700 dark:text-slate-300">{sch.leadAuditorName}</strong></span>
                  </div>

                  <div className="text-[11px] text-slate-400 truncate mt-1">
                    ข้อกำหนด: {sch.requirements}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => onStartChecklist(sch)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    เริ่มตรวจ Checklist
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {upcomingSchedules.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-500">
                ไม่มีกำหนดการตรวจที่ค้างอยู่
              </div>
            )}
          </div>
        </div>

        {/* Right Column: 6-Cause Analysis (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                วิเคราะห์สาเหตุข้อผิดพลาด 6 ด้าน
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                FM-QM-021 Rev.04 (6-Cause Classification)
              </p>
            </div>
            <button
              onClick={() => onSelectTab('iqa-report')}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              รายงาน QMR <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 flex-1">
            {causeCounts.map((cause) => {
              const pct = Math.round((cause.count / totalCauses) * 100);
              return (
                <div key={cause.key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {cause.label}
                    </span>
                    <span className="font-mono text-slate-600 dark:text-slate-400">
                      <strong>{cause.count}</strong> ข้อ ({pct}%)
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        cause.count > 0 ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-transparent'
                      }`}
                      style={{ width: `${Math.max(pct, cause.count > 0 ? 5 : 0)}%` }}
                    />
                  </div>

                  <div className="text-[10px] text-slate-400 truncate">
                    {cause.desc}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>รวมข้อบกพร่องที่วิเคราะห์:</span>
            <span className="font-bold font-mono text-slate-900 dark:text-white">
              {state.capas.length} รายการ
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Matrix for 18 Departments */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              สารบัญ 18 ฝ่ายงาน และการตรวจติดตาม
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              คลิกเพื่อดูคำถามตรวจประเมินตาม Binder 1 หรือเริ่มตรวจ Checklist ประจำฝ่าย
            </p>
          </div>
          <button
            onClick={() => onSelectTab('question-bank')}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer"
          >
            คลังคำถามครบ 18 ฝ่าย →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {state.departments.map((dept) => {
            const deptCapas = state.capas.filter((c) => c.departmentCode === dept.code);
            const openCount = deptCapas.filter((c) => c.status !== 'CLOSED').length;
            const questionCount = state.checklistBank.filter((q) => q.departmentCode === dept.code).length;

            return (
              <div
                key={dept.code}
                onClick={() => {
                  onSelectTab('checklist');
                }}
                className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50/20 dark:hover:bg-slate-800/60 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {dept.code}
                  </span>
                  {openCount > 0 && (
                    <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400 font-bold">
                      {openCount} NC
                    </span>
                  )}
                </div>
                <div className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate" title={dept.nameTh}>
                  {dept.nameTh}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  {questionCount} คำถามหลัก
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
