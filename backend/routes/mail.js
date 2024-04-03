import express from "express";
import auth from "../../middleware/auth";
import * as mailCtrl from "../controllers/mail";

const router = express.Router();

router.post("/suggest-composer", auth, mailCtrl.sendEmail);

export default router;
