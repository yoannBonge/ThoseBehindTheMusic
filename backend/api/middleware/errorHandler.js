const errorHandler = (req, res, next) => {
  console.error("Une erreur s'est produite :", err);

  res.status(500).json({
    error: "Une erreur s'est produite sur le serveur.",
  });
};

export default errorHandler;
