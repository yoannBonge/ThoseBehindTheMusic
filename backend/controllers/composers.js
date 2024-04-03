import Composer from "../models/Composer";

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

export const getAllComposers = (req, res) => {
  Composer.find()
    .then((composers) => {
      console.log("Compositeurs récupérés avec succès");
      const composersJSON = composers.map((composer) => composer.toJSON());
      res.status(200).send(composersJSON);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des compositeurs :", error);
      res.status(400).json({ error });
    });
};

export const getComposerById = async (req, res) => {
  const id = req.params.id;

  try {
    const composer = await Composer.findById(id);
    if (!composer) {
      return res.status(404).json({ message: "Compositeur non trouvé" });
    }

    res.status(200).json(composer);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du compositeur",
      error,
    });
  }
};

export const updateComposer = async (req, res) => {
  const id = req.params.id;

  try {
    const composer = await Composer.findById(id);
    if (!composer) {
      return res.status(404).json({ message: "Compositeur non trouvé" });
    }

    const updatedComposer = await Composer.findByIdAndUpdate(
      id,
      {
        ...req.body,
        picture: req.pictureBuffer,
        bio: req.bioBuffer,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Compositeur mis à jour", updatedComposer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du compositeur", error });
  }
};
