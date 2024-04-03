import multer from "multer";

const storage = multer.memoryStorage();

const multerUpload = multer(req, res, next, {
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: () => {
    if (file.fieldname === "picture" || file.fieldname === "bio") {
      cb(null, true);
    } else {
      const error = new Error("Unexpected field");
      error.code = "LIMIT_UNEXPECTED_FILE";
      cb(error, false);
    }
  },
}).fields([
  { name: "picture", maxCount: 1 },
  { name: "bio", maxCount: 1 },
]);

export default multerUpload;
