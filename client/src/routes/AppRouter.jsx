import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";
import Analytics from "../pages/Analytics.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Landing from "../pages/Landing.jsx";
import Login from "../pages/Login.jsx";
import Projects from "../pages/Projects.jsx";
import Settings from "../pages/Settings.jsx";
import Signup from "../pages/Signup.jsx";
import Tasks from "../pages/Tasks.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
