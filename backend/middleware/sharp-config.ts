import { Request, Response, NextFunction } from "express";
import sharp from "sharp";

interface MulterFile extends Express.Multer.File {}

export interface SharpRequest extends Request {
  files: {
    picture?: MulterFile[];
    bio?: MulterFile[];
  };
  sharpFileName?: string;
  pictureBuffer?: Buffer;
  bioBuffer?: Buffer;
}

const sharpTreatment = async (
  req: SharpRequest,
  res: Response,
  next: NextFunction
) => {
  const { picture, bio }: { picture?: MulterFile[]; bio?: MulterFile[] } =
    req.files;

  if (!picture || !Array.isArray(picture) || !picture[0]?.buffer) {
    console.log("Aucun fichier 'picture' trouvé dans la requête");
    return next();
  }

  if (!bio || !Array.isArray(bio) || !bio[0]?.buffer) {
    console.log("Aucun fichier 'bio' trouvé dans la requête");
    return next();
  }

  try {
    const pictureBuffer = await sharp(picture[0].buffer)
      .resize(500)
      .toFormat("webp")
      .toBuffer();

    console.log("Image traitée avec succès !");

    const bioBuffer = bio[0].buffer;

    req.pictureBuffer = pictureBuffer;
    req.bioBuffer = bioBuffer;

    next();
  } catch (error) {
    console.error("Erreur lors du traitement des images :", error);
    res.status(500).json({ error: "Erreur lors du traitement des images" });
  }
};

export default sharpTreatment;
