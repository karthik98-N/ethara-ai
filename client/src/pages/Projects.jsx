import { CalendarDays, Edit2, Trash2, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore.js";

export default function Projects() {
  const { projects, members, selectedProjectId, setSelectedProjectId, addMember, updateMember, deleteMember, addMemberToProject, addProject, user, setTaskFilter } = useAppStore();
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const [officeId, setOfficeId] = useState(members[0]?.officeId || "");
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newOfficeId, setNewOfficeId] = useState("");
  const [newMemberPassword, setNewMemberPassword] = useState("");
  const [editingMember, setEditingMember] = useState(null);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectDeadline, setNewProjectDeadline] = useState("");
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [message, setMessage] = useState("");
  const isAdmin = user.role === "Admin";
  const visibleProjects = useMemo(() => {
    if (isAdmin) return projects;
    return projects.filter((project) => project.members.includes(user.officeId));
  }, [isAdmin, projects, user.officeId]);
  const memberByOfficeId = useMemo(() => Object.fromEntries(members.map((member) => [member.officeId, member])), [members]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-electric">Projects</p>
          <h1 className="mt-2 text-3xl font-bold">Project command center</h1>
        </div>
        <button
          onClick={() => setIsCreatingProject(!isCreatingProject)}
          className={`rounded-lg px-4 py-2 font-semibold transition-colors ${isCreatingProject ? "bg-white/10 text-white" : "bg-electric text-ink"}`}
        >
          {isCreatingProject ? "Cancel" : "Create project"}
        </button>
      </div>

      {isAdmin && isCreatingProject && (
        <form
          className="glass rounded-lg p-6 animate-in fade-in slide-in-from-top-4 duration-300"
          onSubmit={(event) => {
            event.preventDefault();
            if (!newProjectTitle.trim()) return setMessage("Project title is required.");
            const result = addProject({
              title: newProjectTitle,
              description: newProjectDescription,
              deadline: newProjectDeadline
            });
            if (result.ok) {
              setMessage(`Project "${newProjectTitle}" created successfully.`);
              setNewProjectTitle("");
              setNewProjectDescription("");
              setNewProjectDeadline("");
              setIsCreatingProject(false);
            }
          }}
        >
          <h2 className="text-xl font-bold mb-4">New Project</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Project title</label>
              <input
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                placeholder="e.g. System Overhaul"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 outline-none focus:border-electric"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Deadline (Optional)</label>
              <input
                type="date"
                value={newProjectDeadline}
                onChange={(e) => setNewProjectDeadline(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 outline-none focus:border-electric [color-scheme:dark]"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm text-slate-300">Description</label>
              <textarea
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                placeholder="What is this project about?"
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 outline-none focus:border-electric resize-none"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreatingProject(false)}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-electric px-6 py-2 font-semibold text-ink hover:brightness-110 transition-all"
            >
              Initialize project
            </button>
          </div>
        </form>
      )}
      {isAdmin ? (
        <section className="grid gap-4 xl:grid-cols-2">
          <form
            className="glass grid gap-3 rounded-lg p-4 md:grid-cols-[1fr_1fr_auto]"
            onSubmit={(event) => {
              event.preventDefault();
              addMemberToProject(projectId, officeId);
              setMessage(`${officeId} can now access this project.`);
            }}
          >
            <label className="text-sm text-slate-300">
              Project access
              <select value={projectId} onChange={(event) => setProjectId(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-3 py-3 text-white outline-none">
                {projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}
              </select>
            </label>
            <label className="text-sm text-slate-300">
              Member office ID
              <select value={officeId} onChange={(event) => setOfficeId(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-3 py-3 text-white outline-none">
                {members.map((member) => <option key={member.officeId} value={member.officeId}>{member.name} - {member.officeId}</option>)}
              </select>
            </label>
            <button className="self-end rounded-lg bg-mint px-4 py-3 font-semibold text-ink">Allow access</button>
            <p className="text-sm text-slate-400 md:col-span-3">Only office IDs added here can see that project when logged in as a member.</p>
          </form>

          <form
            className="glass rounded-lg p-4"
            onSubmit={(event) => {
              event.preventDefault();
              const result = addMember({ name: newMemberName, email: newMemberEmail, officeId: newOfficeId, password: newMemberPassword });
              setMessage(result.message);
              if (result.ok) {
                setOfficeId(newOfficeId.trim().toUpperCase());
                setNewMemberName("");
                setNewMemberEmail("");
                setNewOfficeId("");
                setNewMemberPassword("");
              }
            }}
          >
            <h2 className="font-bold">Add new member</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <input value={newMemberName} onChange={(event) => setNewMemberName(event.target.value)} placeholder="Member name" className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 outline-none focus:border-electric" />
              <input value={newMemberEmail} onChange={(event) => setNewMemberEmail(event.target.value)} type="email" placeholder="Real email address" className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 outline-none focus:border-electric" />
              <input value={newOfficeId} onChange={(event) => setNewOfficeId(event.target.value)} placeholder="Office ID number, e.g. FF-107" className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 uppercase outline-none focus:border-electric" />
              <input value={newMemberPassword} onChange={(event) => setNewMemberPassword(event.target.value)} type="password" placeholder="Set password" className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 outline-none focus:border-electric" />
            </div>
            <button className="mt-3 rounded-lg bg-electric px-4 py-3 font-semibold text-ink">Add member</button>
            <p className="mt-2 text-sm text-slate-400">Admin must add the real email first. Forgot-password OTP is sent to that email.</p>
          </form>
          {message ? <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-slate-300 xl:col-span-2">{message}</p> : null}
        </section>
      ) : (
        <section className="rounded-lg border border-mint/30 bg-mint/10 p-4 text-sm text-slate-300">
          Member access: you can only see projects where Admin added you as a member.
        </section>
      )}
      <section className="grid gap-4 lg:grid-cols-2">
        {visibleProjects.map((project) => (
          <article key={project.id} className={`glass rounded-lg p-5 ${project.id === selectedProjectId ? "ring-1 ring-electric" : ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">{project.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{project.description}</p>
              </div>
              <span className="rounded-full bg-mint/10 px-3 py-1 text-xs text-mint">{project.status}</span>
            </div>
            <div className="mt-5 h-2 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-electric" style={{ width: `${project.progress}%` }} />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2"><Users size={16} /> {project.members.length} members</span>
              <span className="inline-flex items-center gap-2"><CalendarDays size={16} /> {project.deadline}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.members.map((memberOfficeId) => (
                <span key={memberOfficeId} className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">
                  {memberByOfficeId[memberOfficeId]?.name || "Unknown"} - {memberOfficeId} - {memberByOfficeId[memberOfficeId]?.email || "no email"}
                </span>
              ))}
            </div>
            <button
              onClick={() => {
                setTaskFilter(project.id);
                navigate("/tasks");
              }}
              className="mt-5 rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
            >
              View details
            </button>
          </article>
        ))}
        {!visibleProjects.length ? (
          <article className="glass rounded-lg p-5 text-sm text-slate-300">No project access yet. Ask the Admin to add you to a project.</article>
        ) : null}
      </section>

      {isAdmin && (
        <section className="glass mt-6 rounded-lg p-5">
          <h2 className="text-xl font-bold mb-4">Member Management</h2>
          <div className="overflow-x-auto thin-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-sm text-slate-400">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Office ID</th>
                  <th className="pb-3 pr-4">Email</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {members.map((member) => (
                  <tr key={member.officeId} className="text-sm">
                    <td className="py-4 pr-4">{member.name}</td>
                    <td className="py-4 pr-4 font-mono text-electric">{member.officeId}</td>
                    <td className="py-4 pr-4 text-slate-400">{member.email}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingMember(member);
                            setNewMemberName(member.name);
                            setNewMemberEmail(member.email);
                            setNewOfficeId(member.officeId);
                            setNewMemberPassword(member.password || "");
                          }}
                          className="p-2 text-electric hover:bg-electric/10 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteMember(member.officeId)}
                          className="p-2 text-coral hover:bg-coral/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editingMember && (
            <form
              className="mt-6 border-t border-white/10 pt-6 animate-in fade-in slide-in-from-top-2"
              onSubmit={(e) => {
                e.preventDefault();
                updateMember(editingMember.officeId, {
                  name: newMemberName,
                  email: newMemberEmail,
                  password: newMemberPassword
                });
                setEditingMember(null);
                setNewMemberName("");
                setNewMemberEmail("");
                setNewMemberPassword("");
                setMessage(`Member ${editingMember.officeId} updated successfully.`);
              }}
            >
              <h3 className="font-bold mb-4 text-electric">Edit Member: {editingMember.officeId}</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Full Name</label>
                  <input
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-electric"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Email Address</label>
                  <input
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-electric"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">New Password</label>
                  <input
                    value={newMemberPassword}
                    onChange={(e) => setNewMemberPassword(e.target.value)}
                    type="password"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-electric"
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button type="submit" className="rounded-lg bg-electric px-4 py-2 font-semibold text-ink">Update member</button>
                <button type="button" onClick={() => setEditingMember(null)} className="rounded-lg border border-white/10 px-4 py-2 text-sm">Cancel</button>
              </div>
            </form>
          )}
        </section>
      )}
    </div>
  );
}
