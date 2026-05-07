import { Send, X } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "../../store/useAppStore.js";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskModal({ task, onClose }) {
  const { addComment, user, moveTask } = useAppStore();
  const [newComment, setNewComment] = useState("");
  const statuses = ["Todo", "In Progress", "Review", "Completed"];

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment(task.id, { text: newComment, author: user.name });
    setNewComment("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <h2 className="text-xl font-bold">{task.title}</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-white/5 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6 thin-scrollbar">
          <div className="space-y-6">
            <section>
              <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Description</h3>
              <p className="text-slate-300 leading-relaxed">{task.description}</p>
            </section>

            <div className="grid gap-6 sm:grid-cols-2 border-y border-white/5 py-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Assignee</h3>
                  <p className="text-sm">{task.assignee}</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Due Date</h3>
                  <p className="text-sm">{task.due}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Task Status</h3>
                <div className="flex flex-col gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => moveTask(task.id, status)}
                      className={`flex items-center justify-between rounded-lg px-4 py-2 text-sm transition-all ${
                        task.status === status
                          ? "bg-electric font-bold text-ink"
                          : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {status}
                      {task.status === status && <div className="h-2 w-2 rounded-full bg-ink animate-pulse" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <section>
              <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">Communication Chat</h3>
              <div className="space-y-4">
                <div className="min-h-[200px] space-y-3 rounded-xl bg-white/5 p-4">
                  {task.comments?.length ? (
                    task.comments.map((comment) => (
                      <div key={comment.id} className="flex flex-col gap-1 rounded-lg bg-white/5 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-electric">{comment.author}</span>
                          <span className="text-[10px] text-slate-500">{comment.time}</span>
                        </div>
                        <p className="text-sm text-slate-300">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-sm text-slate-500 py-10">No discussion yet. Start the conversation!</p>
                  )}
                </div>

                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm outline-none focus:border-electric"
                  />
                  <button className="rounded-lg bg-electric p-2 text-ink hover:brightness-110 transition-all">
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
