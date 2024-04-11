const sharp = require("sharp");

const sharpTreatment = async (req, res, next) => {
  const { picture, bio } = req.files;

  if (!picture || !Array.isArray(picture) || !picture[0]?.buffer) {
    console.log("Aucun fichier 'picture' trouvé dans la requête");
    return next();
  }

  if (!bio || !Array.isArray(bio) || !bio[0]?.buffer) {
    console.log("Aucun fichier 'bio' trouvé dans la requête");
    req.bioBuffer = null;
  } else {
    const bioBuffer = bio[0].buffer;
    req.bioBuffer = bioBuffer;
  }

  try {
    const pictureBuffer = await sharp(picture[0].buffer)
      .resize(500)
      .webp({ quality: 60 })
      .toBuffer();

    console.log("Image traitée avec succès !");

    req.pictureBuffer = pictureBuffer;

    next();
  } catch (error) {
    console.error("Erreur lors du traitement des images :", error);
    res.status(500).json({ error: "Erreur lors du traitement des images" });
  }
};

module.exports = sharpTreatment;
