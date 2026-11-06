import { AppState, DepartmentInfo, UserProfile, ChecklistItem, StandardClauseDetail, AuditScheduleItem } from '../types';
import { STANDARDS_COMPLETE_DATA } from './standardsCompleteData';

export const DEPARTMENTS_DATA: DepartmentInfo[] = [
  { code: 'QMR', nameTh: 'ฝ่ายบริหารคุณภาพ (QMR)', nameEn: 'Quality Management Representative', category: 'Management' },
  { code: 'DC', nameTh: 'ศูนย์ควบคุมเอกสาร (DC)', nameEn: 'Document Control Center', category: 'Support' },
  { code: 'QA', nameTh: 'ฝ่ายประกันคุณภาพ (QA)', nameEn: 'Quality Assurance', category: 'Quality' },
  { code: 'CM', nameTh: 'ห้องปฏิบัติการเคมี (CM)', nameEn: 'Chemistry Laboratory', category: 'Quality' },
  { code: 'MC', nameTh: 'ห้องปฏิบัติการจุลชีววิทยา (MC)', nameEn: 'Microbiology Laboratory', category: 'Quality' },
  { code: 'RD', nameTh: 'ฝ่ายวิจัยพัฒนาและจัดการนวัตกรรม (RD)', nameEn: 'Research & Development', category: 'Technical' },
  { code: 'TC', nameTh: 'ฝ่ายวิชาการ (TC)', nameEn: 'Technical Support', category: 'Technical' },
  { code: 'PR', nameTh: 'ฝ่ายจัดซื้อ (PR)', nameEn: 'Purchasing Department', category: 'Support' },
  { code: 'MK', nameTh: 'ฝ่ายการตลาด (MK)', nameEn: 'Marketing Department', category: 'Commercial' },
  { code: 'SR', nameTh: 'ประสานงานขายในประเทศ (SR)', nameEn: 'Domestic Sales', category: 'Commercial' },
  { code: 'FR', nameTh: 'ประสานงานขายต่างประเทศ (FR)', nameEn: 'Export Sales', category: 'Commercial' },
  { code: 'EN', nameTh: 'ฝ่ายวิศวกรรมและซ่อมบำรุง (EN)', nameEn: 'Engineering & Maintenance', category: 'Operations' },
  { code: 'HR', nameTh: 'ฝ่ายบุคคลและธุรการ (HR)', nameEn: 'Human Resources & Admin', category: 'Support' },
  { code: 'IT', nameTh: 'ฝ่ายเทคโนโลยีสารสนเทศ (IT)', nameEn: 'Information Technology', category: 'Support' },
  { code: 'WH', nameTh: 'คลังวัตถุดิบ (WH)', nameEn: 'Raw Material Warehouse', category: 'Operations' },
  { code: 'PK', nameTh: 'คลังบรรจุภัณฑ์ (PK)', nameEn: 'Packaging Warehouse', category: 'Operations' },
  { code: 'LG', nameTh: 'ฝ่ายจัดส่ง (LG)', nameEn: 'Logistics & Distribution', category: 'Operations' },
  { code: 'PT-L1', nameTh: 'ฝ่ายผลิต Line 1 (ยาน้ำ)', nameEn: 'Production Line 1 (Liquid Medicine)', category: 'Operations' },
  { code: 'PT-L2', nameTh: 'ฝ่ายผลิต Line 2 (ยาผง)', nameEn: 'Production Line 2 (Powder Medicine)', category: 'Operations' },
  { code: 'PT-L3', nameTh: 'ฝ่ายผลิต Line 3 (สารผสมล่วงหน้า/Premix)', nameEn: 'Production Line 3 (Premix)', category: 'Operations' },
  { code: 'PT-L4', nameTh: 'ฝ่ายผลิต Line 4 (ยาเม็ด)', nameEn: 'Production Line 4 (Tablet Medicine)', category: 'Operations' },
  { code: 'PT-L5', nameTh: 'ฝ่ายผลิต Line 5 (แชมพู/สเปรย์)', nameEn: 'Production Line 5 (Shampoo/Spray)', category: 'Operations' },
  { code: 'PT-L6', nameTh: 'ฝ่ายผลิต Line 6 (อาหารเสริมสัตว์เลี้ยง)', nameEn: 'Production Line 6 (Pet Supplements)', category: 'Operations' },
  { code: 'PT-L7', nameTh: 'ฝ่ายผลิต Line 7 (โภชนเภสัช)', nameEn: 'Production Line 7 (Nutraceuticals)', category: 'Operations' },
  { code: 'PT-L8', nameTh: 'ฝ่ายผลิต Line 8 (Pet Food)', nameEn: 'Production Line 8 (Pet Food)', category: 'Operations' },
  { code: 'PT-L9', nameTh: 'ฝ่ายผลิต Line 9 (บรรจุเสร็จ)', nameEn: 'Production Line 9 (Final Pack)', category: 'Operations' },
];

export const USERS_DATA: UserProfile[] = [
  { id: 'usr-admin', email: 'wrpn2535@gmail.com', name: 'คุณวรภณ พ. (ผู้ดูแลระบบกลาง)', departmentCode: 'QMR', departmentName: 'ฝ่ายบริหารคุณภาพ (QMR)', role: 'ADMIN', title: 'System Administrator & Super Auditor' },
];

export const CHECKLIST_BANK_DATA: ChecklistItem[] = [
  // 1. QMR (บริหารคุณภาพ)
  {
    id: 'chk-qmr-01',
    departmentCode: 'QMR',
    itemCode: 'QMR-01',
    clauses: { iso9001: '4.1, 4.2', famiQs: '4.1, 4.2', dldGhpsHaccp: 'GHPs: ข้อ 7' },
    clauseSummary: 'ISO 9001: 4.1, 4.2 | FAMI-QS: 4.1, 4.2 | DLD GHPs: ข้อ 7',
    questionTh: 'มีการกำหนดบริบทองค์กร ความเสี่ยง ปัจจัยภายใน-ภายนอก และความคาดหวังของผู้มีส่วนได้ส่วนเสียด้านคุณภาพและความปลอดภัยอาหารสัตว์ครบถ้วนหรือไม่?',
    evidenceExamples: ['เอกสารประเมินบริบทองค์กร (Context/SWOT Analysis)', 'ทะเบียนความเสี่ยง (Risk Register) ด้าน Quality & Feed Safety'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-qmr-01-deep',
    departmentCode: 'QMR',
    itemCode: 'QMR-01D',
    clauses: { iso9001: '6.1', famiQs: '6.1', dldGhpsHaccp: 'GHPs: ข้อ 7' },
    clauseSummary: 'ISO 9001: 6.1 (Actions to address risks) vs FAMI-QS: 6.1 (Feed Safety Risk Assessment)',
    questionTh: 'การประเมินความเสี่ยงและโอกาส (Risk Assessment) ได้แยกแยะระหว่างความเสี่ยงทางธุรกิจ (ISO 6.1) และอันตรายทางอาหารสัตว์ (FAMI-QS 6.1 Feed Safety Hazard/Fraud) มีเกณฑ์วิเคราะห์ระดับความเสี่ยงและมาตรการควบคุมอย่างชัดเจนหรือไม่?',
    evidenceExamples: ['Risk Assessment Matrix เทียบเกณฑ์ Likelihood x Severity', 'บันทึกการทบทวนแผนจัดการความเสี่ยงด้านการปลอมปน (Feed Fraud) ประจำปี'],
    depthLevel: 'deep_dive'
  },
  {
    id: 'chk-qmr-02',
    departmentCode: 'QMR',
    itemCode: 'QMR-02',
    clauses: { iso9001: '5.1, 5.2', famiQs: '5.1, 5.2', dldGhpsHaccp: 'GHPs: ข้อ 7' },
    clauseSummary: 'ISO 9001: 5.1, 5.2 | FAMI-QS: 5.1, 5.2 | DLD GHPs: ข้อ 7',
    questionTh: 'ผู้บริหารแสดงความมุ่งมั่น จัดทำนโยบายคุณภาพและความปลอดภัยอาหารสัตว์ (Feed Safety Policy) และสื่อสารให้พนักงานทุกระดับทราบหรือไม่?',
    evidenceExamples: ['นโยบาย Feed Safety Policy มีลายเซ็นอนุมัติล่าสุด', 'การติดประกาศนโยบายและบันทึกการสื่อสาร/อบรมพนักงาน'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-qmr-02-deep',
    departmentCode: 'QMR',
    itemCode: 'QMR-02D',
    clauses: { iso9001: '6.2', famiQs: '6.2', dldGhpsHaccp: 'GHPs: ข้อ 7' },
    clauseSummary: 'ISO 9001: 6.2 vs FAMI-QS: 6.2 (Quality & Feed Safety Objectives)',
    questionTh: 'วัตถุประสงค์คุณภาพและความปลอดภัยอาหารสัตว์ (Objectives & KPIs) ได้กำหนดตัวชี้วัดที่วัดผลได้ สอดคล้องกับนโยบาย มีแผนปฏิบัติการ (Action Plan) และการติดตามผลประจำไตรมาสหรือไม่?',
    evidenceExamples: ['ตาราง KPI คุณภาพและความปลอดภัยประจำปี 2569', 'รายงานผลการประเมินความสำเร็จของวัตถุประสงค์ไตรมาสล่าสุด'],
    depthLevel: 'deep_dive'
  },
  {
    id: 'chk-qmr-03',
    departmentCode: 'QMR',
    itemCode: 'QMR-03',
    clauses: { iso9001: '5.3', famiQs: '5.3, 5.4', dldGhpsHaccp: 'GHPs: ข้อ 7' },
    clauseSummary: 'ISO 9001: 5.3 | FAMI-QS: 5.3, 5.4 | DLD GHPs: ข้อ 7',
    questionTh: 'มีการแต่งตั้งทีม HACCP / Feed Safety Team พร้อมกำหนดบทบาท อำนาจหน้าที่ และความรับผิดชอบอย่างเป็นลายลักษณ์อักษรหรือไม่?',
    evidenceExamples: ['คำสั่งแต่งตั้งทีม HACCP/Feed Safety Team', 'คำอธิบายลักษณะงาน (JD) ของทีมงานและ QMR'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-qmr-04',
    departmentCode: 'QMR',
    itemCode: 'QMR-04',
    clauses: { iso9001: '9.3', famiQs: '9.3', dldGhpsHaccp: 'GHPs: ข้อ 13.1.3' },
    clauseSummary: 'ISO 9001: 9.3 | FAMI-QS: 9.3 | DLD GHPs: ข้อ 13.1.3',
    questionTh: 'มีการประชุมทบทวนฝ่ายบริหาร (Management Review) อย่างน้อยปีละ 1 ครั้ง ครอบคลุมวาระ ISO 9001, GHPs/HACCP และ FAMI-QS หรือไม่?',
    evidenceExamples: ['รายงานการประชุม Management Review', 'รายการติดตามผลการดำเนินงานตามมติที่ประชุม'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-qmr-05',
    departmentCode: 'QMR',
    itemCode: 'QMR-05',
    clauses: { iso9001: '9.2, 10.2', famiQs: '9.2, 10.2', dldGhpsHaccp: 'HACCP: ข้อ 21, 22' },
    clauseSummary: 'ISO 9001: 9.2, 10.2 | FAMI-QS: 9.2, 10.2 | DLD HACCP: ข้อ 21, 22',
    questionTh: 'มีการจัดทำแผนการตรวจประเมินภายใน (Internal Audit Plan) ครอบคลุมทุกระบบ ทุกแผนก และติดตามการแก้ไข CAR/CAPA จนเสร็จสิ้นหรือไม่?',
    evidenceExamples: ['แผนและรายงานการตรวจประเมินภายใน (Audit Plan/Report FM-QM-013, FM-QM-018)', 'รายการ CAR/CAPA และหลักฐานการปิดข้อบกพร่อง'],
    depthLevel: 'standard'
  },

  // 2. DC (ศูนย์ควบคุมเอกสาร)
  {
    id: 'chk-dc-01',
    departmentCode: 'DC',
    itemCode: 'DC-01',
    clauses: { iso9001: '7.5', famiQs: '7.5', dldGhpsHaccp: 'GHPs: ข้อ 13.4' },
    clauseSummary: 'ISO 9001: 7.5 | FAMI-QS: 7.5 | DLD GHPs: ข้อ 13.4',
    questionTh: 'มีระบบการจัดทำ อนุมัติ ทบทวน แจกจ่าย และแก้ไขเอกสาร (SOP, WI, Form) ที่เป็นปัจจุบันอย่างมีประสิทธิภาพหรือไม่?',
    evidenceExamples: ['ทะเบียนควบคุมเอกสารหลัก (Master List of Documents)', 'เอกสารฉบับจริงหน้างานมีความเป็นปัจจุบัน (Correct Rev. No.)'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-dc-02',
    departmentCode: 'DC',
    itemCode: 'DC-02',
    clauses: { iso9001: '7.5.3', famiQs: '7.5.3', dldGhpsHaccp: 'HACCP: ข้อ 22' },
    clauseSummary: 'ISO 9001: 7.5.3 | FAMI-QS: 7.5.3 | DLD HACCP: ข้อ 22',
    questionTh: 'มีการกำหนดระยะเวลาการกักเก็บและระบบการจัดเก็บเอกสาร/บันทึกคุณภาพและความปลอดภัยอาหารสัตว์อย่างเหมาะสมหรือไม่?',
    evidenceExamples: ['บันทึกการผลิต สุขลักษณะ และ CCP ถูกเก็บรักษานานอย่างน้อย 3 ปีตามเกณฑ์กรมปศุสัตว์', 'บันทึกอยู่ในสภาพสมบูรณ์ อ่านออกง่าย ไม่สูญหาย'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-dc-03',
    departmentCode: 'DC',
    itemCode: 'DC-03',
    clauses: { iso9001: '7.5.3', famiQs: '7.5.3', dldGhpsHaccp: 'GHPs: ข้อ 13.4' },
    clauseSummary: 'ISO 9001: 7.5.3 | FAMI-QS: 7.5.3 | DLD GHPs: ข้อ 13.4',
    questionTh: 'มีการควบคุมเอกสารภายนอก (External Documents) เช่น กฎหมายปศุสัตว์ มาตรฐาน FAMI-QS และข้อกำหนดลูกค้า ให้เป็นปัจจุบันหรือไม่?',
    evidenceExamples: ['ทะเบียนควบคุมเอกสารภายนอก (External Document Master List)', 'กฎหมายและระเบียบกรมปศุสัตว์ฉบับล่าสุด'],
    depthLevel: 'standard'
  },

  // 3. QA (ประกันคุณภาพ)
  {
    id: 'chk-qa-01',
    departmentCode: 'QA',
    itemCode: 'QA-01',
    clauses: { iso9001: '8.6', famiQs: '8.5', dldGhpsHaccp: 'GHPs: ข้อ 13.1.1, 13.1.2' },
    clauseSummary: 'ISO 9001: 8.6 | FAMI-QS: 8.5 | DLD GHPs: ข้อ 13.1.1, 13.1.2',
    questionTh: 'มีการจัดทำแผนการตรวจวิเคราะห์และปล่อยสินค้า (Product Release Procedure) พร้อมใบรับรอง COA ครบถ้วนทุก Lot หรือไม่?',
    evidenceExamples: ['ขั้นตอนการปล่อยสินค้า (Product Release SOP)', 'บันทึก COA และรายงานผลการตรวจปล่อยสินค้า'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-qa-02',
    departmentCode: 'QA',
    itemCode: 'QA-02',
    clauses: { iso9001: '8.7', famiQs: '8.7', dldGhpsHaccp: 'GHPs: ข้อ 13.1.4' },
    clauseSummary: 'ISO 9001: 8.7 | FAMI-QS: 8.7 | DLD GHPs: ข้อ 13.1.4',
    questionTh: 'มีระบบการกักและจัดการสินค้าที่ไม่เป็นไปตามข้อกำหนด (Nonconforming Product / Hold Status) ชัดเจน เพื่อป้องกันการนำไปใช้โดยไม่ได้ตั้งใจหรือไม่?',
    evidenceExamples: ['พื้นที่กักสินค้า (Hold Area) และป้ายกักสินค้า NC', 'บันทึกการกักและการตัดสินใจจัดการสินค้า NC'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-qa-03',
    departmentCode: 'QA',
    itemCode: 'QA-03',
    clauses: { iso9001: '8.5.2', famiQs: '8.5.2', dldGhpsHaccp: 'GHPs: ข้อ 14.1' },
    clauseSummary: 'ISO 9001: 8.5.2 | FAMI-QS: 8.5.2 | DLD GHPs: ข้อ 14.1',
    questionTh: 'ระบบการสอบกลับได้ (Traceability System) สามารถสอบกลับจากสินค้าสำเร็จรูปไปยังวัตถุดิบ บรรจุภัณฑ์ และลูกค้าภายในเวลาที่กำหนดหรือไม่?',
    evidenceExamples: ['รายงานการฝึกซ้อมสอบกลับได้ (Traceability Exercise Record)', 'เวลาที่ใช้ในการสอบกลับอยู่ในเกณฑ์ที่กำหนด (เช่น ไม่เกิน 2-4 ชม.)'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-qa-04',
    departmentCode: 'QA',
    itemCode: 'QA-04',
    clauses: { iso9001: '8.7', famiQs: '8.8', dldGhpsHaccp: 'GHPs: ข้อ 13.5' },
    clauseSummary: 'ISO 9001: 8.7 | FAMI-QS: 8.8 | DLD GHPs: ข้อ 13.5',
    questionTh: 'มีการจัดทำขั้นตอนการปฏิบัติงานกรณีฉุกเฉินและการเรียกคืนสินค้า (Recall & Crisis Management) พร้อมทำการซ้อม Mock Recall อย่างน้อยปีละ 1 ครั้งหรือไม่?',
    evidenceExamples: ['แผนและขั้นตอนการเรียกคืนสินค้า (Recall Procedure)', 'รายงานผลการฝึกซ้อมเรียกคืนสินค้าประจำปี (Mock Recall Report)'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-qa-05',
    departmentCode: 'QA',
    itemCode: 'QA-05',
    clauses: { famiQs: '8.8', dldGhpsHaccp: 'GHPs: ข้อ 13.2.6' },
    clauseSummary: 'FAMI-QS: 8.8 | DLD GHPs: ข้อ 13.2.6',
    questionTh: 'มีการประเมินความเสี่ยงและจัดทำมาตรการป้องกันการปลอมปนวัตถุดิบและการก่อวินาศกรรม (Feed Fraud & Feed Defense Plan) หรือไม่?',
    evidenceExamples: ['ประเมินความเสี่ยง Feed Fraud & Feed Defense', 'มาตรการควบคุมการเข้าออกพื้นที่จุดเสี่ยงและการซีลตู้สินค้า'],
    depthLevel: 'standard'
  },

  // 4. CM (ห้องปฏิบัติการเคมี)
  {
    id: 'chk-cm-01',
    departmentCode: 'CM',
    itemCode: 'CM-01',
    clauses: { iso9001: '7.1.5', famiQs: '7.1.5, 8.5.1', dldGhpsHaccp: 'GHPs: ข้อ 13.2.3, 13.2.6' },
    clauseSummary: 'ISO 9001: 7.1.5 | FAMI-QS: 7.1.5, 8.5.1 | DLD GHPs: ข้อ 13.2.3, 13.2.6',
    questionTh: 'มีแผนและผลการตรวจวิเคราะห์ทางเคมี สารพิษตกค้าง ยาปฏิชีวนะ โลหะหนัก และ Mycotoxins ตามเกณฑ์มาตรฐานปศุสัตว์และ FAMI-QS ครบถ้วนหรือไม่?',
    evidenceExamples: ['แผนการสุ่มตรวจวิเคราะห์ทางเคมีประจำปี', 'รายงานผลการตรวจวิเคราะห์ (Lab Test Report) จากแล็บที่ได้รับการรับรอง ISO/IEC 17025'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-cm-02',
    departmentCode: 'CM',
    itemCode: 'CM-02',
    clauses: { iso9001: '7.1.5', famiQs: '7.1.5', dldGhpsHaccp: 'HACCP: ข้อ 21' },
    clauseSummary: 'ISO 9001: 7.1.5 | FAMI-QS: 7.1.5 | DLD HACCP: ข้อ 21',
    questionTh: 'เครื่องมือวัดและอุปกรณ์ทดสอบทางเคมีได้รับการสอบเทียบ (Calibration) และ Verification ก่อนใช้งานตามรอบระยะเวลาหรือไม่?',
    evidenceExamples: ['ใบรับรองการสอบเทียบเครื่องมือวัดเคมี (Calibration Certificate)', 'บันทึกการทบทวนความถูกต้องประจำวัน (Daily Verification Record) เช่น เครื่องชั่ง, pH meter'],
    depthLevel: 'standard'
  },

  // 5. MC (ห้องปฏิบัติการจุลชีววิทยา)
  {
    id: 'chk-mc-01',
    departmentCode: 'MC',
    itemCode: 'MC-01',
    clauses: { iso9001: '7.1.5', famiQs: '8.5.1', dldGhpsHaccp: 'GHPs: ข้อ 13.2.3, 13.2.4' },
    clauseSummary: 'ISO 9001: 7.1.5 | FAMI-QS: 8.5.1 | DLD GHPs: ข้อ 13.2.3, 13.2.4',
    questionTh: 'มีแผนและผลการตรวจวิเคราะห์เชื้อจุลินทรีย์ก่อโรค (Salmonella spp., E. coli, Listeria monocytogenes) ในวัตถุดิบและผลิตภัณฑ์ครบถ้วนหรือไม่?',
    evidenceExamples: ['แผนการสุ่มตรวจวิเคราะห์ทางจุลชีววิทยา', 'รายงานผลการตรวจวิเคราะห์เชื้อก่อโรค (Salmonella Control Program)'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-mc-02',
    departmentCode: 'MC',
    itemCode: 'MC-02',
    clauses: { famiQs: '8.5.1', dldGhpsHaccp: 'GHPs: ข้อ 13.2.4, 13.3' },
    clauseSummary: 'FAMI-QS: 8.5.1 | DLD GHPs: ข้อ 13.2.4, 13.3',
    questionTh: 'มีการจัดทำแผนเฝ้าระวังสภาพแวดล้อมการผลิต (Environmental Monitoring Plan - EMP) และการตรวจ Swab Test/ATP ตามกำหนดหรือไม่?',
    evidenceExamples: ['แผนและผลการตรวจ Swab Test พื้นผิวสัมผัส มือพนักงาน และอากาศ', 'ผลการตรวจวิเคราะห์คุณภาพน้ำทางจุลชีววิทยา'],
    depthLevel: 'standard'
  },

  // 6. RD (วิจัยพัฒนาและจัดการนวัตกรรม)
  {
    id: 'chk-rd-01',
    departmentCode: 'RD',
    itemCode: 'RD-01',
    clauses: { iso9001: '8.3', famiQs: '8.3', dldGhpsHaccp: 'GHPs: ข้อ 13.1.1, 13.1.2' },
    clauseSummary: 'ISO 9001: 8.3 | FAMI-QS: 8.3 | DLD GHPs: ข้อ 13.1.1, 13.1.2',
    questionTh: 'กระบวนการออกแบบและพัฒนาผลิตภัณฑ์มีการทบทวนความปลอดภัยอาหารสัตว์ กฎหมายปศุสัตว์ และข้อกำหนดลูกค้าอย่างรอบคอบหรือไม่?',
    evidenceExamples: ['เอกสารทบทวนการออกแบบ (Design Review Record)', 'ข้อกำหนดผลิตภัณฑ์ (Product Specification) และสูตรการผลิต (BOM)'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-rd-02',
    departmentCode: 'RD',
    itemCode: 'RD-02',
    clauses: { famiQs: '8.3', dldGhpsHaccp: 'GHPs: ข้อ 13.2.1, 14.3' },
    clauseSummary: 'FAMI-QS: 8.3 | DLD GHPs: ข้อ 13.2.1, 14.3',
    questionTh: 'มีการทดสอบกำหนดอายุกระทั่ง (Shelf-life Study) และตรวจสอบความถูกต้องของฉลาก สารก่อภูมิแพ้ และข้อแนะนำการใช้งานอย่างถูกต้องหรือไม่?',
    evidenceExamples: ['รายงานผลการทดสอบ Shelf-life & Stability Study', 'ต้นแบบฉลาก (Label Proof) ที่ผ่านการอนุมัติตามกฎหมายปศุสัตว์'],
    depthLevel: 'standard'
  },

  // 7. TC (ฝ่ายวิชาการ)
  {
    id: 'chk-tc-01',
    departmentCode: 'TC',
    itemCode: 'TC-01',
    clauses: { iso9001: '7.2, 8.2.2', famiQs: '8.2', dldGhpsHaccp: 'GHPs: ข้อ 14.2, 14.4' },
    clauseSummary: 'ISO 9001: 7.2, 8.2.2 | FAMI-QS: 8.2 | DLD GHPs: ข้อ 14.2, 14.4',
    questionTh: 'มีการจัดทำข้อมูลทางวิชาการ ใบแทรกสินค้า และคู่มือการใช้งานอย่างถูกต้องและปลอดภัยต่อสัตว์เลี้ยง/สัตว์เศรษฐกิจหรือไม่?',
    evidenceExamples: ['เอกสาร Technical Data Sheet (TDS) และใบแทรกสินค้า', 'รายงานทบทวนความปลอดภัยของสารอาหารและอัตราการใช้'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-tc-02',
    departmentCode: 'TC',
    itemCode: 'TC-02',
    clauses: { famiQs: '8.2', dldGhpsHaccp: 'GHPs: ข้อ 14.2' },
    clauseSummary: 'FAMI-QS: 8.2 | DLD GHPs: ข้อ 14.2',
    questionTh: 'มีการติดตามและอัปเดตข้อกำหนดทางกฎหมายอาหารสัตว์ของประเทศคู่ค้าส่งออกอย่างสม่ำเสมอหรือไม่?',
    evidenceExamples: ['ทะเบียนข้อกำหนดกฎหมายอาหารสัตว์ต่างประเทศ', 'รายงานการประเมินความสอดคล้องด้านวิชาการ'],
    depthLevel: 'standard'
  },

  // 8. PR (จัดซื้อ)
  {
    id: 'chk-pr-01',
    departmentCode: 'PR',
    itemCode: 'PR-01',
    clauses: { iso9001: '8.4', famiQs: '8.1.4, 8.1.5', dldGhpsHaccp: 'GHPs: ข้อ 8.1, 8.2, 13.2.8' },
    clauseSummary: 'ISO 9001: 8.4 | FAMI-QS: 8.1.4, 8.1.5 | DLD GHPs: ข้อ 8.1, 8.2, 13.2.8',
    questionTh: 'วัตถุดิบเนื้อสัตว์/ผลพลอยได้ปศุสัตว์ จัดซื้อจากฟาร์มมาตรฐาน GAP และโรงฆ่าสัตว์ที่ได้รับการรับรองจากกรมปศุสัตว์ (ใบ ร.น./ร.๔/ร.๑๐) หรือไม่?',
    evidenceExamples: ['บัญชีผู้ขายที่ได้รับการอนุมัติ (Approved Vendor List - AVL)', 'สำเนาใบอนุญาตโรงฆ่าสัตว์/ใบรับรอง GAP ของผู้ขาย'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pr-02',
    departmentCode: 'PR',
    itemCode: 'PR-02',
    clauses: { iso9001: '8.4.3', famiQs: '8.1.4', dldGhpsHaccp: 'GHPs: ข้อ 13.2.8' },
    clauseSummary: 'ISO 9001: 8.4.3 | FAMI-QS: 8.1.4 | DLD GHPs: ข้อ 13.2.8',
    questionTh: 'มีการจัดทำ Specification การจัดซื้อวัตถุดิบ/บรรจุภัณฑ์สัมผัสอาหาร (Food/Feed Grade) และกำหนดให้ส่ง COA แนบมาทุก Lot หรือไม่?',
    evidenceExamples: ['ข้อกำหนดการจัดซื้อ (Purchasing Specification)', 'ใบสั่งซื้อ (PO) ที่ระบุเงื่อนไขการแนบ COA'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pr-03',
    departmentCode: 'PR',
    itemCode: 'PR-03',
    clauses: { famiQs: '8.8', dldGhpsHaccp: 'GHPs: ข้อ 13.2.8' },
    clauseSummary: 'FAMI-QS: 8.8 | DLD GHPs: ข้อ 13.2.8',
    questionTh: 'มีการประเมินความเสี่ยงผู้ขายในเรื่องการปลอมปนวัตถุดิบ (Feed Fraud Risk Assessment in Supply Chain) หรือไม่?',
    evidenceExamples: ['เอกสารประเมินความเสี่ยงการปลอมปนวัตถุดิบของผู้ขายแต่ละราย', 'ผลการประเมินประสิทธิภาพผู้ขายประจำปี (Supplier Evaluation)'],
    depthLevel: 'standard'
  },

  // 9. MK (การตลาด)
  {
    id: 'chk-mk-01',
    departmentCode: 'MK',
    itemCode: 'MK-01',
    clauses: { iso9001: '8.2, 8.2.1', famiQs: '8.2', dldGhpsHaccp: 'GHPs: ข้อ 14.2, 14.3' },
    clauseSummary: 'ISO 9001: 8.2, 8.2.1 | FAMI-QS: 8.2 | DLD GHPs: ข้อ 14.2, 14.3',
    questionTh: 'ข้อมูลการโฆษณา สื่อการตลาด และการแสดงสรรพคุณผลิตภัณฑ์มีความถูกต้อง ตรงตามความเป็นจริง และไม่ขัดต่อกฎหมายปศุสัตว์หรือไม่?',
    evidenceExamples: ['สื่อการตลาด เอกสารโฆษณา และโบรชัวร์สินค้า', 'เอกสารอนุมัติข้อความโฆษณาจากฝ่ายวิชาการ/QA'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-mk-02',
    departmentCode: 'MK',
    itemCode: 'MK-02',
    clauses: { iso9001: '9.1.2', famiQs: '9.1.2', dldGhpsHaccp: 'GHPs: ข้อ 14.4' },
    clauseSummary: 'ISO 9001: 9.1.2 | FAMI-QS: 9.1.2 | DLD GHPs: ข้อ 14.4',
    questionTh: 'มีระบบการสำรวจความพึงพอใจของลูกค้า และส่งต่อข้อร้องเรียน/ข้อเสนอแนะให้หน่วยงานที่เกี่ยวข้องดำเนินการแก้ไขหรือไม่?',
    evidenceExamples: ['รายงานผลการสำรวจความพึงพอใจลูกค้าประจำปี', 'บันทึกการรับและส่งต่อข้อร้องเรียนลูกค้า (Customer Complaint Log)'],
    depthLevel: 'standard'
  },

  // 10. SR (ประสานงานขายในประเทศ)
  {
    id: 'chk-sr-01',
    departmentCode: 'SR',
    itemCode: 'SR-01',
    clauses: { iso9001: '8.2', famiQs: '8.2', dldGhpsHaccp: 'GHPs: ข้อ 14.2' },
    clauseSummary: 'ISO 9001: 8.2 | FAMI-QS: 8.2 | DLD GHPs: ข้อ 14.2',
    questionTh: 'มีการทบทวนคำสั่งซื้อ ข้อกำหนดลูกค้า สเปกสินค้า และเงื่อนไขการส่งมอบในประเทศอย่างถูกต้องก่อนยืนยันคำสั่งซื้อหรือไม่?',
    evidenceExamples: ['รายงานการทบทวนสัญญา/คำสั่งซื้อ (Order Review Record)', 'ใบเสนอราคาและข้อตกลงคุณภาพกับลูกค้า (Quality Agreement)'],
    depthLevel: 'standard'
  },

  // 11. FR (ประสานงานขายต่างประเทศ)
  {
    id: 'chk-fr-01',
    departmentCode: 'FR',
    itemCode: 'FR-01',
    clauses: { iso9001: '8.2', famiQs: '8.2', dldGhpsHaccp: 'GHPs: ข้อ 14.2, 14.3' },
    clauseSummary: 'ISO 9001: 8.2 | FAMI-QS: 8.2 | DLD GHPs: ข้อ 14.2, 14.3',
    questionTh: 'มีการตรวจสอบและทบทวนข้อกำหนดเฉพาะ กฎหมายนำเข้า และการติดฉลากส่งออกของประเทศคู่ค้า (EU, Japan, US, China) อย่างครบถ้วนหรือไม่?',
    evidenceExamples: ['รายการตรวจสอบข้อกำหนดประเทศคู่ค้าส่งออก (Country Requirement Checklist)', 'เอกสารใบรับรองสุขอนามัย (Health Certificate) และ COA ส่งออก'],
    depthLevel: 'standard'
  },

  // 12. EN (วิศวกรรม)
  {
    id: 'chk-en-01',
    departmentCode: 'EN',
    itemCode: 'EN-01',
    clauses: { iso9001: '7.1.3, 7.1.4', famiQs: '7.1.3, 7.1.4', dldGhpsHaccp: 'GHPs: ข้อ 9.1, 9.2' },
    clauseSummary: 'ISO 9001: 7.1.3, 7.1.4 | FAMI-QS: 7.1.3, 7.1.4 | DLD GHPs: ข้อ 9.1, 9.2',
    questionTh: 'โครงสร้างอาคาร พื้น ผนัง เพดาน ท่อระบายน้ำ และระบบระบายอากาศ (Positive Pressure) อยู่ในสภาพดี ป้องกันการสะสมฝุ่นและการปนเปื้อนหรือไม่?',
    evidenceExamples: ['รายงานการตรวจสภาพอาคารผลิตและคลังสินค้าประจำเดือน', 'ระบบกรองอากาศและทิศทางลมในห้อง Clean Zone'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-en-02',
    departmentCode: 'EN',
    itemCode: 'EN-02',
    clauses: { iso9001: '7.1.3', famiQs: '7.1.3', dldGhpsHaccp: 'GHPs: ข้อ 11.1' },
    clauseSummary: 'ISO 9001: 7.1.3 | FAMI-QS: 7.1.3 | DLD GHPs: ข้อ 11.1',
    questionTh: 'มีแผนและบันทึกการซ่อมบำรุงเชิงป้องกัน (Preventive Maintenance - PM) เครื่องจักร อาคาร และระบบสาธารณูปโภคอย่างเป็นระบบหรือไม่?',
    evidenceExamples: ['แผนและประวัติการซ่อมบำรุงเครื่องจักร (PM Plan & History)', 'บันทึกการใช้น้ำมันหล่อลื่น/จารบีเกรดอาหารสัตว์ (Food/Feed Grade Lubricants)'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-en-03',
    departmentCode: 'EN',
    itemCode: 'EN-03',
    clauses: { iso9001: '7.1.5', famiQs: '7.1.5', dldGhpsHaccp: 'HACCP: ข้อ 19, 21' },
    clauseSummary: 'ISO 9001: 7.1.5 | FAMI-QS: 7.1.5 | DLD HACCP: ข้อ 19, 21',
    questionTh: 'เครื่องชั่ง เครื่องมือวัด Sensor และเครื่องควบคุม CCP/OPRP ได้รับการสอบเทียบ (Calibration) และ Verification ตรงตามแผนหรือไม่?',
    evidenceExamples: ['แผนและแผนผังการสอบเทียบเครื่องมือวัด (Calibration Master Plan)', 'สติกเกอร์สถานะการสอบเทียบติดที่ตัวเครื่องมือวัดทุกชิ้น'],
    depthLevel: 'standard'
  },

  // 13. HR (บุคคลและธุรการ)
  {
    id: 'chk-hr-01',
    departmentCode: 'HR',
    itemCode: 'HR-01',
    clauses: { iso9001: '7.2, 7.3', famiQs: '7.2, 7.3', dldGhpsHaccp: 'GHPs: ข้อ 10.1 - 10.4' },
    clauseSummary: 'ISO 9001: 7.2, 7.3 | FAMI-QS: 7.2, 7.3 | DLD GHPs: ข้อ 10.1 - 10.4',
    questionTh: 'มีแผนและบันทึกการฝึกอบรมความรู้ ISO 9001, GHPs/HACCP, FAMI-QS และความปลอดภัยอาหารสัตว์แก่พนักงานทุกระดับอย่างเหมาะสมหรือไม่?',
    evidenceExamples: ['แผนการฝึกอบรมประจำปี (Training Roadmap/Plan)', 'บันทึกและผลการประเมินหลังการฝึกอบรมพนักงาน'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-hr-02',
    departmentCode: 'HR',
    itemCode: 'HR-02',
    clauses: { iso9001: '7.1.2', famiQs: '7.1.2', dldGhpsHaccp: 'GHPs: ข้อ 12.1 - 12.5' },
    clauseSummary: 'ISO 9001: 7.1.2 | FAMI-QS: 7.1.2 | DLD GHPs: ข้อ 12.1 - 12.5',
    questionTh: 'พนักงานสัมผัสอาหาร/วัตถุดิบ ได้รับการตรวจสุขภาพประจำปี และตรวจโรคต้องห้ามตามเกณฑ์กรมปศุสัตว์ครบถ้วนหรือไม่?',
    evidenceExamples: ['ประวัติการตรวจสุขภาพประจำปีของพนักงาน (Medical Examination Record)', 'บันทึกการคัดกรองการเจ็บป่วยและการสั่งหยุดงานกรณีป่วย'],
    depthLevel: 'standard'
  },

  // 14. IT (เทคโนโลยีสารสนเทศ)
  {
    id: 'chk-it-01',
    departmentCode: 'IT',
    itemCode: 'IT-01',
    clauses: { iso9001: '7.1.3, 7.5.3', famiQs: '7.1.3, 7.5.3', dldGhpsHaccp: 'HACCP: ข้อ 22' },
    clauseSummary: 'ISO 9001: 7.1.3, 7.5.3 | FAMI-QS: 7.1.3, 7.5.3 | DLD HACCP: ข้อ 22',
    questionTh: 'มีการดูแลรักษาและสำรองข้อมูล (Data Backup) ของระบบซอฟต์แวร์การผลิต บันทึก CCP และระบบดิจิทัลอย่างสม่ำเสมอหรือไม่?',
    evidenceExamples: ['แผนและบันทึกการสำรองข้อมูล (Backup Schedule & Log)', 'รายงานผลการทดสอบกู้คืนข้อมูล (Disaster Recovery Test)'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-it-02',
    departmentCode: 'IT',
    itemCode: 'IT-02',
    clauses: { iso9001: '7.5.3', famiQs: '7.5.3', dldGhpsHaccp: 'GHPs: ข้อ 13.4' },
    clauseSummary: 'ISO 9001: 7.5.3 | FAMI-QS: 7.5.3 | DLD GHPs: ข้อ 13.4',
    questionTh: 'มีการควบคุมสิทธิ์การเข้าถึงระบบคอมพิวเตอร์และโปรแกรมควบคุมเครื่องจักร (PLC/SCADA) เพื่อป้องกันการแก้ไขข้อมูลโดยไม่ได้รับอนุญาตหรือไม่?',
    evidenceExamples: ['ทะเบียนกำหนดสิทธิ์การเข้าถึงระบบ (User Access Control Matrix)', 'บันทึกประวัติการแก้ไขข้อมูลระบบ (Audit Trail Log)'],
    depthLevel: 'standard'
  },

  // 15. WH (คลังวัตถุดิบ)
  {
    id: 'chk-wh-01',
    departmentCode: 'WH',
    itemCode: 'WH-01',
    clauses: { iso9001: '8.5.2, 8.5.4', famiQs: '8.5.2, 8.6', dldGhpsHaccp: 'GHPs: ข้อ 8.3, 13.2.8' },
    clauseSummary: 'ISO 9001: 8.5.2, 8.5.4 | FAMI-QS: 8.5.2, 8.6 | DLD GHPs: ข้อ 8.3, 13.2.8',
    questionTh: 'มีการตรวจรับวัตถุดิบปศุสัตว์พร้อมตรวจสอบใบเคลื่อนย้าย (ร.๔/ร.๑๐) สภาพรถขนส่ง และ COA ครบถ้วนก่อนรับเข้าคลังหรือไม่?',
    evidenceExamples: ['รายงานการตรวจรับวัตถุดิบ (Raw Material Receiving Log)', 'ใบเคลื่อนย้ายปศุสัตว์และ COA แนบสมบูรณ์'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-wh-02',
    departmentCode: 'WH',
    itemCode: 'WH-02',
    clauses: { iso9001: '8.5.4', famiQs: '8.6', dldGhpsHaccp: 'GHPs: ข้อ 9.2.4, 9.2.7' },
    clauseSummary: 'ISO 9001: 8.5.4 | FAMI-QS: 8.6 | DLD GHPs: ข้อ 9.2.4, 9.2.7',
    questionTh: 'มีการควบคุมอุณหภูมิห้องเย็นแช่เย็น (0-4°C) และห้องแช่แข็ง (<= -18°C) อย่างต่อเนื่อง พร้อมจัดเก็บยกสูงจากพื้นตามหลัก FEFO/FIFO หรือไม่?',
    evidenceExamples: ['กราฟ/บันทึกอุณหภูมิห้องเย็นแบบต่อเนื่อง (Continuous Temp Log)', 'สภาพการจัดเก็บบนพาเลท ยกสูงจากพื้นและห่างจากผนัง'],
    depthLevel: 'standard'
  },

  // 16. PK (คลังบรรจุภัณฑ์)
  {
    id: 'chk-pk-01',
    departmentCode: 'PK',
    itemCode: 'PK-01',
    clauses: { iso9001: '8.5.2, 8.5.4', famiQs: '8.5.2, 8.6', dldGhpsHaccp: 'GHPs: ข้อ 8.3, 13.2.8' },
    clauseSummary: 'ISO 9001: 8.5.2, 8.5.4 | FAMI-QS: 8.5.2, 8.6 | DLD GHPs: ข้อ 8.3, 13.2.8',
    questionTh: 'บรรจุภัณฑ์สัมผัสอาหารสัตว์ (Food/Feed Contact Grade) จัดเก็บในพื้นที่สะอาด มิดชิด ยกรอบจากพื้น และมีการชี้บ่ง Lot อย่างชัดเจนหรือไม่?',
    evidenceExamples: ['พื้นที่จัดเก็บบรรจุภัณฑ์สะอาด ไม่มีสัตว์พาหะ', 'ป้ายชี้บ่ง Lot Number บรรจุภัณฑ์พร้อมใช้อย่างชัดเจน'],
    depthLevel: 'standard'
  },

  // 17. LG (จัดส่ง)
  {
    id: 'chk-lg-01',
    departmentCode: 'LG',
    itemCode: 'LG-01',
    clauses: { iso9001: '8.5.4, 8.5.5', famiQs: '8.6.2', dldGhpsHaccp: 'GHPs: ข้อ 15.1 - 15.3' },
    clauseSummary: 'ISO 9001: 8.5.4, 8.5.5 | FAMI-QS: 8.6.2 | DLD GHPs: ข้อ 15.1 - 15.3',
    questionTh: 'มีการตรวจประเมินความสะอาด สภาพตู้บรรทุก และการทำความสะอาด/ฆ่าเชื้อรถขนส่ง (Tanker Cleansing) ก่อนการโหลดสินค้าหรือไม่?',
    evidenceExamples: ['บันทึกการตรวจสภาพรถขนส่งก่อนโหลด (Vehicle Inspection Checklist)', 'เอกสารบันทึกการล้างฆ่าเชื้อรถแท็งก์/ตู้บรรทุก (Cleansing Certificate)'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-lg-02',
    departmentCode: 'LG',
    itemCode: 'LG-02',
    clauses: { iso9001: '8.5.4', famiQs: '8.6.2', dldGhpsHaccp: 'HACCP: ข้อ 19' },
    clauseSummary: 'ISO 9001: 8.5.4 | FAMI-QS: 8.6.2 | DLD HACCP: ข้อ 19',
    questionTh: 'มีการควบคุมอุณหภูมิระหว่างการขนส่งสินค้าแช่เย็น/แช่แข็ง และมีการติดซีลล็อกตู้สินค้า (Container Seal) อย่างแน่นหนาหรือไม่?',
    evidenceExamples: ['บันทึกอุณหภูมิระหว่างขนส่ง (Data Logger/Temp Log)', 'หมายเลขซีลล็อกตู้สินค้าตรงตามเอกสารใบส่งของ'],
    depthLevel: 'standard'
  },

  // 18. PT Lines (L1 - L9) and General Production
  // PT-L1: ฝ่ายผลิต Line 1 (ยาน้ำ)
  {
    id: 'chk-pt-l1-01',
    departmentCode: 'PT-L1',
    itemCode: 'PT-L1-01',
    clauses: { iso9001: '8.5.1', famiQs: '8.4', dldGhpsHaccp: 'GHPs: ข้อ 8.2, 11.1' },
    clauseSummary: 'ISO 9001: 8.5.1 | FAMI-QS: 8.4 | DLD GHPs: ข้อ 8.2, 11.1',
    questionTh: 'ระบบถังผสมยาน้ำ ปั๊ม และท่อลำเลียง มีขั้นตอนการทำความสะอาด CIP/SIP และการตรวจคราบสารล้างตกค้าง (pH/Conductivity) ก่อนเริ่ม Batch ใหม่หรือไม่?',
    evidenceExamples: ['บันทึก CIP/SIP Log Sheet ประจำถังผสมยาน้ำ', 'ผลการตรวจ Rinse Water ไม่พบสารชะล้างตกค้าง'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pt-l1-02',
    departmentCode: 'PT-L1',
    itemCode: 'PT-L1-02',
    clauses: { iso9001: '8.5.1', famiQs: '8.4', dldGhpsHaccp: 'GHPs: ข้อ 13.1, 13.2' },
    clauseSummary: 'ISO 9001: 8.5.1 | FAMI-QS: 8.4 | DLD GHPs: ข้อ 13.1, 13.2',
    questionTh: 'มีการควบคุมอุณหภูมิ ความเร็วรอบกวนผสม (Homogenizer) และการตรวจสภาพไส้กรองน้ำยาก่อนบรรจุเพื่อป้องกันสิ่งแปลกปลอมหรือไม่?',
    evidenceExamples: ['ใบบันทึก Batch Production Record บันทึกค่า RPM และ Temp', 'บันทึกการเปลี่ยนและตรวจสอบความสมบูรณ์ของไส้กรอง (Filter Integrity)'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pt-l1-03',
    departmentCode: 'PT-L1',
    itemCode: 'PT-L1-03',
    clauses: { iso9001: '8.5.1, 8.5.2', famiQs: '8.5.1', dldGhpsHaccp: 'GHPs: ข้อ 13.1.2' },
    clauseSummary: 'ISO 9001: 8.5.1 | FAMI-QS: 8.5.1 | DLD GHPs: ข้อ 13.1.2',
    questionTh: 'มีการสุ่มตรวจสอบปริมาตรบรรจุ (Filling Volume) และแรงบิดปิดฝาขวด (Torque Test) เพื่อป้องกันการรั่วซึมระหว่างขนส่งหรือไม่?',
    evidenceExamples: ['บันทึก In-process Check ปริมาตรบรรจุทุก 1 ชม.', 'รายงานการทดสอบ Torque Test ฝาขวดและผล Leak Test'],
    depthLevel: 'standard'
  },

  // PT-L2: ฝ่ายผลิต Line 2 (ยาผง)
  {
    id: 'chk-pt-l2-01',
    departmentCode: 'PT-L2',
    itemCode: 'PT-L2-01',
    clauses: { iso9001: '8.5.1', famiQs: '8.4', dldGhpsHaccp: 'GHPs: ข้อ 9.2, 13.2.5' },
    clauseSummary: 'ISO 9001: 8.5.1 | FAMI-QS: 8.4 | DLD GHPs: ข้อ 9.2, 13.2.5',
    questionTh: 'เครื่องผสมยาผง (Ribbon Blender) ซีลแกนเพลา และระบบดูดฝุ่น (Dust Collector) อยู่ในสภาพสมบูรณ์ ไม่มีการปนเปื้อนข้ามและฝุ่นฟุ้งกระจายหรือไม่?',
    evidenceExamples: ['บันทึกตรวจสอบเครื่องผสมก่อนเดินเครื่อง (Pre-operational Checklist)', 'แผนและบันทึกการทำความสะอาดถุงกรองดักฝุ่น'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pt-l2-02',
    departmentCode: 'PT-L2',
    itemCode: 'PT-L2-02',
    clauses: { iso9001: '8.5.1', famiQs: '8.4', dldGhpsHaccp: 'GHPs: ข้อ 13.1, 13.2' },
    clauseSummary: 'ISO 9001: 8.5.1 | FAMI-QS: 8.4 | DLD GHPs: ข้อ 13.1, 13.2',
    questionTh: 'มีการตรวจสอบสภาพตะแกรงร่อนผงยา (Sieve Mesh Screen) ก่อนและหลังการผลิต เพื่อยืนยันว่าตะแกรงไม่ฉีกขาดและไม่มีสิ่งแปลกปลอมตกหล่นหรือไม่?',
    evidenceExamples: ['บันทึกการตรวจสอบตะแกรงร่อนก่อน-หลังการผสมยาผง', 'ขนาดเบอร์ Mesh Screen ตรงตามข้อกำหนดในสูตรการผลิต'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pt-l2-03',
    departmentCode: 'PT-L2',
    itemCode: 'PT-L2-03',
    clauses: { iso9001: '8.5.1', famiQs: '8.5.1', dldGhpsHaccp: 'GHPs: ข้อ 13.1.2' },
    clauseSummary: 'ISO 9001: 8.5.1 | FAMI-QS: 8.5.1 | DLD GHPs: ข้อ 13.1.2',
    questionTh: 'มีการควบคุมอุณหภูมิและความชื้นสัมพัทธ์ในห้องผสมยาผง และทดสอบรอยเชื่อมความร้อนของซองบรรจุ (Heat Seal Integrity) อย่างสม่ำเสมอหรือไม่?',
    evidenceExamples: ['บันทึกอุณหภูมิและความชื้นสัมพัทธ์ห้องผสมยาผง (Temp & RH Log)', 'ผลการทดสอบแรงดึงรอยซีลซองยาผง'],
    depthLevel: 'standard'
  },

  // PT-L3: ฝ่ายผลิต Line 3 (สารผสมล่วงหน้า/Premix)
  {
    id: 'chk-pt-l3-01',
    departmentCode: 'PT-L3',
    itemCode: 'PT-L3-01',
    clauses: { famiQs: '8.4.2', dldGhpsHaccp: 'GHPs: ข้อ 13.1, 13.2.2' },
    clauseSummary: 'FAMI-QS: 8.4.2 | DLD GHPs: ข้อ 13.1, 13.2.2',
    questionTh: 'มีการทดสอบความถ้วนทั่วในการผสม (Mixing Homogeneity Test) ประจำปีของเครื่องผสมพรีมิกซ์ และค่า CV อยู่ในเกณฑ์ที่ FAMI-QS กำหนดหรือไม่?',
    evidenceExamples: ['รายงานผลการทดสอบ Homogeneity Test ประจำปี', 'ค่าสัมประสิทธิ์ความแปรปรวน (CV) ผ่านเกณฑ์มาตรฐาน (< 5%)'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pt-l3-02',
    departmentCode: 'PT-L3',
    itemCode: 'PT-L3-02',
    clauses: { famiQs: '8.4.3', dldGhpsHaccp: 'GHPs: ข้อ 13.2.2, 13.2.5' },
    clauseSummary: 'FAMI-QS: 8.4.3 | DLD GHPs: ข้อ 13.2.2, 13.2.5',
    questionTh: 'มีมาตรการควบคุมอัตราการปนเปื้อนข้ามรุ่น (Carry-over Rate) มี Flush Sequence ชัดเจน และควบคุมการจัดเก็บ/กำจัด Flush Material หรือไม่?',
    evidenceExamples: ['รายงานการทดสอบ Carry-over Rate ในระบบผสมพรีมิกซ์', 'บันทึกการทำ Flush ด้วยแกลบ/สารตัวพา และป้ายชี้บ่ง Flush Material'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pt-l3-03',
    departmentCode: 'PT-L3',
    itemCode: 'PT-L3-03',
    clauses: { iso9001: '7.1.5', famiQs: '7.1.5', dldGhpsHaccp: 'GHPs: ข้อ 13.1.1' },
    clauseSummary: 'ISO 9001: 7.1.5 | FAMI-QS: 7.1.5 | DLD GHPs: ข้อ 13.1.1',
    questionTh: 'เครื่องชั่งสารสกัดสำคัญและสารเสริมเข้มข้น (Micro-ingredients) มีการทวนสอบความเที่ยงตรงประจำวันด้วยตุ้มน้ำหนักมาตรฐาน (Daily Calibration Check) หรือไม่?',
    evidenceExamples: ['ใบบันทึก Daily Balance Check ก่อนเริ่มงานชั่งสารสำคัญ', 'ตุ้มน้ำหนักมาตรฐานมีใบรับรองสอบเทียบที่ยังไม่หมดอายุ'],
    depthLevel: 'standard'
  },

  // PT-L4: ฝ่ายผลิต Line 4 (ยาเม็ด)
  {
    id: 'chk-pt-l4-01',
    departmentCode: 'PT-L4',
    itemCode: 'PT-L4-01',
    clauses: { iso9001: '8.5.1', famiQs: '8.4', dldGhpsHaccp: 'GHPs: ข้อ 11.1' },
    clauseSummary: 'ISO 9001: 8.5.1 | FAMI-QS: 8.4 | DLD GHPs: ข้อ 11.1',
    questionTh: 'เครื่องตอกยาเม็ด (Rotary Tablet Press) สากและดาย (Punch & Die) ได้รับการทำความสะอาด ตรวจสอบการสึกหรอ และหล่อลื่นด้วยจารบีเกรดอาหารหรือไม่?',
    evidenceExamples: ['บันทึกการบำรุงรักษาและตรวจสอบสาก-ดายตอกยาเม็ด', 'ใบรับรองสารหล่อลื่น Food/Feed Grade Lubricant'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pt-l4-02',
    departmentCode: 'PT-L4',
    itemCode: 'PT-L4-02',
    clauses: { iso9001: '8.5.1', famiQs: '8.5.1', dldGhpsHaccp: 'GHPs: ข้อ 13.1.2' },
    clauseSummary: 'ISO 9001: 8.5.1 | FAMI-QS: 8.5.1 | DLD GHPs: ข้อ 13.1.2',
    questionTh: 'มีการสุ่มตรวจ In-process Control ของเม็ดยาระหว่างการผลิต ทั้งน้ำหนักเฉลี่ย, ความแข็ง (Hardness) และความกร่อน (Friability) ครบถ้วนตาม SOP หรือไม่?',
    evidenceExamples: ['ใบบันทึก In-process Tablet Physical Testing ตามรอบเวลา', 'ค่าความแข็งและความกร่อนอยู่ในเกณฑ์มาตรฐานที่ระบุในสูตร'],
    depthLevel: 'standard'
  },

  // PT-L5: ฝ่ายผลิต Line 5 (แชมพู/สเปรย์)
  {
    id: 'chk-pt-l5-01',
    departmentCode: 'PT-L5',
    itemCode: 'PT-L5-01',
    clauses: { iso9001: '8.5.1', famiQs: '8.4', dldGhpsHaccp: 'GHPs: ข้อ 8.2, 13.1' },
    clauseSummary: 'ISO 9001: 8.5.1 | FAMI-QS: 8.4 | DLD GHPs: ข้อ 8.2, 13.1',
    questionTh: 'กระบวนการผสมแชมพูและสเปรย์มีการควบคุมอัตราส่วนสารลดแรงตึงผิว สารออกฤทธิ์ และตรวจวัดค่า pH และความหนืดตรงตามสูตรหรือไม่?',
    evidenceExamples: ['บันทึกการควบคุมกระบวนการผลิตแชมพู/สเปรย์', 'ผลการตรวจวัดค่า pH และความหนืด (Viscosity) ก่อนปล่อยบรรจุ'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pt-l5-02',
    departmentCode: 'PT-L5',
    itemCode: 'PT-L5-02',
    clauses: { iso9001: '8.5.1', famiQs: '8.5.1', dldGhpsHaccp: 'GHPs: ข้อ 13.1.2' },
    clauseSummary: 'ISO 9001: 8.5.1 | FAMI-QS: 8.5.1 | DLD GHPs: ข้อ 13.1.2',
    questionTh: 'หัวฉีดสเปรย์และสายจ่ายบรรจุได้รับการตรวจสอบความสะอาด การทำงานของหัวสเปรย์ และการทดสอบการรั่วซึม (Pump/Trigger Leak Test) หรือไม่?',
    evidenceExamples: ['บันทึกการสุ่มตรวจการทำงานของหัวฉีดสเปรย์', 'รายงานผลการทดสอบการรั่วซึมของหัวปั๊ม/สเปรย์'],
    depthLevel: 'standard'
  },

  // PT-L6: ฝ่ายผลิต Line 6 (อาหารเสริมสัตว์เลี้ยง)
  {
    id: 'chk-pt-l6-01',
    departmentCode: 'PT-L6',
    itemCode: 'PT-L6-01',
    clauses: { iso9001: '8.5.1', famiQs: '8.4', dldGhpsHaccp: 'GHPs: ข้อ 13.1.1, 13.2.1' },
    clauseSummary: 'ISO 9001: 8.5.1 | FAMI-QS: 8.4 | DLD GHPs: ข้อ 13.1.1, 13.2.1',
    questionTh: 'การผลิตอาหารเสริมสัตว์เลี้ยง (วิตามิน/พาสต์/ผงชง) มีการตรวจสอบปริมาณสารสำคัญ และควบคุมความสะอาดตามเกณฑ์สุขลักษณะอย่างเคร่งครัดหรือไม่?',
    evidenceExamples: ['ใบบันทึกการผลิตอาหารเสริมสัตว์เลี้ยงและทวนสอบสารสำคัญ', 'บันทึกการตรวจสุขลักษณะพนักงานและสภาพแวดล้อมพื้นที่ผลิต'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pt-l6-02',
    departmentCode: 'PT-L6',
    itemCode: 'PT-L6-02',
    clauses: { famiQs: '8.4.3', dldGhpsHaccp: 'GHPs: ข้อ 13.2.5' },
    clauseSummary: 'FAMI-QS: 8.4.3 | DLD GHPs: ข้อ 13.2.5',
    questionTh: 'มีระบบควบคุมสารก่อภูมิแพ้ (Allergen Cross-contact Control) ในผลิตภัณฑ์อาหารเสริมสัตว์เลี้ยงที่มีส่วนผสมของโปรตีนเฉพาะ เช่น ไก่ ปลา นม หรือไม่?',
    evidenceExamples: ['ขั้นตอนการล้างทำความสะอาดหลังสูตรที่มีสารก่อภูมิแพ้', 'บันทึกการตรวจสอบ Swab Test สารก่อภูมิแพ้ตกค้าง'],
    depthLevel: 'standard'
  },

  // PT-L7: ฝ่ายผลิต Line 7 (โภชนเภสัช)
  {
    id: 'chk-pt-l7-01',
    departmentCode: 'PT-L7',
    itemCode: 'PT-L7-01',
    clauses: { iso9001: '7.1.4', famiQs: '7.1.4', dldGhpsHaccp: 'GHPs: ข้อ 9.2, 10.1' },
    clauseSummary: 'ISO 9001: 7.1.4 | FAMI-QS: 7.1.4 | DLD GHPs: ข้อ 9.2, 10.1',
    questionTh: 'ห้องผลิตโภชนเภสัชมีการควบคุมความดันบวก (Positive Pressure) อุณหภูมิ และความชื้นสัมพัทธ์ พร้อมขั้นตอนการเปลี่ยนชุดเข้าห้องสะอาดอย่างถูกต้องหรือไม่?',
    evidenceExamples: ['บันทึกความดันต่าง (Magnehelic Gauge Differential Pressure)', 'ระเบียบการสวมชุด Cleanroom Gowning และการผ่าน Air Shower'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pt-l7-02',
    departmentCode: 'PT-L7',
    itemCode: 'PT-L7-02',
    clauses: { iso9001: '8.5.1', famiQs: '8.5', dldGhpsHaccp: 'GHPs: ข้อ 13.1.2' },
    clauseSummary: 'ISO 9001: 8.5.1 | FAMI-QS: 8.5 | DLD GHPs: ข้อ 13.1.2',
    questionTh: 'มีการคำนวณและกระทบยอดผลผลิต (Yield Reconciliation) ทุก Batch และมีเกณฑ์สอบสวนกรณีเกิดส่วนต่างเกินค่าควบคุมหรือไม่?',
    evidenceExamples: ['ใบบันทึกการคำนวณ Yield Reconciliation ใน Batch Record', 'บันทึกการสอบสวนกรณี Yield เบี่ยงเบนเกินเกณฑ์'],
    depthLevel: 'standard'
  },

  // PT-L8: ฝ่ายผลิต Line 8 (Pet Food)
  {
    id: 'chk-pt-l8-01',
    departmentCode: 'PT-L8',
    itemCode: 'PT-L8-01',
    clauses: { famiQs: '8.4', dldGhpsHaccp: 'HACCP: ข้อ 17, 18' },
    clauseSummary: 'FAMI-QS: 8.4 | DLD HACCP: ข้อ 17, 18',
    questionTh: 'จุดวิกฤต CCP เครื่องเอ็กซ์ทรูเดอร์ (Extruder Temperature & Pressure) ได้รับการบันทึกต่อเนื่องและคุมให้อยู่ใน Critical Limits เพื่อฆ่าเชื้อ Salmonella หรือไม่?',
    evidenceExamples: ['บันทึกอุณหภูมิและความดัน Extruder Chart/SCADA Log', 'เอกสารทวนสอบความถูกต้องของเซนเซอร์วัดอุณหภูมิ CCP'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pt-l8-02',
    departmentCode: 'PT-L8',
    itemCode: 'PT-L8-02',
    clauses: { famiQs: '8.4', dldGhpsHaccp: 'HACCP: ข้อ 17, 19' },
    clauseSummary: 'FAMI-QS: 8.4 | DLD HACCP: ข้อ 17, 19',
    questionTh: 'จุดวิกฤต CCP เครื่องตรวจจับโลหะ (Metal Detector) ประจำไลน์ Pet Food ได้รับการทดสอบด้วย Test Piece (Fe, Non-Fe, SS) ทุก 2 ชั่วโมง และบันทึกผลครบถ้วนหรือไม่?',
    evidenceExamples: ['ใบบันทึกการทดสอบ Metal Detector ทุก 2 ชม.', 'การทดสอบกลไก Reject Mechanism ผลักสินค้าชิ้นทดสอบตกรางอย่างถูกต้อง'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pt-l8-03',
    departmentCode: 'PT-L8',
    itemCode: 'PT-L8-03',
    clauses: { famiQs: '8.4', dldGhpsHaccp: 'GHPs: ข้อ 13.1, 13.2' },
    clauseSummary: 'FAMI-QS: 8.4 | DLD GHPs: ข้อ 13.1, 13.2',
    questionTh: 'การอบแห้งเม็ดอาหารสัตว์ (Dryer) มีการตรวจวัดค่าความชื้นและ Water Activity (aw) ให้อยู่ในเกณฑ์ที่ป้องกันเชื้อราหรือไม่?',
    evidenceExamples: ['บันทึกผลการตรวจวิเคราะห์ Moisture & aw ของเม็ดอาหารสัตว์', 'เกณฑ์ค่าความชื้นควบคุมไม่เกินค่ากำหนดใน Specification'],
    depthLevel: 'standard'
  },

  // PT-L9: ฝ่ายผลิต Line 9 (บรรจุเสร็จ)
  {
    id: 'chk-pt-l9-01',
    departmentCode: 'PT-L9',
    itemCode: 'PT-L9-01',
    clauses: { iso9001: '8.5.2, 8.5.4', famiQs: '8.5.2, 8.6', dldGhpsHaccp: 'GHPs: ข้อ 14.1, 14.3' },
    clauseSummary: 'ISO 9001: 8.5.2, 8.5.4 | FAMI-QS: 8.5.2, 8.6 | DLD GHPs: ข้อ 14.1, 14.3',
    questionTh: 'การพิมพ์วันที่ผลิต วันหมดอายุ และเลข Lot Number บนบรรจุภัณฑ์สำเร็จรูป มีความคมชัด ถูกต้องตรงกับใบสั่งผลิต และสามารถสอบกลับได้หรือไม่?',
    evidenceExamples: ['ตัวอย่างตัวพิมพ์ Inkjet Coding บนบรรจุภัณฑ์เสร็จ', 'บันทึกการตรวจสอบความถูกต้องของฉลากก่อนเริ่มบรรจุกล่อง'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pt-l9-02',
    departmentCode: 'PT-L9',
    itemCode: 'PT-L9-02',
    clauses: { iso9001: '8.5.1', famiQs: '8.5.1', dldGhpsHaccp: 'GHPs: ข้อ 13.1.2' },
    clauseSummary: 'ISO 9001: 8.5.1 | FAMI-QS: 8.5.1 | DLD GHPs: ข้อ 13.1.2',
    questionTh: 'เครื่องชั่งน้ำหนักอัตโนมัติ (Checkweigher) และเครื่องตรวจสอบสิ่งแปลกปลอมปลายทางได้รับการทดสอบความถูกต้องและระบบ Reject ทำงานอย่างสมบูรณ์หรือไม่?',
    evidenceExamples: ['บันทึกการทดสอบ Checkweigher ด้วยตุ้มมาตรฐาน', 'การทดสอบระบบคัดแยกกล่องน้ำหนักเกิน/ขาด'],
    depthLevel: 'standard'
  },
  {
    id: 'chk-pt-l9-03',
    departmentCode: 'PT-L9',
    itemCode: 'PT-L9-03',
    clauses: { iso9001: '8.5.4', famiQs: '8.6', dldGhpsHaccp: 'GHPs: ข้อ 15.1' },
    clauseSummary: 'ISO 9001: 8.5.4 | FAMI-QS: 8.6 | DLD GHPs: ข้อ 15.1',
    questionTh: 'การจัดเรียงบนพาเลท การพันฟิล์มยืด (Stretch Film) และการติดป้าย Pallet Tag มีความแข็งแรง เรียบร้อย ป้องกันความเสียหายก่อนส่งมอบเข้าคลังสินค้าหรือไม่?',
    evidenceExamples: ['สภาพพาเลทสินค้าสำเร็จรูปที่พันฟิล์มเรียบร้อย', 'ป้าย Pallet Tag ระบุชื่อสินค้า Lot จำนวนกล่อง ชัดเจน'],
    depthLevel: 'standard'
  },
];

export const STANDARDS_DATABASE_DATA: StandardClauseDetail[] = STANDARDS_COMPLETE_DATA;

export const INITIAL_ANNUAL_PLAN_ROWS: any[] = DEPARTMENTS_DATA.map((dept) => {
  const monthsState: any = {};
  for (let m = 1; m <= 12; m++) {
    monthsState[m] = { plan: false, actual: false };
  }

  return {
    departmentCode: dept.code,
    departmentName: dept.nameTh,
    standardsClause: dept.code.startsWith('PT-') ? 'ISO: 8.5.1, FAMI: 8.4, GHPs: ข้อ 8, 13' :
                    dept.code === 'QA' ? 'ISO: 8.6, 8.7, FAMI: 8.5, 8.8' :
                    dept.code === 'QMR' ? 'ISO: 4-6, 9.3, FAMI: 4-6, 9.3' :
                    'ISO: 7, 8, FAMI: 7, 8, GHPs: ข้อ 7-15',
    months: monthsState,
    remarks: ''
  };
});

export const INITIAL_SCHEDULES: AuditScheduleItem[] = [];

export const INITIAL_CAPAS: any[] = [];

export const INITIAL_NOTIFICATIONS: any[] = [];

export const INITIAL_APP_STATE: AppState = {
  users: USERS_DATA,
  currentUser: USERS_DATA[0], // default profile placeholder
  isAuthenticated: false,
  loginTimestamp: undefined,
  departments: DEPARTMENTS_DATA,
  checklistBank: CHECKLIST_BANK_DATA,
  annualPlanHeader: {
    formNumber: 'FM-QM-013',
    revisionNumber: '16',
    effectiveDate: '17/04/2562',
    yearBe: 2569,
    systemText: 'ISO 9001:2015, GHPs/HACCP กรมปศุสัตว์, FAMI-QS V.6',
    preparedBy: 'คุณชวิน พาพิทักษ์ (QMR)',
    preparedDate: '05/01/2569',
    approvedBy: 'คุณชะเวง สุวรรณ์มณี (กรรมการผู้จัดการ/โรงงาน)',
    approvedDate: '10/01/2569'
  },
  annualPlanRows: INITIAL_ANNUAL_PLAN_ROWS,
  scheduleHeader: {
    formNumber: 'FM-QM-018',
    revisionNumber: '07',
    effectiveDate: '31/05/2565',
    cycleText: '1/2569',
    preparedBy: 'คุณอิสรีย์ ฐิติโชติธนรัฐ (Lead Auditor)',
    preparedDate: '25/10/2569',
    approvedBy: 'คุณชวิน พาพิทักษ์ (QMR)',
    approvedDate: '28/10/2569',
    appliedStandards: {
      iso9001: true,
      ghpsHaccp: true,
      famiQs: true,
      other: ''
    }
  },
  schedules: INITIAL_SCHEDULES,
  checklistAssessments: [],
  capas: INITIAL_CAPAS,
  standardsDatabase: STANDARDS_DATABASE_DATA,
  notifications: INITIAL_NOTIFICATIONS,
  templateConfig: {
    companyNameTh: 'บริษัท เวท ซุปพีเรีย คอนซัลแตนท์ จำกัด',
    companyNameEn: 'Vet Superior Consultant Co., Ltd.',
    plantLocationTh: 'โรงงาน : สมุทรสาคร',
    fmQm013: {
      docNumber: 'FM-QM-013',
      revision: '16',
      effectiveDate: '17/04/2562'
    },
    fmQm018: {
      docNumber: 'FM-QM-018',
      revision: '07',
      effectiveDate: '31/05/2565'
    },
    fmQm014: {
      docNumber: 'FM-QM-014',
      revision: '08',
      effectiveDate: '01/11/2569'
    },
    fmQm021: {
      docNumber: 'FM-QM-021',
      revision: '04',
      effectiveDate: '26/11/2559'
    },
    printFooterNote: 'เอกสารควบคุมคุณภาพ - ห้ามทำซ้ำหรือดัดแปลงโดยไม่ได้รับอนุญาตจากตัวแทนฝ่ายบริหาร (QMR)'
  },
  lastUpdated: new Date().toISOString()
};
