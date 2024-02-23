import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import path from "path";

interface MulterFile extends Express.Multer.File {}

export interface SharpRequest extends Request {
  file?: MulterFile;
  sharpFileName?: string;
}

const sharpTreatment = (
  req: SharpRequest,
  res: Response,
  next: NextFunction
) => {
  // On vérifie si la requête contient un fichier et si ce dernier a un contenu binaire
  if (req.file && req.file.buffer) {
    const name = req.file.originalname.split(" ").join("_");
    const extension = path.extname(name);
    const fileName = name.replace(extension, "");
    const outputFileName = `${fileName}_${Date.now()}.webp`;
    const outputPath = path.join(__dirname, "..", "images", outputFileName);

    sharp(req.file.buffer)
      .toFormat("webp", { quality: 50 })
      .resize(300, 500, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(outputPath, (error) => {
        if (error) {
          console.error("Sharp error:", error);
          return res
            .status(500)
            .json({ error: "Erreur lors de l'optimisation de l'image." });
        }

        // On stocke le nom du fichier généré par Sharp dans req.sharpFileName (pour l'utiliser
        // dans les contrôleurs)
        req.sharpFileName = outputFileName;

        next();
      });
  } else {
    console.log("Image non modifiée");
    next();
  }
};

export default sharpTreatment;
