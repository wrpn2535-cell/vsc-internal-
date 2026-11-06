# Security Specification: Vet Superior IQA Firestore Rules

## 1. Data Invariants
- `app_state`: Global synchronized application state must have a valid ID (e.g. `default`).
- `assessments`: Must have valid IDs and required fields (auditCycle, departmentCode, status).
- `capas`: Must contain valid type (CAR, PAR), severity, and departmentCode.
- `users`: User profiles must have valid ID and string sizes within boundaries.

## 2. Dirty Dozen Threat Payloads Tested
1. Ghost field injection on app_state
2. Unauthenticated write attempt to /app_state/default
3. Invalid oversized document ID (> 128 characters)
4. Non-whitelisted enum on CapaRecord severity
5. Non-whitelisted enum on CapaRecord status
6. Unauthorized user profile modification
7. Write to unknown subcollection
8. Injection of script tags into findings
9. Overwrite of admin document
10. Spoofed email address without verification
11. Oversized payload attack (> 1MB)
12. Arbitrary collection traversal
