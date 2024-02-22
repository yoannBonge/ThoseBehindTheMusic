import express, { Router } from "express";
import auth from "../middleware/auth";
import multerUpload from "../middleware/multer-config";
import sharpTreatment from "../middleware/sharp-config";
import * as composersCtrl from "../controllers/composers";

const router: Router = express.Router();

router.post(
  "/",
  auth as any,
  multerUpload as any,
  sharpTreatment as any,
  composersCtrl.createComposer
);
router.get("/:id", composersCtrl.getOneComposer);
router.get("/", composersCtrl.getAllComposers);
router.delete("/:id", auth as any, composersCtrl.deleteComposer);

export default router;
