import multer from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

const multerUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    if (file.fieldname === "picture" || file.fieldname === "bio") {
      cb(null, true);
    } else {
      const error: any = new Error("Unexpected field");
      error.code = "LIMIT_UNEXPECTED_FILE";
      cb(error, false);
    }
  },
}).fields([
  { name: "picture", maxCount: 1 },
  { name: "bio", maxCount: 1 },
]);

export default multerUpload;
