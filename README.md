# Talentry 💼

A modern full-stack job board that connects employers with talented candidates. Employers can post and manage job listings, while candidates can search, save, and apply for jobs through a clean and responsive interface.

Built with **Next.js 15**, **TypeScript**, **Drizzle ORM**, **PostgreSQL**, and **Better Auth**, following modern full-stack development practices.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🌐 Live Demo

**Application:** https://talentry-sigma.vercel.app/ 

---

## 🚀 Features

### Authentication
- Secure authentication with Better Auth
- Role-based authorization
- Protected routes & server actions

### Employer Dashboard
- Create and manage company profile
- Create, edit and delete job postings
- View all posted jobs

### Candidate Dashboard
- Create and manage profile
- Browse available jobs
- Save and unsave jobs
- Apply to jobs
- Track submitted applications

### Job Board
- Public job listings
- Job details page
- Search jobs
- Filter by location, experience and job type
- Responsive UI

---

## 🛠 Tech Stack

### Frontend

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- Next.js Server Actions
- Better Auth
- Drizzle ORM
- PostgreSQL (Neon)

### Storage

- UploadThing

---

## 📁 Project Structure

```text
app/
├── candidate/
├── employer/
├── jobs/
├── login/
├── register/

components/
db/
lib/
public/
```

---

## Database Schema

The application consists of the following core entities:

- Users
- Employer Profiles
- Candidate Profiles
- Job Postings
- Applications
- Saved Jobs

---

## Highlights

### Secure Role-Based Access

- Employer-only features
- Candidate-only features
- Protected server actions

### Job Applications

- Duplicate application prevention
- Application tracking
- Status-ready architecture

### Saved Jobs

- Save & Unsave functionality
- Optimistic UI updates
- Personal saved jobs dashboard

### Search & Filtering

- Search by job title
- Filter by location
- Filter by job type
- Filter by experience level
- URL-based filters

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/talentry.git

cd talentry
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file.

```env
DATABASE_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

UPLOADTHING_TOKEN=
```

### Push the database schema

```bash
npx drizzle-kit push
```

### Run the development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## Screenshots

> Screenshots and demo GIFs coming soon.

---

## Roadmap

- [x] Authentication
- [x] Employer Dashboard
- [x] Candidate Dashboard
- [x] Job CRUD
- [x] Applications
- [x] Saved Jobs
- [x] Search
- [x] Filters
- [ ] Pagination
- [ ] Applicant Management
- [ ] Application Status Updates
- [ ] Dashboard Analytics
- [ ] Email Notifications

---

## What I Learned

This project helped me gain hands-on experience with:

- Next.js App Router
- Server Actions
- Role-based authentication
- Drizzle ORM
- PostgreSQL schema design
- Optimistic UI
- Server-side filtering
- Scalable full-stack application architecture
