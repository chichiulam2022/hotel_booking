import React from "react";
import "./Cart.css";
// import "bootswatch/dist/lumen/bootstrap.min.css";
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements, } from "@stripe/react-stripe-js";
import Room1 from '../../assets/room1.jpg'

const stripePromise = loadStripe('pk_test_wk6O7Cc5k3McBIG2Hut2irGs');


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: { name: 'Beatrix Kiddo' },
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });
    if (!error) {
      console.log(paymentMethod);
    }
  }

  return (
    <body>
      <div className="checkout-page">
        <form onSubmit={handleSubmit} className="checkout-form card card-body pt-4 ps-4 pe-4" id="checkout-card">
          <img src={Room1} alt='Sample room of selected hotel' className="img-fluid mt-2 mb-5 ps-2 pe-2" />

          <div className="row mb-4">
            <div className="col my-2 ps-4"> 5 days, 4 nights at Toronto Grand Gateway</div>
            <div className="amount col text-center my-2 fw-bold">Total $1,200.00</div>
          </div>

          <div className="form-group ">
            <CardElement className="form-comtrol mt-2 mb-5 pt-4"></CardElement>
          </div>

          <button disabled={!stripe} className="btn btn-danger p-2 mb-5" id="pay-btn"> Reserve Now </button>
        </form>
      </div>
    </body>
  );
};

function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-5 offset-md-3">
            <CheckoutForm></CheckoutForm>
          </div>
        </div>
      </div>

    </Elements>
  )
}

export default Checkout;