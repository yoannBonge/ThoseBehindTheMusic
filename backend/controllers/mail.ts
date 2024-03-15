import { Request, Response } from "express";
import { sendMail } from "../services/mail";

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { contributorName, emailContent } = req.body;

    // Vérifiez ici les données reçues du formulaire
    if (!emailContent) {
      return res.status(400).json({
        error: "Le contenu de l'e-mail est vide.",
      });
    }

    // Envoyez l'e-mail en utilisant la fonction qui se trouve dans /services/mail.ts
    await sendMail(
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
