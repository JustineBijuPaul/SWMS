# API ENDPOINTS

## AUTH MODULE
```bash
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/otp-login
GET    /api/auth/me
POST   /api/auth/logout
```

## USER MODULE
```bash
GET    /api/users/:id
PUT    /api/users/:id
GET    /api/users?role=worker
```

## COMPLAINT MODULE
```bash
POST   /api/complaints
GET    /api/complaints
GET    /api/complaints/:id
PUT    /api/complaints/:id
DELETE /api/complaints/:id
Filters:
GET /api/complaints?status=pending&ward=12
```

## ASSIGNMENT MODULE
```bash
POST   /api/assignments
GET    /api/assignments
PUT    /api/assignments/:id
```


## LOCATION MODULE
```bash
GET /api/locations
POST /api/locations
```

## NOTIFICATION MODULE
```bash
GET    /api/notifications
POST   /api/notifications
PUT    /api/notifications/:id/read
```

## ADMIN / ANALYTICS
```bash
GET /api/admin/dashboard
GET /api/admin/reports
GET /api/admin/metrics
```