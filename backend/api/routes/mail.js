import express from "express";
import * as mailCtrl from "../controllers/mail";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/suggest-composer", auth, mailCtrl.sendEmail);

export default router;
