import express, { Router } from "express";
import * as mailCtrl from "../controllers/mail";
import auth from "../middleware/auth";

const router: Router = express.Router();

router.post("/suggest-composer", auth as any, mailCtrl.sendEmail);

export default router;
