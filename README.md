# ProjectFlow SaaS - Project Management Platform

ProjectFlow SaaS adalah aplikasi **Project Management berbasis SaaS (Software as a Service)** yang digunakan untuk membantu individu maupun tim dalam mengelola pekerjaan secara kolaboratif melalui Workspace, Project, Task Management, dan Kanban Board.

Aplikasi ini dirancang dengan konsep multi-workspace sehingga setiap pengguna dapat membuat ruang kerja sendiri, mengelola anggota tim, membuat project, mengatur task, serta melakukan kolaborasi secara realtime dalam satu platform.

---

## 🚀 Features

### Workspace Management

* Membuat dan mengelola beberapa workspace
* Mengatur informasi workspace
* Mengundang dan mengelola anggota tim
* Role & Permission Management:

  * Owner
  * Admin
  * Member
  * Viewer

### Project Management

* Membuat project berdasarkan workspace
* Mengatur status project
* Mengatur prioritas project
* Melihat progress pengerjaan
* Mengelola deadline project
* Monitoring statistik project

### Kanban Board

Manajemen pekerjaan menggunakan tampilan Kanban:

* Backlog
* Todo
* In Progress
* Review
* Completed

Fitur Kanban:

* Drag & Drop Task
* Task Priority
* Task Status
* Task Progress Tracking
* Assignment Member

### Task Management

Setiap task memiliki:

* Judul task
* Deskripsi
* Status
* Priority
* Assignee
* Due Date
* Checklist
* Comment Discussion
* Attachment
* Activity History

### Team Collaboration

* Member Management
* Comment System
* Activity Log
* Notification
* Realtime Update

### Dashboard Analytics

Monitoring:

* Total Workspace
* Total Project
* Total Task
* Completed Task
* Project Progress
* Team Activity

---

# 🛠️ Tech Stack

## Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Zustand / Redux Toolkit
* TanStack Query
* Radix UI
* Framer Motion
* Lucide Icons
* Recharts

---

## Backend (Planned)

* Laravel
* Laravel Sanctum / JWT Authentication
* RESTful API
* Laravel Queue
* Laravel Notification
* Laravel Reverb / Pusher
* MySQL / PostgreSQL
* Spatie Permission

---

# 📂 Frontend Structure

Project menggunakan pendekatan **Feature Based Architecture** agar setiap module lebih mudah dikembangkan, dipisahkan, dan dimaintenance.

```text
src
│
├── app
│   │
│   ├── (cms)
│   │   │
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   │
│   │   ├── analytics
│   │   │   └── page.tsx
│   │   │
│   │   ├── tasks
│   │   │   └── page.tsx
│   │   │
│   │   └── workspaces
│   │       │
│   │       ├── page.tsx
│   │       │
│   │       └── [workspaceSlug]
│   │           │
│   │           ├── page.tsx
│   │           │
│   │           ├── members
│   │           │
│   │           └── projects
│   │               │
│   │               └── [projectSlug]
│   │                   │
│   │                   ├── page.tsx
│   │                   └── board
│   │                       └── page.tsx
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
│
├── components
│   │
│   ├── layouts
│   │   ├── DashboardShell.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopNav.tsx
│   │
│   └── ui
│       │
│       ├── Avatar.tsx
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Checkbox.tsx
│       ├── DatePicker.tsx
│       ├── DropdownMenu.tsx
│       ├── EmptyState.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       ├── ProgressBar.tsx
│       ├── Tabs.tsx
│       ├── Tooltip.tsx
│       │
│       └── combobox
│           ├── Combobox.tsx
│           ├── ComboboxItem.tsx
│           ├── types.ts
│           └── index.ts
│
│
├── features
│
│   ├── auth
│   │   │
│   │   ├── components
│   │   ├── constants
│   │   ├── hooks
│   │   ├── types
│   │   ├── utils
│   │   └── views
│   │
│   │
│   ├── dashboard
│   │   │
│   │   ├── components
│   │   ├── constants
│   │   └── views
│   │
│   │
│   ├── workspaces
│   │   │
│   │   ├── components
│   │   │   │
│   │   │   ├── list
│   │   │   ├── modals
│   │   │   └── overview
│   │   │
│   │   ├── constants
│   │   ├── hooks
│   │   ├── mocks
│   │   ├── types
│   │   └── views
│   │
│   │
│   ├── projects
│   │   │
│   │   ├── components
│   │   │   │
│   │   │   ├── list
│   │   │   ├── board
│   │   │   └── overview
│   │   │       │
│   │   │       ├── activity
│   │   │       ├── content
│   │   │       ├── members
│   │   │       ├── tasks
│   │   │       └── timeline
│   │   │
│   │   ├── constants
│   │   ├── mocks
│   │   ├── types
│   │   └── views
│   │
│   │
│   ├── tasks
│   │   │
│   │   ├── components
│   │   │   │
│   │   │   ├── board
│   │   │   ├── detail
│   │   │   ├── modals
│   │   │   └── mytasks
│   │   │
│   │   ├── constants
│   │   ├── mocks
│   │   ├── types
│   │   └── views
│   │
│   │
│   ├── members
│   │   │
│   │   ├── components
│   │   ├── constants
│   │   ├── types
│   │   └── views
│   │
│   │
│   ├── analytics
│   ├── activities
│   └── users
│
│
├── lib
│   └── utils.ts
│
└── public
```

---

# Architecture Pattern

Setiap fitur dipisahkan berdasarkan domain:

```text
features/{module}
│
├── components
│   UI component khusus module
│
├── views
│   Halaman utama feature
│
├── hooks
│   Custom React hooks
│
├── types
│   TypeScript interface/type
│
├── constants
│   Static configuration
│
├── mocks
│   Temporary API response data
│
└── utils
    Helper function khusus feature
```

Dengan struktur ini setiap module seperti Workspace, Project, Task, dan Member dapat dikembangkan secara independen dan lebih siap untuk integrasi REST API Laravel.



# ⚙️ Installation

Clone repository

```bash
git clone https://github.com/RianRahmanAlaziz/Project-Management
```

Install dependency

```bash
npm install
```

Run development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# Environment

Create `.env`

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

# API Response Concept

Example:

```json
{
    "success": true,
    "message": "Projects retrieved successfully.",
    "data": [
        {
            "id": 1,
            "workspace_id": 1,
            "name": "ProjectFlow v2.0",
            "status": "In Progress",
            "priority": "High",
            "progress": 68
        }
    ]
}
```

---

# Project Status

Development Progress:

* [x] Dashboard Layout
* [x] Dark Mode
* [x] Workspace UI
* [x] Project UI
* [x] Kanban Board
* [x] Task Detail UI
* [x] Modal System
* [ ] Backend API Integration
* [ ] Authentication
* [ ] Realtime Collaboration
* [ ] Notification System

---

# Future Improvement

* AI Task Assistant
* Calendar Integration
* File Storage Integration
* Email Invitation
* Advanced Analytics
* Mobile Responsive Enhancement

---

# Author

Developed by **Rian Rahman Alaziz**

ProjectFlow SaaS
Modern Project Management Platform
