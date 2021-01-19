const express = require("express");
const router = express.Router();
const {
  stripePayAppointment,
  stripeGetPublicKey,
} = require("../controllers/stripeController");

router.route("/create-checkout-session").post(stripePayAppointment);
router.route("/config").get(stripeGetPublicKey);

module.exports = router;
