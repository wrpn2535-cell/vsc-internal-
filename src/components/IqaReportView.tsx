import React, { useState } from 'react';
import { Printer, FileSpreadsheet, ShieldAlert, Award, CheckCircle, TrendingUp, Send } from 'lucide-react';
import { AppState, CapaRecord } from '../types';

interface IqaReportViewProps {
  state: AppState;
  onOpenPrint: () => void;
  onOpenCapaDetail: (capa: CapaRecord) => void;
}

export const IqaReportView: React.FC<IqaReportViewProps> = ({
  state,
  onOpenPrint,
  onOpenCapaDetail,
}) => {
  const [reportCycle, setReportCycle] = useState('1/2569');
  const [dateRange, setDateRange] = useState('01/11/2569 - 15/11/2569');

  // 15 Departments specified in FM-QM-021 Rev.04:
  // QMR, DC, FR, SR, TC, IT, MK, PR, EN, HR, PT, QC, WH, LG, RD
  const matrixDepartments = [
    { code: 'QMR', name: 'ฝ่ายบริหารคุณภาพ' },
    { code: 'DC', name: 'ศูนย์ควบคุมเอกสาร' },
    { code: 'FR', name: 'ประสานงานต่างประเทศ' },
    { code: 'SR', name: 'ขายในประเทศ' },
    { code: 'TC', name: 'ฝ่ายวิชาการ' },
    { code: 'IT', name: 'เทคโนโลยีสารสนเทศ' },
    { code: 'MK', name: 'ฝ่ายการตลาด' },
    { code: 'PR', name: 'ฝ่ายจัดซื้อ' },
    { code: 'EN', name: 'วิศวกรรม/ซ่อมบำรุง' },
    { code: 'HR', name: 'บุคคลและธุรการ' },
    { code: 'PT', name: 'ฝ่ายผลิต (L1-L9)' },
    { code: 'QC', name: 'ควบคุมคุณภาพ (QA/CM/MC)' },
    { code: 'WH', name: 'คลังวัตถุดิบ' },
    { code: 'LG', name: 'ฝ่ายจัดส่ง' },
    { code: 'RD', name: 'วิจัยและพัฒนา' },
  ];

  const causeCategories = [
    { key: 'Document', label: '1. Document (การจัดทำเอกสาร)' },
    { key: 'Practice', label: '2. Practice (การปฏิบัติตามระบบ)' },
    { key: 'Communicate', label: '3. Communicate (การประสาน/สื่อสาร)' },
    { key: 'Machine', label: '4. Machine (เครื่องมือ/อุปกรณ์)' },
    { key: 'Material', label: '5. Material (วัตถุดิบ/บรรจุภัณฑ์)' },
    { key: 'Other', label: '6. อื่น ๆ (Other)' },
  ];

  // Helper to map department code to 15-matrix department (QA, CM, MC map to QC; PK maps to WH)
  const mapToMatrixDept = (deptCode: string): string => {
    if (['QA', 'CM', 'MC'].includes(deptCode)) return 'QC';
    if (deptCode === 'PK') return 'WH';
    return deptCode;
  };

  // Calculate cell counts
  const matrixData: Record<string, Record<string, number>> = {};
  causeCategories.forEach((c) => {
    matrixData[c.key] = {};
    matrixDepartments.forEach((d) => {
      matrixData[c.key][d.code] = 0;
    });
  });

  state.capas.forEach((capa) => {
    const mappedDept = mapToMatrixDept(capa.departmentCode);
    if (matrixData[capa.causeCategory] && matrixData[capa.causeCategory][mappedDept] !== undefined) {
      matrixData[capa.causeCategory][mappedDept]++;
    }
  });

  // Calculate column sums
  const colSums: Record<string, number> = {};
  matrixDepartments.forEach((d) => {
    let sum = 0;
    causeCategories.forEach((c) => {
      sum += matrixData[c.key][d.code];
    });
    colSums[d.code] = sum;
  });

  // Overall totals
  const totalMajor = state.capas.filter((c) => c.severity === 'MAJOR').length;
  const totalMinor = state.capas.filter((c) => c.severity === 'MINOR').length;
  const totalCar = totalMajor + totalMinor;
  const totalPar = state.capas.filter((c) => c.severity === 'OBSERVATION').length;
  const totalAllFindings = state.capas.length;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
              {state.templateConfig.fmQm021.docNumber} Rev.{state.templateConfig.fmQm021.revision}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              วันที่เริ่มบังคับใช้: {state.templateConfig.fmQm021.effectiveDate}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            รายงานการตรวจติดตามคุณภาพภายใน (IQA REPORT) ถึงประธานบริษัทฯ
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ระบบบริหารงานคุณภาพ ISO 9001:2015, GHPs/HACCP กรมปศุสัตว์, FAMI-QS V.6
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenPrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            พิมพ์รายงาน FM-QM-021
          </button>
        </div>
      </div>

      {/* Official Executive Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs text-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1.5">
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300">ถึง: </span>
              <span className="text-slate-900 dark:text-white font-semibold">ประธานบริษัทฯ (Managing Director)</span>
            </div>
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300">จาก: </span>
              <span className="text-slate-900 dark:text-white font-semibold">ตัวแทนฝ่ายบริหารระบบคุณภาพ (QMR - คุณชวิน พาพิทักษ์)</span>
            </div>
          </div>

          <div className="space-y-1.5 md:text-right">
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300">เลขที่เอกสาร: </span>
              <span className="font-mono text-slate-900 dark:text-white font-semibold">IQA-2569-01</span>
            </div>
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300">ช่วงเวลาตรวจติดตาม: </span>
              <span className="font-mono text-slate-900 dark:text-white">{dateRange}</span>
            </div>
          </div>
        </div>

        {/* Executive Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="text-[11px] text-slate-500 mb-1">จำนวนข้อบกพร่องรวม</div>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {totalAllFindings} <span className="text-xs font-normal text-slate-500">ฉบับ</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40">
            <div className="text-[11px] text-red-600 dark:text-red-400 mb-1">Major NC (สำคัญ)</div>
            <div className="text-2xl font-bold font-mono text-red-700 dark:text-red-300">
              {totalMajor} <span className="text-xs font-normal">ฉบับ</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
            <div className="text-[11px] text-amber-600 dark:text-amber-400 mb-1">Minor NC (ย่อย/รอง)</div>
            <div className="text-2xl font-bold font-mono text-amber-700 dark:text-amber-300">
              {totalMinor} <span className="text-xs font-normal">ฉบับ</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40">
            <div className="text-[11px] text-blue-600 dark:text-blue-400 mb-1">PAR (ข้อสังเกต Observation)</div>
            <div className="text-2xl font-bold font-mono text-blue-700 dark:text-blue-300">
              {totalPar} <span className="text-xs font-normal">รายการ</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Cause x 15-Department Matrix Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ตารางเมทริกซ์วิเคราะห์สาเหตุของข้อผิดพลาด 6 ด้าน เทียบกับ 15 แผนก (FM-QM-021)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              คำนวณยอดรวมแนวนอน (แถว) และแนวตั้ง (คอลัมน์) อัตโนมัติจากใบ CAR / PAR ในระบบ
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
            ยอดรวมทั้งหมด: {totalAllFindings}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs text-center border border-slate-300 dark:border-slate-700">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-300 dark:border-slate-700">
                <th className="p-2 text-left min-w-[210px] border-r border-slate-300 dark:border-slate-700">
                  สาเหตุของข้อผิดพลาด (6 ด้าน)
                </th>
                {matrixDepartments.map((dept) => (
                  <th
                    key={dept.code}
                    className="p-1.5 min-w-[42px] border-r border-slate-300 dark:border-slate-700 font-mono"
                    title={dept.name}
                  >
                    <div>{dept.code}</div>
                  </th>
                ))}
                <th className="p-2 min-w-[60px] bg-slate-200 dark:bg-slate-700 font-mono font-extrabold text-slate-900 dark:text-white">
                  รวม
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {causeCategories.map((cause) => {
                let rowSum = 0;
                return (
                  <tr key={cause.key} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-2 text-left font-medium text-slate-900 dark:text-white border-r border-slate-300 dark:border-slate-700">
                      {cause.label}
                    </td>

                    {matrixDepartments.map((dept) => {
                      const count = matrixData[cause.key][dept.code] || 0;
                      rowSum += count;
                      return (
                        <td
                          key={dept.code}
                          className="p-1.5 border-r border-slate-300 dark:border-slate-700 font-mono"
                        >
                          {count > 0 ? (
                            <span className="font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-1.5 py-0.5 rounded">
                              {count}
                            </span>
                          ) : (
                            <span className="text-slate-300 dark:text-slate-600">-</span>
                          )}
                        </td>
                      );
                    })}

                    <td className="p-2 font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800">
                      {rowSum}
                    </td>
                  </tr>
                );
              })}

              {/* Total Row */}
              <tr className="bg-slate-100 dark:bg-slate-800 font-bold border-t-2 border-slate-300 dark:border-slate-700">
                <td className="p-2 text-left text-slate-900 dark:text-white border-r border-slate-300 dark:border-slate-700">
                  รวมทั้งสิ้น (Total)
                </td>
                {matrixDepartments.map((dept) => {
                  const colTotal = colSums[dept.code] || 0;
                  return (
                    <td
                      key={dept.code}
                      className="p-1.5 border-r border-slate-300 dark:border-slate-700 font-mono font-bold"
                    >
                      {colTotal > 0 ? (
                        <span className="text-slate-900 dark:text-white">{colTotal}</span>
                      ) : (
                        <span className="text-slate-300 dark:text-slate-600">-</span>
                      )}
                    </td>
                  );
                })}
                <td className="p-2 font-mono text-sm font-extrabold text-red-600 dark:text-red-400 bg-slate-200 dark:bg-slate-700">
                  {totalAllFindings}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-[11px] text-slate-500 pt-1">
          หมายเหตุ: แผนก QC ครอบคลุมห้องแล็บเคมี (CM), จุลชีววิทยา (MC) และฝ่ายประกันคุณภาพ (QA)
        </div>
      </div>

      {/* Detailed Breakdown per Department */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          ตารางสรุปจำนวน CAR / PAR แยกตามแผนกและ Lead Auditor
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {state.capas.map((capa) => (
            <div
              key={capa.id}
              onClick={() => onOpenCapaDetail(capa)}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 cursor-pointer transition-all flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                    {capa.id}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                      capa.severity === 'MAJOR'
                        ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                        : capa.severity === 'MINOR'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                    }`}
                  >
                    {capa.severity}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {capa.status}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {capa.departmentName} ({capa.departmentCode})
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {capa.findingDescription}
                </p>

                <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-2 font-mono">
                  <span>สาเหตุ 6 ด้าน: <strong>{capa.causeCategory}</strong></span>
                  <span>Due Date: <strong>{capa.dueDate}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
