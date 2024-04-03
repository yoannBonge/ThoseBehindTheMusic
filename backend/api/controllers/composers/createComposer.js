import Composer from "../../../models/Composer";

export const createComposer = (req, res) => {
  const composerObject = req.body;

  // On crée donc un objet "composer" en récupérant toutes les infos du corps de la requête et en ajoutant
  // les fichiers en buffer éventuellement traités.

  const composer = new Composer({
    ...composerObject,
    picture: req.pictureBuffer,
    bio: req.bioBuffer,
  });
  // console.log("Objet composer à enregistrer : ", composer);
  composer
    .save()
    .then(() => {
      res.status(201).json({ message: "Compositeur enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
