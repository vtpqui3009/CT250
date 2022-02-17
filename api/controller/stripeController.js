const stripe = require("stripe")(
  "sk_test_51KRqpcL6Cna0WfUD4smBLejfR0GfbAB2247IF9D5XtepIKTXtzEoTkHCP0eYLIXBnPGw4pgPXLYRjnWIH0iKgJuE00z283u1DO"
);
exports.stripePayment = async (req, res, next) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};
