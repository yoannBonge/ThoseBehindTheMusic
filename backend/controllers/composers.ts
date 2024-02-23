import Composer from "../models/Composer";
import fs from "fs";
import { Request, Response } from "express";
import { SharpRequest } from "../middleware/sharp-config";
// import path from "path";

export const createComposer = (req: any, res: Response) => {
  //On transforme les données du corps de la requête en objet JSON dont on pourra extraire les données
  //facilement.
  const composerObject = JSON.parse(req.body.composer);
  //On crée donc un objet "artiste" en récupérant toutes les infos du corps de la requête, et on crée
  //une URL pour l'image chargée.
  const composer = new Composer({
    ...composerObject,
    picture: `${req.protocol}://${req.get("host")}/images/${req.sharpFileName}`,
  });

  composer
    .save()
    .then(() => {
      res.status(201).json({ message: "Artiste enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

export const getOneComposer = (req: Request, res: Response) => {
  Composer.findOne({ _id: req.params.id })
    .then((composer) => res.status(200).json(composer))
    .catch((error) => res.status(404).json({ error }));
};

export const deleteComposer = (req: Request, res: Response) => {
  Composer.findOne({ _id: req.params.id })
    .then((composer) => {
      if (!composer) {
        return res.status(404).json({ message: "Compositeur non trouvé" });
      }

      if (!composer.picture) {
        return res
          .status(400)
          .json({ error: "L'image du compositeur n'est pas valide" });
      }

      const filename = composer.picture.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Composer.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Artiste supprimé !" });
          })
          .catch((error) => res.status(500).json({ error }));
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getAllComposers = (req: Request, res: Response) => {
  Composer.find()
    .then((composers) => res.status(200).json(composers))
    .catch((error) => res.status(400).json({ error }));
};
