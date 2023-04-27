import React from "react";
//import "./payment_modal.css";

var md5 = require("md5");

const PaymentModal = () => {
  const merchant_id = "1222739";
  const order_id = "12345";
  const amount = "1000.00";
  const currency = "LKR";
  const merchant_secret = "Mjk0NjA3MzYzMDE5OTk4ODkwNTExMzg5MDQ4NzU1ODc4ODY2NTQ";

  const hash = md5(
    merchant_id +
      order_id +
      amount +
      currency +
      md5(merchant_secret).toUpperCase()
  ).toUpperCase();
  console.log(hash);
  // Put the payment variables here
  var payment = {
    sandbox: true,
    merchant_id: "1222739", // Replace your Merchant ID
    return_url: "http://localhost:3000/PaymentModal", // Important
    cancel_url: "http://localhost:3000/PaymentModal", // Important
    notify_url: "http://sample.com/notify",
    order_id: "ItemNo12345",
    items: "Donation",
    amount: "1000.00",
    currency: "LKR",
    hash: hash, // *Replace with generated hash retrieved from backend
    first_name: "Saman",
    last_name: "Perera",
    email: "samanp@gmail.com",
    phone: "0771234567",
    address: "No.1, Galle Road",
    city: "Colombo",
    country: "Sri Lanka",
    delivery_address: "No. 46, Galle road, Kalutara South",
    delivery_city: "Kalutara",
    delivery_country: "Sri Lanka",
    custom_1: "",
    custom_2: "",
  };

  // Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    //Note: validate the payment and show success or failure page to the customer
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:" + error);
  };

  function pay() {
    window.payhere.startPayment(payment);
  }

  return <button onClick={pay}>Pay with Payhere</button>;
};

export default PaymentModal;
