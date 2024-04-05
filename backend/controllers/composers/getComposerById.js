const Composer = require("../../models/Composer");

const getComposerById = async (req, res) => {
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

module.exports = getComposerById;
