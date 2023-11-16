const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST_KEY);
console.log('STRIPE_SECRET_TEST_KEY:', process.env.STRIPE_SECRET_TEST_KEY);

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(bodyParser.json());

router.post('/create-payment', async (req, res) => {
  try {
    // Retrieve the payment information from the request
    const { email, total } = req.body.paymentInfo;

    // Create a PaymentIntent with the amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: 'eur',
      receipt_email: email,
      payment_method_types: ['card']
    });

    // Send the client secret to the client
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing the payment.' });
  }
});

module.exports = router;
