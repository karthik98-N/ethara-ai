# FlowForge

AI-powered collaborative task management platform for teams. It includes a polished React dashboard, project management, drag-and-drop Kanban, analytics, realtime API structure, role-based auth, and an AI sprint planner endpoint.

## Features

- Signup/login API with JWT, bcrypt, validation, and role middleware
- Dashboard widgets for total, completed, pending, and overdue work
- Project cards with members, deadlines, status, and progress
- Drag-and-drop Kanban board with Todo, In Progress, Review, and Completed columns
- Analytics with productivity, distribution, and team performance charts
- Socket.IO structure for live task updates, activity feed, and typing events
- AI Sprint Planner demo that generates subtasks from a goal
- Responsive dark UI inspired by Linear, Jira, Trello, and ClickUp

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, React Router, Zustand, Recharts, dnd-kit
- Backend: Node.js, Express, Socket.IO, JWT, bcryptjs, Helmet, CORS, Zod
- Database: PostgreSQL with Prisma ORM

## Installation

```bash
npm.cmd run install:all
```

## Run Locally

```bash
npm.cmd run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000/api/health`

## Environment Variables

Copy the example files:

```bash
copy client\.env.example client\.env
copy server\.env.example server\.env
```

Set:

```env
DATABASE_URL=
JWT_SECRET=
CLIENT_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

```txt
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me
POST /api/auth/logout

POST /api/projects
GET /api/projects
GET /api/projects/:id
PUT /api/projects/:id
DELETE /api/projects/:id

POST /api/tasks
GET /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id

GET /api/analytics
POST /api/analytics/ai-sprint-plan
```

## Deployment

Frontend can deploy to Vercel or Railway. Set `VITE_API_URL` to the deployed backend URL.

Backend can deploy to Railway. Add `DATABASE_URL`, `JWT_SECRET`, `CLIENT_URL`, and `PORT`.

For Neon/Railway PostgreSQL:

```bash
npm.cmd --prefix server run prisma:generate
npm.cmd --prefix server run prisma:migrate
```
