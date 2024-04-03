const express = require("express");
const auth = require("../../middleware/auth");
const multerUpload = require("../../middleware/multer-config");
const sharpTreatment = require("../../middleware/sharp-config");
const createComposer = require("../controllers/composers/createComposer");
const getAllComposers = require("../controllers/composers/getAllComposers");
const getComposerById = require("../controllers/composers/getComposerById");
const updateComposer = require("../controllers/composers/updateComposer");

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
