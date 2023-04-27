import { CLIENT_ID } from "../config/Config";
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams, useNavigate } from "react-router-dom";
import "./publicUserCSS/checkout.css";

const Checkout = () => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const { id } = useParams();

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: id,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
      console.log("Order successful . Your order id is--", orderID);
    }
  }, [success]);

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
      <div>
        <div className="banner">
          <div className="navbar">
            <div className="checkoutLogo"></div>
            <ul className="checkoutNav">
              <li>
                <a href="#">Home</a>
              </li>
            </ul>
          </div>
          <div className="product-info">
            <div className="donationCard">
              <div className="progress-checkout-container">
                <div className="progress-step-container">
                  <div className="step-check"></div>
                  <span className="step-title">Required Detalis</span>
                </div>
                <div className="progress-step-container">
                  <div className="step-check"></div>
                  <span className="step-title">Confirm Donation</span>
                </div>
                <div className="progress-step-container">
                  <div className="step-check"></div>
                  <span className="step-title">Donation is Successfull</span>
                </div>
              </div>
              <div className="donateimg"></div>
              <div className="product-text">
                <h1>Amount Of Donation</h1>
              </div>
              <div className="product-price-btn">
                <p className="priceAmount">LKR {id}</p>
                <br />
                <br />

                <button
                  className="buy-btn"
                  type="submit"
                  onClick={() => setShow(true)}
                >
                  Donate now
                </button>
              </div>
              <br></br>
              {show ? (
                <PayPalButtons
                  className="Paypal"
                  style={{ layout: "vertical" }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;
