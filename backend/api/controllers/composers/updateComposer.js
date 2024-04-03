import Composer from "../../../models/Composer";

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
