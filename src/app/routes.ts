import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./components/Dashboard";
import { UsersPage } from "./components/UsersPage";
import { NotesPage } from "./components/NotesPage";
import { AIProcessing } from "./components/AIProcessing";
import { Subscriptions } from "./components/Subscriptions";
import { SettingsPage } from "./components/SettingsPage";
import { NotFound } from "./components/NotFound";
import { LandingPage } from "./components/landing/LandingPage";
import { LoginPage } from "./components/landing/LoginPage";
import { SignupPage } from "./components/landing/SignupPage";
import { UserDashboard } from "./components/landing/UserDashboard";

export const router = createBrowserRouter([
  // Product Website Routes
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/app",
    Component: UserDashboard,
  },
  // Admin Panel Routes
  {
    path: "/admin",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "users", Component: UsersPage },
      { path: "notes", Component: NotesPage },
      { path: "ai-processing", Component: AIProcessing },
      { path: "subscriptions", Component: Subscriptions },
      { path: "settings", Component: SettingsPage },
      { path: "*", Component: NotFound },
    ],
  },
  // 404 for undefined routes
  {
    path: "*",
    Component: NotFound,
  },
]);