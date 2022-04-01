const express = require("express");
const { createCheckoutSession } = require("../controller/stripeController");

const router = express.Router();

// router.route("/create-checkout-session").get(createCheckoutSession);

module.exports = router;
