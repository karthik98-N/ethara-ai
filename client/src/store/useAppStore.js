import { create } from "zustand";
import { demoActivities, demoMembers, demoProjects, demoTasks, demoUser, demoUsers } from "../utils/demoData.js";
import { api } from "../api/http.js";

export const useAppStore = create((set, get) => ({
  user: demoUser,
  token: localStorage.getItem("flowforge_token"),
  theme: localStorage.getItem("ethara_theme") || "light",
  toggleTheme: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    localStorage.setItem("ethara_theme", newTheme);
    set({ theme: newTheme });
  },
  setTheme: (newTheme) => {
    localStorage.setItem("ethara_theme", newTheme);
    set({ theme: newTheme });
  },
  projects: demoProjects,
  members: demoMembers,
  tasks: demoTasks.map(t => ({ ...t, comments: [] })),
  activities: demoActivities,
  selectedProjectId: demoProjects[0]?.id,
  taskFilter: "all",
  setTaskFilter: (filter) => set({ taskFilter: filter }),
  setSelectedProjectId: (id) => set({ selectedProjectId: id }),
  getAccessibleProjects: () => {
    const { projects, user } = get();
    if (user.role === "Admin") return projects;
    return projects.filter((project) => project.members.includes(user.officeId));
  },
  addMember: ({ name, email, officeId, password }) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanOfficeId = officeId.trim().toUpperCase();
    if (!cleanName || !cleanEmail || !cleanOfficeId || !password) return { ok: false, message: "Name, email, office ID, and password are required." };
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) return { ok: false, message: "Enter a valid member email." };
    if (password.length < 6) return { ok: false, message: "Password must be at least 6 characters." };
    if (get().members.some((member) => member.officeId === cleanOfficeId)) {
      return { ok: false, message: "Office ID already exists. Use a unique ID." };
    }
    if (get().members.some((member) => member.email === cleanEmail)) {
      return { ok: false, message: "Email already exists. Use a unique email." };
    }
    set((state) => ({
      members: [...state.members, { name: cleanName, email: cleanEmail, officeId: cleanOfficeId, mailCode: `MAIL-${cleanOfficeId.replace(/\D/g, "") || cleanOfficeId}`, resetOtp: null, password }],
      activities: [{ id: crypto.randomUUID(), text: `${cleanName} (${cleanOfficeId}) added as a member`, time: "just now" }, ...state.activities]
    }));
    return { ok: true, message: `Member added. Login ID: ${cleanOfficeId}` };
  },
  addMemberToProject: (projectId, officeId) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId && !project.members.includes(officeId)
          ? { ...project, members: [...project.members, officeId] }
          : project
      ),
      activities: [{ id: crypto.randomUUID(), text: `${officeId} added to project access`, time: "just now" }, ...state.activities]
    })),
  updateMember: (officeId, updates) =>
    set((state) => ({
      members: state.members.map((m) => (m.officeId === officeId ? { ...m, ...updates } : m)),
      activities: [{ id: crypto.randomUUID(), text: `Member ${officeId} updated`, time: "just now" }, ...state.activities]
    })),
  deleteMember: (officeId) =>
    set((state) => ({
      members: state.members.filter((m) => m.officeId !== officeId),
      activities: [{ id: crypto.randomUUID(), text: `Member ${officeId} removed`, time: "just now" }, ...state.activities]
    })),
  addComment: (taskId, { text, author }) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId
          ? { ...t, comments: [...(t.comments || []), { id: crypto.randomUUID(), text, author, time: "just now" }] }
          : t
      ),
      activities: [{ id: crypto.randomUUID(), text: `New comment on task ${taskId}`, time: "just now" }, ...state.activities]
    })),
  addProject: ({ title, description, deadline }) => {
    const newProject = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      deadline: deadline || "TBD",
      status: "Active",
      members: [],
      progress: 0
    };
    set((state) => ({
      projects: [newProject, ...state.projects],
      activities: [{ id: crypto.randomUUID(), text: `Project "${newProject.title}" created`, time: "just now" }, ...state.activities]
    }));
    return { ok: true, project: newProject };
  },
  login: (email, role = "Admin") => {
    const account = role === "Member" ? demoUsers.member : demoUsers.admin;
    localStorage.setItem("flowforge_token", "demo.jwt.token");
    localStorage.setItem("flowforge_role", role);
    set({ token: "demo.jwt.token", user: { ...account, email: email || account.email } });
  },
  loginAdminWithPassword: ({ email, password }) => {
    const admin = demoUsers.admin;
    if (email.trim().toLowerCase() !== admin.email || password !== admin.password) {
      return { ok: false, message: "Invalid admin email or password." };
    }

    localStorage.setItem("flowforge_token", "demo.jwt.token");
    localStorage.setItem("flowforge_role", "Admin");
    set({ token: "demo.jwt.token", user: { ...admin } });
    return { ok: true, message: "Admin login successful." };
  },
  loginMemberWithOfficeId: (officeId, password) => {
    const cleanOfficeId = officeId.trim().toUpperCase();
    const member = get().members.find((item) => item.officeId === cleanOfficeId);
    if (!member) return { ok: false, message: "Invalid member ID. Ask Admin for the ID sent by mail." };
    if (!member.password) return { ok: false, message: "Password is not set. Ask Admin to create your password." };
    if (member.password !== password) return { ok: false, message: "Incorrect password." };

    localStorage.setItem("flowforge_token", "demo.jwt.token");
    localStorage.setItem("flowforge_role", "Member");
    set({
      token: "demo.jwt.token",
      user: {
        name: member.name,
        email: member.email,
        officeId: member.officeId,
        role: "Member",
        streak: 1,
        xp: 0
      }
    });
    return { ok: true, message: "Member login successful." };
  },
  setMemberPasswordFromMail: ({ officeId, mailCode, password }) => {
    const cleanOfficeId = officeId.trim().toUpperCase();
    const cleanMailCode = mailCode.trim().toUpperCase();
    const member = get().members.find((item) => item.officeId === cleanOfficeId);
    if (!member) return { ok: false, message: "Invalid member ID." };
    if (member.password) return { ok: false, message: "Password is already set. Use member login." };
    if (member.mailCode !== cleanMailCode) return { ok: false, message: "Mail code does not match." };
    if (password.length < 6) return { ok: false, message: "Password must be at least 6 characters." };

    set((state) => ({
      members: state.members.map((item) => (item.officeId === cleanOfficeId ? { ...item, password } : item)),
      activities: [{ id: crypto.randomUUID(), text: `${cleanOfficeId} set member password`, time: "just now" }, ...state.activities]
    }));
    return get().loginMemberWithOfficeId(cleanOfficeId, password);
  },
  requestMemberPasswordOtp: async (identifier) => {
    try {
      const response = await api.post("/auth/forgot-password", { identifier });
      set((state) => ({
        activities: [{ id: crypto.randomUUID(), text: `Password OTP requested for ${identifier}`, time: "just now" }, ...state.activities]
      }));
      return { ok: true, message: response.data.message, email: response.data.email };
    } catch (error) {
      return { ok: false, message: error.response?.data?.message || "Failed to request OTP" };
    }
  },
  resetMemberPasswordWithOtp: async ({ officeId, otp, password }) => {
    try {
      await api.post("/auth/reset-password", { identifier: officeId, otp, password });
      set((state) => ({
        activities: [{ id: crypto.randomUUID(), text: `${officeId} reset password`, time: "just now" }, ...state.activities]
      }));
      return { ok: true, message: "Password reset successful. Please login." };
    } catch (error) {
      return { ok: false, message: error.response?.data?.message || "Failed to reset password" };
    }
  },
  logout: () => {
    localStorage.removeItem("flowforge_token");
    localStorage.removeItem("flowforge_role");
    set({ token: null });
  },
  moveTask: (taskId, status) => {
    const task = get().tasks.find((item) => item.id === taskId);
    set((state) => ({
      tasks: state.tasks.map((item) => (item.id === taskId ? { ...item, status } : item)),
      activities: task
        ? [{ id: crypto.randomUUID(), text: `${task.title} moved to ${status}`, time: "just now" }, ...state.activities]
        : state.activities
    }));
  },
  addTask: (task) =>
    set((state) => ({
      tasks: [{ ...task, id: crypto.randomUUID(), status: task.status || "Todo" }, ...state.tasks],
      activities: [{ id: crypto.randomUUID(), text: `Created ${task.title}`, time: "just now" }, ...state.activities]
    })),
  addAiPlan: (title, projectId = demoProjects[0].id) => {
    const project = get().projects.find((item) => item.id === projectId) || demoProjects[0];
    const members = get().members;
    const assignees = project.members.length
      ? project.members.map((officeId) => members.find((member) => member.officeId === officeId)).filter(Boolean)
      : [members.find((member) => member.officeId === "FF-102") || { name: "Meera", officeId: "FF-102" }];
    const generated = [
      "Map user journey and acceptance criteria",
      "Build UI and validation states",
      "Connect API, auth, and persistence",
      "Test edge cases and deploy"
    ].map((taskTitle, index) => ({
      id: crypto.randomUUID(),
      title: taskTitle,
      description: `AI sprint task for ${title}`,
      projectId,
      assignee: assignees[index % assignees.length].name,
      assigneeOfficeId: assignees[index % assignees.length].officeId,
      priority: index === 2 ? "High" : "Medium",
      status: "Todo",
      due: `Day ${index + 1}`,
      tags: ["AI", "Sprint"],
      xp: 30
    }));
    set((state) => ({
      tasks: [...generated, ...state.tasks],
      activities: [{ id: crypto.randomUUID(), text: `AI planned sprint for ${title}`, time: "just now" }, ...state.activities]
    }));
  }
}));
