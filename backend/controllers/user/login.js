const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const User = require("../../models/User");

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire email/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire email/mot de passe incorrecte" });
          }

          const isAdmin = user.admin;

          const token = jwt.sign(
            {
              userId: user._id,
              isAdmin: isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "4H" }
          );

          const tokenExpiration = new Date(
            new Date().getTime() + 4 * 60 * 60 * 1000
          ).toISOString();

          res.status(200).json({
            userId: user._id,
            token: token,
            tokenExpiration: tokenExpiration,
            email: user.email,
            isAdmin: isAdmin,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports = login;
