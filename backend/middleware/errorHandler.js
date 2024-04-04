const errorHandler = () => {
  console.error("Une erreur s'est produite :", err);

  res.status(500).json({
    error: "Une erreur s'est produite sur le serveur.",
  });
};

module.exports = errorHandler;
