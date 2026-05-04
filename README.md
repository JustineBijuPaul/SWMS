# SWMS - Smart Waste Management System

## Project Overview

**SWMS** is an open-source, scalable, multi-tenant civic platform designed to revolutionize waste management operations across municipalities and cities worldwide. It provides a unified digital ecosystem connecting citizens, sanitation workers, contractors, and government officials to improve waste collection efficiency and transparency.

### Vision

Build an open, scalable platform that enables:
- **Citizens** to report waste issues and track resolution status
- **Governments** to manage waste operations efficiently
- **Workers** to execute tasks with improved coordination
- **Any city/organization** worldwide to deploy and customize the system

---

## Project Structure

```
SWMS/
├── SWMS Web/                 # Next.js web application (main platform)
├── SWMS_Mobile_App/          # React Native mobile application
├── prd.md                    # Product Requirements Document
├── functional_requirements.md # Detailed feature specifications
├── API.md                    # API endpoint documentation
├── design.md                 # Design system and UI guidelines
├── entity-relationship.md    # Database schema documentation
└── README.md                 # This file
```

---

## Key Features

### Citizen Module
- **User Authentication**: OTP-based (SMS) or email/password registration
- **Complaint Reporting**: Upload images, auto/manual geolocation, category selection
- **Status Tracking**: Real-time updates with timeline views
- **Map View**: Visual representation of complaints and nearby issues
- **Notifications**: Real-time alerts for status changes
- **Educational Content**: Waste segregation guidelines and localized resources

### Worker Module
- **Task Management**: View assigned zones and tasks
- **Status Updates**: Mark tasks as collected, skipped, or escalated
- **Proof Submission**: Upload photo evidence of completed work
- **Route Information**: Optimized zone/route displays

### Admin & Contractor Module
- **Workforce Management**: Assign and monitor worker performance
- **Analytics Dashboards**: Multi-level governance dashboards (city, state, central)
- **Performance Metrics**: Track SLAs, response times, resolution rates
- **Report Generation**: Data-driven insights and compliance reports

---

## Target Users

| User Type | Role | Responsibilities |
|-----------|------|------------------|
| **Citizens** | Public | Report waste issues, track status |
| **Workers** | Field Staff | Execute collection tasks, submit proof |
| **Contractors** | Management | Oversee workforce, manage teams |
| **Municipal Admin** | City Level | Manage city operations, analytics |
| **State Admin** | Regional Level | Monitor multiple cities, state-wide metrics |
| **Super Admin** | System | Manage deployments, configurations |

---

## Technology Stack

### Web Application (SWMS Web)
- **Frontend**: React 19.2.4, Next.js 16.2.4, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion for animations
- **Maps**: Leaflet.js with React Leaflet integration
- **Authentication**: NextAuth.js 4.24.14
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide React
- **Security**: bcryptjs for password hashing

### Mobile Application (SWMS_Mobile_App)
- **Framework**: React Native (planned)
- **Platform**: iOS & Android support
- **Status**: Under development

---

## Design Principles

1. **Clarity over Decoration** - Intuitive interfaces for diverse users
2. **Mobile-First** - Responsive design optimized for mobile devices
3. **Accessibility** - Inclusive design for low-literacy users
4. **Performance** - Fast rendering and minimal data usage
5. **Consistency** - Unified design system across modules
6. **Open Source** - Community-driven development

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm
- PostgreSQL database
- Git

### Quick Start

1. **Web Application**:
   ```bash
   cd "SWMS Web"
   npm install
   npm run dev
   # Open http://localhost:3000
   ```

2. **Environment Setup**:
   - Copy `.env.local.example` to `.env.local`
   - Configure database connection
   - Set up authentication credentials

3. **Database Setup**:
   ```bash
   npx prisma migrate dev
   ```

---

## API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/otp-login
GET    /api/auth/me
POST   /api/auth/logout
```

### Complaints
```
POST   /api/complaints
GET    /api/complaints
GET    /api/complaints/:id
PUT    /api/complaints/:id
DELETE /api/complaints/:id
```

### Workers & Tasks
```
GET    /api/workers
GET    /api/workers/:id
POST   /api/complaints/assign
```

### Admin & Analytics
```
GET    /api/reports
GET    /api/notifications
GET    /api/users
```

See [API.md](./API.md) for complete endpoint documentation.

---

## Documentation

- [Product Requirements Document](./prd.md) - Overall vision and goals
- [Functional Requirements](./functional_requirements.md) - Detailed feature specifications
- [API Documentation](./API.md) - Complete API reference
- [Design System](./design.md) - UI/UX guidelines and color palette
- [Database Schema](./entity-relationship.md) - Entity relationship diagram

---

## Development

### Project Phases

1. **Phase 1**: Core citizen and complaint reporting features
2. **Phase 2**: Worker task management and assignment
3. **Phase 3**: Admin dashboards and analytics
4. **Phase 4**: Mobile app development
5. **Phase 5**: Multi-tenant deployments and scaling

### Contributing

This is an open-source project. To contribute:
1. Fork the repository
2. Create a feature branch
3. Commit changes with clear messages
4. Submit a pull request

---

## Deployment

### Supported Platforms
- **Web**: Vercel, AWS, DigitalOcean, self-hosted
- **Database**: PostgreSQL (managed or self-hosted)
- **Scaling**: Multi-tenant support with isolated databases

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Authentication credentials set up
- [ ] File upload storage configured
- [ ] Notifications service configured
- [ ] SSL certificates installed

---

## Key Principles

### Open Source First
Fully open-source codebase enabling customization and community contributions.

### Scalability
Designed to handle millions of complaints and thousands of concurrent users.

### Localization
Multi-language support with localized content and cultural context.

### Security by Design
Encrypted data, secure authentication, role-based access control.

### Data-Driven
Comprehensive analytics and reporting for evidence-based decision-making.

---

## Support & Community

- **Issues**: Report bugs and feature requests on GitHub
- **Documentation**: Comprehensive guides and API documentation
- **Community**: Join our community forum for discussions

---

## License

This project is open-source and available under the MIT License.

---

## Contact & Support

For questions, issues, or deployment support, please refer to the project documentation or open an issue on GitHub.
