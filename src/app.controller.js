import express from "express";
import cors from "cors";
import { connectDB } from "./DB/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import messageRouter from "./modules/messages/message.controller.js";
import userRouter from "./modules/users/user.controller.js";

export const bootstrap = async () => {
  const app = express();

  // CORS configuration
  app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE", "PATCH"] }));
  app.use(express.json());

  await connectDB();

  app.use("/auth", authRouter);
  app.use("/messages", messageRouter);
  app.use("/users", userRouter);

  app.use((req, res) => res.status(404).json({ message: "Route not found" }));
  app.listen(3000, () => console.log("Server running on port 3000"));
};
