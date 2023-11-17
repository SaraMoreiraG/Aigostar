import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const StripePayment = ({ paymentInfo, setNewOrder }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
	setLoadingPayment(true)
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch(
        "http://localhost:3001/stripeRoutes/create-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_STRIPE_KEY}`,
          },
          body: JSON.stringify({ paymentInfo }),
        }
      );

      const data = await response.json();
      console.log("Server Response:", data);

      // Confirm the payment on the client-side
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: paymentInfo.email,
            },
          },
        }
      );

      if (error) {
        console.error("Payment confirmation error:", error);
        setPaymentError(error.message);
		setLoadingPayment(false)
      } else {
        console.log("Payment Intent:", paymentIntent);
        setPaymentError("");
        setNewOrder((prevOrder) => ({
          ...prevOrder,
          stripeId: paymentIntent.id,
        }));
		setLoadingPayment(false)
        // Payment successful, you can redirect or show a success message
      }
    } catch (error) {
      console.error("Error:", error);
      setPaymentError("*Error al procesar el pago");
		setLoadingPayment(false)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="payment-container p-3 col-md-9 col-12">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
        <div className="d-flex justify-content-center col-md-3 col-12 ps-3 bg-danger">
          <button type="submit" disabled={!stripe} className="start-buy p-3">
            Pagar
          </button>
        </div>
		{loadingPayment && (
        <div>
          <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <span>Procesando pago...</span>
        </div>
		)}
      </div>
      {paymentError && <div style={{ color: "red" }}>{paymentError}</div>}
    </form>
  );
};

export default StripePayment;
