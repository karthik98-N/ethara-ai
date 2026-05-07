import { ShieldCheck, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore.js";

export default function Login() {
  const login = useAppStore((state) => state.login);
  const loginAdminWithPassword = useAppStore((state) => state.loginAdminWithPassword);
  const loginMemberWithOfficeId = useAppStore((state) => state.loginMemberWithOfficeId);
  const requestMemberPasswordOtp = useAppStore((state) => state.requestMemberPasswordOtp);
  const resetMemberPasswordWithOtp = useAppStore((state) => state.resetMemberPasswordWithOtp);
  const navigate = useNavigate();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("admin@flowforge.dev");
  const [adminPassword, setAdminPassword] = useState("");
  const [showMemberLogin, setShowMemberLogin] = useState(false);
  const [officeId, setOfficeId] = useState("FF-102");
  const [password, setPassword] = useState("");
  const [mailCode, setMailCode] = useState("MAIL-102");
  const [newPassword, setNewPassword] = useState("");
  const [memberMode, setMemberMode] = useState("login");
  const [forgotStep, setForgotStep] = useState("request");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  function submitAdminLogin(event) {
    event.preventDefault();
    const result = loginAdminWithPassword({ email: adminEmail, password: adminPassword });
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate("/dashboard");
  }

  function submitMemberLogin(event) {
    event.preventDefault();
    const result = loginMemberWithOfficeId(officeId, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate("/tasks");
  }

  async function submitForgotPassword(event) {
    event.preventDefault();
    setError("");
    setInfo("");
    if (forgotStep === "request") {
      const result = await requestMemberPasswordOtp(officeId);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setForgotStep("verify");
      setInfo(result.message);
      return;
    }
    const result = await resetMemberPasswordWithOtp({ officeId, otp: mailCode, password: newPassword });
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setInfo(result.message);
    setMemberMode("login");
    setForgotStep("request");
  }

  const isForgot = memberMode === "forgot";
  const panel = {
    hidden: { opacity: 0, y: 22, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <motion.main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-10 text-primary" initial="hidden" animate="visible">
      <motion.div
        className="absolute inset-x-0 top-12 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent"
        animate={{ x: ["-20%", "20%", "-20%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-20 h-px bg-gradient-to-r from-transparent via-mint/30 to-transparent"
        animate={{ x: ["18%", "-18%", "18%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.section className="glass w-full max-w-4xl rounded-lg p-5 shadow-glow sm:p-7" variants={panel} transition={{ duration: 0.55, ease: "easeOut" }}>
        <motion.div className="text-center" variants={panel} transition={{ duration: 0.55, delay: 0.08 }}>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-electric">FlowForge secure access</p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">Choose login type</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">
            A clean round-one demo flow: Admin manages projects and access, while members enter with their mailed office ID and password.
          </p>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <motion.button type="button" onClick={() => { setShowAdminLogin((value) => !value); setShowMemberLogin(false); setError(""); }} className="rounded-lg border border-electric/30 bg-electric/10 p-5 text-left transition hover:bg-electric/20" variants={panel} transition={{ duration: 0.45, delay: 0.16 }} whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-electric text-white">
              <ShieldCheck size={24} />
            </span>
            <span className="mt-4 block text-xl font-bold text-electric">Admin</span>
            <span className="mt-2 block text-sm leading-6 text-secondary">Create projects, assign members, create tasks, and generate AI subtasks.</span>
          </motion.button>

          <motion.button type="button" onClick={() => { setShowMemberLogin((value) => !value); setShowAdminLogin(false); setError(""); }} className="rounded-lg border border-mint/30 bg-mint/10 p-5 text-left transition hover:bg-mint/20" variants={panel} transition={{ duration: 0.45, delay: 0.24 }} whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-mint text-white">
              <UserRound size={24} />
            </span>
            <span className="mt-4 block text-xl font-bold text-mint">Member</span>
            <span className="mt-2 block text-sm leading-6 text-secondary">Login using the member ID provided by Admin through mail.</span>
          </motion.button>
        </div>

        {showAdminLogin ? (
          <motion.form className="mt-5 rounded-lg border border-electric/30 bg-electric/10 p-4" onSubmit={submitAdminLogin} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.35 }}>
            <label className="text-sm font-semibold text-electric" htmlFor="admin-email">Admin email</label>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <input
                id="admin-email"
                value={adminEmail}
                onChange={(event) => {
                  setAdminEmail(event.target.value);
                  setError("");
                }}
                type="email"
                placeholder="admin@flowforge.dev"
                className="rounded-lg border border-white/10 bg-ink px-4 py-3 outline-none focus:border-electric"
              />
              <input
                value={adminPassword}
                onChange={(event) => {
                  setAdminPassword(event.target.value);
                  setError("");
                }}
                type="password"
                placeholder="Admin password"
                className="rounded-lg border border-white/10 bg-ink px-4 py-3 outline-none focus:border-electric"
              />
            </div>
            <button className="mt-3 rounded-lg bg-electric px-4 py-3 font-semibold text-white">Login as admin</button>
            {error ? <p className="mt-2 text-sm text-coral">{error}</p> : <p className="mt-2 text-xs text-muted">Demo admin: admin@flowforge.dev / admin123</p>}
          </motion.form>
        ) : null}

        {showMemberLogin ? (
          <motion.form className="mt-5 rounded-lg border border-mint/30 bg-mint/10 p-4" onSubmit={isForgot ? submitForgotPassword : submitMemberLogin} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.35 }}>
            <label className="text-sm font-semibold text-mint" htmlFor="office-id">{isForgot && forgotStep === "request" ? "Office ID or email" : "Member office ID"}</label>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <input
                id="office-id"
                value={officeId}
                onChange={(event) => {
                  setOfficeId(isForgot && forgotStep === "request" ? event.target.value : event.target.value.toUpperCase());
                  setError("");
                  setInfo("");
                }}
                placeholder={isForgot && forgotStep === "request" ? "Enter office ID or real email" : "Enter ID from Admin mail, e.g. FF-102"}
                className="rounded-lg border border-white/10 bg-ink px-4 py-3 uppercase outline-none focus:border-mint"
              />
              {isForgot && forgotStep === "verify" ? (
                <input
                  value={mailCode}
                  onChange={(event) => {
                    setMailCode(event.target.value.toUpperCase());
                    setError("");
                  }}
                  placeholder="Mail OTP, e.g. OTP-102"
                  className="rounded-lg border border-white/10 bg-ink px-4 py-3 uppercase outline-none focus:border-mint"
                />
              ) : (
                <input
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  type="password"
                  placeholder="Member password"
                  className="rounded-lg border border-white/10 bg-ink px-4 py-3 outline-none focus:border-mint"
                />
              )}
            </div>
            {isForgot && forgotStep === "verify" ? (
              <input
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                  setError("");
                }}
                type="password"
                placeholder="Set reset password"
                className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 outline-none focus:border-mint"
              />
            ) : null}
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <button className="rounded-lg bg-mint px-4 py-3 font-semibold text-white">
                {isForgot ? (forgotStep === "request" ? "Send OTP to mail" : "Reset password and login") : "Login as member"}
              </button>
            </div>
            <button type="button" onClick={() => { setMemberMode(isForgot ? "login" : "forgot"); setForgotStep("request"); setError(""); setInfo(""); }} className="mt-3 text-sm font-semibold text-mint hover:text-primary">
              {isForgot ? "Back to member login" : "Forgot password? Reset with mail OTP"}
            </button>
            {error ? <p className="mt-2 text-sm text-coral">{error}</p> : info ? <p className="mt-2 text-sm text-mint">{info}</p> : <p className="mt-2 text-xs text-muted">Forgot password uses the real email saved by Admin. Demo: meera@flowforge.dev receives OTP-102.</p>}
          </motion.form>
        ) : null}

        <p className="mt-5 text-center text-sm text-muted">
          Need a new workspace? <Link className="text-electric" to="/signup">Create account</Link>
        </p>
      </motion.section>
    </motion.main>
  );
}
