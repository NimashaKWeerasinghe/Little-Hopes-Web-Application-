import { React, useEffect, useState } from "react";
import { db, storage, auth } from "../../firebase";

import { Button, Card, Grid, Container, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import SideBar from "../items/adminSideBar/SideBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../items/table/table.css";
import {
  collection,
  onSnapshot,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./orphanageCss/donations.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AuthDetails from "../auth/AuthDetails";
//import ModalDonation from "./Prediction";
import axios from "axios";

const Donations = () => {
  const [authUser, setAuthUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [donation, setDonation] = useState({});
  const no = 0;
  // const emailuser = authUser.email;

  const [age, setAge] = useState("");
  const [workclass, setWorkclass] = useState("");
  const [education, setEducation] = useState("");
  const [marital_status, setMarital_status] = useState("");
  const [relationship, setRelationship] = useState("");
  const [sex, setSex] = useState("");
  const [hours_per_week, setHours_per_week] = useState("");

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

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDonations();
  }, [donations]);

  const getDonations = async () => {
    const DonatoinRef = query(
      collection(db, "donations"),
      where("orphangeEmail", "==", "abc@gmail.com")
    );
    const getAllDonations = () => {
      return getDocs(DonatoinRef);
    };

    const data = await getAllDonations();
    console.log(data.docs);
    setDonations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleModal = async (id) => {
    const docRef = doc(db, "donations", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    console.log(id.dAmount);
    //Workclass
    // if (donations.dWorkClass == "Private") {
    //   setWorkclass(0);
    // }
    // if (donations.dWorkClass == "Self-employment") {
    //   setWorkclass(1);
    // }
    // if (donations.dWorkClass == "Goverment") {
    //   setWorkclass(2);
    // }
    // if (donations.dWorkClass == "Semi-government") {
    //   setWorkclass(3);
    // }
    // if (donations.dWorkClass == "Never-worked") {
    //   setWorkclass(4);
    // }

    // //Education
    // if (donations.dWorkClass == "5th") {
    //   setEducation(0);
    // }
    // if (donations.dWorkClass == "11th") {
    //   setEducation(1);
    // }
    // if (donations.dWorkClass == "Bachelors") {
    //   setEducation(2);
    // }
    // if (donations.dWorkClass == "Masters") {
    //   setEducation(3);
    // }
    // if (donations.dWorkClass == "Never-workedDoctorate") {
    //   setEducation(4);
    // }

    // //Marital status
    // if (donations.dMaritalStatus == "Never-married") {
    //   setMarital_status(1);
    // }
    // if (donations.dMaritalStatus == "Married") {
    //   setMarital_status(2);
    // }
    // if (donations.dMaritalStatus == "Divorced") {
    //   setMarital_status(3);
    // }
    // if (donations.dMaritalStatus == "Widowed") {
    //   setMarital_status(4);
    // }

    // //Relationship
    // if (donations.dWorkClass == "Wife") {
    //   setRelationship(1);
    // }
    // if (donations.dWorkClass == "Husband") {
    //   setRelationship(2);
    // }
    // if (donations.dWorkClass == "Own-child") {
    //   setRelationship(3);
    // }
    // if (donations.dWorkClass == "Not-in-family") {
    //   setRelationship(4);
    // }
    // if (donations.dWorkClass == "Unmarried") {
    //   setRelationship(5);
    // }
    // if (donations.dWorkClass == "Other-relative") {
    //   setRelationship(6);
    // }

    setAge(35.0);
    setWorkclass(1);
    setEducation(1);
    setMarital_status(2);
    setRelationship(1);
    setSex(1);
    setHours_per_week(20.5);
    console.log("hii", marital_status);

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
      .post("http://localhost:8080/predict_donation", params)
      .then((res) => {
        const data = res.data.data;
        const parameters = JSON.stringify(params);
        const msg = `Prediction: ${data.prediction}\nInterpretation: ${data.interpretation}\nParameters: ${parameters}`;
        alert(msg);
      })
      .catch((error) => alert(`Error: ${error.message}`));
  };

  const handleDeleteDonation = async (id) => {
    await deleteDoc(doc(db, "donations", id));
    setDonations(donations.filter((donation) => donation.id !== id));
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <SideBar />
        <div className="MainDash">
          <div className="addOrphan">
            <button className="add" onClick={() => navigate(`/AddDonations`)}>
              Add Donation
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
                    <TableCell align="left">Gender</TableCell>
                    <TableCell align="left">Marital Status</TableCell>
                    <TableCell align="left">Ocuupation</TableCell>
                    <TableCell align="left">Work Class</TableCell>
                    <TableCell align="left">Donated Amount</TableCell>
                    <TableCell align="left">Donated Date</TableCell>
                    <TableCell align="left">Update</TableCell>
                    <TableCell align="left">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ color: "white" }}>
                  {donations.map((row) => (
                    <TableRow
                      className="donationRow"
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {no}
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {row.dName}
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {row.dAge}
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {row.dGender}
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {row.dMaritalStatus}
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {row.dJob}
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {row.dWorkClass}
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {row.dAmount}
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {row.dDate}
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
                          className="donationUpdate"
                          onClick={() => handleModal(row.id)}
                        >
                          Predict
                        </button>
                      </TableCell>
                      <TableCell align="left" className="donationCell">
                        {" "}
                        <button
                          className="donationdelette"
                          onClick={() => handleDeleteDonation(row.id)}
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

export default Donations;
