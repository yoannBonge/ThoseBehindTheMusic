const mailConfig = require("../../services/mailConfig");

const sendEmail = async (req, res) => {
  try {
    const { contributorName, emailContent } = req.body;

    if (!emailContent) {
      return res.status(400).json({
        error: "Le contenu de l'e-mail est vide.",
      });
    }

    // Appel de mailConfig avec les paramètres nécessaires
    await mailConfig(
      contributorName,
      "Nouvelle suggestion de compositeur",
      emailContent
    );

    res.status(200).json({ message: "E-mail envoyé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de l'envoi de l'e-mail.",
    });
  }
};

module.exports = sendEmail;
