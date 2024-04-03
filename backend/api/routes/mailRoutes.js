import express from "express";
import auth from "../../middleware/auth";
import { sendEmail } from "../controllers/mail/sendEmail";

const router = express.Router();

router.post("/suggest-composer", auth, sendEmail);

export default router;
