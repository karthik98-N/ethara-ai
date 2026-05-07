export const demoUser = {
  name: "Dhruva Teja",
  email: "dhruva@flowforge.dev",
  role: "Admin",
  streak: 9,
  xp: 2840
};

export const demoUsers = {
  admin: {
    name: "Dhruva Teja",
    email: "admin@flowforge.dev",
    password: "admin123",
    role: "Admin",
    streak: 9,
    xp: 2840
  },
  member: {
    name: "Meera Sharma",
    email: "member@flowforge.dev",
    officeId: "FF-102",
    role: "Member",
    streak: 6,
    xp: 1680
  }
};

export const demoMembers = [
  { name: "Aarav", email: "aarav@flowforge.dev", officeId: "FF-101", mailCode: "MAIL-101", resetOtp: null, password: null },
  { name: "Meera", email: "meera@flowforge.dev", officeId: "FF-102", mailCode: "MAIL-102", resetOtp: null, password: null },
  { name: "Nisha", email: "nisha@flowforge.dev", officeId: "FF-103", mailCode: "MAIL-103", resetOtp: null, password: null },
  { name: "Karthik", email: "karthik@flowforge.dev", officeId: "FF-104", mailCode: "MAIL-104", resetOtp: null, password: null },
  { name: "Riya", email: "riya@flowforge.dev", officeId: "FF-105", mailCode: "MAIL-105", resetOtp: null, password: null },
  { name: "Dev", email: "dev@flowforge.dev", officeId: "FF-106", mailCode: "MAIL-106", resetOtp: null, password: null }
];

export const demoProjects = [
  {
    id: "project-1",
    title: "Launch Control",
    description: "Recruiter-ready productivity suite with real-time work tracking.",
    status: "Active",
    deadline: "2026-05-20",
    members: ["FF-101", "FF-102", "FF-103", "FF-104"],
    progress: 68
  },
  {
    id: "project-2",
    title: "Mobile Polish",
    description: "Responsive UX pass, gestures, and accessible task updates.",
    status: "Planning",
    deadline: "2026-05-28",
    members: [],
    progress: 31
  }
];

export const demoTasks = [
  {
    id: "task-1",
    title: "Finalize JWT auth flow",
    description: "Signup, login, protected routes, and admin/member role checks.",
    projectId: "project-1",
    assignee: "Aarav",
    assigneeOfficeId: "FF-101",
    priority: "High",
    status: "Todo",
    due: "Today",
    tags: ["Auth", "API"],
    xp: 80
  },
  {
    id: "task-2",
    title: "Wire analytics dashboard",
    description: "Completion rate, weekly output, and delayed task analysis.",
    projectId: "project-1",
    assignee: "Meera",
    assigneeOfficeId: "FF-102",
    priority: "Medium",
    status: "In Progress",
    due: "Tomorrow",
    tags: ["Charts"],
    xp: 65
  },
  {
    id: "task-3",
    title: "Socket activity feed",
    description: "Broadcast task movement and comment typing state to team.",
    projectId: "project-1",
    assignee: "Karthik",
    assigneeOfficeId: "FF-104",
    priority: "High",
    status: "Review",
    due: "May 12",
    tags: ["Realtime"],
    xp: 90
  },
  {
    id: "task-4",
    title: "Landing page motion pass",
    description: "Premium hero, feature bands, workflow preview, and CTA.",
    projectId: "project-2",
    assignee: "Nisha",
    assigneeOfficeId: "FF-103",
    priority: "Low",
    status: "Completed",
    due: "May 10",
    tags: ["UI"],
    xp: 40
  }
];

export const demoActivities = [
  { id: "activity-1", text: "Meera updated analytics charts", time: "2 mins ago" },
  { id: "activity-2", text: "Karthik moved Socket activity feed to Review", time: "18 mins ago" },
  { id: "activity-3", text: "Nisha completed Landing page motion pass", time: "1 hr ago" }
];

export const weeklyProductivity = [
  { day: "Mon", completed: 8, delayed: 1 },
  { day: "Tue", completed: 11, delayed: 2 },
  { day: "Wed", completed: 9, delayed: 1 },
  { day: "Thu", completed: 14, delayed: 0 },
  { day: "Fri", completed: 10, delayed: 3 },
  { day: "Sat", completed: 6, delayed: 1 },
  { day: "Sun", completed: 7, delayed: 0 }
];

export const teamPerformance = [
  { name: "Aarav", score: 82 },
  { name: "Meera", score: 91 },
  { name: "Nisha", score: 76 },
  { name: "Karthik", score: 88 }
];
