import { Router } from "express";
import { register, login, signout } from "../controllers/sessions.controler.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", register);
sessionsRouter.post("/login", login);
sessionsRouter.post("/signout", signout);

export default sessionsRouter;
