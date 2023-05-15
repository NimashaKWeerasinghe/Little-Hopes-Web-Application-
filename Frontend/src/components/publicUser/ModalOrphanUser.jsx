import React from "react";

import { Modal, Header, Image, Button } from "semantic-ui-react";
import "./publicUserCSS/modalOrphanUser.css";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "../../firebase";

import { collection, addDoc } from "firebase/firestore";

const ModalOrphanUser = ({
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
  const [sponserTIme, setsponserTIme] = useState();

  const handleSposer = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "sponserships"), {
        sponserTime: sponserTIme,
        orphanName: fullName,
        //orphanId
        orphangeEmail: "nima@gmail.com",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      className="popupUser"
    >
      <div className="overlay"></div>
      <div className="content">
        <h1 className="sponsorTitle">Sponsor a Child</h1>
        <div>
          <img src={img} alt="image" className="childimgUser" />
          <form onSubmit={handleSposer}>
            <div className="tableSponser">
              <TableContainer component={Paper}>
                <Table aria-label="simple table" className="donationTable">
                  <TableBody style={{ color: "white" }}>
                    <TableRow
                      className="sponserUserrow"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Full Name
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {fullName}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      className="sponserUserrow"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Orphan ID
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        O1223
                      </TableCell>
                    </TableRow>
                    <TableRow
                      className="sponserUserrow"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Category of Sponsorship
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        <select
                          name="sponserTIme"
                          id="sponserTIme"
                          className="inputDonation"
                          onChange={(e) => setsponserTIme(e.target.value)}
                          value={sponserTIme}
                        >
                          <option value="1">Select Sponsor Time Period</option>
                          <option value="3 Months">3 Months - LKR 20000</option>
                          <option value="6 Months">6 Months - LKR 40000</option>
                          <option value="12 Months">
                            12 Months - LKR 80000
                          </option>
                        </select>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="userSponserButton">
              <button className="sponserButton">Sponser</button>
            </div>
          </form>
        </div>

        <div className="cancelSponser">
          <button className="cancelbutSponsor" onClick={() => setOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalOrphanUser;
