import express, { Router } from "express";
import auth from "../middleware/auth";
import * as mailCtrl from "../controllers/mail";

const router: Router = express.Router();

router.post("/suggest-composer", auth as any, mailCtrl.sendEmail);

export default router;
