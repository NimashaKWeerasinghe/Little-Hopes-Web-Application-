/**import React from "react";
import { useState } from "react";
import axios from "axios";

const Prediction = () => {
  const params = {
    age,
    workclass,
    education,
    marital_status,
    relationship,
    sex,
    hours_per_week,
  };

  axios
    .post("http://localhost:8000/predict_donation", params)
    .then((res) => {
      const data = res.data.data;
      const parameters = JSON.stringify(params);
      const msg = `Prediction: ${data.prediction}\nInterpretation: ${data.interpretation}\nParameters: ${parameters}`;
      alert(msg);
    })
    .catch((error) => alert(`Error: ${error.message}`));

  return (
    <div
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      className="popup"
    >
      <div className="overlay"></div>
      <div className="content">
        <div> User Details</div>
        <div>
          <div className="personal">
            <h2>{dName}</h2>
            <p className="personalInfo"> Age: {dAge}</p>
            <p className="personalInfo"> Gender : {dGender}</p>
            <p className="personalInfo"> Marital Status : {dMaritalStatus}</p>
            <p className="personalInfo"> Occupation: {dJob}</p>
            <p className="personalInfo"> Work Class: {dWorkClass}</p>
            <p className="personalInfo"> Donated Amount: {dAmount}</p>
            <p className="personalInfo"> Donated Date: {dDate}</p>
          </div>
        </div>
        <div>
          <button className="cancelbut" onClick={() => setOpen(false)}>
            Cancel
          </button>
          <br /> <br />
        </div>
      </div>
    </div>
  );
};

export default Prediction;
**/
