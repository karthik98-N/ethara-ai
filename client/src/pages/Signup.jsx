import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore.js";

export default function Signup() {
  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();

  return (
    <main className="grid min-h-screen place-items-center px-4 text-white">
      <form
        className="glass w-full max-w-md rounded-lg p-6"
        onSubmit={(event) => {
          event.preventDefault();
          login(new FormData(event.currentTarget).get("email"), "Admin");
          navigate("/projects");
        }}
      >
        <h1 className="text-3xl font-bold">Create workspace</h1>
        <p className="mt-2 text-sm text-slate-400">New workspace users start as Admins so they can add members and assign project access.</p>
        <input name="name" required placeholder="Full name" className="mt-6 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-electric" />
        <input name="email" type="email" required placeholder="Email" className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-electric" />
        <input name="password" type="password" required placeholder="Password" className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-electric" />
        <button className="mt-5 w-full rounded-lg bg-electric px-4 py-3 font-semibold text-ink">Sign up</button>
        <p className="mt-4 text-center text-sm text-slate-400">Already registered? <Link className="text-electric" to="/login">Login</Link></p>
      </form>
    </main>
  );
}
