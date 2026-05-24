import express from "express";
import Stripe from "stripe";

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, name } = req.body;

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message: "STRIPE_SECRET_KEY missing. Check server/.env file.",
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const priceInPence = Math.round(Number(amount) * 100);

    if (!priceInPence || priceInPence < 50) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount.",
      });
    }

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: name || "TOPS CHICKEN Order",
            },
            unit_amount: priceInPence,
          },
          quantity: 1,
        },
      ],

      success_url: `${clientUrl}/?payment=success`,
      cancel_url: `${clientUrl}/?payment=cancel`,
    });

    res.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;