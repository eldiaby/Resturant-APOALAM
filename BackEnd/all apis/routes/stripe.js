import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51Q3WDVRo7iossoEVhaKcRmTp9xsWMvkqlu1Z6E7kzLavIGD3dq5kVcrIwm73WdUhCLNepb3LUzFt0Eh5fM3IDAb700Qkl8nyPP"
);

import express from "express";
// const app = express();

// Serving static files from the 'public' directory
// app.use(express.static('public'));

// Define the domain where your app is running
const YOUR_DOMAIN = "http://localhost:5173";

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  console.log("ascdacwefwefw", req.body.items);
  const line_items = req.body.items.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.mealId.name,
          images: [item.mealId.imageUrl],
          description: item.mealId.description,
          metadata: {
            id: item.mealId._id,
          },
        },
        unit_amount: item.mealId.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    phone_number_collection: {
      enabled: true,
    },
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success-true`,
    cancel_url: `${YOUR_DOMAIN}/canceled-true`,
  });

  res.send({ url: session.url });
});

export default router;
