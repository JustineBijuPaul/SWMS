# SWMS Web - Smart Waste Management System Web Application

## Overview

**SWMS Web** is a modern, scalable web platform for waste management operations. Built with Next.js and React, it serves as the central hub for citizens reporting waste issues, workers managing collection tasks, and administrators overseeing operations.

---

## Features

### 👥 User Modules

#### **Citizen Portal**
- User registration & authentication (OTP & email)
- Report waste complaints with photo evidence
- Auto/manual geolocation capture
- Real-time complaint status tracking
- Interactive complaint map view
- Complaint history and filtering
- Push notifications for status updates
- Waste segregation educational content

#### **Worker Dashboard**
- Assigned task management
- Zone/route information display
- Task status updates (collected, skipped, escalated)
- Photo proof submission for completed tasks
- Performance metrics

#### **Admin Dashboard**
- Multi-level governance (Municipal, State, Central)
- Workforce management and performance monitoring
- Complaint assignment and routing
- Real-time analytics and metrics
- SLA tracking and compliance reports
- User and contractor management

#### **Contractor Portal**
- Workforce team management
- Performance tracking
- Resource allocation
- Invoice and payment tracking

---

## Technology Stack

### Frontend
- **Framework**: Next.js 16.2.4 (React 19.2.4)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + PostCSS
- **UI Components**: Custom components with Lucide React icons
- **Maps**: Leaflet.js + React Leaflet 5.0.0
- **Animations**: Framer Motion
- **Utilities**: clsx, tailwind-merge

### Backend
- **API Routes**: Next.js API Routes
- **Authentication**: NextAuth.js 4.24.14 with Prisma Adapter
- **Security**: bcryptjs for password hashing

### Database
- **ORM**: Prisma 7.8.0
- **Database**: PostgreSQL with native adapter (@prisma/adapter-pg)
- **Connection**: pg driver

### Development Tools
- **Linting**: ESLint 9 with Next.js config
- **Build**: Next.js build system
- **Runtime**: Node.js 18+

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/           # Login page
│   │   └── register/        # Registration page
│   ├── admin/               # Admin dashboards
│   │   ├── sla/            # SLA management
│   │   ├── workforce/       # Worker management
│   │   └── zones/           # Zone management
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── complaints/      # Complaint management
│   │   ├── assignments/     # Task assignments
│   │   ├── notifications/   # Notification service
│   │   ├── reports/         # Analytics reports
│   │   ├── upload/          # File upload handler
│   │   ├── workers/         # Worker endpoints
│   │   └── users/           # User management
│   ├── citizen/             # Citizen module
│   ├── contractor/          # Contractor module
│   ├── dashboard/           # Main dashboard
│   ├── education/           # Educational content
│   ├── map/                 # Map view
│   ├── notifications/       # Notification center
│   ├── report/              # Reporting module
│   ├── state-dashboard/     # State-level analytics
│   ├── track/               # Complaint tracking
│   ├── worker/              # Worker module
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/
│   ├── MapView.tsx          # Interactive map component
│   └── Providers.tsx        # Global context providers
├── lib/
│   ├── auth.ts              # Authentication utilities
│   └── prisma.ts            # Prisma client setup
└── middleware.ts            # Request middleware

prisma/
├── schema.prisma            # Database schema

public/
└── uploads/                 # User-uploaded files
```

---

## Getting Started

### Prerequisites
- **Node.js**: 18.17+
- **npm/yarn/pnpm/bun**: Latest version
- **PostgreSQL**: 12+
- **Git**

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Required variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/swms_db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Setup Database**
   ```bash
   npx prisma migrate dev
   npx prisma db seed  # (if seed script exists)
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Database Management

```bash
# Create database migration
npx prisma migrate dev --name add_new_feature

# View database in Prisma Studio
npx prisma studio

# Generate Prisma client
npx prisma generate
```

### Code Style

- **Linter**: ESLint with Next.js recommended config
- **TypeScript**: Strict mode enabled
- **Formatting**: Follow ESLint rules

---

## API Endpoints

### Authentication
```
POST   /api/auth/register          # User registration
POST   /api/auth/[...nextauth]     # NextAuth routes
GET    /api/auth/me                # Current user info
POST   /api/auth/logout            # Logout
```

### Complaints
```
GET    /api/complaints             # List all complaints
POST   /api/complaints             # Create complaint
GET    /api/complaints/:id         # Get complaint details
PUT    /api/complaints/:id         # Update complaint
DELETE /api/complaints/:id         # Delete complaint
POST   /api/complaints/assign      # Assign complaint to worker
```

### Workers & Tasks
```
GET    /api/workers                # List workers
GET    /api/workers/:id            # Get worker details
POST   /api/workers                # Create worker
```

### Notifications
```
GET    /api/notifications          # Get user notifications
POST   /api/notifications          # Create notification
PUT    /api/notifications/:id/read # Mark as read
```

### Reports & Analytics
```
GET    /api/reports                # Generate reports
GET    /api/reports/:type          # Specific report type
```

### File Upload
```
POST   /api/upload                 # Upload files
```

---

## Design System

### Colors
- **Primary**: #2563EB (Blue 600)
- **Success**: #16A34A (Green)
- **Warning**: #F59E0B (Amber)
- **Error**: #DC2626 (Red)
- **Info**: #0EA5E9 (Cyan)

### Complaint Status Color Mapping
- **Pending**: Warning (Amber)
- **Assigned**: Info (Cyan)
- **In Progress**: Primary (Blue)
- **Resolved**: Success (Green)

### Typography
- **Font**: Inter (via next/font)
- **Fallback**: System UI sans-serif
- **Headings**: Bold, 1.4 line height
- **Body**: Regular, 1.6 line height

---

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t swms-web .
docker run -p 3000:3000 swms-web
```

### Self-Hosted
```bash
npm run build
npm start
```

### Environment Configuration
- Production database connection
- NextAuth secret key (generate with `openssl rand -base64 32`)
- File upload storage path
- Email/SMS service credentials

---

## Performance Optimization

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic per-page bundles
- **Database Queries**: Optimized Prisma queries
- **Caching**: ISR (Incremental Static Regeneration)
- **Bundle Size**: Tree-shaking and minification

---

## Security

- **Authentication**: Secure session management via NextAuth.js
- **Password Security**: bcryptjs hashing
- **CSRF Protection**: Enabled by default
- **Role-Based Access Control**: Route protection
- **Input Validation**: Prisma schema validation
- **HTTPS**: Required for production

---

## Contributing

1. Create a feature branch
2. Make your changes
3. Run linting: `npm run lint`
4. Commit with clear messages
5. Submit a pull request

---

## Troubleshooting

### Database Connection Issues
```bash
# Verify PostgreSQL is running
# Check DATABASE_URL in .env.local
# Reset database
npx prisma migrate reset
```

### Port Already in Use
```bash
npm run dev -- -p 3001
```

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Leaflet](https://react-leaflet.js.org)

---

## License

Open Source - MIT License
