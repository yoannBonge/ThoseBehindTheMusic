import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import path from "path";

interface MulterFile extends Express.Multer.File {}

export interface SharpRequest extends Request {
  files: {
    picture?: MulterFile[];
    bio?: MulterFile[];
  };
  sharpFileName?: string;
}

const sharpTreatment = (
  req: SharpRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    picture,
    bio,
  }: { picture?: Express.Multer.File[]; bio?: Express.Multer.File[] } =
    req.files;
  console.log("Picture:", picture);
  console.log("Bio:", bio);

  if (!picture || !Array.isArray(picture) || !picture[0]?.buffer) {
    console.log("Aucun fichier 'picture' trouvé dans la requête");
    return next();
  }

  if (!bio || !Array.isArray(bio) || !bio[0]?.buffer) {
    console.log("Aucun fichier 'bio' trouvé dans la requête");
    return next();
  }

  const bioFileName = path.parse(bio[0].originalname).name;
  const pictureBuffer = picture[0].buffer;
  const name = bioFileName;
  const extension = path.extname(picture[0].originalname);
  const fileName = name.replace(extension, "");
  const outputFileName = `${fileName}.webp`;
  const outputPath = path.join(__dirname, "..", "images", outputFileName);
  console.log(outputPath);

  sharp(pictureBuffer)
    .resize(500)
    .toFormat("webp", { quality: 50 })
    .toFile(outputPath, (error) => {
      if (error) {
        console.error("Sharp error:", error);
        return res
          .status(500)
          .json({ error: "Erreur lors de l'optimisation de l'image." });
      }

      req.sharpFileName = outputFileName;
      console.log("Image formatée avec succès !");
      next();
    });
};

export default sharpTreatment;
