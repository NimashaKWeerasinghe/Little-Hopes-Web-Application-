import React, { useEffect, useState } from "react";
import { db, storage, auth } from "../../firebase";
import { Button, Card, Grid, Container, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import SideBar from "../items/adminSideBar/SideBar";
import {
  collection,
  onSnapshot,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./orphanageCss/orphans.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AuthDetails from "../auth/AuthDetails";
import ModalAdoption from "./ModalAdoption";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Adoptions = () => {
  const [authUser, setAuthUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [adoption, setAdoption] = useState({});
  // const emailuser = authUser.email;

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        console.log(user.email);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAdoptions();
  }, [adoptions]);

  const getAdoptions = async () => {
    const AdoptionRef = query(
      collection(db, "adoptions"),
      where("orphangeEmail", "==", "nima@gmail.com")
    );
    const getAllAdoptions = () => {
      return getDocs(AdoptionRef);
    };

    const data = await getAllAdoptions();
    console.log(data.docs);
    setAdoptions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleModal = (item) => {
    setOpen(true);
    setAdoption(item);
  };

  const handleDelete = async (id) => {
    setOpen(false);
    await deleteDoc(doc(db, "adoptions", id));
    setAdoptions(adoptions.filter((adoption) => adoption.id !== id));
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <SideBar />
        <div className="MainDash">
          <div className="addOrphan">
            <button className="add" onClick={() => navigate(`/AddAdoptions`)}>
              Add Adoption
            </button>
          </div>
          <div className="section">
            <TableContainer
              component={Paper}
              style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
            >
              <Table aria-label="simple table" className="donationTable">
                <TableHead>
                  <TableRow className="donationRow">
                    <TableCell className="donationCell">No</TableCell>
                    <TableCell align="left" className="donationCell">
                      Name
                    </TableCell>
                    <TableCell align="left">Age</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Phone</TableCell>
                    <TableCell align="left">Ocuupation</TableCell>
                    <TableCell align="left">Income</TableCell>

                    <TableCell align="left">Update</TableCell>
                    <TableCell align="left">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ color: "white" }}>
                  {adoptions.map((row) => (
                    <TableRow
                      className="donationRow"
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        1
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {row.fName} {row.mName}
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {row.fAge} {row.mAge}
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {row.fEmail} {row.mEmail}
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {row.fPhone} {row.mPhone}
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {row.fJob} {row.mJob}
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {row.fIncome} {row.mIncome}
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {" "}
                        <button
                          className="donationUpdate"
                          onClick={() => navigate(`/EditDonations/${row.id}`)}
                        >
                          Update
                        </button>
                      </TableCell>

                      <TableCell align="left" className="donationCell">
                        {" "}
                        <button
                          className="donationdelette"
                          onClick={() => handleDelete(row.id)}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adoptions;
