User
- id (PK)
- name
- phone
- email
- password_hash
- role (citizen, worker, contractor, admin, state_admin, super_admin)
- language
- created_at

Location
- id (PK)
- state
- city
- ward
- zone
- pincode

Complaint
- id (PK)
- user_id (FK -> User)
- location_id (FK -> Location)
- category (wet, dry, sanitary, hazardous)
- description
- image_url
- status (pending, assigned, in_progress, resolved)
- created_at
- updated_at

Assignment
- id (PK)
- complaint_id (FK)
- worker_id (FK -> User)
- contractor_id (FK -> User)
- assigned_at
- completed_at
- status

WorkerProfile
- user_id (PK, FK)
- zone_id
- availability
- rating

ContractorProfile
- user_id (PK, FK)
- company_name
- zones_managed

Notification
- id (PK)
- user_id
- message
- type
- read_status

AuditLog
- id (PK)
- action
- performed_by
- entity_type
- entity_id
- timestamp