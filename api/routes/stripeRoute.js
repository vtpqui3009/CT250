const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51KRqpcL6Cna0WfUD4smBLejfR0GfbAB2247IF9D5XtepIKTXtzEoTkHCP0eYLIXBnPGw4pgPXLYRjnWIH0iKgJuE00z283u1DO"
);
const { v4: uuidv4 } = require("uuid");
router.post("/", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotency_key = uuidv4();
    const charge = await stripe.charges.create(
      {
        amount: product.price,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotency_key,
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});
module.exports = router;
