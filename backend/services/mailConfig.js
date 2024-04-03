import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Fonction pour envoyer un e-mail
export const mailConfig = async (to, subject, html) => {
  try {
    // Création d'un transporteur (SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ADMIN,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Configuration de l'e-mail
    const mailOptions = {
      from: process.env.GMAIL_ADMIN,
      to: process.env.GMAIL_ADMIN,
      subject: "Suggestion de compositeur",
      html: html,
    };

    // Envoi de l'e-mail
    await transporter.sendMail(mailOptions);

    console.log("E-mail envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    throw new Error("Une erreur s'est produite lors de l'envoi de l'e-mail.");
  }
};
