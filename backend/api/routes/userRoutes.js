const express = require("express");
const login = require("../controllers/user/login");
const logout = require("../controllers/user/logout");
const signup = require("../controllers/user/signup");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
