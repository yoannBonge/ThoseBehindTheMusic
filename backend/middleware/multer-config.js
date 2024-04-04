const multer = require("multer");

const storage = multer.memoryStorage();

const multerUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
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

module.exports = multerUpload;
