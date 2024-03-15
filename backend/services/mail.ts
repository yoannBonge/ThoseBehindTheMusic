import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Fonction pour envoyer un e-mail
export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    // Création d'un transporteur (SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ADMIN as string,
        pass: process.env.GMAIL_PASSWORD as string,
      },
    });

    // Configuration de l'e-mail
    const mailOptions = {
      from: process.env.GMAIL_ADMIN as string,
      to: process.env.GMAIL_ADMIN as string,
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
