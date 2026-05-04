# DESIGN.md

Smart Waste Management System (SWMS Web)

---

# 1. Design Philosophy

The design of SWMS Web focuses on clarity, accessibility, and scalability. The interface must serve a diverse audience including citizens, sanitation workers, contractors, and government officials.

Core principles:

* Clarity over decoration
* Function-first UI
* Accessibility for low-literacy users
* Mobile-responsive by default
* Consistency across modules
* Performance-optimized rendering

The design should feel like a modern SaaS product while remaining simple enough for public use.

---

# 2. Design System Overview

## 2.1 Layout System

The application uses a responsive grid layout:

* Desktop: 12-column grid
* Tablet: 8-column grid
* Mobile: 4-column grid

Spacing system (based on 4px scale):

* xs: 4px
* sm: 8px
* md: 16px
* lg: 24px
* xl: 32px

---

## 2.2 Color System

### Primary Palette

* Primary: #2563EB (Blue 600)
* Primary Hover: #1D4ED8
* Primary Light: #DBEAFE

### Neutral Palette

* Background: #F9FAFB
* Surface: #FFFFFF
* Border: #E5E7EB
* Text Primary: #111827
* Text Secondary: #6B7280

### Status Colors

* Success: #16A34A
* Warning: #F59E0B
* Error: #DC2626
* Info: #0EA5E9

### Complaint Status Mapping

* Pending: Warning
* Assigned: Info
* In Progress: Primary
* Resolved: Success

---

## 2.3 Typography

Font Family:

* Primary: Inter
* Fallback: system-ui, sans-serif

Font Scale:

* Heading 1: 32px / Bold
* Heading 2: 24px / SemiBold
* Heading 3: 20px / Medium
* Body: 16px / Regular
* Small: 14px

Line height:

* 1.4 for headings
* 1.6 for body

---

## 2.4 Iconography

* Use a consistent icon library (Lucide or Heroicons)
* Icons must be simple and recognizable
* Use icons alongside text for accessibility

Examples:

* Report Issue → alert-circle
* Map → map
* Tasks → checklist
* Dashboard → layout

---

# 3. Global Layout Structure

## 3.1 Application Shell

Structure:

* Sidebar (left)
* Top navigation bar
* Main content area
* Optional right panel (future analytics)

---

## 3.2 Sidebar

Contents:

* Dashboard
* Report Issue
* My Complaints
* Map View
* Worker Tasks (role-based)
* Admin Panel (role-based)
* Settings

Behavior:

* Collapsible on desktop
* Hidden behind hamburger menu on mobile

---

## 3.3 Top Navigation

Contains:

* Search bar
* Language switcher
* Notifications
* User profile menu

---

# 4. Page-Level Designs

---

## 4.1 Citizen Dashboard

### Layout

* Header with summary cards
* Recent complaints list
* Quick action button (Report Issue)

### Components

* Status cards:

  * Total complaints
  * Resolved
  * Pending

* Complaint list:

  * Title
  * Status badge
  * Timestamp
  * Location

---

## 4.2 Complaint Submission Page

### Sections

1. Image Upload
2. Location Picker
3. Category Selector
4. Description Input
5. Submit Button

### Behavior

* Preview uploaded image
* Validate required fields
* Show success confirmation

---

## 4.3 Complaint Details Page

### Components

* Complaint header (ID, status)
* Image preview
* Description
* Timeline of updates
* Assigned worker info

---

## 4.4 Map View

### Features

* Interactive map
* Pins for complaints
* Color-coded by status
* Clickable markers

---

## 4.5 Worker Dashboard

### Layout

* Task list view
* Minimal UI

### Components

* Task card:

  * Complaint ID
  * Location
  * Status buttons:

    * Collected
    * Skipped
    * Escalated

---

## 4.6 Admin Dashboard

### Layout

* KPI cards at top
* Charts in middle
* Tables below

### Components

* Metrics:

  * Total complaints
  * Resolution rate
  * SLA violations

* Charts:

  * Complaints by ward
  * Trend over time

* Table:

  * Filterable complaint list

---

# 5. Component Library

---

## 5.1 Buttons

Types:

* Primary
* Secondary
* Ghost
* Danger

States:

* Default
* Hover
* Disabled
* Loading

---

## 5.2 Inputs

* Text input
* Dropdown
* Textarea
* File upload
* Search input

All inputs must include:

* Label
* Validation message
* Focus state

---

## 5.3 Cards

Used for:

* Complaints
* Tasks
* Metrics

Structure:

* Title
* Content
* Footer actions

---

## 5.4 Tables

Features:

* Pagination
* Sorting
* Filtering
* Responsive stacking on mobile

---

## 5.5 Badges

Used for:

* Status indicators

Examples:

* Pending → yellow
* Resolved → green

---

# 6. Accessibility Guidelines

* Maintain contrast ratio of at least 4.5:1
* Provide text labels for all icons
* Ensure keyboard navigation support
* Use ARIA attributes where required
* Avoid reliance on color alone

---

# 7. Localization Design

* All text must be externalized (i18n)
* UI must support RTL languages (future-ready)
* Avoid hardcoded strings
* Use flexible layouts for longer translations

---

# 8. Responsive Design

Breakpoints:

* Mobile: <640px
* Tablet: 640px–1024px
* Desktop: >1024px

Rules:

* Stack components vertically on mobile
* Collapse sidebar
* Use full-width buttons

---

# 9. Performance Considerations

* Lazy load heavy components (maps, charts)
* Optimize images before upload
* Use skeleton loaders
* Avoid large DOM trees

---

# 10. Design Tokens (Recommended)

Define tokens for:

* Colors
* Spacing
* Typography
* Border radius
* Shadows

Store in:

* Tailwind config or CSS variables

---

# 11. Future Enhancements

* Dark mode support
* Advanced data visualization
* Real-time updates (WebSockets)
* Offline UI support

---

# 12. Tools and Stack

Recommended:

* Figma for design
* Tailwind CSS for styling
* shadcn/ui for components
* React + Next.js for frontend

---

# 13. Contribution Guidelines for Design

* Follow design tokens strictly
* Maintain consistency across modules
* Avoid introducing new colors or spacing without review
* Submit design changes via pull request
