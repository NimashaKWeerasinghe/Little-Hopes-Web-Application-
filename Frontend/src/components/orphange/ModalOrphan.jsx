import React from "react";
import { Modal, Header, Image, Button } from "semantic-ui-react";
import "./orphanageCss/modelOrphan.css";

const ModalOrphan = ({
  open,
  setOpen,
  img,
  fullName,
  fName,
  mName,
  oEducation,
  oGender,
  oHealth,
  oOther,
  oStatus,
  odob,
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
        <div>
          {" "}
          <h2>Orphan Details</h2>
        </div>
        <div>
          <img src={img} alt="image" className="childimg" />
          <h3>{fullName}</h3>
          <hr />
          <div className="personal">
            <table>
              <tr>
                <td>Name of Father :</td>
                <td>{fName} </td>
                <td>Name of Mother :</td>
                <td>{mName}</td>
              </tr>
              <tr>
                <td>Date of Birth :</td>
                <td>{odob}</td>
                <td>Gender :</td>
                <td>{oGender}</td>
              </tr>
              <tr>
                <td>Status :</td>
                <td>{oStatus}</td>
                <td>Education :</td>
                <td>{oEducation}</td>
              </tr>
              <tr>
                <td>Health :</td>
                <td>{oHealth}</td>
                <td>Other :</td>
                <td>{oOther}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="buttons">
          <button className="cancelbut" onClick={() => setOpen(false)}>
            Cancel
          </button>

          <button className="deletebut" onClick={() => handleDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalOrphan;
