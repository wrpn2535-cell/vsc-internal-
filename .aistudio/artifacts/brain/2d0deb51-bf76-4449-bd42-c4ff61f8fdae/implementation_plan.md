# แผนการรีเซ็ตข้อมูลระบบเป็นหน้าเปล่า (Fresh Start Data Reset)

แผนงานนี้จัดทำขึ้นเพื่อล้างข้อมูลตัวอย่าง (Mock/Example Data) และรีเซ็ตระบบให้พร้อมสำหรับการเริ่มใช้งานบันทึกข้อมูลจริงจากหน้างาน โดยคงไว้เฉพาะฐานข้อกำหนดคำถามตรวจประเมินที่จำเป็น และบัญชีผู้ดูแลระบบส่วนกลาง ตามความต้องการที่ผู้ใช้ยืนยัน

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **สรุปผลการตัดสินใจที่ได้รับการยืนยันจากผู้ใช้งาน (Confirmed Choices):**
> 1. **รีเซ็ตผลการตรวจ Checklist และ CAR/PAR ให้เป็นหน้าเปล่าทั้งหมด**:
>    - ล้างประวัติและผลการประเมิน Checklist (`checklistAssessments = []`) ทุกแผนก/ทุกไลน์การผลิต
>    - ล้างรายการออกใบ CAR และ PAR ทั้งหมด (`capas = []`) ให้เริ่มนับใหม่เมื่อเริ่มตรวจจริง
>    - ล้างรายการแจ้งเตือนค้างเก่า (`notifications = []`)
> 2. **คงคลังข้อกำหนดคำถามที่ต้องใช้ตรวจ (Checklist Bank) ไว้อย่างครบถ้วน**:
>    - คงคำถามทั้งภาษาไทยและอังกฤษ เกณฑ์มาตรฐาน ISO 9001:2015, FAMI-QS V.6, GHPs/HACCP กรมปศุสัตว์ สำหรับทุกแผนกและฝ่ายผลิต Line 1 ถึง Line 9 (`PT-L1` - `PT-L9`)
>    - ทุกหัวข้อคำถามจะเริ่มต้นด้วยสถานะว่าง (`UNRATED`), ไม่มีบันทึกหลักฐานค้าง (`findings: ""`), และไม่มีลายมือชื่อ พร้อมให้ผู้ตรวจประเมินบันทึกข้อมูลจริง
> 3. **รีเซ็ตทำเนียบทีมตรวจ (Audit Team Directory) เหลือเฉพาะบัญชี Admin**:
>    - ล้างรายชื่อบุคลากรตัวอย่าง (`usr-01` ถึง `usr-29`) ออกทั้งหมด
>    - คงเหลือเฉพาะบัญชีผู้ดูแลระบบสูงสุด: **คุณวรภณ พ. (`wrpn2535@gmail.com`)** บทบาท `ADMIN`
>    - ผู้ดูแลระบบสามารถใช้ฟังก์ชั่น "+ เพิ่มบุคลากรในทำเนียบ" เพื่อลงทะเบียนบุคลากรจริงขององค์กรได้ตามต้องการ
> 4. **การล้างข้อมูลใน Storage และ Firestore**:
>    - ล้างแคชใน LocalStorage (`vsc_iqa_state_v2`) และส่งข้อมูลสถานะว่างขึ้น Firestore Database เพื่อไม่ให้ข้อมูลตัวอย่างเดิมถูกโหลดกลับมาซ้ำ

---

## 1. Overview & Scope of Reset

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA RESET BOUNDARIES                           │
├───────────────────────────────────┬────────────────────────────────────┤
│   RESET TO EMPTY / BLANK (ล้าง)   │       PRESERVED / RETAINED (คงไว้)  │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Checklist Assessments (ผลตรวจ)   │ • Checklist Question Bank          │
│ • CAR / PAR Records (ใบแก้ไข)      │   (คำถามมาตรฐาน 18 แผนก + L1-L9)   │
│ • System Notifications (แจ้งเตือน) │ • Admin Account (wrpn2535@gmail)   │
│ • Example Personnel Directory     │ • Department Structure             │
│   (เหลือเฉพาะผู้ดูแลระบบ Admin)    │   (18 แผนก และ 9 ไลน์ผลิต)         │
│                                   │ • Standard Clauses (ISO/GHPs/FAMI) │
│                                   │ • Master Template Headers (Rev.08) │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 2. Technical Architecture & Data Strategy

### Component & State Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Initial Data Layer                   │
│  src/data/initialData.ts                               │
│  • USERS_DATA = [usr-admin]                            │
│  • INITIAL_CAPAS = []                                  │
│  • checklistAssessments = []                           │
│  • INITIAL_NOTIFICATIONS = []                          │
│  • CHECKLIST_BANK_DATA (Preserved Complete)            │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Local & Cloud Sync                   │
│  src/services/api.ts                                   │
│  • Reset localStorage cache                            │
│  • Push fresh empty state to Firestore                 │
│  • Broadcast clean state across active tabs            │
└───────────────────────────┬────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ ChecklistView │   │  CapaWorkflow │   │ AuditTeamView │
│ • All unrated │   │ • Empty state │   │ • Only Admin  │
│ • Ready for   │   │ • "+ New CAR" │   │ • Ready for   │
│   real audits │   │   action ready│   │   personnel   │
└───────────────┘   └───────────────┘   └───────────────┘
```

---

## 3. Implementation Steps

1. **Update `src/data/initialData.ts`**:
   - ปรับ `USERS_DATA` ให้คงไว้เฉพาะบัญชี Admin (`usr-admin`, `wrpn2535@gmail.com`)
   - ปรับ `INITIAL_CAPAS` ให้เป็น `[]` (Array ว่าง)
   - ปรับ `INITIAL_NOTIFICATIONS` ให้เป็น `[]` (Array ว่าง)
   - ตรวจสอบให้ `INITIAL_APP_STATE.checklistAssessments` เป็น `[]`
   - คง `CHECKLIST_BANK_DATA`, `STANDARDS_COMPLETE_DATA` และ `DEPARTMENTS_DATA` ไว้อย่างสมบูรณ์

2. **Handle Empty States in UI Components**:
   - **`CapaWorkflowView.tsx`**: ปรับแต่งหน้าจอแสดงผลเมื่อไม่มี CAR/PAR ในระบบ ให้แสดงข้อความสถานะว่างอย่างสวยงาม พร้อมปุ่มลัดสำหรับออกใบ CAR/PAR ใหม่
   - **`ChecklistView.tsx`**: ตรวจสอบการโหลดข้อคำถามให้เริ่มต้นที่สถานะว่าง (`UNRATED`), ข้อความบันทึกหลักฐานว่างเปล่า, และไม่มีลายมือชื่อค้างอยู่
   - **`AuditTeamView.tsx`**: แสดงเฉพาะการ์ดของ Admin พร้อมปุ่ม "+ เพิ่มบุคลากรในทำเนียบ" สำหรับให้ Admin เริ่มลงทะเบียนผู้ตรวจจริง
   - **`DashboardView.tsx` & `IqaReportView.tsx`**: ตรวจสอบการคำนวณสถิติเมื่อข้อมูลเริ่มต้นเป็นศูนย์ ไม่ให้เกิด Error หรือค่า NaN

3. **Synchronize & Clear Storage (`src/services/api.ts`)**:
   - เพิ่มกลไกในการอัปเดตและเคลียร์ข้อมูลตัวอย่างเก่าใน LocalStorage เพื่อให้โหลดค่าเริ่มต้นที่เป็นหน้าเปล่าโดยสมบูรณ์
   - ซิงค์โครงสร้างข้อมูลที่รีเซ็ตแล้วขึ้นสู่ Firestore Database

4. **Verification & Quality Check**:
   - รันการตรวจสอบการคอมไพล์ (`compile_applet`) และไวยากรณ์โค้ด (`lint_applet`)
   - ตรวจสอบหน้า Checklist, CAR/PAR, ทำเนียบทีมตรวจ และหน้าสรุปผลว่าแสดงผลเป็นหน้าเปล่าพร้อมใช้งานจริงอย่างราบรื่น
