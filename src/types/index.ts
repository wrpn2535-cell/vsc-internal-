export type StandardType = 'ISO 9001' | 'GHPs/HACCP' | 'FAMI-QS' | 'Other';

export type AuditRating = 'C' | 'NC_MAJOR' | 'NC_MINOR' | 'OBS' | 'NA' | 'UNRATED';

export type UserRole = 'ADMIN' | 'QMR' | 'LEAD_AUDITOR' | 'AUDITOR' | 'AUDITEE' | 'TECHNICAL_EXPERT';

export type CauseCategory = 'Document' | 'Practice' | 'Communicate' | 'Machine' | 'Material' | 'Other';

export type SixMCategory = 'Man' | 'Machine' | 'Material' | 'Method' | 'Measurement' | 'Milieu';

export type CapaStatus = 'OPEN' | 'IN_PROGRESS' | 'PENDING_VERIFICATION' | 'CLOSED' | 'OVERDUE';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  departmentCode: string;
  departmentName: string;
  role: UserRole;
  title: string;
  avatarUrl?: string;
  isCustom?: boolean;
}

export interface DepartmentInfo {
  code: string; // e.g., 'QMR', 'DC', 'QA', 'CM', etc.
  nameTh: string; // e.g., 'ฝ่ายบริหารคุณภาพ'
  nameEn: string;
  category: 'Management' | 'Quality' | 'Technical' | 'Commercial' | 'Support' | 'Operations';
  subLines?: string[]; // e.g. for PT: ['Line 1', 'Line 2', ..., 'Line 9']
}

export interface ChecklistItem {
  id: string;
  departmentCode: string;
  itemCode: string; // e.g. 'QMR-01', 'PT-02'
  clauses: {
    iso9001?: string;
    famiQs?: string;
    dldGhpsHaccp?: string;
  };
  clauseSummary: string; // e.g. 'ISO 9001: 4.1, 4.2 / FAMI-QS: 4.1, 4.2 / DLD GHPs: ข้อ 7'
  questionTh: string;
  evidenceExamples: string[];
  remarks?: string;
  depthLevel?: 'standard' | 'deep_dive';
}

export interface ChecklistAssessmentRecord {
  id: string;
  scheduleId?: string;
  auditCycle: string; // e.g. '1/2569'
  departmentCode: string;
  auditDate: string; // YYYY-MM-DD
  auditTime: string; // e.g. '09:00 - 12:00'
  auditorId: string;
  auditorName: string;
  auditeeId: string;
  auditeeName: string;
  appliedStandards: StandardType[];
  formRev: string; // 'FM-QM-014 Rev.08'
  items: {
    checklistItemId: string;
    itemCode: string;
    clause: string;
    question: string;
    rating: AuditRating;
    findings: string;
    remarks: string;
    linkedCapaId?: string;
  }[];
  auditorSignature?: {
    name: string;
    date: string;
    dataUrl?: string;
  };
  auditeeSignature?: {
    name: string;
    date: string;
    dataUrl?: string;
  };
  qmrSignature?: {
    name: string;
    date: string;
    dataUrl?: string;
  };
  status: 'DRAFT' | 'COMPLETED';
  updatedAt: string;
}

export interface AnnualPlanDepartment {
  departmentCode: string;
  departmentName: string;
  standardsClause: string;
  months: {
    [month: number]: { // 1 = Jan, 12 = Dec
      plan: boolean;
      actual: boolean;
    };
  };
  remarks?: string;
}

export interface AnnualPlanHeader {
  formNumber: string; // 'FM-QM-013'
  revisionNumber: string; // '16'
  effectiveDate: string; // '17/04/2562'
  yearBe: number; // Buddhist Era, e.g. 2569
  systemText: string; // 'ISO 9001:2015, GHPs/HACCP กรมปศุสัตว์, FAMI-QS V.6'
  preparedBy: string;
  preparedDate: string;
  approvedBy: string;
  approvedDate: string;
}

export interface AuditScheduleItem {
  id: string;
  cycle: string; // '1/2569'
  date: string; // YYYY-MM-DD
  time: string; // '09:00 - 10:30'
  departmentCode: string;
  departmentName: string;
  requirements: string; // 'ISO 9001: 7.5, FAMI-QS: 7.5, DLD GHPs ข้อ 13.4'
  leadAuditorId: string;
  leadAuditorName: string;
  auditeeId: string;
  auditeeName: string;
  leadAuditorAck: boolean;
  leadAuditorAckDate?: string;
  auditeeAck: boolean;
  auditeeAckDate?: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  checklistRecordId?: string;
}

export interface ScheduleHeader {
  formNumber: string; // 'FM-QM-018'
  revisionNumber: string; // '07'
  effectiveDate: string; // '31/05/2565'
  cycleText: string; // '1/2569'
  preparedBy: string;
  preparedDate: string;
  approvedBy: string;
  approvedDate: string;
  appliedStandards: {
    iso9001: boolean;
    ghpsHaccp: boolean;
    famiQs: boolean;
    other: string;
  };
}

export interface CapaRecord {
  id: string; // e.g. 'CAR-2569-001' or 'PAR-2569-002'
  type: 'CAR' | 'PAR';
  severity: 'MAJOR' | 'MINOR' | 'OBSERVATION';
  departmentCode: string;
  departmentName: string;
  sourceItemCode: string;
  sourceClause: string;
  findingDescription: string;
  causeCategory: CauseCategory;
  sixM: SixMCategory;
  fiveWhy: {
    why1: string;
    why2: string;
    why3: string;
    why4: string;
    why5: string;
    rootCause: string;
  };
  containment: string;
  correctiveAction: string;
  assignedAuditee: string;
  dueDate: string; // YYYY-MM-DD
  leadAuditor: string;
  qmrName: string;
  status: CapaStatus;
  verificationEvidence?: string;
  verifiedBy?: string;
  verifiedDate?: string;
  closedDate?: string;
  createdAt: string;
}

export interface StandardClauseDetail {
  id: string;
  standard: StandardType;
  clauseNumber: string; // '7.1', '6.1', '8.4', etc.
  titleTh: string;
  titleEn: string;
  descriptionTh: string;
  descriptionEn: string;
  keyRequirementsTh: string[];
  keyRequirementsEn: string[];
  departmentRelevance: string[];
  famiComparisonNote?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'UPCOMING_AUDIT' | 'CAPA_DUE' | 'CAPA_OVERDUE' | 'ACK_REQUIRED' | 'INFO';
  linkTab?: string;
  targetId?: string;
  timestamp: string;
  read: boolean;
}

export interface FormTemplateCustomizer {
  companyNameTh: string;
  companyNameEn: string;
  plantLocationTh: string;
  logoUrl?: string;
  fmQm013: {
    docNumber: string;
    revision: string;
    effectiveDate: string;
  };
  fmQm018: {
    docNumber: string;
    revision: string;
    effectiveDate: string;
  };
  fmQm014: {
    docNumber: string;
    revision: string;
    effectiveDate: string;
  };
  fmQm021: {
    docNumber: string;
    revision: string;
    effectiveDate: string;
  };
  printFooterNote: string;
}

export interface AppState {
  users: UserProfile[];
  currentUser: UserProfile;
  isAuthenticated: boolean;
  loginTimestamp?: string;
  departments: DepartmentInfo[];
  checklistBank: ChecklistItem[];
  annualPlanHeader: AnnualPlanHeader;
  annualPlanRows: AnnualPlanDepartment[];
  scheduleHeader: ScheduleHeader;
  schedules: AuditScheduleItem[];
  checklistAssessments: ChecklistAssessmentRecord[];
  capas: CapaRecord[];
  standardsDatabase: StandardClauseDetail[];
  notifications: AppNotification[];
  templateConfig: FormTemplateCustomizer;
  lastUpdated: string;
}
