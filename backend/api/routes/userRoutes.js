import express from "express";
import { login } from "../controllers/user/login";
import { logout } from "../controllers/user/logout";
import { signup } from "../controllers/user/signup";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
