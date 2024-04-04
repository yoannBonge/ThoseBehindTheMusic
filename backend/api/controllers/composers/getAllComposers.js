const Composer = require("../../../models/Composer");

const getAllComposers = (req, res) => {
  Composer.find()
    .then((composers) => {
      console.log("Compositeurs récupérés avec succès");
      res.status(200).json(composers);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des compositeurs :", error);
      res.status(400).json({ error });
    });
};

module.exports = getAllComposers;
