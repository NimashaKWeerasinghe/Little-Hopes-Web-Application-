import React from "react";
import { Modal, Header, Image, Button, ModalActions } from "semantic-ui-react";
import "./orphanageCss/modelOrphan.css";

const ModalAdoption = ({
  open,
  setOpen,
  reqDoc,
  fName,
  mName,
  fdob,
  mdob,
  fJob,
  mJob,
  fIncome,
  mIncome,
  fnic,
  mnic,
  fPhone,
  mPhone,
  fEmail,
  mEmail,
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
          <a href={reqDoc}></a>
          <div className="personal">
            <h2></h2>
            <p className="personalInfo"> Father's Name: {fName}</p>
            <p className="personalInfo"> Mother's Name: {fName}</p>
            <p className="personalInfo"> Date of Birth : 10/10/2001</p>
            <p className="personalInfo"> Gender: Female</p>
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

export default ModalAdoption;
