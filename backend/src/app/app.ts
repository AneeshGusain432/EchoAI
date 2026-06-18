import { corsair } from "./../server/corsair.js";
import {
  createBaseMcpServer,
  createMcpRouter,
} from "@corsair-dev/mcp";
import express from "express";
import cookieParser from 'cookie-parser'
import type { Application } from "express";
import authRoutes from './module/auth/authRoutes.js'
import corsairRoutes from './module/corsair/corsairRoute.js'
import chatRoutes from './module/chat/chatRoute.js'
import emailRoutes from "./module/email/emailRoutes.js"
import dashboardRoutes from './module/dashboard/dashboardRoutes.js'
import calendarRoutes from './module/calendar/calendarRoutes.js'
import cors from 'cors'



function createExpressApplication(): Application {
  const app = express();

  // middlewares
  app.use(express.json());
  app.use(cookieParser())
  app.use(cors({ origin: ["https://echo-ai-5iu8-git-main-aneeshgusaindevs-projects.vercel.app", "http://localhost:5173", process.env.FRONTEND_URL!], credentials: true }))

  app.use("/api/v1/mcp", (req, res, next) => {
    const tenantId = req.user?.id ?? req.headers["x-tenant-id"] as string;

    if (!tenantId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const tenant = corsair.withTenant(tenantId);

    const router = createMcpRouter(() => createBaseMcpServer({ corsair: tenant }));
    router(req, res, next);
  });

  app.use("/api/v1/auth", authRoutes)
  app.use("/api/v1/corsair", corsairRoutes)
  app.use("/api/v1/chat", chatRoutes)
  app.use("/api/v1/email", emailRoutes)
  app.use("/api/v1/dashboard", dashboardRoutes)
  app.use("/api/v1/calendar", calendarRoutes)

  app.get("/", (req, res) => {
    res.json({ message: "hello from express" })
  })

  return app;
}

export default createExpressApplication;
