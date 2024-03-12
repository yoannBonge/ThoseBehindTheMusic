import express, { Router } from "express";
import auth from "../middleware/auth";
import multerUpload from "../middleware/multer-config";
import sharpTreatment from "../middleware/sharp-config";
import * as composersCtrl from "../controllers/composers";

const router: Router = express.Router();

router.post(
  "/add-composer",
  auth as any,
  multerUpload as any,
  sharpTreatment as any,
  composersCtrl.createComposer
);
router.get("/get-composers", composersCtrl.getAllComposers);
router.get("/:id", composersCtrl.getComposerById);
router.put(
  "/update-composer/:id",
  auth as any,
  multerUpload as any,
  sharpTreatment as any,
  composersCtrl.updateComposer
);

export default router;
