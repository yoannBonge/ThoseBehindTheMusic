import express from "express";
import * as composersCtrl from "../controllers/composers";
import auth from "../middleware/auth";
import multerUpload from "../middleware/multer-config";
import sharpTreatment from "../middleware/sharp-config";

const router = express.Router();

router.post(
  "/add-composer",
  auth,
  multerUpload,
  sharpTreatment,
  composersCtrl.createComposer
);
router.get("/get-composers", composersCtrl.getAllComposers);
router.get("/:id", composersCtrl.getComposerById);
router.put(
  "/update-composer/:id",
  auth,
  multerUpload,
  sharpTreatment,
  composersCtrl.updateComposer
);

export default router;
