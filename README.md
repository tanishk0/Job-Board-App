<div align="center">

# 💼 Talentry

### Modern Full-Stack Job Board & Hiring Intelligence Platform

A high-performance recruitment platform designed to connect top tech talent with verified hiring managers. Built with **Next.js 16**, **React 19**, **TypeScript**, **Drizzle ORM**, **PostgreSQL**, and **Better Auth**, Talentry delivers a streamlined experience for job seekers and hiring teams alike.

---

[![Live Demo](https://img.shields.io/badge/Live_Demo-talentry--sigma.vercel.app-6366F1?style=for-the-badge&logo=vercel&logoColor=white)](https://talentry-sigma.vercel.app/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.6-9333EA?style=for-the-badge)](https://better-auth.com/)
[![UploadThing](https://img.shields.io/badge/UploadThing-7.7-FF4F00?style=for-the-badge)](https://uploadthing.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## 🌐 Live Demo & Deployment

Experience the live application hosted on Vercel:

👉 **[https://talentry-sigma.vercel.app/](https://talentry-sigma.vercel.app/)**

---

## ✨ Key Highlights

Talentry removes friction from hiring by providing role-tailored workflows, real-time application pipelines, transparent salary benchmarks, and proactive talent sourcing.

```
       Candidate Experience                      Employer Suite
 ┌──────────────────────────────┐       ┌──────────────────────────────┐
 │  🔍 Multi-Filter Job Search  │       │  📝 Job Creation & Lifecycle │
 │  ⚡ Instant 1-Click Apply    │       │  📊 Recruitment Analytics    │
 │  📑 Document & Resume Vault  │       │  👥 Applicant Review Funnel  │
 │  📈 Career Market Insights   │       │  🎯 Proactive Talent Search  │
 │  🎯 Tailored Recommendations │       │  🏢 Company Profile Branding │
 └──────────────┬───────────────┘       └──────────────┬───────────────┘
                │                                      │
                └───────────────► 💼 ◄─────────────────┘
                               Talentry
```

---

## 🚀 Features

### 💼 For Job Seekers & Candidates

* **Advanced Job Discovery**: Browse open listings with instant URL-synchronized filtering by title, keywords, location, employment type (Full-Time, Part-Time, Contract, Remote, Internship), and seniority level.
* **One-Click Application Flow**: Direct application submission modal featuring custom cover letters and resume uploads powered by UploadThing.
* **Smart Career Recommendations**: Algorithmic job suggestions matched against candidate career preferences, target roles, and experience levels.
* **Application Lifecycle Tracking**: Live status updates across recruitment stages (`Pending` ➔ `Reviewed` ➔ `Shortlisted` ➔ `Interviewing` ➔ `Hired` / `Rejected`).
* **Saved Opportunities**: Bookmark favorite job postings with optimistic UI updates for instant feedback.
* **Market Insights & Analytics**: Real-time ecosystem statistics revealing hiring demand by job type, experience tier, and top geographic hubs.
* **Candidate Profile & Document Vault**: Manage professional bio, headline, links (GitHub, portfolio, LinkedIn), contact info, and attached resume.

### 🏢 For Employers & Hiring Teams

* **End-to-End Job Management**: Publish, edit, review, and close job listings with rich descriptions, requirements, responsibilities, and compensation bands.
* **Dedicated Applicant Pipeline**: Per-job applicant management board with one-click recruitment stage progression and direct resume preview links.
* **Central Hiring Pipeline**: High-level overview displaying all incoming applicant activity across every posted position.
* **Proactive Candidate Search (`/employer/candidates`)**: Sourcing database enabling employers to discover candidates filtered by experience tier, preferred role, and presence of resume or portfolio.
* **Recruitment Analytics Dashboard (`/employer/analytics`)**: Real-time conversion funnel and hiring distribution metrics tracking applicant progression and pipeline health.
* **Company Profile Customization**: Showcase brand identity, company logo, website, and headquarters location to attract qualified candidates.

### 🌐 Public Discovery & Intelligence

* **Interactive Landing Page**: Modern SaaS presentation spotlighting verified employers, trending openings, and core platform metrics.
* **Tech Salary Explorer (`/salaries`)**: Market compensation benchmarks aggregated dynamically from live, active job postings.
* **Verified Companies Directory (`/companies`)**: Searchable index of hiring partners with open vacancy counts and company overviews.
* **Enterprise Legal & Policy Suite**: Complete About, Privacy Policy, Terms of Service, and Cookie Policy pages.

---

## 🛠 Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) | Server components, streaming SSR, and server actions |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end static type safety and schema validation |
| **UI Library** | [React 19](https://react.dev/) | Modern concurrent rendering and optimistic states |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | High-performance CSS engine with custom design tokens |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, clean iconography |
| **Authentication** | [Better Auth](https://better-auth.com/) | Secure, role-based session auth with Drizzle adapter |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) | Lightweight, type-safe SQL query builder and migrations |
| **Database** | [PostgreSQL (Neon)](https://neon.tech/) | Serverless cloud PostgreSQL |
| **Asset Storage** | [UploadThing](https://uploadthing.com/) | Type-safe file uploads for resumes and company logos |
| **Deployment** | [Vercel](https://vercel.com/) | Global edge deployment with zero-configuration CI/CD |

---

## 🏗 Architecture & Data Flow

```mermaid
graph TD
    subgraph Client ["Next.js 16 Client & Server Pages"]
        CandidateUI["Candidate Portal<br/>(/candidate/*)"]
        EmployerUI["Employer Portal<br/>(/employer/*)"]
        PublicUI["Public Pages<br/>(/jobs, /companies, /salaries)"]
    end

    subgraph AuthLayer ["Authentication & Access Control"]
        BetterAuth["Better Auth Engine"]
        SessionGuards["Server Session Guards<br/>(requireCandidate, requireEmployer)"]
    end

    subgraph ServerLayer ["Server Execution Layer"]
        ServerActions["Next.js Server Actions<br/>(Apply, Post Job, Update Status)"]
        UploadThingHandler["UploadThing File Handler<br/>(PDF Resumes & Images)"]
    end

    subgraph DataLayer ["Data & Storage"]
        Drizzle["Drizzle ORM"]
        Postgres[("Neon PostgreSQL")]
        UTStorage[("UploadThing Cloud")]
    end

    CandidateUI -->|Auth Check| SessionGuards
    EmployerUI -->|Auth Check| SessionGuards
    SessionGuards --> BetterAuth
    CandidateUI -->|Apply / Save| ServerActions
    EmployerUI -->|Manage Jobs / Pipeline| ServerActions
    CandidateUI -->|Upload Resume| UploadThingHandler
    EmployerUI -->|Upload Logo| UploadThingHandler
    UploadThingHandler --> UTStorage
    ServerActions --> Drizzle
    BetterAuth --> Drizzle
    Drizzle --> Postgres
```

---

## 🗄 Database Schema Design

Talentry leverages a relational schema managed via Drizzle ORM:

```
┌──────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│       user       │◄──────┤  candidate_profiles  │       │  employer_profiles   │
├──────────────────┤ 1   1 ├──────────────────────┤ 1   1 ├──────────────────────┤
│ id (PK)          │───────┤ userId (FK, Unique)  │───────┤ userId (FK, Unique)  │
│ name             │       │ headline             │       │ companyName          │
│ email            │       │ bio                  │       │ companyDescription   │
│ role (candidate/ │       │ resumeUrl            │       │ companyLogoUrl       │
│       employer)  │       │ portfolioUrl         │       │ website              │
└────────┬─────────┘       │ experienceLevel      │       │ location             │
         │                 │ preferredRole        │       └──────────┬───────────┘
         │                 └──────────────────────┘                  │ 1
         │                                                           │
         │ 1                                                         │ N
         ▼ N                                                         ▼
┌──────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│    saved_jobs    │       │     applications     │       │     job_postings     │
├──────────────────┤       ├──────────────────────┤       ├──────────────────────┤
│ id (PK)          │       │ id (PK)              │       │ id (PK)              │
│ userId (FK)      │       │ candidateId (FK)     │       │ employerId (FK)      │
│ jobId (FK)       │◄──────┤ jobId (FK)           │◄──────┤ title                │
│ savedAt          │       │ coverLetter          │       │ description          │
└──────────────────┘       │ resumeUrl            │       │ requirements         │
                           │ status               │       │ responsibilities     │
                           │ appliedAt            │       │ salary, jobType      │
                           └──────────────────────┘       │ location, level      │
                                                          └──────────────────────┘
```

---

## 📁 Repository Structure

```text
job-board/
├── app/
│   ├── about/                    # About Talentry page
│   ├── api/
│   │   ├── auth/[...all]/        # Better Auth route handler
│   │   └── uploadthing/          # UploadThing file upload route handler
│   ├── applications/             # Application redirection & lookup
│   ├── auth/
│   │   ├── candidate/            # Candidate login & registration
│   │   ├── employer/             # Employer login & registration
│   │   └── reset-password/       # Password recovery flow
│   ├── candidate/
│   │   ├── applications/         # Candidate submitted applications dashboard
│   │   ├── documents/            # Resume & portfolio document vault
│   │   ├── insights/             # Market demand & hiring statistics
│   │   ├── onboarding/           # New candidate onboarding setup
│   │   ├── profile/              # Candidate profile editor
│   │   ├── recommendations/      # Algorithmic personalized job matches
│   │   ├── saved/                # Bookmarked saved jobs list
│   │   └── page.tsx              # Candidate command center
│   ├── companies/                # Verified hiring partners directory
│   ├── contact/                  # Contact & support page
│   ├── cookies/                  # Cookie policy page
│   ├── employer/
│   │   ├── analytics/            # Hiring funnel & pipeline conversion metrics
│   │   ├── applications/         # Unified applicants review inbox
│   │   ├── candidates/           # Proactive candidate sourcing search
│   │   ├── jobs/                 # Job management (create, edit, view applicants)
│   │   │   ├── [id]/applicants/  # Per-job applicant management pipeline
│   │   │   ├── [id]/edit/        # Job posting editor
│   │   │   └── new/              # Publish new job posting
│   │   ├── onboarding/           # Company onboarding workflow
│   │   ├── profile/              # Employer company profile settings
│   │   └── page.tsx              # Employer command center
│   ├── jobs/                     # Public job board and detailed listing views
│   ├── privacy/                  # Privacy policy page
│   ├── salaries/                 # Compensation benchmark explorer
│   ├── terms/                    # Terms of service page
│   ├── layout.tsx                # Root layout with Inter font & metadata
│   └── page.tsx                  # High-converting landing page
├── components/
│   ├── ui/                       # Design system primitives (Button, Card, Badge, Modal, Input, EmptyState)
│   ├── ApplicationForm.tsx       # Interactive job application modal form
│   ├── CandidateSidebar.tsx      # Candidate navigation sidebar
│   ├── EmployerSidebar.tsx       # Employer navigation sidebar
│   ├── Footer.tsx                # Global platform footer
│   ├── Navbar.tsx                # Context-aware navigation bar
│   ├── SaveJobButton.tsx         # Optimistic bookmark toggle button
│   └── SearchBar.tsx             # Real-time multi-filter query bar
├── db/
│   ├── schema/                   # Drizzle ORM entity definitions
│   │   ├── applications.ts       # Job applications table
│   │   ├── candidate.ts          # Candidate profiles table
│   │   ├── employer.ts           # Employer profiles table
│   │   ├── jobs.ts               # Job postings table
│   │   └── saved_jobs.ts         # Saved / bookmarked jobs table
│   └── schema/index.ts           # Schema aggregation
├── lib/
│   ├── auth/
│   │   └── session.ts            # Server-side authentication guards & session utils
│   ├── auth-client.ts            # Better Auth client instance
│   ├── auth.ts                   # Better Auth server configuration with Drizzle
│   └── db.ts                     # Drizzle & Postgres connection client
├── auth-schema.ts                # Better Auth user, session, and token schemas
├── drizzle.config.ts             # Drizzle Kit configuration
└── DESIGN-RULES.md               # Product design system & UI guidelines
```

---

## 🎨 Design System & Philosophy

Talentry is crafted following a strict product design system documented in [`DESIGN-RULES.md`](./DESIGN-RULES.md):

* **Clarity First, Decoration Second**: Every visual element serves a functional purpose. Whitespace is intentional.
* **Modern SaaS Aesthetic**: A crisp, light interface utilizing Slate neutrals (`#F8FAFC`, `#0F172A`) with Indigo accents (`#6366F1`).
* **Zero Visual Clutter**: Free of artificial sparkle effects, decorative gradients, or unneeded visual noise.
* **Consistent Hierarchy**: Typography driven by Google's [Inter](https://fonts.google.com/specimen/Inter) font with deliberate contrast and semantic status tokens.

---

## 🚦 Getting Started

Follow these steps to set up and run Talentry locally on your development machine.

### Prerequisites

Ensure you have the following installed:
* **Node.js**: v20.x or higher
* **npm** or **pnpm**
* A **PostgreSQL** database (e.g. free tier on [Neon](https://neon.tech))
* An [UploadThing](https://uploadthing.com) account for file storage

### 1. Clone the Repository

```bash
git clone https://github.com/tanishk0/Job-Board-App.git
cd Job-Board-App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment configuration:

```bash
cp .env.example .env
```

Open `.env` and provide your credentials:

```env
# Database Connection (PostgreSQL / Neon)
DATABASE_URL="postgresql://user:password@ep-sample-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-random-32-character-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Public App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# UploadThing (Resumes & Logos)
UPLOADTHING_TOKEN="your-uploadthing-token-here"
```

### 4. Push Database Schema

Synchronize your PostgreSQL database with the Drizzle ORM schema:

```bash
npx drizzle-kit push
```

*(Optional) Launch Drizzle Studio to inspect and manage records visually:*

```bash
npx drizzle-kit studio
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Next.js development server with hot-module reloading |
| `npm run build` | Compiles the production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to verify code quality and conventions |
| `npx drizzle-kit push` | Applies schema changes directly to the remote database |
| `npx drizzle-kit studio` | Starts the local Drizzle Studio database browser |

---

## 🔒 Security & Best Practices

* **Role-Based Access Control (RBAC)**: All employer actions (job edits, status changes, candidate searching) and candidate views are strictly verified server-side.
* **SQL Injection Immunity**: Drizzle ORM executes parameterized queries with static typing across all database transactions.
* **Secure Session Cookies**: Better Auth handles encrypted, HTTP-only session cookies with CSRF defense.
* **Upload Security**: UploadThing enforces strict file-type constraints (PDF for resumes, images for branding logos) with client-server authorization handshakes.

---

## 🗺 Roadmap

- [x] Full-Stack Authentication & Dual-Role Support (Candidate / Employer)
- [x] Employer Job Lifecycle Management (Create, Edit, Delete, View)
- [x] Applicant Pipeline per Job with Real-Time Status Updates
- [x] Candidate Talent Discovery Directory for Employers
- [x] Candidate Application Submission & File Uploads (UploadThing)
- [x] Algorithmic Job Recommendations based on Candidate Profile
- [x] Market Compensation & Salary Benchmarks Explorer
- [x] Saved Jobs Bookmarking with Optimistic State Updates
- [x] Real-time Recruitment & Candidate Market Analytics
- [x] Multi-Faceted Keyword, Location, & Seniority Search
- [ ] Email Notifications via Resend (Application confirmations & status alerts)
- [ ] Direct In-App Interview Scheduling & Calendar Integration
- [ ] Automated AI-Powered Resume Scoring & Skill Gap Matcher

---

## 📄 License

This project is distributed under the [MIT License](./LICENSE).

---

<div align="center">

Crafted with care by [Tanishk](https://github.com/tanishk0) · Built with Next.js, Drizzle & Tailwind CSS

</div>
