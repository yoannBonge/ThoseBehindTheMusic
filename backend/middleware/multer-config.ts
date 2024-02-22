import multer from "multer";

const storage = multer.memoryStorage();
const multerUpload = multer({ storage: storage }).single("image");

export default multerUpload;
