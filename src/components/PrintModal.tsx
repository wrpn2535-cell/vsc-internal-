import React from 'react';
import { Printer, Download, X } from 'lucide-react';
import { AppState, ChecklistAssessmentRecord, CapaRecord } from '../types';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: 'FM-QM-013' | 'FM-QM-018' | 'FM-QM-014' | 'FM-QM-021' | 'CAR-PAR';
  state: AppState;
  activeChecklistId?: string;
  activeCapaId?: string;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  documentType,
  state,
  activeChecklistId,
  activeCapaId,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const activeChecklist = state.checklistAssessments.find(c => c.id === activeChecklistId) || state.checklistAssessments[0];
  const activeCapa = state.capas.find(c => c.id === activeCapaId) || state.capas[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex flex-col items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static print:z-auto">
      {/* Top Action Bar (Hidden on print) */}
      <div className="w-full max-w-5xl bg-slate-900 text-white px-4 py-3 rounded-t-xl flex items-center justify-between no-print shadow-lg">
        <div className="flex items-center gap-3">
          <Printer className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-bold">พิมพ์เอกสาร / บันทึกเป็น PDF (Print Document Preview)</h3>
            <p className="text-xs text-slate-400">
              แบบฟอร์มควบคุมคุณภาพ บริษัท เวท ซุปพีเรีย คอนซัลแตนท์ จำกัด: {documentType}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            สั่งพิมพ์ / บันทึก PDF (Print)
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Document Viewport */}
      <div className="w-full max-w-5xl bg-slate-100 dark:bg-slate-950 flex-1 overflow-y-auto p-4 sm:p-6 rounded-b-xl print:p-0 print:overflow-visible print:bg-white">
        <div className="bg-white text-slate-900 mx-auto shadow-md p-6 sm:p-8 max-w-[210mm] min-h-[297mm] text-[11pt] leading-tight font-['Sarabun'] print:shadow-none print:m-0 print:p-0">
          
          {/* ======================= FM-QM-013 ======================= */}
          {documentType === 'FM-QM-013' && (
            <div className="space-y-4">
              {/* Header Box */}
              <table className="w-full border-collapse border border-black text-center text-xs">
                <tbody>
                  <tr>
                    <td className="border border-black p-2 w-1/4 align-middle">
                      <div className="font-extrabold text-sm text-red-600 tracking-wider">Vet Superior</div>
                      <div className="text-[10px] text-slate-600 uppercase font-bold">Consultant</div>
                      <div className="text-[11px] font-bold mt-1">บริษัท เวท ซุปพีเรีย คอนซัลแตนท์ จำกัด</div>
                      <div className="text-[10px]">โรงงาน : สมุทรสาคร</div>
                    </td>
                    <td className="border border-black p-3 w-1/2 align-middle">
                      <div className="font-bold text-sm">แบบฟอร์ม (Forms)</div>
                      <div className="font-bold text-base mt-1">เรื่อง แผนการตรวจติดตามระบบคุณภาพภายใน</div>
                      <div className="text-[10px] text-slate-600 mt-1">
                        ระบบ: {state.annualPlanHeader.systemText} ประจำปี พ.ศ. {state.annualPlanHeader.yearBe}
                      </div>
                    </td>
                    <td className="border border-black p-2 w-1/4 text-left text-[11px] space-y-1 align-middle">
                      <div><span className="font-bold">เอกสารเลขที่ :</span> {state.templateConfig.fmQm013.docNumber}</div>
                      <div><span className="font-bold">แก้ไขครั้งที่ :</span> {state.templateConfig.fmQm013.revision}</div>
                      <div><span className="font-bold">วันที่เริ่มบังคับใช้ :</span> {state.templateConfig.fmQm013.effectiveDate}</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Matrix Table */}
              <table className="w-full border-collapse border border-black text-center text-[10px]">
                <thead>
                  <tr className="bg-slate-100">
                    <th rowSpan={2} className="border border-black p-1 w-8">ลำดับ</th>
                    <th rowSpan={2} className="border border-black p-1 w-52 text-left">
                      ข้อกำหนดที่ถูกตรวจติดตามภายใน<br />
                      <span className="font-normal text-[9px]">(18 ฝ่ายงาน/แผนก)</span>
                    </th>
                    <th colSpan={12} className="border border-black p-1">
                      เดือนที่ตรวจติดตามคุณภาพภายใน (ปี พ.ศ. {state.annualPlanHeader.yearBe})
                    </th>
                    <th rowSpan={2} className="border border-black p-1 w-20">หมายเหตุ</th>
                  </tr>
                  <tr className="bg-slate-50 text-[9px]">
                    {['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'].map((m, i) => (
                      <th key={i} className="border border-black p-0.5 w-6">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {state.annualPlanRows.map((row, idx) => (
                    <tr key={row.departmentCode} className="hover:bg-slate-50">
                      <td className="border border-black p-1 font-mono">{idx + 1}</td>
                      <td className="border border-black p-1 text-left font-medium">
                        <div>{row.departmentName}</div>
                        <div className="text-[8px] text-slate-500 font-mono">{row.standardsClause}</div>
                      </td>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
                        const mData = row.months[m] || { plan: false, actual: false };
                        return (
                          <td key={m} className="border border-black p-0.5 text-center font-bold">
                            {mData.actual ? (
                              <span className="text-emerald-700">A</span>
                            ) : mData.plan ? (
                              <span className="text-blue-700">P</span>
                            ) : (
                              ''
                            )}
                          </td>
                        );
                      })}
                      <td className="border border-black p-1 text-left text-[9px] truncate">
                        {row.remarks || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-[10px] text-slate-600 italic">
                * สัญลักษณ์: P = ตามแผน (Plan) | A = ตรวจเสร็จสิ้นจริง (Actual)
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-4 text-xs">
                <div className="border border-black p-3 text-center space-y-2">
                  <div className="font-semibold">จัดทำโดย :</div>
                  <div className="h-10 flex items-center justify-center font-mono text-sm underline decoration-dotted">
                    {state.annualPlanHeader.preparedBy}
                  </div>
                  <div>ว/ด/ป : {state.annualPlanHeader.preparedDate}</div>
                </div>

                <div className="border border-black p-3 text-center space-y-2">
                  <div className="font-semibold">อนุมัติโดย :</div>
                  <div className="h-10 flex items-center justify-center font-mono text-sm underline decoration-dotted">
                    {state.annualPlanHeader.approvedBy}
                  </div>
                  <div>ว/ด/ป : {state.annualPlanHeader.approvedDate}</div>
                </div>
              </div>
            </div>
          )}

          {/* ======================= FM-QM-018 ======================= */}
          {documentType === 'FM-QM-018' && (
            <div className="space-y-4">
              <div className="flex justify-between items-start text-xs border-b border-black pb-2">
                <div>
                  <div className="font-extrabold text-base text-red-600">Vet Superior <span className="text-slate-700 text-xs font-normal">Consultant</span></div>
                  <div className="font-bold text-xs">บริษัท เวท ซุปพีเรีย คอนซัลแตนท์ จำกัด</div>
                  <div className="text-[11px]">โรงงาน : สมุทรสาคร</div>
                </div>
                <div className="text-right">
                  <div className="font-bold font-mono text-xs">{state.templateConfig.fmQm018.docNumber} Rev.{state.templateConfig.fmQm018.revision} / {state.templateConfig.fmQm018.effectiveDate}</div>
                  <div className="mt-1 font-semibold text-sm">แผนกำหนดการตรวจติดตามคุณภาพภายใน ครั้งที่ {state.scheduleHeader.cycleText}</div>
                </div>
              </div>

              {/* Checkbox Standards */}
              <div className="text-xs flex items-center gap-6 py-1 bg-slate-50 border border-black px-3">
                <span className="font-bold">ระบบ :</span>
                <label className="inline-flex items-center gap-1.5">
                  <input type="checkbox" checked={state.scheduleHeader.appliedStandards.iso9001} readOnly className="accent-slate-900" />
                  ISO 9001
                </label>
                <label className="inline-flex items-center gap-1.5">
                  <input type="checkbox" checked={state.scheduleHeader.appliedStandards.ghpsHaccp} readOnly className="accent-slate-900" />
                  GHPs&HACCP
                </label>
                <label className="inline-flex items-center gap-1.5">
                  <input type="checkbox" checked={state.scheduleHeader.appliedStandards.famiQs} readOnly className="accent-slate-900" />
                  FAMI-QS
                </label>
                <label className="inline-flex items-center gap-1.5">
                  <input type="checkbox" checked={Boolean(state.scheduleHeader.appliedStandards.other)} readOnly className="accent-slate-900" />
                  อื่นๆ
                </label>
              </div>

              {/* Schedule Table */}
              <table className="w-full border-collapse border border-black text-center text-[10px]">
                <thead>
                  <tr className="bg-slate-100 font-bold">
                    <th className="border border-black p-1.5 w-20">วัน/เดือน/ปี<br />(DATE)</th>
                    <th className="border border-black p-1.5 w-16">เวลา<br />(TIME)</th>
                    <th className="border border-black p-1.5 w-32 text-left">ฝ่าย/แผนก<br />(DEPARTMENT)</th>
                    <th className="border border-black p-1.5 text-left">ข้อกำหนด<br />(REQUIREMENTS)</th>
                    <th className="border border-black p-1.5 w-28">หัวหน้าทีมตรวจ<br />(LEAD AUDITOR)</th>
                    <th className="border border-black p-1.5 w-28">ผู้รับการตรวจ<br />(AUDITEE)</th>
                    <th className="border border-black p-1.5 w-14">LEAD<br />รับทราบ</th>
                    <th className="border border-black p-1.5 w-14">AUDITEE<br />รับทราบ</th>
                  </tr>
                </thead>
                <tbody>
                  {state.schedules.map((sch) => (
                    <tr key={sch.id} className="hover:bg-slate-50">
                      <td className="border border-black p-1.5 font-mono">{sch.date}</td>
                      <td className="border border-black p-1.5 font-mono">{sch.time}</td>
                      <td className="border border-black p-1.5 text-left font-medium">{sch.departmentName}</td>
                      <td className="border border-black p-1.5 text-left text-[9px]">{sch.requirements}</td>
                      <td className="border border-black p-1.5">{sch.leadAuditorName}</td>
                      <td className="border border-black p-1.5">{sch.auditeeName}</td>
                      <td className="border border-black p-1.5 font-bold">
                        {sch.leadAuditorAck ? '✓' : '-'}
                      </td>
                      <td className="border border-black p-1.5 font-bold">
                        {sch.auditeeAck ? '✓' : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-4 text-xs">
                <div className="border border-black p-3 text-center space-y-2">
                  <div className="font-semibold">จัดทำโดย :</div>
                  <div className="h-8 flex items-center justify-center font-mono text-sm underline decoration-dotted">
                    {state.scheduleHeader.preparedBy}
                  </div>
                  <div>วันที่ : {state.scheduleHeader.preparedDate}</div>
                </div>

                <div className="border border-black p-3 text-center space-y-2">
                  <div className="font-semibold">อนุมัติโดย :</div>
                  <div className="h-8 flex items-center justify-center font-mono text-sm underline decoration-dotted">
                    {state.scheduleHeader.approvedBy}
                  </div>
                  <div>วันที่ : {state.scheduleHeader.approvedDate}</div>
                </div>
              </div>
            </div>
          )}

          {/* ======================= FM-QM-014 ======================= */}
          {documentType === 'FM-QM-014' && (
            <div className="space-y-3">
              <div className="flex justify-between items-start text-xs border-b border-black pb-2">
                <div>
                  <div className="font-extrabold text-base text-red-600">Vet Superior <span className="text-slate-700 text-xs font-normal">Consultant</span></div>
                  <div className="font-bold text-xs">บริษัท เวท ซุปพีเรีย คอนซัลแตนท์ จำกัด (โรงงาน: สมุทรสาคร)</div>
                  <div className="text-[10px] text-slate-600">แบบฟอร์ม (Forms) เรื่อง ใบรายงานการตรวจติดตามคุณภาพภายใน (INTERNAL AUDIT CHECKLIST)</div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="font-bold">{state.templateConfig.fmQm014.docNumber} Rev.{state.templateConfig.fmQm014.revision} / {state.templateConfig.fmQm014.effectiveDate}</div>
                  <div>หน้าที่ 1 ของ 1</div>
                </div>
              </div>

              {/* Info grid */}
              <div className="border border-black text-xs grid grid-cols-3 divide-x divide-black">
                <div className="p-2 space-y-1">
                  <div><span className="font-bold">ฝ่าย/แผนกที่รับตรวจ :</span> {activeChecklist ? state.departments.find(d => d.code === activeChecklist.departmentCode)?.nameTh : 'ฝ่ายบริหารคุณภาพ (QMR)'}</div>
                  <div><span className="font-bold">ผู้ตรวจประเมิน :</span> {activeChecklist ? activeChecklist.auditorName : 'คุณอิสรีย์ ฐิติโชติธนรัฐ'}</div>
                </div>
                <div className="p-2 space-y-1">
                  <div><span className="font-bold">วันที่ตรวจ :</span> {activeChecklist?.auditDate || '2026-11-10'}</div>
                  <div><span className="font-bold">ผู้รับการตรวจ :</span> {activeChecklist?.auditeeName || 'คุณชวิน พาพิทักษ์'}</div>
                </div>
                <div className="p-2 space-y-1">
                  <div><span className="font-bold">ครั้งที่ตรวจ :</span> {activeChecklist?.auditCycle || '1/2569'}</div>
                  <div className="text-[10px]"><span className="font-bold">ระบบ :</span> ISO 9001 / GHPs-HACCP / FAMI-QS</div>
                </div>
              </div>

              {/* Checklist items */}
              <table className="w-full border-collapse border border-black text-[9.5pt]">
                <thead>
                  <tr className="bg-slate-100 font-bold text-center">
                    <th className="border border-black p-1 w-8">ข้อที่</th>
                    <th className="border border-black p-1 w-28">ข้อกำหนดอ้างอิง</th>
                    <th className="border border-black p-1 text-left">คำถาม / ประเด็นการตรวจประเมิน</th>
                    <th className="border border-black p-1 w-24">ผลการตรวจ</th>
                    <th className="border border-black p-1 w-52 text-left">หลักฐานที่พบ / บันทึกการตรวจประเมิน</th>
                    <th className="border border-black p-1 w-16">หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeChecklist?.items || state.checklistBank.slice(0, 5).map((b, i) => ({
                    checklistItemId: b.id,
                    itemCode: b.itemCode,
                    clause: b.clauseSummary,
                    question: b.questionTh,
                    rating: i === 1 ? 'NC_MINOR' : 'C',
                    findings: b.evidenceExamples.join(', '),
                    remarks: ''
                  }))).map((item, idx) => (
                    <tr key={idx} className="align-top">
                      <td className="border border-black p-1 text-center font-mono">{idx + 1}</td>
                      <td className="border border-black p-1 font-mono text-[9px]">{item.clause}</td>
                      <td className="border border-black p-1">{item.question}</td>
                      <td className="border border-black p-1 text-center font-bold">
                        {item.rating === 'C' && <span className="text-emerald-700">[ C ] สอดคล้อง</span>}
                        {item.rating === 'NC_MAJOR' && <span className="text-red-700">[ NC-MJ ] ไม่สอดคล้อง</span>}
                        {item.rating === 'NC_MINOR' && <span className="text-amber-700">[ NC-MN ] เล็กน้อย</span>}
                        {item.rating === 'OBS' && <span className="text-blue-700">[ OBS ] ข้อสังเกต</span>}
                        {item.rating === 'NA' && <span className="text-slate-500">[ NA ]</span>}
                        {!['C', 'NC_MAJOR', 'NC_MINOR', 'OBS', 'NA'].includes(item.rating) && '-'}
                      </td>
                      <td className="border border-black p-1 text-[9px]">{item.findings || '-'}</td>
                      <td className="border border-black p-1 text-center font-mono text-[9px]">{item.itemCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-[9px] text-slate-600">
                หมายเหตุ: C (CONFORM) : สอดคล้อง | NC (NON CONFORM) : ไม่สอดคล้อง [MJ: ข้อบกพร่องสำคัญ, MN: ข้อบกพร่องย่อย] | OBS : ข้อสังเกต | NA : ไม่เกี่ยวข้อง
              </div>

              {/* 3 Digital Signatures */}
              <div className="grid grid-cols-3 gap-3 pt-3 text-[10px]">
                <div className="border border-black p-2 text-center">
                  <div className="font-semibold mb-1">ลงชื่อ ผู้ตรวจประเมิน (Auditor)</div>
                  <div className="h-12 flex items-center justify-center">
                    {activeChecklist?.auditorSignature?.dataUrl ? (
                      <img src={activeChecklist.auditorSignature.dataUrl} alt="Sign" className="max-h-10" />
                    ) : (
                      <span className="underline decoration-dotted">{activeChecklist?.auditorName || '...........................................'}</span>
                    )}
                  </div>
                  <div>({activeChecklist?.auditorName || 'คุณอิสรีย์ ฐิติโชติธนรัฐ'})</div>
                  <div>วันที่: {activeChecklist?.auditorSignature?.date || activeChecklist?.auditDate || '......../......../........'}</div>
                </div>

                <div className="border border-black p-2 text-center">
                  <div className="font-semibold mb-1">ลงชื่อ ผู้รับการตรวจ (Auditee)</div>
                  <div className="h-12 flex items-center justify-center">
                    {activeChecklist?.auditeeSignature?.dataUrl ? (
                      <img src={activeChecklist.auditeeSignature.dataUrl} alt="Sign" className="max-h-10" />
                    ) : (
                      <span className="underline decoration-dotted">{activeChecklist?.auditeeName || '...........................................'}</span>
                    )}
                  </div>
                  <div>({activeChecklist?.auditeeName || 'คุณชวิน พาพิทักษ์'})</div>
                  <div>วันที่: {activeChecklist?.auditeeSignature?.date || activeChecklist?.auditDate || '......../......../........'}</div>
                </div>

                <div className="border border-black p-2 text-center">
                  <div className="font-semibold mb-1">ลงชื่อ ผู้แทนฝ่ายบริหาร (QMR)</div>
                  <div className="h-12 flex items-center justify-center">
                    {activeChecklist?.qmrSignature?.dataUrl ? (
                      <img src={activeChecklist.qmrSignature.dataUrl} alt="Sign" className="max-h-10" />
                    ) : (
                      <span className="underline decoration-dotted">คุณชะเวง สุวรรณ์มณี</span>
                    )}
                  </div>
                  <div>(คุณชะเวง สุวรรณ์มณี)</div>
                  <div>วันที่: {activeChecklist?.qmrSignature?.date || '......../......../........'}</div>
                </div>
              </div>
            </div>
          )}

          {/* ======================= FM-QM-021 ======================= */}
          {documentType === 'FM-QM-021' && (
            <div className="space-y-4">
              <div className="flex justify-between items-start text-xs border-b border-black pb-2">
                <div>
                  <div className="font-extrabold text-base text-red-600">Vet Superior <span className="text-slate-700 text-xs font-normal">Consultant</span></div>
                  <div className="font-bold text-xs">บริษัท เวท ซุปพีเรีย คอนซัลแตนท์ จำกัด (โรงงาน: สมุทรสาคร)</div>
                  <div className="font-bold text-sm mt-1">รายงานการตรวจติดตามคุณภาพภายใน (IQA REPORT)</div>
                  <div className="text-[10px] text-slate-600">ระบบบริหารงานคุณภาพ ISO 9001:2015, GHPs/HACCP กรมปศุสัตว์, FAMI-QS V.6</div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="font-bold">{state.templateConfig.fmQm021.docNumber} Rev.{state.templateConfig.fmQm021.revision} / {state.templateConfig.fmQm021.effectiveDate}</div>
                  <div>เลขที่ : IQA-2569-01</div>
                  <div>วันที่ : 10 พฤศจิกายน 2569</div>
                </div>
              </div>

              {/* Addressing box */}
              <div className="border border-black p-3 text-xs space-y-1">
                <div><span className="font-bold">ถึง :</span> ประธานบริษัทฯ (Managing Director)</div>
                <div><span className="font-bold">จาก :</span> ตัวแทนฝ่ายบริหารระบบคุณภาพ (QMR)</div>
                <div><span className="font-bold">เรื่อง :</span> สรุปผลการตรวจติดตามระบบคุณภาพภายใน ครั้งที่ 1/2569</div>
              </div>

              {/* Summary table */}
              <div className="text-xs">
                <div className="font-bold mb-1">สรุปจำนวนข้อบกพร่อง (CAR / PAR) :</div>
                <div className="flex gap-6 p-2 bg-slate-50 border border-black font-semibold">
                  <div>จำนวนรวม : {state.capas.length} ฉบับ</div>
                  <div className="text-red-700">Major NC : {state.capas.filter(c => c.severity === 'MAJOR').length} ฉบับ</div>
                  <div className="text-amber-700">Minor NC : {state.capas.filter(c => c.severity === 'MINOR').length} ฉบับ</div>
                  <div className="text-blue-700">PAR (Observation) : {state.capas.filter(c => c.severity === 'OBSERVATION').length} รายการ</div>
                </div>
              </div>

              {/* 6-Cause x 15-Department Matrix Table */}
              <div>
                <div className="font-bold text-xs mb-1">
                  ตารางเมทริกซ์วิเคราะห์สาเหตุของข้อผิดพลาด 6 ด้าน เทียบกับแผนกต่างๆ (6-Cause Matrix) :
                </div>
                <table className="w-full border-collapse border border-black text-center text-[9px]">
                  <thead>
                    <tr className="bg-slate-100 font-bold">
                      <th className="border border-black p-1 text-left w-48">สาเหตุของข้อผิดพลาด</th>
                      {['QMR', 'DC', 'FR', 'SR', 'TC', 'IT', 'MK', 'PR', 'EN', 'HR', 'PT', 'QC', 'WH', 'LG', 'RD'].map(d => (
                        <th key={d} className="border border-black p-1 w-6">{d}</th>
                      ))}
                      <th className="border border-black p-1 w-8 bg-slate-200">รวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { key: 'Document', label: '1. Document (การจัดทำเอกสาร)' },
                      { key: 'Practice', label: '2. Practice (การปฏิบัติตามระบบ)' },
                      { key: 'Communicate', label: '3. Communicate (การประสาน/สื่อสาร)' },
                      { key: 'Machine', label: '4. Machine (เครื่องมือ/อุปกรณ์)' },
                      { key: 'Material', label: '5. Material (วัตถุดิบ)' },
                      { key: 'Other', label: '6. อื่น ๆ (Other)' },
                    ].map((cause) => {
                      const depts = ['QMR', 'DC', 'FR', 'SR', 'TC', 'IT', 'MK', 'PR', 'EN', 'HR', 'PT', 'QC', 'WH', 'LG', 'RD'];
                      const counts = depts.map(d => {
                        return state.capas.filter(c => {
                          const cDept = c.departmentCode === 'QA' || c.departmentCode === 'CM' || c.departmentCode === 'MC' ? 'QC' : c.departmentCode;
                          return cDept === d && c.causeCategory === cause.key;
                        }).length;
                      });
                      const rowTotal = counts.reduce((a, b) => a + b, 0);

                      return (
                        <tr key={cause.key}>
                          <td className="border border-black p-1 text-left font-medium">{cause.label}</td>
                          {counts.map((cnt, i) => (
                            <td key={i} className="border border-black p-1 font-mono">
                              {cnt > 0 ? <span className="font-bold text-red-600">{cnt}</span> : '-'}
                            </td>
                          ))}
                          <td className="border border-black p-1 font-bold font-mono bg-slate-100">{rowTotal}</td>
                        </tr>
                      );
                    })}
                    <tr className="bg-slate-100 font-bold">
                      <td className="border border-black p-1 text-left">รวม</td>
                      {['QMR', 'DC', 'FR', 'SR', 'TC', 'IT', 'MK', 'PR', 'EN', 'HR', 'PT', 'QC', 'WH', 'LG', 'RD'].map(d => {
                        const colTotal = state.capas.filter(c => {
                          const cDept = c.departmentCode === 'QA' || c.departmentCode === 'CM' || c.departmentCode === 'MC' ? 'QC' : c.departmentCode;
                          return cDept === d;
                        }).length;
                        return (
                          <td key={d} className="border border-black p-1 font-mono">{colTotal > 0 ? colTotal : '-'}</td>
                        );
                      })}
                      <td className="border border-black p-1 font-mono text-red-600 bg-slate-200">{state.capas.length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* QMR Signature */}
              <div className="pt-8 flex justify-end text-xs">
                <div className="text-center w-64 space-y-2">
                  <div>ลงชื่อ ..............................................................</div>
                  <div className="font-bold">(คุณชวิน พาพิทักษ์)</div>
                  <div>ตัวแทนฝ่ายบริหารระบบคุณภาพ (QMR)</div>
                  <div>วันที่: 10 พฤศจิกายน 2569</div>
                </div>
              </div>
            </div>
          )}

          {/* ======================= CAR / PAR ======================= */}
          {documentType === 'CAR-PAR' && (
            <div className="space-y-4">
              <div className="flex justify-between items-start text-xs border-b border-black pb-2">
                <div>
                  <div className="font-extrabold text-base text-red-600">Vet Superior <span className="text-slate-700 text-xs font-normal">Consultant</span></div>
                  <div className="font-bold text-xs">บริษัท เวท ซุปพีเรีย คอนซัลแตนท์ จำกัด (โรงงาน: สมุทรสาคร)</div>
                  <div className="font-bold text-sm mt-1">
                    {activeCapa?.type === 'CAR' ? 'ใบแจ้งข้อบกพร่องและการแก้ไข (CORRECTIVE ACTION REQUEST - CAR)' : 'ใบแจ้งข้อสังเกตและป้องกัน (PREVENTIVE ACTION REQUEST - PAR)'}
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="font-bold text-base text-red-600">{activeCapa?.id || 'CAR-2569-001'}</div>
                  <div>ระดับความรุนแรง: {activeCapa?.severity}</div>
                  <div>สถานะ: {activeCapa?.status}</div>
                </div>
              </div>

              {/* Part 1: Problem statement */}
              <div className="border border-black p-3 text-xs space-y-2">
                <div className="font-bold border-b border-black pb-1 bg-slate-100 -m-3 p-2 mb-2">
                  ส่วนที่ 1: รายละเอียดข้อบกพร่องที่พบ (Non-Conformity Findings)
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="font-semibold">แผนกที่พบ :</span> {activeCapa?.departmentName} ({activeCapa?.departmentCode})</div>
                  <div><span className="font-semibold">ข้อกำหนดอ้างอิง :</span> {activeCapa?.sourceClause}</div>
                  <div><span className="font-semibold">ผู้ตรวจประเมิน (Lead Auditor) :</span> {activeCapa?.leadAuditor}</div>
                  <div><span className="font-semibold">ผู้รับผิดชอบ (Auditee) :</span> {activeCapa?.assignedAuditee}</div>
                </div>
                <div>
                  <div className="font-semibold mb-1">สิ่งที่พบ / หลักฐานเชิงประจักษ์ :</div>
                  <div className="p-2 bg-slate-50 border border-slate-300 rounded text-[11px] leading-relaxed">
                    {activeCapa?.findingDescription}
                  </div>
                </div>
              </div>

              {/* Part 2: 5-Why and Root Cause */}
              <div className="border border-black p-3 text-xs space-y-2">
                <div className="font-bold border-b border-black pb-1 bg-slate-100 -m-3 p-2 mb-2">
                  ส่วนที่ 2: การวิเคราะห์หาสาเหตุที่แท้จริง (5-Why Analysis & 6M)
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="font-semibold">กลุ่มสาเหตุ (6-Cause) :</span> {activeCapa?.causeCategory}</div>
                  <div><span className="font-semibold">การจัดกลุ่ม 6M :</span> {activeCapa?.sixM}</div>
                </div>
                <div className="space-y-1 font-mono text-[10px]">
                  <div>Why 1: {activeCapa?.fiveWhy.why1 || '-'}</div>
                  <div>Why 2: {activeCapa?.fiveWhy.why2 || '-'}</div>
                  <div>Why 3: {activeCapa?.fiveWhy.why3 || '-'}</div>
                  <div>Why 4: {activeCapa?.fiveWhy.why4 || '-'}</div>
                  <div>Why 5: {activeCapa?.fiveWhy.why5 || '-'}</div>
                </div>
                <div className="p-2 bg-amber-50 border border-amber-300 rounded text-[11px]">
                  <span className="font-bold text-amber-900">สาเหตุที่แท้จริง (Root Cause): </span>
                  {activeCapa?.fiveWhy.rootCause || '-'}
                </div>
              </div>

              {/* Part 3: Actions */}
              <div className="border border-black p-3 text-xs space-y-2">
                <div className="font-bold border-b border-black pb-1 bg-slate-100 -m-3 p-2 mb-2">
                  ส่วนที่ 3: มาตรการแก้ไขและป้องกันการเกิดซ้ำ (Corrective & Preventive Action)
                </div>
                <div>
                  <div className="font-semibold mb-1">การแก้ไขเบื้องต้น (Correction / Containment) :</div>
                  <div className="p-2 bg-slate-50 border border-slate-300 rounded text-[11px]">
                    {activeCapa?.containment || '-'}
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">มาตรการป้องกันการเกิดซ้ำ (Corrective Action) :</div>
                  <div className="p-2 bg-slate-50 border border-slate-300 rounded text-[11px]">
                    {activeCapa?.correctiveAction || '-'}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-1 font-medium">
                  <div>กำหนดเสร็จสิ้น (Due Date): <span className="font-bold text-red-600 font-mono">{activeCapa?.dueDate}</span></div>
                  <div>ลงชื่อ ผู้รับการตรวจ: {activeCapa?.assignedAuditee}</div>
                </div>
              </div>

              {/* Part 4: Verification & Closure */}
              <div className="border border-black p-3 text-xs space-y-2">
                <div className="font-bold border-b border-black pb-1 bg-slate-100 -m-3 p-2 mb-2">
                  ส่วนที่ 4: การตรวจติดตามผลและการปิดข้อบกพร่อง (Verification & Closure)
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="font-semibold">ผู้ตรวจติดตาม :</span> {activeCapa?.leadAuditor}</div>
                  <div><span className="font-semibold">ผู้อนุมัติปิด :</span> {activeCapa?.qmrName} (QMR)</div>
                </div>
                <div className="h-10 border border-dashed border-slate-300 p-2 text-slate-500 italic text-[11px]">
                  {activeCapa?.verificationEvidence || 'ผลการดำเนินมาตรการแก้ไขมีประสิทธิภาพและสามารถป้องกันการเกิดซ้ำได้ครบถ้วน อนุมัติปิด CAR'}
                </div>
              </div>
            </div>
          )}

          {/* Document Footer */}
          <div className="mt-8 pt-2 border-t border-slate-300 flex justify-between items-center text-[9px] text-slate-500">
            <span>{state.templateConfig.companyNameTh} ({state.templateConfig.plantLocationTh})</span>
            <span>{state.templateConfig.printFooterNote}</span>
          </div>

        </div>
      </div>
    </div>
  );
};
