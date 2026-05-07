import { DndContext, PointerSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";
import { Bot, CalendarClock, Filter, GripVertical, MessageSquare, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useAppStore } from "../store/useAppStore.js";
import TaskModal from "../components/tasks/TaskModal.jsx";

const columns = ["Todo", "In Progress", "Review", "Completed"];

function TaskCard({ task, onClick }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id });
  const style = { transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.6 : 1 };
  const priority = {
    High: "bg-coral/10 text-coral",
    Medium: "bg-amber/10 text-amber",
    Low: "bg-mint/10 text-mint"
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      onClick={() => !isDragging && onClick(task)}
      className="group relative cursor-pointer rounded-lg border border-white/10 bg-ink/80 p-4 shadow-lg hover:border-electric/50 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold leading-6 group-hover:text-electric transition-colors">{task.title}</h3>
        <button className="text-slate-500 hover:text-white" {...listeners} {...attributes} title="Drag task" onClick={(e) => e.stopPropagation()}>
          <GripVertical size={18} />
        </button>
      </div>
      <p className="mt-2 text-sm line-clamp-2 text-slate-400">{task.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`rounded-full px-2 py-1 text-xs ${priority[task.priority]}`}>{task.priority}</span>
        {task.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">{tag}</span>)}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span>{task.assignee}</span>
          {task.comments?.length > 0 && (
            <span className="flex items-center gap-1 text-electric">
              <MessageSquare size={12} /> {task.comments.length}
            </span>
          )}
        </div>
        <span className="inline-flex items-center gap-1"><CalendarClock size={14} /> {task.due}</span>
      </div>
    </article>
  );
}

function KanbanColumn({ status, tasks, onTaskClick }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  return (
    <section ref={setNodeRef} className={`min-h-[28rem] rounded-lg border p-3 transition ${isOver ? "border-electric bg-electric/10" : "border-white/10 bg-white/5"}`}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold">{status}</h2>
        <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">{tasks.length}</span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => <TaskCard key={task.id} task={task} onClick={onTaskClick} />)}
      </div>
    </section>
  );
}

export default function Tasks() {
  const { tasks, projects, members, moveTask, addAiPlan, addTask, user, taskFilter, setTaskFilter } = useAppStore();
  const [prompt, setPrompt] = useState("Build login system in 5 days");
  const [taskTitle, setTaskTitle] = useState("Create role-based dashboard");
  const [taskProjectId, setTaskProjectId] = useState(projects[0]?.id || "");
  const [selectedTask, setSelectedTask] = useState(null);

  const selectedProjectForAdd = projects.find((p) => p.id === taskProjectId) || projects[0];
  const [assigneeOfficeId, setAssigneeOfficeId] = useState(selectedProjectForAdd?.members?.[0] || "FF-102");
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const isAdmin = user.role === "Admin";

  const memberByOfficeId = useMemo(() => Object.fromEntries(members.map((member) => [member.officeId, member])), [members]);

  const visibleTasks = useMemo(() => {
    let filtered = tasks;
    if (!isAdmin) {
      filtered = tasks.filter((task) => task.assigneeOfficeId === user.officeId);
    }
    if (taskFilter !== "all") {
      filtered = filtered.filter((task) => task.projectId === taskFilter);
    }
    return filtered;
  }, [isAdmin, tasks, taskFilter, user.officeId]);

  const grouped = useMemo(() => Object.fromEntries(columns.map((column) => [column, visibleTasks.filter((task) => task.status === column)])), [visibleTasks]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-electric">Tasks</p>
          <h1 className="mt-2 text-3xl font-bold">Kanban board</h1>
          <p className="mt-2 text-sm text-slate-400">
            {isAdmin ? "Admin can manage all tasks and team communication." : "Manage your assigned tasks and communicate with the team."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <Filter size={16} className="text-slate-400" />
            <select
              value={taskFilter}
              onChange={(e) => setTaskFilter(e.target.value)}
              className="bg-transparent text-sm font-medium outline-none"
            >
              <option value="all">All Projects</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isAdmin && (
        <section className="grid gap-4 xl:grid-cols-2">
          <form
            className="glass rounded-lg p-4"
            onSubmit={(event) => {
              event.preventDefault();
              addTask({
                title: taskTitle,
                description: "Admin-created task from the task command panel.",
                projectId: taskProjectId,
                assignee: memberByOfficeId[assigneeOfficeId]?.name || assigneeOfficeId,
                assigneeOfficeId,
                priority: "Medium",
                status: "Todo",
                due: "This week",
                tags: ["Manual"],
                xp: 45
              });
              setTaskTitle("");
            }}
          >
            <h2 className="font-bold">Create task</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <select
                value={taskProjectId}
                onChange={(event) => {
                  const nextProject = projects.find((project) => project.id === event.target.value);
                  setTaskProjectId(event.target.value);
                  setAssigneeOfficeId(nextProject?.members?.[0] || "FF-102");
                }}
                className="rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-electric"
              >
                {projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}
              </select>
              <select value={assigneeOfficeId} onChange={(event) => setAssigneeOfficeId(event.target.value)} className="rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-electric">
                {(selectedProjectForAdd?.members?.length ? selectedProjectForAdd.members : ["FF-102"]).map((officeId) => (
                  <option key={officeId} value={officeId}>{memberByOfficeId[officeId]?.name || "Unknown"} - {officeId}</option>
                ))}
              </select>
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)} placeholder="Task title" className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-electric" />
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-mint px-4 py-3 font-semibold text-ink">
                <Plus size={18} /> Add task
              </button>
            </div>
          </form>
          <form
            className="glass rounded-lg p-4"
            onSubmit={(event) => {
              event.preventDefault();
              addAiPlan(prompt, taskProjectId);
            }}
          >
            <h2 className="font-bold">Generate task with AI</h2>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input value={prompt} onChange={(event) => setPrompt(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-electric" />
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-electric px-4 py-3 font-semibold text-ink">
                <Bot size={18} /> Generate subtasks
              </button>
            </div>
          </form>
        </section>
      )}

      <DndContext sensors={sensors} onDragEnd={({ active, over }) => over && columns.includes(over.id) && moveTask(active.id, over.id)}>
        <div className="grid gap-4 xl:grid-cols-4">
          {columns.map((column) => <KanbanColumn key={column} status={column} tasks={grouped[column]} onTaskClick={setSelectedTask} />)}
        </div>
      </DndContext>

      {selectedTask && (
        <TaskModal
          task={tasks.find(t => t.id === selectedTask.id)}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {!visibleTasks.length ? (
        <section className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          No tasks found for this filter.
        </section>
      ) : null}
    </div>
  );
}

