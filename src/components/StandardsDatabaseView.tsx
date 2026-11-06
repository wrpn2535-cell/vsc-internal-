import React, { useState } from 'react';
import { BookOpen, Search, Filter, ShieldCheck, Scale, ArrowRight, Layers, FileCheck, Globe2, Languages, Copy, Check } from 'lucide-react';
import { AppState, StandardClauseDetail, StandardType } from '../types';

interface StandardsDatabaseViewProps {
  state: AppState;
}

export const StandardsDatabaseView: React.FC<StandardsDatabaseViewProps> = ({ state }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStandard, setSelectedStandard] = useState<string>('ALL');
  const [languageMode, setLanguageMode] = useState<'bilingual' | 'th' | 'en'>('bilingual');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [selectedClause, setSelectedClause] = useState<StandardClauseDetail | null>(
    state.standardsDatabase.find(c => c.clauseNumber === '6.1') || state.standardsDatabase[0]
  );

  const filteredClauses = state.standardsDatabase.filter((c) => {
    const matchesStandard = selectedStandard === 'ALL' || c.standard === selectedStandard;
    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesStandard;

    const matchesSearch =
      c.clauseNumber.toLowerCase().includes(term) ||
      c.titleTh.toLowerCase().includes(term) ||
      c.titleEn.toLowerCase().includes(term) ||
      c.descriptionTh.toLowerCase().includes(term) ||
      c.descriptionEn.toLowerCase().includes(term) ||
      c.departmentRelevance.some((d) => d.toLowerCase().includes(term)) ||
      (c.keyRequirementsTh && c.keyRequirementsTh.some((r) => r.toLowerCase().includes(term))) ||
      (c.keyRequirementsEn && c.keyRequirementsEn.some((r) => r.toLowerCase().includes(term)));

    return matchesStandard && matchesSearch;
  });

  const handleCopyClause = (clause: StandardClauseDetail) => {
    const text = `[${clause.standard} - ข้อกำหนดที่ ${clause.clauseNumber}]\nชื่อไทย: ${clause.titleTh}\nTitle EN: ${clause.titleEn}\n\nคำอธิบาย: ${clause.descriptionTh}\nDescription: ${clause.descriptionEn}\n\nประเด็นสำคัญ (TH):\n${(clause.keyRequirementsTh || []).map((r, i) => `${i+1}. ${r}`).join('\n')}\n\nKey Requirements (EN):\n${(clause.keyRequirementsEn || []).map((r, i) => `${i+1}. ${r}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(clause.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
              Bilingual Standards Knowledge Base (ไทย - English)
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ครอบคลุมครบทุกข้อกำหนดตามไฟล์แนบ 3 มาตรฐาน
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            ฐานข้อมูลข้อกำหนดมาตรฐานสากล (ISO 9001:2015 · GHPs/HACCP · FAMI-QS V.6)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ระบบสืบค้นข้อกำหนดทั้งภาษาไทยและอังกฤษ พร้อมจุดเน้นการตรวจประเมินของโรงงาน เวท ซุปพีเรีย คอนซัลแตนท์ (สมุทรสาคร)
          </p>
        </div>

        {/* Language Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold shrink-0">
          <Languages className="w-4 h-4 text-slate-500 ml-1.5 mr-0.5" />
          <button
            type="button"
            onClick={() => setLanguageMode('bilingual')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              languageMode === 'bilingual'
                ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            ทั้งสองภาษา (Bilingual)
          </button>
          <button
            type="button"
            onClick={() => setLanguageMode('th')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              languageMode === 'th'
                ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            ภาษาไทย (TH)
          </button>
          <button
            type="button"
            onClick={() => setLanguageMode('en')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              languageMode === 'en'
                ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            English (EN)
          </button>
        </div>
      </div>

      {/* Cross-Standard Comparison Spotlight */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-5 rounded-2xl border border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold tracking-wide">
              จุดเปรียบเทียบสำคัญเชิงลึก (Cross-Standard Technical Nuances)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Specialty Feed & Food Safety Standards</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          {/* Comparison 1 */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="font-bold text-indigo-300 flex items-center justify-between">
              <span>การประเมินความเสี่ยง (Risk)</span>
              <span className="font-mono text-[11px]">Clause 6.1</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              <strong>ISO 9001 (6.1):</strong> มุ่งเน้นความเสี่ยงเชิงธุรกิจ กลยุทธ์องค์กร และความพึงพอใจลูกค้า
            </p>
            <p className="text-indigo-200 leading-relaxed text-[11px] pt-1 border-t border-white/10">
              <strong>FAMI-QS (6.1):</strong> เน้นความเสี่ยงต่อความปลอดภัยอาหารสัตว์ (Feed Safety), การปลอมปน (Feed Fraud) และวินาศกรรม (Feed Defense)
            </p>
          </div>

          {/* Comparison 2 */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="font-bold text-indigo-300 flex items-center justify-between">
              <span>การผสมและสารตกค้าง (Mixing)</span>
              <span className="font-mono text-[11px]">FAMI 8.4.2 / 8.4.3</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              <strong>Homogeneity:</strong> ทดสอบความสม่ำเสมอในการผสมเครื่องผสม ค่าสัมประสิทธิ์ความแปรปรวน CV &lt; 5%
            </p>
            <p className="text-indigo-200 leading-relaxed text-[11px] pt-1 border-t border-white/10">
              <strong>Carry-over & Flush:</strong> ควบคุมสารยาตกค้างข้ามรุ่น จัดลำดับการผลิต และชะล้างด้วย Flush Batch
            </p>
          </div>

          {/* Comparison 3 */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="font-bold text-indigo-300 flex items-center justify-between">
              <span>การตรวจสอบย้อนกลับ (Traceability)</span>
              <span className="font-mono text-[11px]">FAMI 8.3 / GHPs Sec. 8</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              <strong>One Step Back / Forward:</strong> เชื่อมโยง ซัพพลายเออร์ -&gt; วัตถุดิบ -&gt; ใบผลิต BMR -&gt; สินค้าสำเร็จรูป
            </p>
            <p className="text-indigo-200 leading-relaxed text-[11px] pt-1 border-t border-white/10">
              <strong>Mock Recall 4 ชม.:</strong> ซักซ้อมเรียกคืนสินค้าจำลอง สามารถสอบกลับปริมาณได้ครบ 100% ภายใน 4 ชม.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content: Left Column (Clause List), Right Column (Detailed View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Clause List */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-2xs space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="พิมพ์เลขข้อ เช่น 6.1, 7.1, 8.4 หรือคำค้นไทย/อังกฤษ (calibration, สอบเทียบ)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Quick Clause Tags */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono">
            <span className="text-slate-400 text-[10px]">ลัด:</span>
            {['4.1', '6.1', '6.2', '7.1', '7.5', '8.4', '8.4.2', '8.4.3', '8.5', '8.7', '9.2', '10.2'].map((cl) => (
              <button
                key={cl}
                onClick={() => {
                  setSearchTerm(cl);
                  const found = state.standardsDatabase.find((c) => c.clauseNumber === cl || c.clauseNumber.includes(cl));
                  if (found) setSelectedClause(found);
                }}
                className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
              >
                {cl}
              </button>
            ))}
          </div>

          {/* Standard filter pills */}
          <div className="flex items-center gap-1 text-xs flex-wrap">
            {['ALL', 'ISO 9001', 'GHPs/HACCP', 'FAMI-QS'].map((std) => (
              <button
                key={std}
                onClick={() => setSelectedStandard(std)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  selectedStandard === std
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {std === 'ALL' ? `ทุกมาตรฐาน (${state.standardsDatabase.length})` : std}
              </button>
            ))}
          </div>

          {/* Clauses list */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredClauses.map((clause) => {
              const isSelected = selectedClause?.id === clause.id;
              return (
                <div
                  key={clause.id}
                  onClick={() => setSelectedClause(clause)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-2xs'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-indigo-700 dark:text-indigo-400">
                      {clause.standard} : {clause.clauseNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {clause.departmentRelevance.slice(0, 3).join(', ')}
                      {clause.departmentRelevance.length > 3 ? '...' : ''}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                    {languageMode === 'en' ? clause.titleEn : clause.titleTh}
                  </div>

                  {languageMode === 'bilingual' && (
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                      {clause.titleEn}
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {languageMode === 'en' ? clause.descriptionEn : clause.descriptionTh}
                  </div>
                </div>
              );
            })}

            {filteredClauses.length === 0 && (
              <div className="text-center py-10 text-xs text-slate-500">
                ไม่พบข้อกำหนดที่ตรงกับคำค้นหา "{searchTerm}"
              </div>
            )}
          </div>
        </div>

        {/* Right: Detailed View */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs">
          {selectedClause ? (
            <div className="space-y-5">
              {/* Header section with copy button */}
              <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {selectedClause.standard}
                    </span>
                    <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">
                      ข้อกำหนดที่ {selectedClause.clauseNumber}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedClause.titleTh}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {selectedClause.titleEn}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyClause(selectedClause)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors shrink-0 cursor-pointer"
                  title="คัดลอกรายละเอียดข้อกำหนดนี้"
                >
                  {copiedId === selectedClause.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="text-indigo-600 font-semibold">คัดลอกแล้ว</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>คัดลอกข้อมูล</span>
                    </>
                  )}
                </button>
              </div>

              {/* Clause Description (Bilingual / Single) */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center justify-between">
                  <span>คำอธิบายข้อกำหนด (Clause Description):</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {languageMode.toUpperCase()}
                  </span>
                </h4>

                {(languageMode === 'bilingual' || languageMode === 'th') && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 font-mono uppercase">
                      ภาษาไทย (TH):
                    </span>
                    <p className="text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                      {selectedClause.descriptionTh}
                    </p>
                  </div>
                )}

                {(languageMode === 'bilingual' || languageMode === 'en') && (
                  <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 font-mono uppercase">
                      English (EN):
                    </span>
                    <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-sans">
                      {selectedClause.descriptionEn}
                    </p>
                  </div>
                )}
              </div>

              {/* Key Audit Requirements (Bilingual / Single) */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  ประเด็นสำคัญที่ต้องตรวจประเมิน (Key Audit Requirements):
                </h4>

                {/* Thai Requirements */}
                {(languageMode === 'bilingual' || languageMode === 'th') && selectedClause.keyRequirementsTh && (
                  <div className="space-y-1.5">
                    {languageMode === 'bilingual' && (
                      <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 font-mono uppercase">
                        เกณฑ์การตรวจสอบ (ภาษาไทย):
                      </span>
                    )}
                    {selectedClause.keyRequirementsTh.map((req, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2.5 shadow-2xs"
                      >
                        <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{req}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* English Requirements */}
                {(languageMode === 'bilingual' || languageMode === 'en') && selectedClause.keyRequirementsEn && (
                  <div className="space-y-1.5 pt-1">
                    {languageMode === 'bilingual' && (
                      <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 font-mono uppercase">
                        Audit Verification Points (English):
                      </span>
                    )}
                    {selectedClause.keyRequirementsEn.map((req, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 font-sans"
                      >
                        <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{req}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FAMI-QS / Feed Safety Comparison Note */}
              {selectedClause.famiComparisonNote && (
                <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/40 text-xs space-y-1.5">
                  <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>ข้อพิจารณาเปรียบเทียบมาตรฐานอาหารสัตว์ (Specialty Feed Safety Note):</span>
                  </div>
                  <p className="text-amber-800 dark:text-amber-200 leading-relaxed text-[11px]">
                    {selectedClause.famiComparisonNote}
                  </p>
                </div>
              )}

              {/* Department Applicability */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  ฝ่ายงานที่เกี่ยวข้องกับการตรวจประเมินข้อนี้:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedClause.departmentRelevance.map((code) => {
                    const dept = state.departments.find((d) => d.code === code);
                    return (
                      <span
                        key={code}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-2xs"
                      >
                        {code} {dept ? `- ${dept.nameTh}` : ''}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400 text-xs">
              เลือกข้อกำหนดทางด้านซ้ายเพื่อดูรายละเอียดแบบสองภาษา
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
