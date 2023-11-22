import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const StripePayment = ({
  newOrder,
  setNewOrder,
  setPaymentView,
  setCongratsView
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [paymentError, setPaymentError] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
	const updateOrderInDatabase = async () => {
		try {
		  const response = await fetch(
			process.env.REACT_APP_API_URL + "/awsRoutes/add",
			{
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify(newOrder),
			}
		  );

		  const data = await response.json();
		  console.log("Server Response (Update Order):", data);

		  // If the update was successful
		  setPaymentError("");
		  setLoadingPayment(false);
		  setCongratsView(true);
		  setPaymentView(false);
		} catch (error) {
		  console.error("Error updating order:", error);
		  setPaymentError("Ha habido un error con su pedido, póngase en contacto con: aigostarcooking@gmail.com");
		  setLoadingPayment(false);
		}
	  };

    if (paymentConfirmed) {
      updateOrderInDatabase();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentConfirmed]);

  const createPaymentIntent = async () => {
	try {
	  const response = await fetch(
		process.env.REACT_APP_API_URL + "/stripeRoutes/create-payment",
		{
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.REACT_APP_STRIPE_KEY}`,
		  },
		  body: JSON.stringify({ email: newOrder.email, total: newOrder.total }),
		}
	  );

	  const data = await response.json();
	  console.log("Server Response (Create Payment):", data);

	  if (!data.clientSecret) {
		throw new Error("Failed to create payment intent");
	  }

	  return data.clientSecret;
	} catch (error) {
	  console.error("Error creating payment intent:", error.message);
	  throw error;
	}
  };

  const confirmPaymentIntent = async (clientSecret) => {
	try {
	  const { paymentIntent, error } = await stripe.confirmCardPayment(
		clientSecret,
		{
		  payment_method: {
			card: elements.getElement(CardElement),
			billing_details: { email: newOrder.email },
		  },
		}
	  );

	  if (error) {
		throw new Error(`Payment confirmation error: ${error.message}`);
	  } else {
		setNewOrder((prevOrder) => ({
		  ...prevOrder,
		  stripeId: paymentIntent.id,
		  status: 'paid'
		}));
		setPaymentConfirmed(true);
	  }

	  console.log("Payment Intent:", paymentIntent);
	  return paymentIntent;
	} catch (error) {
	  console.error("Error confirming payment intent:", error.message);
	  throw error;
	}
  };

  const handleSubmit = async (event) => {
	event.preventDefault();
	setLoadingPayment(true);

	if (!stripe || !elements) {
	  // Stripe.js has not yet loaded.
	  return;
	}

	try {
	  const clientSecret = await createPaymentIntent();
	  await confirmPaymentIntent(clientSecret);
	} catch (error) {
	  console.error("Error:", error.message);
	  setPaymentError("*Error al procesar el pago");
	} finally {
	  setLoadingPayment(false);
	}
  };



  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="payment-container p-3 col-md-9 col-12">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
        <div className="d-flex justify-content-center col-md-3 col-12 ps-3">
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
