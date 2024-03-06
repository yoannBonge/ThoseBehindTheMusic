import Composer from "../models/Composer";
import fs from "fs";
import { Request, Response } from "express";
// import path from "path";

export const createComposer = (req: any, res: Response) => {
  const composerObject = req.body;

  //On crée donc un objet "artiste" en récupérant toutes les infos du corps de la requête, on crée
  //une URL pour l'image chargée.
  const pictureUrl = req.sharpFileName
    ? `${req.protocol}://${req.get("host")}/images/${req.sharpFileName}`
    : null;
  console.log("URL de l'image : ", pictureUrl);

  const composer = new Composer({
    ...composerObject,
    pictureUrl: pictureUrl,
    picture: req.files.picture[0].buffer,
    bio: req.files.bio[0].buffer,
  });
  // console.log("Objet composer à enregistrer : ", composer);
  composer
    .save()
    .then(() => {
      res.status(201).json({ message: "Artiste enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// export const createComposer = async (req: any, res: Response) => {
//   try {
//     const composerObject = JSON.parse(req.body.composer);
//     const composer = new Composer({
//       ...composerObject,
//       picture: `${req.protocol}://${req.get("host")}/images/${
//         req.sharpFileName
//       }`,
//     });

//     const savedComposer = await composer.save();

//     res
//       .status(201)
//       .json({ message: "Artiste enregistré !", composer: savedComposer });
//   } catch (error) {
//     console.error("Erreur lors de la création du compositeur :", error);
//     res
//       .status(500)
//       .json({
//         error: "Une erreur s'est produite lors de la création du compositeur",
//       });
//   }
// };

export const getOneComposer = (req: Request, res: Response) => {
  Composer.findOne({ _id: req.params.id })
    .then((composer) => res.status(200).json(composer))
    .catch((error) => res.status(404).json({ error }));
};

// export const deleteComposer = (req: Request, res: Response) => {
//   Composer.findOne({ _id: req.params.id })
//     .then((composer) => {
//       if (!composer) {
//         return res.status(404).json({ message: "Compositeur non trouvé" });
//       }

//       if (!composer.picture) {
//         return res
//           .status(400)
//           .json({ error: "L'image du compositeur n'est pas valide" });
//       }

//       const filename = composer.picture.split("/images/")[1];
//       fs.unlink(`images/${filename}`, () => {
//         Composer.deleteOne({ _id: req.params.id })
//           .then(() => {
//             res.status(200).json({ message: "Artiste supprimé !" });
//           })
//           .catch((error) => res.status(500).json({ error }));
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
// };

export const getAllComposers = (req: Request, res: Response) => {
  Composer.find()
    .then((composers) => res.status(200).json(composers))
    .catch((error) => res.status(400).json({ error }));
};
