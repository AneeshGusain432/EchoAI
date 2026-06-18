import { createFileRoute, redirect } from "@tanstack/react-router";
import DashboardPage from "../pages/DashboardPage";
import api from "../utils/Axios";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    try {
      await api.get("/api/v1/auth/get-me");
    } catch (error) {
      throw redirect({ to: "/" });
    }
  },
  component: () => <DashboardPage />,
});
