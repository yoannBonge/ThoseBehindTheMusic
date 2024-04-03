import express from "express";
import auth from "../../middleware/auth";
import multerUpload from "../../middleware/multer-config";
import sharpTreatment from "../../middleware/sharp-config";
import { createComposer } from "../controllers/composers/createComposer";
import { getAllComposers } from "../controllers/composers/getAllComposers";
import { getComposerById } from "../controllers/composers/getComposerById";
import { updateComposer } from "../controllers/composers/updateComposer";

const router = express.Router();

router.post(
  "/add-composer",
  auth,
  multerUpload,
  sharpTreatment,
  createComposer
);
router.get("/get-composers", getAllComposers);
router.get("/:id", getComposerById);
router.put(
  "/update-composer/:id",
  auth,
  multerUpload,
  sharpTreatment,
  updateComposer
);

export default router;
