const express = require("express");
const auth = require("../../middleware/auth");
const sendEmail = require("../controllers/mail/sendEmail");

const router = express.Router();

router.post("/suggest-composer", auth, sendEmail);

module.exports = router;
