import React from "react";
import { Modal, Header, Image, Button } from "semantic-ui-react";
import "./orphanageCss/modelOrphan.css";

const ModalDonation = ({
  open,
  setOpen,

  dName,
  dAge,
  dGender,
  dMaritalStatus,
  dJob,
  dWorkClass,
  dAmount,
  dDate,

  id,
  handleDelete,
}) => {
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
          <button className="deletebut" onClick={() => handleDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDonation;
