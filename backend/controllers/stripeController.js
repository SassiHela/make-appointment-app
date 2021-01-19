const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// @desc   Pay service
// @route  POST /api/create-checkout-session
const stripePayAppointment = asyncHandler(async (req, res) => {
  const { user, _id } = req.body;
  let success_url = "";
  let cancel_url = "";

  if (process.env.NODE_ENV === "production") {
    success_url = ``;
    cancel_url = ``;
  } else {
    success_url = `http://localhost:3000/appointment/${_id}/pay`;
    cancel_url = `http://localhost:3000/appointment/${_id}/cancel`;
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Waste Removal and Recycling Services",
          },
          unit_amount: 6000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: success_url,
    cancel_url: cancel_url,
    customer_email: user.email,
  });
  res.json({ id: session.id });
});

const stripeGetPublicKey = (req, res) =>
  res.send(process.env.STRIPE_PUBLIC_KEY);

module.exports = { stripePayAppointment, stripeGetPublicKey };
