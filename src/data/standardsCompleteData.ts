import { StandardClauseDetail } from '../types';

export const STANDARDS_COMPLETE_DATA: StandardClauseDetail[] = [
  // ==========================================
  // 1. ISO 9001:2015 (ข้อ 4 - ข้อ 10)
  // ==========================================
  {
    id: 'iso-4.1',
    standard: 'ISO 9001',
    clauseNumber: '4.1',
    titleTh: 'ความเข้าใจในองค์กรและบริบทขององค์กร',
    titleEn: 'Understanding the organization and its context',
    descriptionTh: 'องค์กรต้องระบุประเด็นภายนอกและภายในที่เกี่ยวข้องกับจุดประสงค์ ทิศทางเชิงกลยุทธ์ และความสามารถในการบรรลุผลลัพธ์ของระบบบริหารคุณภาพ',
    descriptionEn: 'The organization shall determine external and internal issues that are relevant to its purpose and its strategic direction and that affect its ability to achieve the intended results of its quality management system.',
    keyRequirementsTh: [
      'จัดทำเอกสารการวิเคราะห์บริบทองค์กร (เช่น SWOT Analysis, PESTEL Analysis)',
      'ทบทวนประเด็นภายนอก (กฎหมาย, เทคโนโลยี, การแข่งขัน, ตลาดอาหารสัตว์) และภายใน (วัฒนธรรม, ความรู้, สมรรถนะ)',
      'มีการติดตามและทบทวนข้อมูลเกี่ยวกับประเด็นเหล่านี้เป็นระยะอย่างน้อยปีละ 1 ครั้ง'
    ],
    keyRequirementsEn: [
      'Document organizational context analysis (e.g. SWOT Analysis, PESTEL Analysis)',
      'Review external factors (statutory/regulatory, technological, competitive, market) and internal factors (culture, knowledge, performance)',
      'Monitor and review information about external and internal issues periodically at least annually'
    ],
    departmentRelevance: ['QMR', 'DC', 'MK', 'PR', 'TC'],
    famiComparisonNote: 'FAMI-QS 4.1 เน้นเพิ่มเติมเรื่องบริบทความปลอดภัยของสารเสริมและพรีมิกซ์สำหรับอาหารสัตว์ (Specialty Feed Ingredients) และกฎหมายอาหารสัตว์ระหว่างประเทศ'
  },
  {
    id: 'iso-4.2',
    standard: 'ISO 9001',
    clauseNumber: '4.2',
    titleTh: 'ความเข้าใจในความต้องการและความคาดหวังของผู้มีส่วนได้ส่วนเสีย',
    titleEn: 'Understanding the needs and expectations of interested parties',
    descriptionTh: 'องค์กรต้องกำหนดผู้มีส่วนได้ส่วนเสียที่เกี่ยวข้องกับระบบบริหารคุณภาพ และข้อกำหนดของบุคคลเหล่านั้นที่ส่งผลต่อคุณภาพผลิตภัณฑ์',
    descriptionEn: 'The organization shall determine the interested parties that are relevant to the quality management system and the requirements of these interested parties.',
    keyRequirementsTh: [
      'จัดทำทะเบียนผู้มีส่วนได้ส่วนเสีย (กรมปศุสัตว์, ลูกค้าฟาร์มสัตว์, ซัพพลายเออร์, ชุมชน, พนักงาน)',
      'ระบุความต้องการและความคาดหวังของแต่ละกลุ่ม พร้อมมาตรการตอบสนอง',
      'ติดตามและทบทวนข้อมูลความคาดหวังในการประชุม Management Review'
    ],
    keyRequirementsEn: [
      'Maintain an Interested Parties Matrix (Department of Livestock Development, feed mills, farmers, suppliers, community, employees)',
      'Identify statutory and customer requirements and organizational response actions',
      'Monitor and review expectations in Management Review meetings'
    ],
    departmentRelevance: ['QMR', 'SR', 'FR', 'PR', 'QA'],
    famiComparisonNote: 'FAMI-QS 4.2 ระบุให้รวมถึงหน่วยรับรองมาตรฐานสากลและผู้มีอำนาจตามกฎหมายด้านอาหารสัตว์ระหว่างประเทศ'
  },
  {
    id: 'iso-4.3',
    standard: 'ISO 9001',
    clauseNumber: '4.3',
    titleTh: 'การกำหนดขอบเขตของระบบบริหารคุณภาพ',
    titleEn: 'Determining the scope of the quality management system',
    descriptionTh: 'องค์กรต้องกำหนดขอบเขตและความสามารถในการประยุกต์ใช้ของระบบบริหารคุณภาพ เพื่อกำหนดขอบเขตการรับรองให้ชัดเจน',
    descriptionEn: 'The organization shall determine the boundaries and applicability of the quality management system to establish its scope.',
    keyRequirementsTh: [
      'ระบุขอบข่ายการผลิต ณ โรงงานสมุทรสาคร (ยาน้ำ, ยาผง, พรีมิกซ์, ยาเม็ด, แชมพู, อาหารเสริมสัตว์เลี้ยง)',
      'ระบุข้อยกเว้นที่ไม่ประยุกต์ใช้พร้อมเหตุผลความสมเหตุสมผล (เช่น ข้อ 8.3 กรณีไม่มีการออกแบบสูตรเฉพาะ)',
      'เอกสารขอบเขตต้องเผยแพร่และจัดเก็บเป็นสารสนเทศที่เป็นเอกสาร'
    ],
    keyRequirementsEn: [
      'Define manufacturing scope at Samut Sakhon plant (liquid drugs, powder drugs, premixes, pet supplements, pet care)',
      'Document any non-applicable requirements with full justification',
      'Maintain scope statement as documented information available to relevant parties'
    ],
    departmentRelevance: ['QMR', 'DC'],
    famiComparisonNote: 'FAMI-QS 4.3 ครอบคลุมการผลิตและการค้า Specialty Feed Ingredients and Mixtures'
  },
  {
    id: 'iso-4.4',
    standard: 'ISO 9001',
    clauseNumber: '4.4',
    titleTh: 'ระบบบริหารคุณภาพและกระบวนการ',
    titleEn: 'Quality management system and its processes',
    descriptionTh: 'องค์กรต้องจัดทำ นำไปปฏิบัติ ธำรงไว้ และปรับปรุงระบบบริหารคุณภาพอย่างต่อเนื่อง รวมถึงกระบวนการที่จำเป็นและการปฏิสัมพันธ์ระหว่างกระบวนการ',
    descriptionEn: 'The organization shall establish, implement, maintain and continually improve a quality management system, including the processes needed and their interactions.',
    keyRequirementsTh: [
      'จัดทำผังกระบวนการทางธุรกิจ (Process Flow Interaction / Turtle Diagram)',
      'กำหนดปัจจัยนำเข้า (Inputs), ผลลัพธ์ (Outputs), ตัวชี้วัด (KPIs) และเกณฑ์การควบคุมของแต่ละฝ่าย',
      'กำหนดผู้รับผิดชอบกระบวนการ (Process Owners)'
    ],
    keyRequirementsEn: [
      'Document process interaction maps (Process Flow / Turtle Diagrams)',
      'Define inputs, outputs, process KPIs, risks, and process criteria for all 18 departments',
      'Assign competent process owners for each operational area'
    ],
    departmentRelevance: ['QMR', 'DC', 'ทุกแผนก'],
    famiComparisonNote: 'FAMI-QS 4.4 บูรณาการหลักการ Feed Safety Management System เข้ากับกระบวนการหลัก'
  },
  {
    id: 'iso-5.1',
    standard: 'ISO 9001',
    clauseNumber: '5.1',
    titleTh: 'ความเป็นผู้นำและความมุ่งมั่น',
    titleEn: 'Leadership and commitment',
    descriptionTh: 'ผู้บริหารระดับสูงต้องแสดงความเป็นผู้นำและความมุ่งมั่นต่อระบบบริหารคุณภาพ และการมุ่งเน้นความพึงพอใจของลูกค้า',
    descriptionEn: 'Top management shall demonstrate leadership and commitment with respect to the quality management system and customer focus.',
    keyRequirementsTh: [
      'ผู้บริหารแสดงความรับผิดชอบต่อประสิทธิผลของระบบ QMS',
      'จัดสรรทรัพยากรที่จำเป็นอย่างเพียงพอ (คน, เครื่องจักร, เทคโนโลยี, งบประมาณ)',
      'ส่งเสริมการปรับปรุงอย่างต่อเนื่องและการมุ่งเน้นลูกค้า'
    ],
    keyRequirementsEn: [
      'Top management takes accountability for the effectiveness of the QMS',
      'Ensure adequate allocation of resources (personnel, equipment, infrastructure)',
      'Promote continual improvement and consistent customer satisfaction'
    ],
    departmentRelevance: ['QMR'],
    famiComparisonNote: 'FAMI-QS 5.1 บังคับให้ผู้บริหารต้องแสดงความมุ่งมั่นโดยตรงต่อวัฒนธรรมความปลอดภัยอาหารสัตว์ (Feed Safety Culture)'
  },
  {
    id: 'iso-5.2',
    standard: 'ISO 9001',
    clauseNumber: '5.2',
    titleTh: 'นโยบายคุณภาพ',
    titleEn: 'Quality Policy',
    descriptionTh: 'ผู้บริหารระดับสูงต้องจัดทำ นำไปปฏิบัติ และธำรงไว้นโยบายคุณภาพที่เหมาะสมกับวัตถุประสงค์และบริบทขององค์กร',
    descriptionEn: 'Top management shall establish, implement and maintain a quality policy that is appropriate to the purpose and context of the organization.',
    keyRequirementsTh: [
      'นโยบายมีพันธสัญญาในการปฏิบัติตามข้อกำหนดและการปรับปรุงอย่างต่อเนื่อง',
      'เป็นกรอบสำหรับการกำหนดและทบทวนวัตถุประสงค์คุณภาพ (KPIs)',
      'สื่อสารให้เข้าใจและนำไปปฏิบัติทั่วทั้งองค์กร และพร้อมเผยแพร่ต่อภายนอก'
    ],
    keyRequirementsEn: [
      'Include commitment to satisfy applicable requirements and continual improvement',
      'Provide framework for setting and reviewing quality objectives',
      'Be communicated, understood, and applied within the organization'
    ],
    departmentRelevance: ['QMR', 'HR', 'ทุกแผนก'],
    famiComparisonNote: 'FAMI-QS 4.5/5.2 กำหนดให้นโยบายต้องระบุชัดเจนถึงการผลิตอาหารสัตว์ที่ปลอดภัย ถูกกฎหมาย และมีสุขอนามัย'
  },
  {
    id: 'iso-5.3',
    standard: 'ISO 9001',
    clauseNumber: '5.3',
    titleTh: 'บทบาท หน้าที่ ความรับผิดชอบ และอำนาจหน้าที่ในองค์กร',
    titleEn: 'Organizational roles, responsibilities and authorities',
    descriptionTh: 'ผู้บริหารระดับสูงต้องมั่นใจว่าหน้าที่ ความรับผิดชอบ และอำนาจสำหรับบทบาทที่เกี่ยวข้อง ได้รับการมอบหมาย สื่อสาร และทำความเข้าใจทั่วทั้งองค์กร',
    descriptionEn: 'Top management shall ensure that the responsibilities and authorities for relevant roles are assigned, communicated and understood within the organization.',
    keyRequirementsTh: [
      'มีแผนผังโครงสร้างองค์กร (Organization Chart) ที่เป็นปัจจุบัน',
      'มีคำอธิบายลักษณะงาน (Job Description) ระบุความรับผิดชอบด้านคุณภาพและอำนาจสั่งการ',
      'แต่งตั้ง QMR, Lead Auditor, และทีม HACCP / Feed Safety Team เป็นลายลักษณ์อักษร'
    ],
    keyRequirementsEn: [
      'Maintain up-to-date Organization Chart and reporting hierarchy',
      'Maintain signed Job Descriptions specifying quality and feed safety duties',
      'Appoint QMR, Lead Auditors, and HACCP/Feed Safety Team in formal written decrees'
    ],
    departmentRelevance: ['QMR', 'HR'],
    famiComparisonNote: 'FAMI-QS 5.3 กำหนดคุณสมบัติหัวหน้าทีม Feed Safety Team ต้องผ่านการฝึกอบรมเฉพาะทางด้านอาหารสัตว์'
  },
  {
    id: 'iso-6.1',
    standard: 'ISO 9001',
    clauseNumber: '6.1',
    titleTh: 'การดำเนินการเพื่อจัดการความเสี่ยงและโอกาส',
    titleEn: 'Actions to address risks and opportunities',
    descriptionTh: 'องค์กรต้องพิจารณาประเด็นบริบทและความคาดหวัง เพื่อกำหนดความเสี่ยงและโอกาสที่จำเป็นต้องได้รับการจัดการเพื่อให้ระบบ QMS บรรลุผลตามที่ตั้งไว้',
    descriptionEn: 'When planning for the quality management system, the organization shall consider the issues and requirements and determine the risks and opportunities that need to be addressed.',
    keyRequirementsTh: [
      'จัดทำทะเบียนความเสี่ยงและโอกาส (Risk & Opportunity Register) ของทั้ง 18 ฝ่าย',
      'ประเมินระดับความเสี่ยงด้วยเกณฑ์ โอกาสเกิด x ความรุนแรง (Likelihood x Severity)',
      'กำหนดมาตรการจัดการความเสี่ยงและติดตามประเมินผลสัมฤทธิ์'
    ],
    keyRequirementsEn: [
      'Maintain Risk & Opportunity Registers across all 18 departments',
      'Evaluate risk levels using Likelihood x Severity matrices',
      'Define risk treatment action plans and monitor residual risk levels'
    ],
    departmentRelevance: ['QMR', 'QA', 'PT', 'WH', 'PR', 'EN'],
    famiComparisonNote: 'FAMI-QS 6.1 มุ่งเน้นความเสี่ยงด้านความปลอดภัยอาหารสัตว์ (Feed Safety Hazard), การประเมินความเปราะบางต่อการปลอมปน (Feed Fraud) และการป้องกันวินาศกรรม (Feed Defense)'
  },
  {
    id: 'iso-6.2',
    standard: 'ISO 9001',
    clauseNumber: '6.2',
    titleTh: 'วัตถุประสงค์คุณภาพและการวางแผนเพื่อให้บรรลุ',
    titleEn: 'Quality objectives and planning to achieve them',
    descriptionTh: 'องค์กรต้องกำหนดวัตถุประสงค์คุณภาพในฟังก์ชัน ระดับ และกระบวนการที่เกี่ยวข้อง เพื่อสนับสนุนนโยบายคุณภาพ',
    descriptionEn: 'The organization shall establish quality objectives at relevant functions, levels and processes needed for the quality management system.',
    keyRequirementsTh: [
      'กำหนดวัตถุประสงค์คุณภาพ (KPIs) ที่วัดผลได้ในทุกแผนก',
      'มี Action Plan ระบุ: ใครทำ, ทำอะไร, ใช้งบเท่าใด, แล้วเสร็จเมื่อใด, วัดผลอย่างไร',
      'รายงานและทบทวนความคืบหน้าของ KPI ทุกไตรมาส'
    ],
    keyRequirementsEn: [
      'Establish measurable quality objectives (KPIs) for all functional areas',
      'Create Action Plans defining tasks, resources, responsibilities, timeframes, and evaluation criteria',
      'Track and review quarterly KPI achievement in Management Review'
    ],
    departmentRelevance: ['QMR', 'ทุกแผนก'],
    famiComparisonNote: 'FAMI-QS 6.2 กำหนดให้ต้องมีวัตถุประสงค์เฉพาะเจาะจงด้าน Feed Safety (เช่น ค่าความแม่นยำในการผสมยา, อัตราข้อร้องเรียนด้านสารปนเปื้อน)'
  },
  {
    id: 'iso-6.3',
    standard: 'ISO 9001',
    clauseNumber: '6.3',
    titleTh: 'การวางแผนการเปลี่ยนแปลง',
    titleEn: 'Planning of changes',
    descriptionTh: 'เมื่อองค์กรพิจารณาความจำเป็นในการเปลี่ยนแปลงระบบ QMS การเปลี่ยนแปลงนั้นต้องดำเนินการอย่างเป็นระบบและมีการวางแผน',
    descriptionEn: 'When the organization determines the need for changes to the quality management system, the changes shall be carried out in a planned manner.',
    keyRequirementsTh: [
      'จัดทำขั้นตอนการควบคุมการเปลี่ยนแปลง (Change Control Procedure)',
      'ประเมินผลกระทบต่อคุณภาพ วัตถุดิบ เครื่องจักร และกระบวนการผลิตก่อนดำเนินการ',
      'เก็บบันทึกการอนุมัติการเปลี่ยนแปลงโดย QMR และผู้จัดการฝ่ายที่เกี่ยวข้อง'
    ],
    keyRequirementsEn: [
      'Implement a formal Change Control Procedure',
      'Assess potential impact on quality, safety, validation, and resources prior to execution',
      'Retain documented change authorization and post-change verification'
    ],
    departmentRelevance: ['QMR', 'QA', 'PT', 'EN', 'RD'],
    famiComparisonNote: 'FAMI-QS 6.3 กำหนดว่าการเปลี่ยนแหล่งวัตถุดิบหรือเครื่องผสมต้องผ่านการทบทวน HACCP และ Re-validation'
  },
  {
    id: 'iso-7.1',
    standard: 'ISO 9001',
    clauseNumber: '7.1',
    titleTh: 'ทรัพยากร (คน, โครงสร้างพื้นฐาน, สภาพแวดล้อม, เครื่องมือวัด)',
    titleEn: 'Resources (General, Infrastructure, Environment, Monitoring & Measuring)',
    descriptionTh: 'องค์กรต้องกำหนดและจัดหาทรัพยากรที่จำเป็นสำหรับการจัดทำ นำไปปฏิบัติ ธำรงไว้ และปรับปรุงระบบบริหารคุณภาพอย่างต่อเนื่อง',
    descriptionEn: 'The organization shall determine and provide the resources needed for the establishment, implementation, maintenance and continual improvement of the QMS.',
    keyRequirementsTh: [
      '7.1.2 บุคลากร: จัดสรรกำลังคนที่มีความสามารถเพียงพอในแต่ละกะการผลิต',
      '7.1.3 โครงสร้างพื้นฐาน: อาคาร โรงงาน ระบบระบายอากาศ แอร์คลีนรูม และระบบจ่ายไฟสำรอง',
      '7.1.4 สภาพแวดล้อม: ควบคุมอุณหภูมิ ความชื้น แสงสว่าง และสุขอนามัยในสายการผลิต',
      '7.1.5 เครื่องมือวัด: แผนการสอบเทียบ (Calibration Plan) และการทวนสอบประจำวันสำหรับเครื่องชั่ง เทอร์โมมิเตอร์',
      '7.1.6 ความรู้ขององค์กร: เก็บรวบรวมองค์ความรู้ด้านสูตรอาหารสัตว์และมาตรฐานการควบคุม'
    ],
    keyRequirementsEn: [
      '7.1.2 People: Allocate competent personnel across operational shifts',
      '7.1.3 Infrastructure: Provide cleanroom HVAC, utilities, maintenance, and IT systems',
      '7.1.4 Environment: Control temperature, humidity, lighting, and contamination barriers',
      '7.1.5 Calibration: Maintain calibration master list, traceable certificates, daily scale verifications',
      '7.1.6 Organizational knowledge: Document internal technical know-how and formulations'
    ],
    departmentRelevance: ['EN', 'HR', 'IT', 'PT', 'QA', 'CM', 'MC'],
    famiComparisonNote: 'FAMI-QS 7.2 และ 7.9 เน้นพิเศษเรื่องการบำรุงรักษาเชิงป้องกันเครื่องผสม และการสอบเทียบเครื่องชั่งน้ำหนักไมโคร (Micro-dosing)'
  },
  {
    id: 'iso-7.2',
    standard: 'ISO 9001',
    clauseNumber: '7.2',
    titleTh: 'ความสามารถและการฝึกอบรม',
    titleEn: 'Competence',
    descriptionTh: 'องค์กรต้องกำหนดความสามารถที่จำเป็นของบุคลากรที่ทำงานภายใต้การควบคุม และจัดการฝึกอบรมเพื่อพัฒนาสมรรถนะพร้อมเก็บบันทึกหลักฐาน',
    descriptionEn: 'The organization shall determine the necessary competence of person(s) doing work under its control that affects quality performance, and provide training or other actions.',
    keyRequirementsTh: [
      'จัดทำตาราง Competency Matrix สำหรับทุกตำแหน่งงาน',
      'จัดทำแผนฝึกอบรมประจำปี (Annual Training Plan) ครอบคลุม ISO, GHPs/HACCP, FAMI-QS',
      'ประเมินประสิทธิผลหลังการฝึกอบรม (Post-training Evaluation) และเก็บบันทึกประวัติพนักงาน'
    ],
    keyRequirementsEn: [
      'Maintain Skill & Competency Matrices for all positions',
      'Establish Annual Training Plan covering ISO 9001, GHPs/HACCP, and FAMI-QS',
      'Evaluate training effectiveness and retain training attendance records and certificates'
    ],
    departmentRelevance: ['HR', 'QMR', 'ทุกแผนก'],
    famiComparisonNote: 'FAMI-QS 7.1 บังคับให้พนักงานฝ่ายผลิตทุกคนต้องผ่านการอบรมเรื่อง Feed Hygiene และความเสี่ยง Cross-contamination'
  },
  {
    id: 'iso-7.3',
    standard: 'ISO 9001',
    clauseNumber: '7.3',
    titleTh: 'ความตระหนัก',
    titleEn: 'Awareness',
    descriptionTh: 'บุคลากรที่ทำงานภายใต้การควบคุมขององค์กรต้องตระหนักถึงนโยบายคุณภาพ วัตถุประสงค์ และผลกระทบของการไม่ปฏิบัติตามข้อกำหนด',
    descriptionEn: 'The organization shall ensure that persons doing work under the organization’s control are aware of the quality policy, objectives, and the implications of not conforming.',
    keyRequirementsTh: [
      'พนักงานหน้างานเข้าใจนโยบายคุณภาพและความปลอดภัยอาหารสัตว์',
      'ตระหนักถึงบทบาทของตนเองต่อการบรรลุ KPI แผนก',
      'เข้าใจผลกระทบหากปล่อยให้สินค้าปนเปื้อนหรือผสมผิดสูตรหลุดรอดสู่ลูกค้า'
    ],
    keyRequirementsEn: [
      'Ensure personnel are aware of the quality and feed safety policy',
      'Understand their individual contribution to departmental quality objectives',
      'Understand consequences of nonconformities to animal safety and customer trust'
    ],
    departmentRelevance: ['HR', 'ทุกแผนก'],
    famiComparisonNote: 'FAMI-QS เน้นการสร้างวัฒนธรรมความปลอดภัยอาหารสัตว์ (Feed Safety Culture Awareness)'
  },
  {
    id: 'iso-7.4',
    standard: 'ISO 9001',
    clauseNumber: '7.4',
    titleTh: 'การสื่อสาร',
    titleEn: 'Communication',
    descriptionTh: 'องค์กรต้องกำหนดการสื่อสารภายในและภายนอกที่เกี่ยวข้องกับระบบบริหารคุณภาพ (สื่อสารอะไร, เมื่อใด, กับใคร, อย่างไร, และใครเป็นผู้สื่อสาร)',
    descriptionEn: 'The organization shall determine the internal and external communications relevant to the quality management system.',
    keyRequirementsTh: [
      'จัดทำตารางแผนการสื่อสาร (Communication Matrix)',
      'การสื่อสารภายใน: Morning Talk, บอร์ดประชาสัมพันธ์, อีเมล, ประชุมประจำเดือน',
      'การสื่อสารภายนอก: แจ้งข่าวลูกค้า, ติดต่อกรมปศุสัตว์, ประสานงานผู้ตรวจประเมิน'
    ],
    keyRequirementsEn: [
      'Maintain internal and external Communication Matrix',
      'Internal channels: shift huddles, notice boards, intranet, monthly quality committee',
      'External channels: customer inquiries, statutory notifications to DLD, certifier audits'
    ],
    departmentRelevance: ['QMR', 'HR', 'SR', 'FR', 'PR'],
    famiComparisonNote: 'FAMI-QS บังคับให้มีช่องทางสื่อสารฉุกเฉินกรณีเกิดวิกฤตความปลอดภัยอาหารสัตว์ (Crisis Notification System)'
  },
  {
    id: 'iso-7.5',
    standard: 'ISO 9001',
    clauseNumber: '7.5',
    titleTh: 'สารสนเทศที่เป็นเอกสาร (Documented Information)',
    titleEn: 'Documented information',
    descriptionTh: 'ระบบควบคุมการจัดทำ ทบทวน อนุมัติ แจกจ่าย จัดเก็บ เรียกใช้ และทำลายเอกสารและบันทึกคุณภาพ เพื่อให้มั่นใจว่าเอกสารได้รับการควบคุมและพร้อมใช้งาน',
    descriptionEn: 'The organization’s quality management system shall include documented information required by this International Standard and determined by the organization as necessary.',
    keyRequirementsTh: [
      'จัดทำทะเบียนควบคุมเอกสารหลัก (Master List of Documents) โดยศูนย์ควบคุมเอกสาร (DC)',
      'ควบคุมสถานะ Revision, วันที่บังคับใช้ และการอนุมัติก่อนแจกจ่าย',
      'กำหนดอายุการจัดเก็บบันทึกคุณภาพไม่น้อยกว่า 3 ปี (ตามระเบียบกรมปศุสัตว์) และมีขั้นตอนทำลายเอกสารยกเลิก'
    ],
    keyRequirementsEn: [
      'Maintain Master List of Documents managed by Document Control Center (DC)',
      'Control document revisions, approval signatures, and distribution to points of use',
      'Retain quality records for at least 3 years (DLD regulatory requirement) and obsolete document disposal logs'
    ],
    departmentRelevance: ['DC', 'QMR', 'ทุกแผนก'],
    famiComparisonNote: 'FAMI-QS 7.5 กำหนดให้บันทึก Batch Manufacturing Record (BMR) และการชั่งสารพรีมิกซ์ต้องเก็บรักษาอย่างปลอดภัยและป้องกันการดัดแปลงแก้ไข'
  },
  {
    id: 'iso-8.1',
    standard: 'ISO 9001',
    clauseNumber: '8.1',
    titleTh: 'การวางแผนและการควบคุมการปฏิบัติงาน',
    titleEn: 'Operational planning and control',
    descriptionTh: 'องค์กรต้องวางแผน นำไปปฏิบัติ และควบคุมกระบวนการที่จำเป็นต่อการผลิตผลิตภัณฑ์และการให้บริการตามข้อกำหนด',
    descriptionEn: 'The organization shall plan, implement and control the processes needed to meet the requirements for the provision of products and services.',
    keyRequirementsTh: [
      'จัดทำแผนการผลิตรายวัน/รายสัปดาห์ (Production Schedule)',
      'กำหนดเกณฑ์การควบคุมกระบวนการ (Process Control Parameters) เช่น เวลาผสม, อุณหภูมิ, ความเร็วรอบ',
      'ควบคุมการเปลี่ยนแปลงและทบทวนผลกระทบจากการปฏิบัติงานที่ไม่เป็นไปตามแผน'
    ],
    keyRequirementsEn: [
      'Establish master production plans and daily manufacturing schedules',
      'Define operational parameters (mixing duration, blending temperature, line speed)',
      'Control planned and unintended changes to mitigate adverse consequences'
    ],
    departmentRelevance: ['PT', 'QA', 'WH', 'LG'],
    famiComparisonNote: 'FAMI-QS 8.1 กำหนดให้การวางแผนผลิตต้องเรียงลำดับสูตรยาเพื่อลดโอกาส Carry-over'
  },
  {
    id: 'iso-8.2',
    standard: 'ISO 9001',
    clauseNumber: '8.2',
    titleTh: 'ข้อกำหนดสำหรับผลิตภัณฑ์และบริการ (การทบทวนสัญญา/คำสั่งซื้อ)',
    titleEn: 'Requirements for products and services',
    descriptionTh: 'การสื่อสารกับลูกค้า การระบุและทบทวนข้อกำหนดที่เกี่ยวข้องกับผลิตภัณฑ์ รวมถึงข้อกำหนดทางกฎหมาย และการเปลี่ยนแปลงข้อกำหนด',
    descriptionEn: 'The organization shall ensure that it has the ability to meet the requirements for products and services to be offered to customers before committing to supply.',
    keyRequirementsTh: [
      'ทบทวนคำสั่งซื้อและสัญญาซื้อขาย (Sales Order Review) ก่อนยืนยันส่งมอบ',
      'ตรวจสอบข้อกำหนดทางกฎหมายอาหารสัตว์ (พ.ร.บ. ควบคุมคุณภาพอาหารสัตว์) และใบอนุญาตขึ้นทะเบียน',
      'จัดการข้อร้องเรียนและข้อเสนอแนะของลูกค้าอย่างเป็นระบบ'
    ],
    keyRequirementsEn: [
      'Conduct formal Sales Order Review prior to order confirmation',
      'Verify feed regulatory compliance, registration licenses, and veterinary drug permits',
      'Maintain customer feedback, inquiry, and complaint resolution channels'
    ],
    departmentRelevance: ['SR', 'FR', 'MK', 'TC', 'QA'],
    famiComparisonNote: 'FAMI-QS 8.2 ระบุให้ตรวจสอบความเข้ากันได้ของสารเสริมอาหารสัตว์กับกฎหมายประเทศปลายทางของผู้ซื้อ'
  },
  {
    id: 'iso-8.3',
    standard: 'ISO 9001',
    clauseNumber: '8.3',
    titleTh: 'การออกแบบและการพัฒนาผลิตภัณฑ์และบริการ',
    titleEn: 'Design and development of products and services',
    descriptionTh: 'องค์กรต้องจัดทำ นำไปปฏิบัติ และธำรงไว้ซึ่งกระบวนการออกแบบและพัฒนา เพื่อให้มั่นใจในผลิตภัณฑ์และบริการที่ผลิตขึ้นมาใหม่',
    descriptionEn: 'The organization shall establish, implement and maintain a design and development process that is appropriate to ensure the subsequent provision of products and services.',
    keyRequirementsTh: [
      'วางแผนขั้นตอนการออกแบบ (Design Inputs, Outputs, Controls, Review, Verification, Validation)',
      'การทดสอบความคงตัวของยาและอาหารเสริมสัตว์ (Stability Testing)',
      'การทดสอบความสม่ำเสมอในระดับ Pilot Scale และการถ่ายทอดเทคโนโลยีสู่ฝ่ายผลิต'
    ],
    keyRequirementsEn: [
      'Document design controls: inputs, reviews, verification, validation, and outputs',
      'Perform accelerated and long-term stability testing for feed additives and veterinary drugs',
      'Conduct pilot batch homogeneity trials prior to commercial scale-up'
    ],
    departmentRelevance: ['RD', 'TC', 'QA', 'PT', 'CM'],
    famiComparisonNote: 'FAMI-QS กำหนดให้ขั้นตอนพัฒนาสูตรอาหารสัตว์ต้องมี Safety Dossier และการประเมิน Bioavailability'
  },
  {
    id: 'iso-8.4',
    standard: 'ISO 9001',
    clauseNumber: '8.4',
    titleTh: 'การควบคุมกระบวนการ ผลิตภัณฑ์ และบริการที่จัดหาจากภายนอก (จัดซื้อ)',
    titleEn: 'Control of externally provided processes, products and services',
    descriptionTh: 'ควบคุมการจัดซื้อวัตถุดิบ บรรจุภัณฑ์ และการว่าจ้างภายนอก เพื่อให้มั่นใจว่าเป็นไปตามข้อกำหนดด้านคุณภาพและความปลอดภัย',
    descriptionEn: 'The organization shall ensure that externally provided processes, products and services conform to requirements.',
    keyRequirementsTh: [
      'จัดซื้อจากทะเบียนผู้ขายที่ผ่านการประเมิน (Approved Vendor List - AVL) เท่านั้น',
      'ประเมินคัดเลือกและประเมินผลงานซัพพลายเออร์ประจำปี (Supplier Audit/Evaluation)',
      'กำหนดข้อกำหนดการจัดซื้อ (Purchasing Specifications) และเงื่อนไขต้องแนบ COA ทุก Lot'
    ],
    keyRequirementsEn: [
      'Purchase only from approved vendors on the qualified Approved Vendor List (AVL)',
      'Perform initial supplier evaluations and annual vendor performance re-evaluations',
      'Define raw material purchasing specifications and mandatory Certificate of Analysis (COA) per lot'
    ],
    departmentRelevance: ['PR', 'QA', 'WH', 'TC'],
    famiComparisonNote: 'FAMI-QS 7.11 บังคับให้ซัพพลายเออร์ของวัตถุดิบกลุ่มเสี่ยงต้องได้รับการรับรอง FAMI-QS หรือมาตรฐานเทียบเท่าที่ยอมรับได้'
  },
  {
    id: 'iso-8.5',
    standard: 'ISO 9001',
    clauseNumber: '8.5',
    titleTh: 'การผลิตและการให้บริการ (การควบคุม, การชี้บ่ง, การสอบกลับได้, การเก็บรักษา)',
    titleEn: 'Production and service provision',
    descriptionTh: 'การดำเนินงานผลิตภายใต้สภาวะควบคุม การชี้บ่งและตรวจสอบย้อนกลับ การดูแลทรัพย์สินของลูกค้า และการถนอมรักษาสภาพผลิตภัณฑ์',
    descriptionEn: 'The organization shall implement production and service provision under controlled conditions, ensuring identification, traceability, customer property protection, and product preservation.',
    keyRequirementsTh: [
      '8.5.1 การผลิต: ดำเนินการตาม Batch Manufacturing Record (BMR) และ WI ประจำไลน์ L1-L9',
      '8.5.2 การชี้บ่งและสอบกลับได้: ติดป้ายแสดงสถานะ Lot No., วันผลิต, วันหมดอายุ ทุกพาเลท',
      '8.5.4 การเก็บรักษา: จัดเก็บในคลังสินค้าตามข้อกำหนดอุณหภูมิและความชื้น ป้องกันสัตว์พาหะ',
      '8.5.6 ควบคุมการเปลี่ยนแปลงหน้างานและการสอบทานน้ำหนักชั่งส่วนผสม'
    ],
    keyRequirementsEn: [
      '8.5.1 Controlled production: Execute strictly via Batch Manufacturing Records (BMR) and standard WIs',
      '8.5.2 Identification & Traceability: Label each batch with Lot number, manufacturing date, and expiry date',
      '8.5.4 Preservation: Store ingredients and finished goods under controlled temperature and humidity',
      '8.5.6 Change control: Document deviations and verify ingredient weighing reconciliation'
    ],
    departmentRelevance: ['PT', 'WH', 'PK', 'LG', 'QA'],
    famiComparisonNote: 'FAMI-QS 8.3 & 8.5 บังคับให้ระบบ Traceability ต้องสามารถสอบกลับได้ 100% ภายใน 4 ชั่วโมง และตรวจสอบอัตรา Carry-over'
  },
  {
    id: 'iso-8.6',
    standard: 'ISO 9001',
    clauseNumber: '8.6',
    titleTh: 'การปล่อยผลิตภัณฑ์และบริการ',
    titleEn: 'Release of products and services',
    descriptionTh: 'องค์กรต้องดำเนินการตามข้อตกลงที่วางไว้ในขั้นตอนที่เหมาะสม เพื่อทวนสอบว่าข้อกำหนดของผลิตภัณฑ์และบริการได้รับการปฏิบัติอย่างครบถ้วนก่อนปล่อยผ่าน',
    descriptionEn: 'The organization shall implement planned arrangements to verify that product and service requirements have been met prior to release to the customer.',
    keyRequirementsTh: [
      'ตรวจสอบและทดสอบคุณภาพโดยห้องปฏิบัติการเคมี (CM) และจุลชีววิทยา (MC)',
      'การตรวจปล่อยสินค้า (Product Release) ต้องลงนามอนุมัติโดยฝ่ายประกันคุณภาพ (QA) เท่านั้น',
      'เก็บบันทึกผลวิเคราะห์ Certificate of Analysis (COA) และตัวอย่างเก็บอ้างอิง (Retain Samples)'
    ],
    keyRequirementsEn: [
      'Conduct rigorous physical, chemical (CM) and microbiological (MC) quality testing',
      'Formal product release authorization executed solely by QA department upon specification verification',
      'Retain Certificate of Analysis (COA) test records and representative retain samples per batch'
    ],
    departmentRelevance: ['QA', 'CM', 'MC', 'WH', 'LG'],
    famiComparisonNote: 'FAMI-QS กำหนดให้ต้องตรวจวิเคราะห์สารไม่พึงประสงค์ (Undesirable Substances: Dioxins, Heavy Metals, Mycotoxins) ตามแผนเฝ้าระวัง'
  },
  {
    id: 'iso-8.7',
    standard: 'ISO 9001',
    clauseNumber: '8.7',
    titleTh: 'การควบคุมผลผลิตที่ไม่เป็นไปตามข้อกำหนด (Nonconforming Outputs)',
    titleEn: 'Control of nonconforming outputs',
    descriptionTh: 'องค์กรต้องมั่นใจว่าผลผลิตที่ไม่เป็นไปตามข้อกำหนดได้รับการชี้บ่งและควบคุม เพื่อป้องกันการนำไปใช้หรือส่งมอบโดยไม่ตั้งใจ',
    descriptionEn: 'The organization shall ensure that outputs that do not conform to their requirements are identified and controlled to prevent their unintended use or delivery.',
    keyRequirementsTh: [
      'ติดป้ายสถานะสีแดง "HOLD / REJECT" ชัดเจน และย้ายเข้าพื้นที่กักกันสินค้าไม่ได้มาตรฐาน',
      'ออกใบบันทึกสินค้าไม่เป็นไปตามข้อกำหนด (NCR) และดำเนินการสอบสวนหาสาเหตุ',
      'การจัดการผลผลิต: คัดแยก, แปรสภาพ (Rework ตาม SOP ที่ได้รับอนุมัติ), หรือทำลายทิ้ง'
    ],
    keyRequirementsEn: [
      'Apply red "HOLD / REJECT" segregation labels and quarantine in locked designated areas',
      'Issue Non-Conformance Reports (NCR) and investigate deviation root causes',
      'Disposition protocols: rework strictly per approved SOP, downgrade, or witness destruction'
    ],
    departmentRelevance: ['QA', 'PT', 'WH', 'PK', 'LG'],
    famiComparisonNote: 'FAMI-QS 8.8 ไม่อนุญาตให้นำอาหารสัตว์ที่ปนเปื้อนสารต้องห้ามหรือยาเกินมาตรฐานมา Rework ผสมเจือจางเด็ดขาด'
  },
  {
    id: 'iso-9.1',
    standard: 'ISO 9001',
    clauseNumber: '9.1',
    titleTh: 'การเฝ้าระวัง การวัด การวิเคราะห์ และการประเมินผล',
    titleEn: 'Monitoring, measurement, analysis and evaluation',
    descriptionTh: 'องค์กรต้องกำหนดสิ่งที่ต้องเฝ้าระวังและวัด วิธีการ และช่วงเวลาที่จะทำการวิเคราะห์และประเมิน รวมถึงการวัดความพึงพอใจของลูกค้า',
    descriptionEn: 'The organization shall determine what needs to be monitored and measured, the methods for monitoring, and evaluate performance and effectiveness of the QMS.',
    keyRequirementsTh: [
      'สำรวจความพึงพอใจของลูกค้า (Customer Satisfaction Survey) อย่างน้อยปีละ 1 ครั้ง',
      'วิเคราะห์แนวโน้มข้อมูลคุณภาพ (ข้อร้องเรียน, ของเสียจากการผลิต, ผลแล็บไม่ผ่านเกณฑ์)',
      'นำผลการวิเคราะห์เสนอต่อที่ประชุมฝ่ายบริหาร'
    ],
    keyRequirementsEn: [
      'Conduct annual Customer Satisfaction Surveys and assess client feedback metrics',
      'Analyze quality trends (customer complaints, production reject rates, OOS laboratory results)',
      'Report analytical summaries to executive management review'
    ],
    departmentRelevance: ['QMR', 'QA', 'SR', 'FR', 'MK'],
    famiComparisonNote: 'FAMI-QS 9.1 มุ่งเน้นการเฝ้าระวังข้อมูลทางระบาดวิทยาและความปลอดภัยอาหารสัตว์สากล'
  },
  {
    id: 'iso-9.2',
    standard: 'ISO 9001',
    clauseNumber: '9.2',
    titleTh: 'การตรวจติดตามคุณภาพภายใน (Internal Audit)',
    titleEn: 'Internal audit',
    descriptionTh: 'องค์กรต้องดำเนินการตรวจติดตามภายในตามช่วงเวลาที่วางแผนไว้ เพื่อให้ข้อมูลว่าระบบบริหารคุณภาพเป็นไปตามข้อกำหนดและนำไปปฏิบัติอย่างมีประสิทธิผล',
    descriptionEn: 'The organization shall conduct internal audits at planned intervals to provide information on whether the QMS conforms to requirements and is effectively implemented.',
    keyRequirementsTh: [
      'จัดทำแผนการตรวจติดตามประจำปี (FM-QM-013) และกำหนดการตรวจ (FM-QM-018)',
      'ผู้ตรวจประเมินต้องมีความเป็นอิสระ (ห้ามตรวจงานของตนเอง) และผ่านการอบรมคุณสมบัติ',
      'บันทึกผลการตรวจใน Checklist (FM-QM-014) และสรุปรายงานเสนอฝ่ายบริหาร (FM-QM-021)'
    ],
    keyRequirementsEn: [
      'Establish Annual Internal Audit Plan (FM-QM-013) and detailed Audit Schedules (FM-QM-018)',
      'Auditors must be independent of the audited department and qualified through certified training',
      'Document findings in Checklists (FM-QM-014) and synthesize executive reports (FM-QM-021)'
    ],
    departmentRelevance: ['QMR', 'ทุกแผนก'],
    famiComparisonNote: 'FAMI-QS 9.2 กำหนดให้ความถี่ในการตรวจติดตามต้องพิจารณาตามระดับความเสี่ยงของกระบวนการผลิตอาหารสัตว์'
  },
  {
    id: 'iso-9.3',
    standard: 'ISO 9001',
    clauseNumber: '9.3',
    titleTh: 'การทบทวนของฝ่ายบริหาร (Management Review)',
    titleEn: 'Management review',
    descriptionTh: 'ผู้บริหารระดับสูงต้องทบทวนระบบบริหารคุณภาพตามช่วงเวลาที่วางแผนไว้ เพื่อให้มั่นใจในความเหมาะสม ความเพียงพอ และประสิทธิผลอย่างต่อเนื่อง',
    descriptionEn: 'Top management shall review the organization’s quality management system, at planned intervals, to ensure its continuing suitability, adequacy, effectiveness and alignment.',
    keyRequirementsTh: [
      'จัดการประชุมทบทวนฝ่ายบริหารอย่างน้อยปีละ 1 ครั้ง',
      'วาระการประชุมครอบคลุม: ผล Audit, CAR/PAR, สถานะ KPI, ความพึงพอใจลูกค้า, ทรัพยากร, ความเสี่ยง',
      'จัดทำรายงานการประชุมและติดตามผลการดำเนินงานตามข้อสั่งการ'
    ],
    keyRequirementsEn: [
      'Convene executive Management Review meetings at least annually',
      'Cover mandatory inputs: audit results, CAPA status, KPI metrics, customer complaints, changes, resources',
      'Document minutes of meeting, executive decisions, and assign completion action items'
    ],
    departmentRelevance: ['QMR', 'ทุกแผนก'],
    famiComparisonNote: 'FAMI-QS 9.3 บังคับให้ทบทวนรายงาน Feed Safety Verification และข้อกำหนดกฎหมายอาหารสัตว์ใหม่'
  },
  {
    id: 'iso-10.1',
    standard: 'ISO 9001',
    clauseNumber: '10.1',
    titleTh: 'การปรับปรุงทั่วไป',
    titleEn: 'Improvement - General',
    descriptionTh: 'องค์กรต้องกำหนดและเลือกโอกาสในการปรับปรุง และดำเนินการที่จำเป็นเพื่อตอบสนองความต้องการของลูกค้าและเพิ่มความพึงพอใจ',
    descriptionEn: 'The organization shall determine and select opportunities for improvement and implement any necessary actions to meet customer requirements and enhance customer satisfaction.',
    keyRequirementsTh: [
      'ผลักดันกิจกรรมปรับปรุงกระบวนการและผลิตภัณฑ์ (Kaizen, ลดความสูญเปล่า)',
      'ปรับปรุงผลิตภัณฑ์เพื่อรองรับความต้องการในอนาคตของตลาดสัตว์เลี้ยงและปศุสัตว์',
      'ลดหรือแก้ไขผลกระทบที่ไม่พึงประสงค์ในสายการผลิต'
    ],
    keyRequirementsEn: [
      'Drive continuous process improvement projects and waste reduction',
      'Enhance products to anticipate future customer and veterinary feed trends',
      'Prevent and mitigate unintended process defects and variations'
    ],
    departmentRelevance: ['QMR', 'PT', 'QA', 'RD'],
    famiComparisonNote: 'FAMI-QS ให้ความสำคัญกับการยกระดับสุขอนามัยโรงงานและเทคโนโลยีการผสมให้มีความแม่นยำสูงขึ้น'
  },
  {
    id: 'iso-10.2',
    standard: 'ISO 9001',
    clauseNumber: '10.2',
    titleTh: 'สิ่งที่ไม่เป็นไปตามข้อกำหนดและการปฏิบัติการแก้ไข (NC & CAPA)',
    titleEn: 'Nonconformity and corrective action',
    descriptionTh: 'เมื่อเกิดสิ่งที่ไม่เป็นไปตามข้อกำหนด องค์กรต้องตอบสนอง ควบคุม และแก้ไขผลที่ตามมา พร้อมทั้งประเมินความจำเป็นในการขจัดสาเหตุที่แท้จริง',
    descriptionEn: 'When a nonconformity occurs, including any arising from complaints, the organization shall react, take action to control and correct it, and evaluate the need for action to eliminate causes.',
    keyRequirementsTh: [
      'ออกใบ CAR/PAR เมื่อพบข้อบกพร่องจากการตรวจประเมิน หรือข้อร้องเรียนรุนแรง',
      'วิเคราะห์หาสาเหตุที่แท้จริงด้วยเครื่องมือคุณภาพ เช่น 5-Why Analysis หรือ Fishbone Diagram (6M)',
      'กำหนดมาตรการแก้ไข (Corrective Action) และติดตามทวนสอบประสิทธิผลเพื่อป้องกันการเกิดซ้ำ'
    ],
    keyRequirementsEn: [
      'Issue CAR/PAR forms upon detection of audit NCs, customer complaints, or process failures',
      'Conduct rigorous Root Cause Analysis using 5-Why Analysis and 6M Fishbone Diagrams',
      'Implement corrective actions, verify implementation evidence, and evaluate effectiveness against recurrence'
    ],
    departmentRelevance: ['QMR', 'QA', 'ทุกแผนก'],
    famiComparisonNote: 'FAMI-QS กำหนดให้กรณีเกิดข้อบกพร่องที่ส่งผลต่อความปลอดภัยอาหารสัตว์ ต้องแจ้งเตือน FAMI-QS ภายใน 2 วันทำการ'
  },
  {
    id: 'iso-10.3',
    standard: 'ISO 9001',
    clauseNumber: '10.3',
    titleTh: 'การปรับปรุงอย่างต่อเนื่อง',
    titleEn: 'Continual improvement',
    descriptionTh: 'องค์กรต้องปรับปรุงความเหมาะสม ความเพียงพอ และประสิทธิผลของระบบบริหารคุณภาพอย่างต่อเนื่อง',
    descriptionEn: 'The organization shall continually improve the suitability, adequacy and effectiveness of the quality management system.',
    keyRequirementsTh: [
      'ใช้ผลจากการวิเคราะห์ข้อมูล การทบทวนฝ่ายบริหาร และผลการแก้ไข CAR เพื่อพัฒนาองค์กร',
      'ยกระดับมาตรฐานการปฏิบัติงานและลดความเสี่ยงอย่างต่อเนื่อง'
    ],
    keyRequirementsEn: [
      'Utilize data analysis, management reviews, and CAPA outcomes to improve system efficiency',
      'Continually upgrade standard operating procedures and mitigate operational risks'
    ],
    departmentRelevance: ['QMR', 'ทุกแผนก'],
    famiComparisonNote: 'FAMI-QS เน้นการปรับปรุงมาตรการควบคุมเชื้อจุลินทรีย์และการจัดการสารก่อภูมิแพ้ในอาหารสัตว์'
  },

  // ==========================================
  // 2. GHPs / HACCP (CXC 1-1969 Rev. 2022 / กรมปศุสัตว์)
  // ==========================================
  {
    id: 'ghp-sec-1',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Section 1',
    titleTh: 'บทนำและการควบคุมอันตรายด้านอาหารและอาหารสัตว์',
    titleEn: 'Introduction and Control of Food/Feed Hazards',
    descriptionTh: 'หลักการพื้นฐานในการระบุและควบคุมอันตรายทางชีวภาพ เคมี และกายภาพ เพื่อปกป้องสุขภาพสัตว์และผู้บริโภคผลิตภัณฑ์จากสัตว์',
    descriptionEn: 'Fundamental principles for identifying and controlling biological, chemical, and physical hazards to safeguard animal health and human consumers of animal products.',
    keyRequirementsTh: [
      'ระบุอันตราย 3 ด้าน: จุลินทรีย์ (Salmonella, E. coli), สารเคมี (สารพิษจากเชื้อรา, ยาตกค้าง), กายภาพ (เศษแก้ว, โลหะ)',
      'ประยุกต์ใช้โปรแกรมสุขลักษณะพื้นฐาน (GHPs) เป็นรากฐานก่อนทำ HACCP',
      'ปฏิบัติตามกฎหมายและระเบียบกรมปศุสัตว์อย่างเคร่งครัด'
    ],
    keyRequirementsEn: [
      'Identify 3 hazard categories: biological (Salmonella), chemical (mycotoxins, veterinary drug residue), physical (metal, glass)',
      'Apply Good Hygiene Practices (GHPs) as pre-requisite foundation for HACCP',
      'Comply strictly with Department of Livestock Development (DLD) regulations'
    ],
    departmentRelevance: ['QA', 'QMR', 'PT', 'RD'],
    famiComparisonNote: 'เทียบเท่า FAMI-QS Section 8 Hazard Control Plan'
  },
  {
    id: 'ghp-sec-2',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Section 2',
    titleTh: 'การผลิตขั้นต้นและแหล่งวัตถุดิบ (Primary Production)',
    titleEn: 'Primary Production and Raw Material Sourcing',
    descriptionTh: 'การควบคุมสุขลักษณะตั้งแต่แหล่งกำเนิดวัตถุดิบ เพื่อลดโอกาสการนำเข้าอันตรายสู่โรงงานผลิตอาหารสัตว์',
    descriptionEn: 'Hygiene control from the source of raw materials to minimize introduction of hazards into animal feed manufacturing facilities.',
    keyRequirementsTh: [
      'คัดเลือกวัตถุดิบจากฟาร์มหรือแหล่งผลิตที่ถูกสุขอนามัย (GAP / GMP)',
      'ควบคุมการปนเปื้อนจากสิ่งแวดล้อม แหล่งน้ำ ปุ๋ย และสารเคมีทางการเกษตร',
      'ตรวจสอบประวัติการใช้ยาปฏิชีวนะและสารเคมีกำจัดแมลงในพืชอาหารสัตว์'
    ],
    keyRequirementsEn: [
      'Source ingredients from hygienic farming operations complying with GAP/GMP',
      'Prevent environmental contamination from agricultural run-off and unpotable water',
      'Verify supplier compliance regarding pesticide residues and veterinary treatments'
    ],
    departmentRelevance: ['PR', 'QA', 'WH', 'TC'],
    famiComparisonNote: 'FAMI-QS 7.11 กำหนดเกณฑ์ Supplier Approval สำหรับผู้ผลิตวิตามินและแร่ธาตุเข้มข้น'
  },
  {
    id: 'ghp-sec-3',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Section 3',
    titleTh: 'สถานประกอบการ: การออกแบบสถานที่และอุปกรณ์ (Design of Facilities & Equipment)',
    titleEn: 'Establishment: Design of Facilities and Equipment',
    descriptionTh: 'การออกแบบผังอาคาร สถานที่ตั้ง และเครื่องจักรเพื่อป้องกันการปนเปื้อนข้าม และอำนวยความสะดวกในการทำความสะอาด',
    descriptionEn: 'Location, building layout, and equipment design to prevent cross-contamination and facilitate effective sanitation.',
    keyRequirementsTh: [
      '3.1 สถานที่ตั้ง: ไม่อยู่ในพื้นที่เสี่ยงน้ำท่วม หรือใกล้แหล่งมลพิษและขยะมูลฝอย',
      '3.2 โครงสร้าง: ผนัง พื้น เพดาน เรียบ ทนทาน ไม่หลุดร่อน ทำความสะอาดง่าย รอยต่อโค้งมน',
      '3.3 การแบ่งโซน: แยกพื้นที่สะอาด (Clean Room / Production Zone) ออกจากพื้นที่ทั่วไป',
      '3.4 อุปกรณ์: เครื่องจักรสัมผัสอาหารทำจากสแตนเลส ไม่เป็นสนิม ไม่มีซอกมุมอับสะสมผงยา'
    ],
    keyRequirementsEn: [
      '3.1 Location: Situated away from flood-prone zones, environmental pollution, and waste dumps',
      '3.2 Structures: Smooth, durable, non-flaking walls, coved floor joints, impervious to moisture',
      '3.3 Zoning: Strict physical separation between clean production zones and general warehouse areas',
      '3.4 Equipment: Food-grade stainless steel contact surfaces, free of crevices, easily demountable for sanitation'
    ],
    departmentRelevance: ['EN', 'PT', 'QA', 'WH'],
    famiComparisonNote: 'FAMI-QS 7.2 เน้นระบบบำบัดอากาศและการกรองฝุ่นละอองยาเพื่อป้องกัน Cross-contamination'
  },
  {
    id: 'ghp-sec-4',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Section 4',
    titleTh: 'การฝึกอบรมและความสามารถด้านสุขลักษณะ (Training & Competence)',
    titleEn: 'Training and Competence in Hygiene',
    descriptionTh: 'บุคลากรทุกคนที่เกี่ยวข้องกับการผลิตและสัมผัสผลิตภัณฑ์ต้องได้รับการฝึกอบรมด้านสุขลักษณะอาหารสัตว์และการป้องกันอันตราย',
    descriptionEn: 'All personnel involved in feed handling and manufacturing must be trained in feed hygiene principles and hazard control.',
    keyRequirementsTh: [
      'ฝึกอบรมสุขลักษณะส่วนบุคคล (Personal Hygiene) แก่พนักงานใหม่ก่อนเริ่มงาน',
      'อบรมทบทวนหลักการ GHPs/HACCP และการควบคุมจุด CCP ประจำปี',
      'มีป้ายเตือนและคู่มือคำแนะนำภาษาไทยและภาษาแรงงานต่างด้าว (ถ้ามี)'
    ],
    keyRequirementsEn: [
      'Provide basic feed hygiene onboarding training prior to initial production line assignment',
      'Conduct annual refresher training on GHPs/HACCP and CCP monitoring discipline',
      'Display pictorial and multilingual hygiene instructional signs at line entrances'
    ],
    departmentRelevance: ['HR', 'PT', 'QA', 'WH'],
    famiComparisonNote: 'FAMI-QS 7.1 บังคับให้มีการบันทึกประเมินความเข้าใจด้าน Feed Defense และ Feed Fraud'
  },
  {
    id: 'ghp-sec-5',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Section 5',
    titleTh: 'การบำรุงรักษา การทำความสะอาด และการควบคุมสัตว์พาหะ',
    titleEn: 'Maintenance, Cleaning and Disinfection, and Pest Control',
    descriptionTh: 'การจัดทำระบบการบำรุงรักษาเชิงป้องกัน แผนการทำความสะอาดฆ่าเชื้อ และระบบกำจัดสัตว์พาหะที่มีประสิทธิภาพ',
    descriptionEn: 'Establishment of effective preventive maintenance schedules, sanitation programmes, and comprehensive pest management systems.',
    keyRequirementsTh: [
      '5.1 แผนทำความสะอาด (Master Cleaning Schedule): ระบุวิธี, สารเคมี, ความถี่, และผู้รับผิดชอบ',
      '5.2 การทวนสอบความสะอาด: สุ่ม Swab Test พื้นผิวสัมผัสและอากาศเพื่อตรวจหาเชื้อจุลินทรีย์',
      '5.3 การควบคุมสัตว์พาหะ: ติดตั้งมุ้งลวด ม่านริ้ว ดักแมลง ติดตาม Bait Station และตรวจสอบผังดักจับทุกเดือน',
      '5.4 การจัดการของเสีย: ถังขยะมีฝาปิดมิดชิด คัดแยกขยะสารเคมีและขยะทั่วไป ไม่สะสมในไลน์ผลิต'
    ],
    keyRequirementsEn: [
      '5.1 Master Cleaning Schedule: Specify cleaning methods, approved chemicals, frequency, and responsible staff',
      '5.2 Sanitation verification: Perform surface swab testing and air sedimentation plates for microbiological counts',
      '5.3 Integrated Pest Management: Maintain rodent bait stations, insect light traps, fly screens, and monthly pest contractor logs',
      '5.4 Waste disposal: Foot-operated covered waste bins, separate chemical hazardous waste disposal'
    ],
    departmentRelevance: ['EN', 'PT', 'QA', 'MC'],
    famiComparisonNote: 'FAMI-QS 7.5 & 7.8 กำหนดว่าสารเคมีที่ใช้ล้างและสารหล่อลื่นเครื่องจักรต้องเป็น Food Grade (H1)'
  },
  {
    id: 'ghp-sec-6',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Section 6',
    titleTh: 'สุขลักษณะส่วนบุคคล (Personal Hygiene)',
    titleEn: 'Personal Hygiene',
    descriptionTh: 'การรักษาสุขลักษณะส่วนบุคคล สุขภาพร่างกาย การแต่งกาย และพฤติกรรมของพนักงานเพื่อป้องกันการปนเปื้อนสู่อาหารสัตว์',
    descriptionEn: 'Personnel health status, personal cleanliness, operational attire, and personal conduct to prevent contamination of feed.',
    keyRequirementsTh: [
      '6.1 ตรวจสุขภาพประจำปี (Annual Health Check) และคัดกรองโรคติดต่อทางเดินอาหารและผิวหนัง',
      '6.2 การแต่งกาย: สวมชุดปฏิบัติการ หมวกคลุมผม หน้ากากอนามัย และรองเท้าบูทหรือรองเท้าเฉพาะโรงงาน',
      '6.3 การล้างมือ: มีอ่างล้างมือแบบไม่ใช้มือเปิด สบู่เหลว น้ำยาฆ่าเชื้อ และกระดาษเช็ดมือหรือเครื่องเป่าลมร้อน',
      '6.4 พฤติกรรม: ห้ามรับประทานอาหาร เคี้ยวหมากฝรั่ง สูบบุหรี่ หรือสวมใส่เครื่องประดับในบริเวณผลิต'
    ],
    keyRequirementsEn: [
      '6.1 Annual medical examinations screening for communicable diseases, foodborne illnesses, and skin lesions',
      '6.2 Protective clothing: Dedicated clean uniform, hair net fully enclosing hair, face mask, and captive plant footwear',
      '6.3 Hand hygiene: Hands-free tap basins, antibacterial soap, disinfectant sanitizers, and disposable paper towels',
      '6.4 Conduct: Strict prohibition of eating, drinking, smoking, gum chewing, or wearing jewelry in production zones'
    ],
    departmentRelevance: ['HR', 'PT', 'QA', 'WH', 'EN'],
    famiComparisonNote: 'FAMI-QS 7.1 กำหนดกฎเกณฑ์ห้ามนำสิ่งของส่วนตัวและอาหารเข้าพื้นที่ผลิตสารพรีมิกซ์อย่างเด็ดขาด'
  },
  {
    id: 'ghp-sec-7',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Section 7',
    titleTh: 'การควบคุมการปฏิบัติงาน (Control of Operation)',
    titleEn: 'Control of Operation',
    descriptionTh: 'การควบคุมทุกขั้นตอนการผลิต ตั้งแต่การตรวจรับวัตถุดิบ การบรรจุ การใช้น้ำ ไปจนถึงขั้นตอนการเรียกคืนสินค้า',
    descriptionEn: 'Operational hazard controls across incoming materials, packaging, water quality, and emergency product recall.',
    keyRequirementsTh: [
      '7.1 การตรวจรับ: ตรวจสภาพรถขนส่ง บรรจุภัณฑ์ ค่าความชื้น อุณหภูมิ และความสมบูรณ์ของวัตถุดิบ',
      '7.2 คุณภาพน้ำ: น้ำที่ใช้ในกระบวนการผลิตและล้างเครื่องจักรต้องเป็นน้ำประปาบริสุทธิ์หรือน้ำ RO ผ่านเกณฑ์มาตรฐานน้ำบริโภค',
      '7.3 การบรรจุ: บรรจุภัณฑ์สะอาด ไม่ฉีกขาด ป้องกันความชื้นและแสงแดด',
      '7.4 ขั้นตอนการเรียกคืนสินค้า (Recall Procedure): มีแผนงานและซักซ้อมการเรียกคืนสินค้าอย่างน้อยปีละ 1 ครั้ง'
    ],
    keyRequirementsEn: [
      '7.1 Receiving controls: Inspect transport vehicle cleanliness, packaging integrity, moisture, temperature, and COA',
      '7.2 Water quality: Potable tap or Reverse Osmosis (RO) water meeting microbiological and chemical drinking standards',
      '7.3 Packaging: Food-grade, clean, tamper-evident containers preventing moisture intrusion and light degradation',
      '7.4 Product recall: Documented Mock Recall procedure tested annually with retrieval rate target within 4 hours'
    ],
    departmentRelevance: ['PT', 'QA', 'WH', 'LG', 'EN', 'CM', 'MC'],
    famiComparisonNote: 'FAMI-QS 7.15 กำหนดให้รายงานผล Mock Recall ต่อสำนักงานใหญ่ FAMI-QS หากเป็นวิกฤตจริง'
  },
  {
    id: 'ghp-sec-8',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Section 8',
    titleTh: 'ข้อมูลผลิตภัณฑ์และการแสดงฉลาก (Product Information & Labelling)',
    titleEn: 'Product Information and Consumer Awareness',
    descriptionTh: 'การแสดงข้อมูลบนฉลากอาหารสัตว์ การระบุรุ่นผลิต และคำแนะนำในการใช้เพื่อความปลอดภัยของผู้ใช้และสัตว์เลี้ยง',
    descriptionEn: 'Lot identification, accurate feed labeling, and user instructions to prevent misuse and facilitate traceability.',
    keyRequirementsTh: [
      'แสดงฉลากถูกต้องตาม พ.ร.บ. ควบคุมคุณภาพอาหารสัตว์ (ชื่อทางการค้า, เลขทะเบียน, สูตรส่วนผสม, สรรพคุณ, วิธีใช้)',
      'ระบุขนาดและวิธีการให้ (Dosage) ข้อห้ามใช้ และระยะหยุดยา (Withdrawal Period) อย่างชัดเจน',
      'พิมพ์หมายเลขรุ่น (Lot Number), วันที่ผลิต (MFG), และวันหมดอายุ (EXP) ชัดเจน ไม่หลุดลอก'
    ],
    keyRequirementsEn: [
      'Display regulatory labeling complying with Feed Quality Control Act (trade name, registration number, active ingredients)',
      'State recommended dosage, target animal species, contraindications, and mandatory withdrawal periods',
      'Clearly print batch lot number, manufacturing date, and expiry date on each commercial unit'
    ],
    departmentRelevance: ['PK', 'PT', 'QA', 'RD', 'TC', 'MK'],
    famiComparisonNote: 'FAMI-QS 7.10 ระบุให้ต้องแสดงเครื่องหมาย FAMI-QS Certified และข้อมูลสารก่อภูมิแพ้'
  },
  {
    id: 'ghp-sec-9',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Section 9',
    titleTh: 'การขนส่งและการกระจายสินค้า (Transportation)',
    titleEn: 'Transportation',
    descriptionTh: 'การควบคุมยานพาหนะและขั้นตอนการขนส่ง เพื่อป้องกันไม่ให้ผลิตภัณฑ์อาหารสัตว์เสื่อมสภาพ ปนเปื้อน หรือชำรุดเสียหาย',
    descriptionEn: 'Control of transport vehicles and handling during transit to protect feed products from contamination and deterioration.',
    keyRequirementsTh: [
      'ตรวจความสะอาดของรถขนส่งก่อนขึ้นสินค้า (ไม่มีกลิ่นเหม็นอับ, ไม่มีเศษสิ่งสกปรก, ไม่มีรอยรั่วซึม)',
      'ห้ามขนส่งร่วมกับสารเคมีอันตราย ยาฆ่าแมลง หรือปุ๋ยเคมี',
      'การจัดเรียงพาเลทมีสายรัดหรือฟิล์มพันพาเลทแน่นหนา และมีผ้าใบคลุมกันแดดกันฝน 100%'
    ],
    keyRequirementsEn: [
      'Inspect delivery trucks prior to loading: clean dry cargo bed, odor-free, weatherproof, pest-free',
      'Strictly prohibit co-transport with hazardous toxic chemicals, pesticides, or fertilizers',
      'Secure palletized cargo with shrink-wrap film and ensure waterproof tarpaulins during transit'
    ],
    departmentRelevance: ['LG', 'WH', 'QA'],
    famiComparisonNote: 'FAMI-QS 7.12 กำหนดให้ผู้ให้บริการขนส่งต้องผ่านการอนุมัติและมีบันทึกประวัติสินค้าที่ขนส่งก่อนหน้า (Previous Cargo)'
  },
  {
    id: 'haccp-step-1',
    standard: 'GHPs/HACCP',
    clauseNumber: 'HACCP Step 1',
    titleTh: 'การจัดตั้งทีมงาน HACCP (HACCP Team)',
    titleEn: 'Assemble HACCP Team',
    descriptionTh: 'จัดตั้งทีมงานที่มีความรู้ ความเชี่ยวชาญสหสาขาวิชาชีพ ครอบคลุมการผลิต ประกันคุณภาพ ซ่อมบำรุง และวิชาการ เพื่อรับผิดชอบระบบ HACCP',
    descriptionEn: 'Form a multidisciplinary HACCP team with technical expertise across production, QA, engineering, and formulation.',
    keyRequirementsTh: [
      'มีคำสั่งแต่งตั้งทีมงาน HACCP เป็นลายลักษณ์อักษร พร้อมระบุหัวหน้าทีม',
      'สมาชิกในทีมผ่านการอบรมหลักสูตร HACCP ที่ได้รับการรับรองจากกรมปศุสัตว์',
      'มีการประชุมทบทวนแผน HACCP อย่างสม่ำเสมอ'
    ],
    keyRequirementsEn: [
      'Formal appointment letter defining HACCP team leader and cross-functional members',
      'Team members hold certified training certificates accredited by Department of Livestock Development',
      'Hold regular HACCP team review sessions and retain minutes of meetings'
    ],
    departmentRelevance: ['QMR', 'QA', 'PT', 'EN', 'RD'],
    famiComparisonNote: 'เทียบเท่า FAMI-QS 5.3 Feed Safety Team'
  },
  {
    id: 'haccp-step-2',
    standard: 'GHPs/HACCP',
    clauseNumber: 'HACCP Step 2',
    titleTh: 'การอธิบายรายละเอียดผลิตภัณฑ์ (Product Description)',
    titleEn: 'Describe Product',
    descriptionTh: 'จัดทำรายละเอียดของผลิตภัณฑ์แต่ละกลุ่ม รวมถึงสูตร วัตถุดิบ บรรจุภัณฑ์ อายุการเก็บ และสภาวะการเก็บรักษา',
    descriptionEn: 'Formulate comprehensive product descriptions detailing formulation, raw materials, packaging, shelf-life, and storage.',
    keyRequirementsTh: [
      'เอกสารข้อกำหนดผลิตภัณฑ์ (Product Specification Sheet) ครบทุก SKU',
      'ระบุคุณสมบัติทางกายภาพ เคมี (ค่า pH, ความชื้น, ปริมาณสารออกฤทธิ์) และจุลชีววิทยา',
      'ระบุสภาวะการเก็บรักษา (อุณหภูมิห้อง, ห้องเย็น 2-8°C, พ้นแสงแดด)'
    ],
    keyRequirementsEn: [
      'Maintain updated Product Specification Data Sheets for each manufactured formulation',
      'Specify physical, chemical (pH, moisture, active potency), and microbiological parameters',
      'Define shelf life and required storage environment (ambient cool dry, refrigerated 2-8°C)'
    ],
    departmentRelevance: ['RD', 'QA', 'TC', 'PT'],
    famiComparisonNote: 'FAMI-QS บังคับให้ระบุ CAS Number ของสารเคมีและระดับความเป็นพิษ'
  },
  {
    id: 'haccp-step-3',
    standard: 'GHPs/HACCP',
    clauseNumber: 'HACCP Step 3',
    titleTh: 'การชี้บ่งวัตถุประสงค์การใช้ (Identify Intended Use)',
    titleEn: 'Identify Intended Use',
    descriptionTh: 'ระบุวิธีการใช้งานและกลุ่มสัตว์เป้าหมาย รวมถึงกลุ่มผู้ใช้ที่มีความเสี่ยงหรือข้อจำกัดในการใช้',
    descriptionEn: 'Identify normal expected use, target animal species, and vulnerable populations or safety contraindications.',
    keyRequirementsTh: [
      'ระบุสัตว์เป้าหมายชัดเจน (สุกร, ไก่เนื้อ, ไก่ไข่, โคนม, สุนัข, แมว)',
      'ระบุวิธีการให้ยา/อาหารเสริม (ผสมอาหาร, ผสมน้ำดื่ม, ป้อนโดยตรง)',
      'ระบุข้อห้ามใช้ เช่น ห้ามใช้ในสัตว์ตั้งท้อง หรือสัตว์ที่ผลิตไข่เพื่อบริโภค'
    ],
    keyRequirementsEn: [
      'Identify target livestock or companion animal species (swine, broilers, layers, cattle, canines, felines)',
      'Define mode of administration (in-feed premix, in-drinking water, oral tablet/suspension)',
      'Highlight safety contraindications (e.g. not for lactating dairy cows or breeding females)'
    ],
    departmentRelevance: ['RD', 'TC', 'MK', 'QA'],
    famiComparisonNote: 'FAMI-QS เน้นการป้องกันไม่ให้นำสารสำหรับสัตว์เคี้ยวเอื้องไปผสมในอาหารสัตว์กระเพาะเดี่ยวโดยผิดสูตร'
  },
  {
    id: 'haccp-step-4',
    standard: 'GHPs/HACCP',
    clauseNumber: 'HACCP Step 4',
    titleTh: 'การจัดทำแผนภูมิกระบวนการผลิต (Construct Flow Diagram)',
    titleEn: 'Construct Flow Diagram',
    descriptionTh: 'จัดทำแผนภูมิแสดงทุกขั้นตอนในกระบวนการผลิต ตั้งแต่การรับวัตถุดิบ การเตรียม การชั่ง การผสม การบรรจุ จนถึงการส่งมอบ',
    descriptionEn: 'Construct systematic process flow diagrams depicting all sequence steps from material intake, weighing, mixing, packaging to warehousing.',
    keyRequirementsTh: [
      'แผนภูมิครอบคลุมทุกสายการผลิต (Line 1 ยาน้ำ, Line 2 ยาผง, Line 3 พรีมิกซ์ ฯลฯ)',
      'แสดงขั้นตอนการ Rework, การหมุนเวียน, และจุดนำเข้าวัตถุดิบบรรจุภัณฑ์',
      'ระบุพารามิเตอร์ควบคุมในแต่ละขั้นตอน'
    ],
    keyRequirementsEn: [
      'Cover all discrete processing lines (Line 1 liquids, Line 2 powders, Line 3 premixes, etc.)',
      'Illustrate rework loops, waste release points, and packaging introduction stages',
      'State operational control parameters at each transformation stage'
    ],
    departmentRelevance: ['PT', 'QA', 'EN', 'RD'],
    famiComparisonNote: 'FAMI-QS กำหนดให้แสดงจุด Flush และการเก็บสารชะล้างในผังกระบวนการ'
  },
  {
    id: 'haccp-step-5',
    standard: 'GHPs/HACCP',
    clauseNumber: 'HACCP Step 5',
    titleTh: 'การตรวจสอบยืนยันแผนภูมิตามสถานที่จริง (On-site Confirmation)',
    titleEn: 'On-site Confirmation of Flow Diagram',
    descriptionTh: 'ทีม HACCP ต้องเดินสำรวจสถานที่ผลิตจริงเพื่อยืนยันความถูกต้องของแผนภูมิกระบวนการผลิตทุกกะการทำงาน',
    descriptionEn: 'The HACCP team must conduct on-site physical walk-throughs across all shifts to verify the accuracy of the process flow diagram.',
    keyRequirementsTh: [
      'เดินสำรวจหน้างานจริงร่วมกันระหว่างทีม HACCP และหัวหน้าไลน์ผลิต',
      'ปรับปรุงแผนภูมิให้ตรงกับสภาพหน้างานจริงหากพบความแตกต่าง',
      'มีลายเซ็นรับรองการตรวจทวนหน้างานจริงประจำปี'
    ],
    keyRequirementsEn: [
      'Conduct joint physical walk-through audits across all production operating shifts',
      'Update diagram documents immediately upon detecting any physical piping or layout discrepancy',
      'HACCP team signs and dates the verified on-site process flow document'
    ],
    departmentRelevance: ['QA', 'PT', 'EN'],
    famiComparisonNote: 'FAMI-QS กำหนดให้ตรวจยืนยันซ้ำทุกครั้งที่มีการดัดแปลงท่อส่งหรือเครื่องผสม'
  },
  {
    id: 'haccp-p-1',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Principle 1 / Step 6',
    titleTh: 'การวิเคราะห์อันตราย (Hazard Analysis)',
    titleEn: 'Conduct Hazard Analysis (Principle 1)',
    descriptionTh: 'ระบุอันตรายที่อาจเกิดขึ้นในทุกขั้นตอน ประเมินโอกาสเกิดและความรุนแรง และกำหนดมาตรการควบคุมที่เหมาะสม',
    descriptionEn: 'Identify potential biological, chemical, and physical hazards at each step, evaluate their significance, and identify control measures.',
    keyRequirementsTh: [
      'วิเคราะห์อันตรายแยกเป็น B (ชีวภาพ), C (เคมี/สารก่อภูมิแพ้), P (กายภาพ) ในทุกขั้นตอน',
      'ประเมินค่าความเสี่ยงตามเกณฑ์ Likelihood x Severity เพื่อจัดระดับอันตรายที่มีนัยสำคัญ',
      'กำหนดมาตรการควบคุม (Control Measures) สำหรับอันตรายแต่ละชนิด'
    ],
    keyRequirementsEn: [
      'Analyze hazards categorically: Biological (B), Chemical/Allergen (C), and Physical (P)',
      'Assess risk significance using Likelihood x Severity matrix scoring',
      'Identify preventive control measures for all significant identified hazards'
    ],
    departmentRelevance: ['QA', 'PT', 'RD', 'CM', 'MC'],
    famiComparisonNote: 'FAMI-QS เพิ่มการวิเคราะห์อันตรายจากการปลอมปน (EMA) และสารพิษตกค้างในสารสกัด'
  },
  {
    id: 'haccp-p-2',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Principle 2 / Step 7',
    titleTh: 'การกำหนดจุดวิกฤตที่ต้องควบคุม (Determine CCPs)',
    titleEn: 'Determine Critical Control Points - CCPs (Principle 2)',
    descriptionTh: 'ใช้ผังการตัดสินใจ (Decision Tree) เพื่อระบุขั้นตอนการผลิตที่เป็นจุดวิกฤตที่ต้องควบคุมเพื่อป้องกัน ขจัด หรือลดอันตรายให้อยู่ในระดับที่ยอมรับได้',
    descriptionEn: 'Apply Codex CCP Decision Tree to determine processing steps where control is essential to prevent, eliminate or reduce a hazard to acceptable levels.',
    keyRequirementsTh: [
      'ประยุกต์ใช้ Decision Tree (คำถาม Q1, Q2, Q3, Q4) อย่างมีหลักฐานอ้างอิง',
      'ระบุจุด CCP เช่น การกรองสารละลาย (Filter 100 Mesh), เครื่องตรวจจับโลหะ (Metal Detector), การพาสเจอร์ไรส์',
      'จัดทำตารางสรุปแผน HACCP Plan ที่ได้รับการอนุมัติ'
    ],
    keyRequirementsEn: [
      'Apply documented Codex Decision Tree questions (Q1 through Q4) for all significant hazards',
      'Identify CCPs: e.g. liquid drug filtration (100-mesh sieve), inline Metal Detector (Fe/Non-Fe/SS), heat treatment',
      'Consolidate into an approved comprehensive Master HACCP Plan table'
    ],
    departmentRelevance: ['QA', 'PT', 'EN'],
    famiComparisonNote: 'FAMI-QS แบ่งจุดควบคุมเป็น OPRP (Operational Prerequisite Programme) และ CCP อย่างเคร่งครัด'
  },
  {
    id: 'haccp-p-3',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Principle 3 / Step 8',
    titleTh: 'การกำหนดขีดจำกัดวิกฤต (Establish Critical Limits)',
    titleEn: 'Establish Critical Limits (Principle 3)',
    descriptionTh: 'กำหนดเกณฑ์มาตรฐานเชิงตัวเลขที่วัดได้สำหรับแต่ละจุด CCP เพื่อแยกแยะระหว่างสภาวะที่ยอมรับได้และยอมรับไม่ได้',
    descriptionEn: 'Determine measurable critical limits for each CCP to distinguish between acceptable and unacceptable safe operating conditions.',
    keyRequirementsTh: [
      'กำหนดขีดจำกัดวิกฤตที่มีหลักฐานทางวิทยาศาสตร์หรือกฎหมายรองรับ',
      'ตัวอย่าง: เครื่องตรวจจับโลหะต้องตรวจพบ Fe 1.5 mm, Non-Fe 2.0 mm, SUS 2.5 mm',
      'ตัวอย่างยาน้ำ: การกรองต้องใช้ไส้กรองขนาดไม่เกิน 100 mesh และแรงดันตกคร่อมไม่เกิน 2 bar'
    ],
    keyRequirementsEn: [
      'Establish scientifically validated, measurable critical limits for each identified CCP',
      'Example: Metal Detector sensitivity Fe 1.5 mm, Non-Fe 2.0 mm, Stainless Steel 2.5 mm',
      'Example liquid lines: 100-mesh sieve integrity and pressure drop < 2.0 bar'
    ],
    departmentRelevance: ['QA', 'PT', 'RD'],
    famiComparisonNote: 'FAMI-QS กำหนดขีดจำกัดวิกฤตค่าสัมประสิทธิ์ความแปรปรวนของการผสม (CV) ต้อง < 5%'
  },
  {
    id: 'haccp-p-4',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Principle 4 / Step 9',
    titleTh: 'การกำหนดระบบเฝ้าระวังและติดตาม (Establish Monitoring System)',
    titleEn: 'Establish Monitoring System (Principle 4)',
    descriptionTh: 'กำหนดวิธีการตรวจวัด ความถี่ และผู้รับผิดชอบในการติดตามจุด CCP เพื่อให้มั่นใจว่ากระบวนการอยู่ภายใต้การควบคุม',
    descriptionEn: 'Establish planned monitoring observations or measurements to assess whether a CCP is under control.',
    keyRequirementsTh: [
      'ระบุ: ตรวจอะไร (What), อย่างไร (How), ความถี่เท่าใด (Frequency), ใครตรวจ (Who)',
      'การทดสอบ Test Piece ของเครื่องตรวจจับโลหะทุก 2 ชั่วโมง และก่อน-หลังการผลิตแต่ละ Lot',
      'บันทึกผลการเฝ้าระวังทันที ณ เวลาปฏิบัติงานจริง พร้อมลายมือชื่อผู้ตรวจ'
    ],
    keyRequirementsEn: [
      'Specify monitoring protocols: What, How, Frequency, and designated responsible operator',
      'Verify metal detector function using certified test pieces every 2 hours and at batch start/end',
      'Record observations in real time on designated log sheets with operator initials'
    ],
    departmentRelevance: ['PT', 'QA'],
    famiComparisonNote: 'FAMI-QS กำหนดให้มีระบบเตือนภัยอัตโนมัติ (Automated Alarm System) เมื่อเครื่องชั่งคลาดเคลื่อน'
  },
  {
    id: 'haccp-p-5',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Principle 5 / Step 10',
    titleTh: 'การกำหนดมาตรการแก้ไขเมื่อเกิดการเบี่ยงเบน (Corrective Actions)',
    titleEn: 'Establish Corrective Actions (Principle 5)',
    descriptionTh: 'กำหนดขั้นตอนการปฏิบัติการแก้ไขเมื่อผลการเฝ้าระวังชี้ว่าจุด CCP ไม่อยู่ภายใต้การควบคุม รวมถึงการกักกันสินค้าที่มีปัญหา',
    descriptionEn: 'Establish specific corrective actions to be taken when monitoring indicates that a particular CCP is not under control.',
    keyRequirementsTh: [
      'กักกันสินค้า (Quarantine/Hold) ที่ผลิตนับตั้งแต่การตรวจทวนครั้งสุดท้ายที่ผ่านเกณฑ์',
      'ปรับตั้งเครื่องจักรหรือแก้ไขกระบวนการให้กลับสู่สภาวะปกติก่อนเริ่มผลิตต่อ',
      'นำสินค้าที่ถูกกักมาตรวจสอบซ้ำ 100% หรือทำลาย และบันทึกในใบ NCR / CAR'
    ],
    keyRequirementsEn: [
      'Immediately isolate and quarantine all product batches produced since the last acceptable check',
      'Readjust process equipment to restore control before resuming manufacturing',
      'Re-inspect quarantined goods 100% or dispose safely, recording root causes in NCR/CAR logs'
    ],
    departmentRelevance: ['PT', 'QA'],
    famiComparisonNote: 'FAMI-QS กำหนดให้วิเคราะห์สาเหตุการเบี่ยงเบนไปยังรุ่นผลิตก่อนหน้าและรุ่นถัดไป'
  },
  {
    id: 'haccp-p-6',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Principle 6 / Step 11',
    titleTh: 'การตรวจสอบความถูกต้องและการทวนสอบ (Validation & Verification)',
    titleEn: 'Establish Validation and Verification Procedures (Principle 6)',
    descriptionTh: 'การกำหนดขั้นตอนการตรวจสอบความถูกต้องของแผน HACCP ก่อนใช้งานจริง และการทวนสอบเป็นระยะเพื่อให้มั่นใจว่าระบบทำงานอย่างมีประสิทธิผล',
    descriptionEn: 'Establish procedures for validation prior to implementation and ongoing verification to confirm the HACCP system is working effectively.',
    keyRequirementsTh: [
      'Validation: พิสูจน์หลักฐานทางวิทยาศาสตร์ว่าขีดจำกัดวิกฤตสามารถควบคุมอันตรายได้จริง',
      'Verification: การสอบเทียบเครื่องมือวัด, การตรวจติดตามภายใน (Internal Audit), การสุ่มตรวจวิเคราะห์ทางห้องปฏิบัติการ',
      'ทบทวนระบบ HACCP ประจำปี หรือเมื่อมีการเปลี่ยนแปลงสูตร เครื่องจักร หรือกฎหมาย'
    ],
    keyRequirementsEn: [
      'Validation: Collect scientific and empirical evidence that critical limits achieve intended hazard reduction',
      'Verification: Calibration certificates, internal HACCP audits, end-product testing, and CCP review logs',
      'Re-validate HACCP plans annually or upon formula changes, equipment retrofits, or regulatory updates'
    ],
    departmentRelevance: ['QA', 'QMR', 'RD', 'CM', 'MC'],
    famiComparisonNote: 'FAMI-QS กำหนดให้มีการทวนสอบประสิทธิภาพการล้างเครื่องผสม (Cleaning Validation) อย่างน้อยปีละ 1 ครั้ง'
  },
  {
    id: 'haccp-p-7',
    standard: 'GHPs/HACCP',
    clauseNumber: 'Principle 7 / Step 12',
    titleTh: 'การจัดทำเอกสารและการเก็บบันทึก (Documentation & Record Keeping)',
    titleEn: 'Establish Documentation and Record Keeping (Principle 7)',
    descriptionTh: 'การจัดทำและรักษาเอกสารและบันทึกข้อมูลที่เหมาะสม เพื่อเป็นหลักฐานยืนยันว่าการควบคุมจุด CCP เป็นไปอย่างมีประสิทธิผล',
    descriptionEn: 'Establish documentation concerning all procedures and maintain records appropriate to these principles and their application.',
    keyRequirementsTh: [
      'เก็บบันทึกผลการเฝ้าระวัง CCP, บันทึกการแก้ไขเมื่อเกิดเบี่ยงเบน, และบันทึกการทวนสอบ',
      'บันทึกต้องอ่านง่าย ชัดเจน ระบุ Lot No. วันที่ เวลา และผู้บันทึกอย่างถูกต้อง',
      'เก็บรักษาเอกสารและบันทึกไม่น้อยกว่า 3 ปีตามระเบียบกรมปศุสัตว์'
    ],
    keyRequirementsEn: [
      'Retain daily CCP monitoring logs, deviation corrective action records, and calibration certificates',
      'Records must be legible, permanent, recording exact batch, date, time, and operator signature',
      'Retain all HACCP-related production records for a minimum of 3 years'
    ],
    departmentRelevance: ['DC', 'QA', 'PT'],
    famiComparisonNote: 'FAMI-QS 7.5 กำหนดให้บันทึกอิเล็กทรอนิกส์ต้องมี Audit Trail ป้องกันการแก้ไขย้อนหลัง'
  },

  // ==========================================
  // 3. FAMI-QS Code of Practice Version 6 Rev. 4
  // ==========================================
  {
    id: 'fami-4.1',
    standard: 'FAMI-QS',
    clauseNumber: '4.1',
    titleTh: 'บริบทขององค์กรและขอบข่ายความปลอดภัยอาหารสัตว์',
    titleEn: 'Understanding the Organization and its Context (Specialty Feed)',
    descriptionTh: 'องค์กรต้องกำหนดประเด็นภายในและภายนอกที่ส่งผลต่อความปลอดภัยและคุณภาพของสารเสริมอาหารสัตว์และสารผสมล่วงหน้า (Specialty Feed Ingredients and Mixtures)',
    descriptionEn: 'The organization shall determine external and internal issues that affect feed safety and quality of specialty feed ingredients and their mixtures.',
    keyRequirementsTh: [
      'วิเคราะห์ความเสี่ยงด้านห่วงโซ่อาหารสัตว์ระหว่างประเทศและกฎระเบียบของสหภาพยุโรป/ประเทศคู่ค้า',
      'กำหนดขอบเขตครอบคลุมผลิตภัณฑ์พรีมิกซ์ สารเสริมชีวภาพ และโภชนเภสัชสัตว์',
      'ทบทวนประเด็นความเสี่ยงในการประชุม Feed Safety Committee'
    ],
    keyRequirementsEn: [
      'Analyze global feed chain risks, EU feed safety regulations, and export market criteria',
      'Define operational scope covering specialty additives, premixes, biosecurity supplements',
      'Review context issues in designated Feed Safety Committee sessions'
    ],
    departmentRelevance: ['QMR', 'DC', 'RD', 'TC'],
    famiComparisonNote: 'เป็นข้อกำหนดเฉพาะของ FAMI-QS Version 6 เพื่อให้มั่นใจในความปลอดภัยของสารเสริมอาหารสัตว์ทั่วโลก'
  },
  {
    id: 'fami-4.5',
    standard: 'FAMI-QS',
    clauseNumber: '4.5',
    titleTh: 'นโยบายความปลอดภัยและคุณภาพอาหารสัตว์ (Feed Safety Policy)',
    titleEn: 'Feed Safety and Quality Policy',
    descriptionTh: 'ผู้บริหารระดับสูงต้องจัดทำนโยบายความปลอดภัยอาหารสัตว์ที่แสดงความมุ่งมั่นในการผลิตสินค้าที่ถูกสุขลักษณะ ปลอดภัย ถูกกฎหมาย และส่งเสริมวัฒนธรรมความปลอดภัยอาหารสัตว์',
    descriptionEn: 'Top management shall establish a Feed Safety and Quality Policy reflecting commitments to legal compliance, food chain safety, and feed safety culture.',
    keyRequirementsTh: [
      'นโยบายระบุความมุ่งมั่นในการป้องกันอันตรายสู่ห่วงโซ่อาหาร (Feed-to-Food Safety)',
      'เน้นย้ำวัฒนธรรมความปลอดภัยอาหารสัตว์ (Feed Safety Culture) ในทุกระดับการทำงาน',
      'สื่อสารและติดประกาศในพื้นที่ผลิตและสำนักงาน'
    ],
    keyRequirementsEn: [
      'Express explicit dedication to safeguarding the animal feed and human food chain',
      'Foster and continuously measure organizational Feed Safety Culture',
      'Display prominently across plant zones and communicate during staff onboarding'
    ],
    departmentRelevance: ['QMR', 'HR', 'ทุกแผนก'],
    famiComparisonNote: 'FAMI-QS V6 เพิ่มข้อกำหนดเรื่อง Feed Safety Culture เข้ามาเป็นเกณฑ์บังคับในการตรวจประเมิน'
  },
  {
    id: 'fami-5.3',
    standard: 'FAMI-QS',
    clauseNumber: '5.3',
    titleTh: 'ทีมความปลอดภัยอาหารสัตว์ (Feed Safety Team)',
    titleEn: 'Feed Safety Team & Team Leader Competence',
    descriptionTh: 'องค์กรต้องแต่งตั้งทีมความปลอดภัยอาหารสัตว์และหัวหน้าทีม ซึ่งต้องมีความรู้และความสามารถในระบบ FAMI-QS และหลักการ HACCP',
    descriptionEn: 'A multidisciplinary Feed Safety Team led by a qualified team leader must be established with documented competencies.',
    keyRequirementsTh: [
      'หัวหน้าทีมต้องผ่านการฝึกอบรมหลักสูตร FAMI-QS และมีวุฒิภาวะทางเทคนิค',
      'มีคำสั่งแต่งตั้งเป็นลายลักษณ์อักษรและระบุอำนาจในการสั่งหยุดไลน์ผลิตเมื่อพบอันตราย',
      'ประชุมทบทวนระบบความปลอดภัยอาหารสัตว์อย่างน้อยไตรมาสละ 1 ครั้ง'
    ],
    keyRequirementsEn: [
      'Team Leader must possess certified training in FAMI-QS Code of Practice and veterinary sciences',
      'Formal appointment letter granting full authority to halt production lines upon imminent safety risks',
      'Hold quarterly Feed Safety review sessions with documented outcomes'
    ],
    departmentRelevance: ['QMR', 'QA', 'PT', 'RD', 'EN'],
    famiComparisonNote: 'หัวหน้าทีมต้องมีอำนาจสั่งหยุดการผลิต (Stop-Production Authority) ได้ทันทีโดยไม่ต้องรออนุมัติฝ่ายขาย'
  },
  {
    id: 'fami-6.1',
    standard: 'FAMI-QS',
    clauseNumber: '6.1',
    titleTh: 'การประเมินความเสี่ยงด้านความปลอดภัยอาหารสัตว์และการปลอมปน (Feed Safety & Fraud Risk)',
    titleEn: 'Actions to Address Risks - Feed Safety, Feed Fraud & Feed Defense',
    descriptionTh: 'การประเมินความเสี่ยงที่ครอบคลุมความเสี่ยงด้านความปลอดภัยอาหารสัตว์ (Feed Safety Hazards), การป้องกันการปลอมปนเพื่อผลประโยชน์ทางเศรษฐกิจ (Feed Fraud/EMA) และการป้องกันการก่อวินาศกรรม (Feed Defense)',
    descriptionEn: 'Risk assessment addressing feed safety hazards, Economically Motivated Adulteration (Feed Fraud), and intentional contamination threats (Feed Defense).',
    keyRequirementsTh: [
      'จัดทำเอกสารประเมินความเปราะบางต่อการปลอมปน (Feed Fraud Vulnerability Assessment)',
      'จัดทำแผนรักษาความปลอดภัยพื้นที่ผลิตและคลังสินค้า (Feed Defense Plan)',
      'กำหนดมาตรการสุ่มตรวจวิเคราะห์สารปลอมปน เช่น เมลามีน ยูเรีย สารให้ความหวานต้องห้าม'
    ],
    keyRequirementsEn: [
      'Document formal Feed Fraud Vulnerability Assessments for all high-value specialty ingredients',
      'Implement plant physical security and access controls under the Feed Defense Plan',
      'Define targeted analytical testing routines for adulterants (melamine, synthetic non-protein nitrogen)'
    ],
    departmentRelevance: ['QMR', 'QA', 'PR', 'WH', 'PT'],
    famiComparisonNote: 'จุดแตกต่างสำคัญที่สุดจาก ISO 9001: FAMI-QS บังคับให้ทำ Feed Fraud และ Feed Defense อย่างเป็นรูปธรรม'
  },
  {
    id: 'fami-6.2',
    standard: 'FAMI-QS',
    clauseNumber: '6.2',
    titleTh: 'วัตถุประสงค์ด้านความปลอดภัยและคุณภาพอาหารสัตว์',
    titleEn: 'Feed Safety and Quality Objectives',
    descriptionTh: 'การกำหนดวัตถุประสงค์ที่วัดผลได้ในเชิงเทคนิคด้านความปลอดภัยอาหารสัตว์ และการติดตามผลการดำเนินงาน',
    descriptionEn: 'Establishing measurable technical objectives addressing specialty feed safety performance and quality reliability.',
    keyRequirementsTh: [
      'กำหนดเป้าหมายเชิงตัวเลข เช่น อัตราการปนเปื้อนข้าม (Carry-over) ต้องเป็นศูนย์',
      'ค่าความสม่ำเสมอในการผสม (Mixing Homogeneity CV) ต้อง < 5%',
      'อัตราการส่งมอบเอกสาร COA ถูกต้อง 100%'
    ],
    keyRequirementsEn: [
      'Establish technical targets: zero hazardous cross-contamination incidents',
      'Premix mixing homogeneity coefficient of variation (CV) < 5%',
      '100% compliance on Certificate of Analysis parameter verification'
    ],
    departmentRelevance: ['QMR', 'PT', 'QA', 'CM'],
    famiComparisonNote: 'ต่างจาก ISO 9001 ที่มุ่งเน้น KPI ธุรกิจ FAMI-QS มุ่งเน้นพารามิเตอร์ด้านความปลอดภัยในสัตว์เป็นหลัก'
  },
  {
    id: 'fami-7.1',
    standard: 'FAMI-QS',
    clauseNumber: '7.1',
    titleTh: 'บุคลากร สุขลักษณะ และวัฒนธรรมความปลอดภัยอาหารสัตว์',
    titleEn: 'Personnel, Hygiene and Feed Safety Culture',
    descriptionTh: 'ข้อกำหนดเรื่องสุขลักษณะของพนักงาน การคัดกรองสุขภาพ และการปลูกฝังวัฒนธรรมความปลอดภัยอาหารสัตว์',
    descriptionEn: 'Mandatory personnel hygiene, health screening, protective equipment, and feed safety culture nurturing.',
    keyRequirementsTh: [
      'ตรวจสุขภาพและคัดกรองโรคที่อาจปนเปื้อนสู่อาหารสัตว์',
      'สวมชุดคลุม หมวกคลุมผม และหน้ากากป้องกันฝุ่นยา (Respirator)',
      'วัดระดับความตระหนักและประเมิน Feed Safety Culture ประจำปี'
    ],
    keyRequirementsEn: [
      'Routine health surveillance screening for communicable illnesses',
      'Mandatory use of dust-tight uniforms, hair nets, safety boots, and particulate respirators',
      'Conduct annual Feed Safety Culture maturity assessments'
    ],
    departmentRelevance: ['HR', 'PT', 'QA'],
    famiComparisonNote: 'FAMI-QS ให้ความสำคัญกับการป้องกันพนักงานสูดดมฝุ่นยาและการแพร่กระจายละอองยาปฏิชีวนะ'
  },
  {
    id: 'fami-7.2',
    standard: 'FAMI-QS',
    clauseNumber: '7.2',
    titleTh: 'โครงสร้างพื้นฐานและสภาพแวดล้อมการทำงาน (Infrastructure & Dust Control)',
    titleEn: 'Infrastructure, Work Environment & Dust Control',
    descriptionTh: 'การออกแบบอาคารและระบบควบคุมสิ่งแวดล้อม โดยเฉพาะระบบกำจัดฝุ่น (Dust Extraction) เพื่อป้องกันการสะสมและระเบิดของฝุ่นแป้ง',
    descriptionEn: 'Design of plant buildings and atmospheric environment, specifically dust extraction to prevent cross-contamination and dust explosions.',
    keyRequirementsTh: [
      'ติดตั้งระบบดูดฝุ่น (Dust Collector / Extraction Hood) ประจำจุดชั่งและจุดเทสาร',
      'แยกห้องผลิตสารยาปฏิชีวนะออกจากห้องผลิตวิตามินแร่ธาตุทั่วไป',
      'ควบคุมแรงดันอากาศ (Differential Pressure) เพื่อป้องกันฝุ่นฟุ้งข้ามห้อง'
    ],
    keyRequirementsEn: [
      'Install dust collection hoods and local exhaust ventilation at tipping and weighing hoppers',
      'Physical segregation between medicated veterinary premix suites and vitamin/mineral areas',
      'Maintain positive differential air pressures to prevent airborne cross-contamination'
    ],
    departmentRelevance: ['EN', 'PT', 'QA'],
    famiComparisonNote: 'FAMI-QS กำหนดเรื่องการจัดการความเสี่ยงจากฝุ่นผงยา (Dust Hazard Mitigation) อย่างละเอียด'
  },
  {
    id: 'fami-7.5',
    standard: 'FAMI-QS',
    clauseNumber: '7.5',
    titleTh: 'การควบคุมสัตว์พาหะนำโรค (Pest Control)',
    titleEn: 'Pest Control Management',
    descriptionTh: 'ระบบป้องกันและกำจัดสัตว์พาหะแบบผสมผสาน (IPM) เพื่อป้องกันสัตว์ฟันแทะ นก และแมลงปนเปื้อนในอาหารสัตว์',
    descriptionEn: 'Integrated Pest Management (IPM) to eliminate risks of contamination from rodents, birds, insects, and other pests.',
    keyRequirementsTh: [
      'ผังจุดติดตั้งอุปกรณ์ดักจับสัตว์พาหะ (Pest Layout Map) ครอบคลุมทั้งภายในและภายนอกอาคาร',
      'ใช้กับดักกาวหรือกล่องดักแบบไม่มีสารพิษภายในพื้นที่ผลิต (Non-toxic inside production zones)',
      'ตรวจสอบและบันทึกรายงานโดยบริษัทผู้เชี่ยวชาญทุกเดือน'
    ],
    keyRequirementsEn: [
      'Comprehensive plant layout map showing all numbered interior and exterior bait and trap locations',
      'Strict prohibition of toxic poison baits inside active manufacturing and ingredient storage halls',
      'Monthly trend analysis reports reviewed jointly with certified pest control contractor'
    ],
    departmentRelevance: ['EN', 'QA', 'WH', 'PT'],
    famiComparisonNote: 'FAMI-QS ห้ามใช้เหยื่อพิษชนิดเม็ดในพื้นที่ผลิตเด็ดขาดเพื่อป้องกันการหล่นปนในถังผสม'
  },
  {
    id: 'fami-7.7',
    standard: 'FAMI-QS',
    clauseNumber: '7.7',
    titleTh: 'การป้องกันการปนเปื้อนข้ามและการตกค้างข้ามรุ่น (Cross-contamination & Carry-over)',
    titleEn: 'Prevention of Cross-contamination and Carry-over',
    descriptionTh: 'มาตรการป้องกันการปนเปื้อนข้ามของสารยาปฏิชีวนะ ยาต้านจุลชีพ หรือสารเติมแต่งเข้มข้นไปยังรุ่นการผลิตถัดไป',
    descriptionEn: 'Systematic measures to prevent cross-contamination and carry-over of active veterinary medicinal ingredients and feed additives.',
    keyRequirementsTh: [
      'ทดสอบอัตราการตกค้างข้าม (Carry-over Validation Test) ของระบบผสมและลำเลียง',
      'จัดลำดับการผลิต (Production Sequencing): ผลิตสูตรที่มียาก่อน แล้วตามด้วยสูตรที่ไม่มีตัวยาที่เข้ากันได้',
      'กำหนดขั้นตอนการล้างชะสายการผลิต (Flushing Procedure) ด้วยสารตัวกลาง (เช่น ข้าวโพดบด หรือรำ)'
    ],
    keyRequirementsEn: [
      'Conduct empirical Carry-over Validation Testing on mixers, conveyors, and bagging bins',
      'Enforce production sequencing schedules (e.g. Medicated feed -> Intermediate rinse -> Non-medicated)',
      'Document flush protocols using designated carrier flushes (ground corn or bran), strictly tracked'
    ],
    departmentRelevance: ['PT', 'QA', 'WH'],
    famiComparisonNote: 'ข้อกำหนดเด่นของ FAMI-QS: ผู้ผลิตพรีมิกซ์ต้องมีข้อมูลพิสูจน์ค่า Carry-over Rate ชัดเจน'
  },
  {
    id: 'fami-7.8',
    standard: 'FAMI-QS',
    clauseNumber: '7.8',
    titleTh: 'การทำความสะอาดและการฆ่าเชื้อ (Cleaning and Disinfection)',
    titleEn: 'Cleaning and Disinfection / Sanitation Protocols',
    descriptionTh: 'ขั้นตอนการทำความสะอาดแบบแห้ง (Dry Cleaning) และแบบเปียก (Wet Cleaning) พร้อมการตรวจสอบความถูกต้องของการทำความสะอาด',
    descriptionEn: 'Validated dry and wet sanitation procedures designed for powder blending and liquid packaging installations.',
    keyRequirementsTh: [
      'สายการผลิตยาผงและพรีมิกซ์เน้นการทำความสะอาดแบบแห้ง (ดูดฝุ่น เป่าลม ขูดล้าง)',
      'สายการผลิตยาน้ำและแชมพูต้องมีขั้นตอน CIP (Clean-in-Place) หรือล้างฆ่าเชื้อด้วยน้ำร้อน',
      'ตรวจทวนสอบคราบตกค้างด้วยวิธี Swab Test และสารเคมีเรืองแสง (UV Inspection)'
    ],
    keyRequirementsEn: [
      'Dry sanitation protocols for powder and premix lines using industrial vacuum cleaners and dry brushing',
      'Wet Clean-In-Place (CIP) and validated sanitization for liquid veterinary drug formulation vessels',
      'Visual, ATP swab, and analytical chemical verification to confirm absence of cross-contaminating residues'
    ],
    departmentRelevance: ['PT', 'QA', 'MC'],
    famiComparisonNote: 'FAMI-QS เน้นการป้องกันไม่ให้เกิดความชื้นสะสมในถังผสมยาผง ซึ่งอาจก่อให้เกิดเชื้อรา'
  },
  {
    id: 'fami-7.9',
    standard: 'FAMI-QS',
    clauseNumber: '7.9',
    titleTh: 'การบำรุงรักษาและการสอบเทียบเครื่องมือวัด (Maintenance & Calibration)',
    titleEn: 'Maintenance and Calibration of Critical Equipment',
    descriptionTh: 'การบำรุงรักษาเชิงป้องกันของเครื่องจักร และการสอบเทียบเครื่องชั่งน้ำหนักส่วนผสมละเอียด (Micro-ingredients)',
    descriptionEn: 'Preventive maintenance of process equipment and traceable calibration of sensitive micro-dosing scales and meters.',
    keyRequirementsTh: [
      'สอบเทียบเครื่องชั่งน้ำหนัก (Analytical & Industrial Scales) ตามมาตรฐาน มอก. หรือสถาบันมาตรวิทยา',
      'ทดสอบ Daily Scale Verification ด้วยตุ้มน้ำหนักมาตรฐาน (Standard Weights) ก่อนเริ่มงานทุกวัน',
      'บันทึกประวัติการเปลี่ยนใบพัดเครื่องผสม ซีลยาง และสายพานลำเลียง'
    ],
    keyRequirementsEn: [
      'Annual certified calibration of all analytical balances, platform scales, and dosing load cells',
      'Perform mandatory daily balance check using calibrated M1/F1 class reference weights before each shift',
      'Retain maintenance overhaul logs for mixer ribbons, shaft seals, and conveying screws'
    ],
    departmentRelevance: ['EN', 'PT', 'QA', 'CM'],
    famiComparisonNote: 'FAMI-QS ถือว่าความแม่นยำของเครื่องชั่งส่วนผสมพรีมิกซ์มีความสำคัญต่อชีวิตสัตว์โดยตรง'
  },
  {
    id: 'fami-7.14',
    standard: 'FAMI-QS',
    clauseNumber: '7.14',
    titleTh: 'การจัดการวิกฤตการณ์ (Crisis Management)',
    titleEn: 'Crisis Management and Incident Handling',
    descriptionTh: 'ขั้นตอนการรับมือกับสถานการณ์ฉุกเฉิน อุบัติภัย น้ำท่วม เพลิงไหม้ หรือการตรวจพบสารปนเปื้อนอันตรายร้ายแรง',
    descriptionEn: 'Procedures for managing crises, natural disasters, contamination emergencies, and unexpected supply chain disruptions.',
    keyRequirementsTh: [
      'จัดทำคู่มือแผนเผชิญเหตุวิกฤต (Crisis Management Plan)',
      'แต่งตั้งคณะกรรมการจัดการวิกฤต (Crisis Management Team) พร้อมเบอร์ติดต่อฉุกเฉิน 24 ชม.',
      'กำหนดช่องทางการแจ้งเตือนไปยังหน่วยรับรอง FAMI-QS และกรมปศุสัตว์'
    ],
    keyRequirementsEn: [
      'Maintain an updated Crisis Management Procedure with emergency contacts available 24/7',
      'Establish incident escalation hierarchy and designated official company spokespersons',
      'Protocol for notifying FAMI-QS management and national veterinary authorities within mandatory timeframes'
    ],
    departmentRelevance: ['QMR', 'QA', 'HR', 'EN'],
    famiComparisonNote: 'FAMI-QS บังคับให้ต้องแจ้งเหตุการณ์วิกฤตความปลอดภัยอาหารสัตว์แก่ FAMI-QS ภายใน 2 วันทำการ'
  },
  {
    id: 'fami-7.15',
    standard: 'FAMI-QS',
    clauseNumber: '7.15',
    titleTh: 'การเรียกคืนผลิตภัณฑ์ (Product Recall & Withdrawal)',
    titleEn: 'Product Recall and Withdrawal',
    descriptionTh: 'ระบบการเรียกคืนสินค้าที่ไม่ปลอดภัยออกจากตลาดอย่างรวดเร็วและมีประสิทธิภาพ เพื่อปกป้องสุขภาพสัตว์และผู้บริโภค',
    descriptionEn: 'Rapid and effective recall and withdrawal mechanisms to retrieve nonconforming or hazardous feed products from the market.',
    keyRequirementsTh: [
      'จัดทำขั้นตอนปฏิบัติการเรียกคืนสินค้า (Product Recall Procedure)',
      'จำลองการซักซ้อมเรียกคืนสินค้า (Mock Recall) อย่างน้อยปีละ 1 ครั้ง',
      'เป้าหมายการซักซ้อม: สามารถชี้บ่งตำแหน่งและปริมาณสินค้าได้ครบ 100% ภายใน 4 ชั่วโมง'
    ],
    keyRequirementsEn: [
      'Maintain formal Product Recall Procedure detailing communication cascades and retrieval logistics',
      'Conduct simulated Mock Recall exercises at least once annually involving active batches',
      'Performance benchmark: 100% material accounting and tracing achieved within 4 hours maximum'
    ],
    departmentRelevance: ['QA', 'QMR', 'LG', 'SR', 'FR', 'WH'],
    famiComparisonNote: 'FAMI-QS กำหนดเกณฑ์ Mock Recall เข้มงวด 4 ชม. ทั้งขาเข้า (Trace-back) และขาออก (Trace-forward)'
  },
  {
    id: 'fami-7.16',
    standard: 'FAMI-QS',
    clauseNumber: '7.16',
    titleTh: 'การป้องกันการปลอมปนและการป้องกันวินาศกรรม (Feed Fraud & Feed Defense)',
    titleEn: 'Feed Fraud Prevention and Feed Defense Measures',
    descriptionTh: 'การประเมินความเปราะบางต่อการปลอมปนเพื่อหวังผลทางเศรษฐกิจ และการรักษาความปลอดภัยสถานที่เพื่อป้องกันการปนเปื้อนโดยเจตนา',
    descriptionEn: 'Vulnerability assessment against economically motivated adulteration and facility defense against intentional contamination.',
    keyRequirementsTh: [
      'ประเมินวัตถุดิบกลุ่มเสี่ยงสูง (วิตามิน, กรดอะมิโน, สารสกัดสมุนไพร, สารแต่งกลิ่นรส)',
      'มาตรการตรวจสอบความปลอดภัยทางกายภาพ: การติดซีลตู้คอนเทนเนอร์, กล้องวงจรปิด CCTV, บัตรผ่านเข้าออก',
      'ตรวจแล็บยืนยันสารปลอมปนตามแผนเฝ้าระวังประจำปี'
    ],
    keyRequirementsEn: [
      'Assess vulnerable raw ingredients (synthetic vitamins, amino acids, botanicals, enzymes, flavors)',
      'Implement physical access security: tamper-evident container seals, CCTV coverage, visitor badging',
      'Establish analytical testing schedule for economic adulterants (melamine, cyanuric acid, synthetic dyes)'
    ],
    departmentRelevance: ['QA', 'PR', 'WH', 'PT', 'HR'],
    famiComparisonNote: 'เป็นข้อกำหนดเฉพาะของ FAMI-QS V6 เพื่อปกป้องความน่าเชื่อถือของอุตสาหกรรมสารเสริมอาหารสัตว์'
  },
  {
    id: 'fami-8.3',
    standard: 'FAMI-QS',
    clauseNumber: '8.3',
    titleTh: 'ระบบการตรวจสอบย้อนกลับ (Traceability System)',
    titleEn: 'Traceability System (One Step Back, One Step Forward)',
    descriptionTh: 'ความสามารถในการสอบกลับวัตถุดิบทุกชนิด บรรจุภัณฑ์ และสารช่วยการผลิต ย้อนกลับไปยังผู้ขาย และสอบไปข้างหน้ายังผู้รับมอบสินค้า',
    descriptionEn: 'Full forward and backward batch traceability from supplier raw ingredients through intermediate mixes to final customer delivery.',
    keyRequirementsTh: [
      'ระบบบันทึก Lot No. เชื่อมโยงระหว่างวัตถุดิบ (Raw Material Lot) -> ใบผลิต (BMR No.) -> สินค้าสำเร็จรูป (FG Lot)',
      'สามารถสืบค้นย้อนกลับและไปข้างหน้าได้สมบูรณ์ภายในเวลาไม่เกิน 4 ชั่วโมง',
      'เก็บบันทึกการสอบกลับได้ไว้อย่างน้อย 3 ปี'
    ],
    keyRequirementsEn: [
      'Electronic and documented linking: Supplier Lot -> Weighing Record -> BMR batch -> Finished Good Lot -> Dispatch invoice',
      'Demonstrated capacity to execute full mass-balance reconciliation within 4 hours',
      'Traceability records retained for at least 3 years'
    ],
    departmentRelevance: ['QA', 'WH', 'PT', 'IT', 'LG', 'SR', 'FR'],
    famiComparisonNote: 'FAMI-QS บังคับให้ต้องคำนวณ Mass Balance (ดุลมวลสาร) โดยมีอัตราสูญหายหรือเกินอยู่ในเกณฑ์ที่ยอมรับได้'
  },
  {
    id: 'fami-8.4.2',
    standard: 'FAMI-QS',
    clauseNumber: '8.4.2',
    titleTh: 'ความสม่ำเสมอและความทั่วถึงในการผสม (Homogeneity of Mixing)',
    titleEn: 'Homogeneity of Mixing Validation',
    descriptionTh: 'การทดสอบและพิสูจน์ความสม่ำเสมอในการกระจายตัวของสารออกฤทธิ์หรือสารเติมแต่งในเครื่องผสม เพื่อให้สัตว์ได้รับสารอาหารและยาในปริมาณที่ถูกต้อง',
    descriptionEn: 'Empirical validation of mixing efficiency to demonstrate uniform dispersion of micro-ingredients throughout the feed batch matrix.',
    keyRequirementsTh: [
      'ทำการทดสอบ Homogeneity Test อย่างน้อยปีละ 1 ครั้ง หรือเมื่อเปลี่ยนชนิดใบพัด/เครื่องผสมใหม่',
      'สุ่มตัวอย่างอย่างน้อย 10 จุดจากถังผสมเพื่อหาค่า Coefficient of Variation (CV)',
      'เกณฑ์ยอมรับ: ค่า CV < 5% สำหรับสารออกฤทธิ์สูง (ยาปฏิชีวนะ, พรีมิกซ์เข้มข้น) หรือ < 10% สำหรับวิตามินแร่ธาตุทั่วไป'
    ],
    keyRequirementsEn: [
      'Perform mixer homogeneity validation trials at least annually or following major blender modifications',
      'Collect minimum of 10 representative samples across the blender discharge for CV calculation',
      'Acceptance criteria: Coefficient of Variation (CV) < 5% for critical active ingredients and medicinal premixes'
    ],
    departmentRelevance: ['PT', 'QA', 'CM'],
    famiComparisonNote: 'ข้อกำหนดเด่นของ FAMI-QS: หากค่า CV เกิน 5% จะไม่สามารถผลิตพรีมิกซ์ยาสำหรับอาหารสัตว์ได้'
  },
  {
    id: 'fami-8.4.3',
    standard: 'FAMI-QS',
    clauseNumber: '8.4.3',
    titleTh: 'การควบคุมการตกค้างข้ามรุ่นและการชะล้าง (Carry-over & Flushing)',
    titleEn: 'Carry-over Control and Flushing Validation',
    descriptionTh: 'การตรวจสอบและควบคุมปริมาณสารยาปฏิชีวนะหรือสารต้องห้ามที่ตกค้างในเครื่องจักรหลังเสร็จสิ้นรุ่นผลิต เพื่อไม่ให้ปนเปื้อนไปยังรุ่นถัดไป',
    descriptionEn: 'Quantitative evaluation and control of active residues left behind in mixers and conveying equipment to prevent contaminating subsequent non-medicated batches.',
    keyRequirementsTh: [
      'ทำการทดสอบ Carry-over Test โดยการผสมสูตรยา แล้วตามด้วยสารชะล้าง (Flush batch)',
      'ตรวจวิเคราะห์ปริมาณตัวยาในสารชะล้างเพื่อหาเปอร์เซ็นต์การตกค้างข้าม',
      'ชี้บ่งสาร Flush Material อย่างชัดเจน และห้ามนำไปจำหน่ายเป็นอาหารสัตว์ทั่วไปโดยไม่ผ่านการบำบัด'
    ],
    keyRequirementsEn: [
      'Execute validated Carry-over trials by testing active concentrations in a blank flush batch following a medicated batch',
      'Calculate percentage residual carry-over to prove compliance with feed safety thresholds',
      'Clearly identify and segregate all flush material; re-use only under approved validated procedures'
    ],
    departmentRelevance: ['PT', 'QA', 'WH', 'CM'],
    famiComparisonNote: 'FAMI-QS มีเกณฑ์กำหนดค่า Carry-over ที่เข้มงวดที่สุดในบรรดามาตรฐานอาหารสัตว์สากล'
  },
  {
    id: 'fami-8.8',
    standard: 'FAMI-QS',
    clauseNumber: '8.8',
    titleTh: 'การควบคุมผลิตภัณฑ์อาหารสัตว์ที่ไม่เป็นไปตามข้อกำหนด',
    titleEn: 'Control of Nonconforming Specialty Feed',
    descriptionTh: 'ขั้นตอนการกักกัน ชี้บ่ง และตัดสินจัดการผลิตภัณฑ์อาหารสัตว์ที่พบข้อบกพร่อง เพื่อป้องกันไม่ให้อาหารสัตว์ที่ไม่ปลอดภัยหลุดรอดสู่ห่วงโซ่อาหาร',
    descriptionEn: 'Protocols for quarantining, labeling, investigating, and disposing of nonconforming specialty feed ingredients or mixtures.',
    keyRequirementsTh: [
      'ติดป้ายสถานะ "HOLD / REJECT" ทันทีที่พบข้อสงสัยด้านคุณภาพหรือความปลอดภัย',
      'ห้ามเจือจางอาหารสัตว์ที่มีสารปนเปื้อนเกินมาตรฐานเพื่อนำกลับมาขายโดยเด็ดขาด (No Dilution Rule)',
      'การทำลายสินค้าต้องมีบันทึกและพยานรับรอง พร้อมรายงานต่อ QMR'
    ],
    keyRequirementsEn: [
      'Apply strict quarantine locks and prominent red HOLD/REJECT identification immediately',
      'Absolute prohibition against diluting non-conforming contaminated feed with good feed to meet specs',
      'Destruction and disposal must be witnessed, logged, and certified by QA Manager and QMR'
    ],
    departmentRelevance: ['QA', 'PT', 'WH', 'LG'],
    famiComparisonNote: 'กฎเหล็กของ FAMI-QS: ห้าม Dilute หรือ Blending สินค้าที่ปนเปื้อนสารเคมีอันตรายเพื่อหวังให้ผ่านเกณฑ์แล็บ'
  },
  {
    id: 'fami-9.2',
    standard: 'FAMI-QS',
    clauseNumber: '9.2',
    titleTh: 'การตรวจติดตามคุณภาพภายในตามหลักเกณฑ์ FAMI-QS',
    titleEn: 'FAMI-QS Internal Auditing',
    descriptionTh: 'การตรวจติดตามภายในโดยมุ่งเน้นความปลอดภัยของห่วงโซ่อาหารสัตว์ ความสมบูรณ์ของจุดวิกฤต CCP/OPRP และการป้องกันการปนเปื้อนข้าม',
    descriptionEn: 'Internal audit execution focused on feed chain integrity, PRPs/OPRPs/CCPs effectiveness, and cross-contamination prevention.',
    keyRequirementsTh: [
      'ผู้ตรวจประเมินต้องผ่านการฝึกอบรมข้อกำหนด FAMI-QS Code of Practice V.6',
      'ครอบคลุมทั้ง 18 แผนก และตรวจสอบเชิงลึกในไลน์ผลิต L1-L9',
      'ติดตามและปิดข้อบกพร่อง (CAR) ให้เสร็จสิ้นตามกรอบเวลา'
    ],
    keyRequirementsEn: [
      'Auditors must be qualified with certified understanding of FAMI-QS Code of Practice Version 6',
      'Audit scope encompasses all 18 departments with deep-dive technical evaluations in lines 1-9',
      'Issue and resolve CARs within strict close-out deadlines verified by Lead Auditor'
    ],
    departmentRelevance: ['QMR', 'ทุกแผนก'],
    famiComparisonNote: 'ผลการตรวจติดตามภายในต้องพร้อมแสดงต่อ Third-party Auditor ของ FAMI-QS เสมอ'
  },
  {
    id: 'fami-9.3',
    standard: 'FAMI-QS',
    clauseNumber: '9.3',
    titleTh: 'การทบทวนของฝ่ายบริหารด้านความปลอดภัยอาหารสัตว์',
    titleEn: 'Management Review for Feed Safety',
    descriptionTh: 'การทบทวนโดยผู้บริหารระดับสูงเพื่อประเมินประสิทธิผลของระบบความปลอดภัยอาหารสัตว์ วัฒนธรรมองค์กร และการเปลี่ยนแปลงกฎระเบียบระหว่างประเทศ',
    descriptionEn: 'Executive review evaluating the effectiveness of the Feed Safety Management System, culture maturity, and international regulatory compliance.',
    keyRequirementsTh: [
      'ทบทวนผลการทดสอบ Homogeneity, Carry-over, และ Mock Recall',
      'ทบทวนข้อร้องเรียนด้านความปลอดภัยอาหารสัตว์และรายงานข้อบกพร่อง',
      'จัดสรรทรัพยากรเพื่อยกระดับโรงงานและเทคโนโลยีการผลิตอย่างต่อเนื่อง'
    ],
    keyRequirementsEn: [
      'Review mixer Homogeneity, Carry-over test results, and annual Mock Recall metrics',
      'Evaluate feed safety customer complaints, regulatory changes, and CAPA effectiveness',
      'Allocate necessary financial and technical resources to maintain state-of-the-art feed safety'
    ],
    departmentRelevance: ['QMR', 'ทุกแผนก'],
    famiComparisonNote: 'FAMI-QS บังคับให้บันทึกรายงานการประชุม Management Review ต้องมีลายเซ็นผู้บริหารระดับสูงสุดของโรงงาน'
  }
];
