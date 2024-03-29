import express, { Router } from "express";
import { login, logout, signup } from "../controllers/user";

const router: Router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
