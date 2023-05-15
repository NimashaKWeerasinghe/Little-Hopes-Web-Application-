import { React, useEffect, useState } from "react";
import { db, storage, auth } from "../../firebase";
import CountUp from "react-countup";

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
  updateDoc,
  getCountFromServer,
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

  const [dataDisplay, setDataDusplay] = useState("");
  const [countPrediction, setCountPrediction] = useState("");

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
    //getDonations1();
    updatedonate();

    calculations();
  }, [donations]);

  const calculations = async () => {
    const coll = collection(db, "donations");
    const snapshot = await getCountFromServer(coll);
    console.log("count: ", snapshot.data().count);
    const dataDisplay1 = snapshot.data().count;
    setDataDusplay(dataDisplay1);

    const countPredictRef = query(
      collection(db, "donations"),
      where("predictDonation", "==", "will give donation.")
    );

    const countPredict = await getCountFromServer(countPredictRef);

    const countDisplay1 = countPredict.data().count;
    setCountPrediction(countDisplay1);
  };

  const updatedonate = async () => {
    const DonatoinRef1 = query(
      collection(db, "donations"),
      where("predictDonation", "==", "")
    );

    const x = await getDocs(DonatoinRef1);
    const y = x.docs;
    // console.log("mmmmm", y[1].id);
    if (y.length == 0) {
      console.log("Completed");
    } else {
      for (let i = 0; i < y.length; i++) {
        const oneDonationRef = doc(db, "donations", y[i].id);
        onSnapshot(oneDonationRef, (val) => {
          const x = val.data();
          console.log("eeee", x.dAge);

          var getAge = x.dAge;
          var getWorkClass = x.dWorkClass;
          var getEdu = x.dEdu;
          var getMarital = x.dMaritalStatus;
          var getRelation = x.dRelationship;
          var getSex = x.dGender;
          var getWorkHours = x.dHours;

          var numWorkClass = 0;
          var numEdu = 0;
          var numMarital = 1;
          var numRelation = 1;
          var numSex = 1;

          //Workclass
          if (getWorkClass == "Private") {
            numWorkClass = 0;
          }
          if (getWorkClass == "Self-employment") {
            numWorkClass = 1;
          }
          if (getWorkClass == "Goverment") {
            numWorkClass = 2;
          }
          if (getWorkClass == "Semi-government") {
            numWorkClass = 3;
          }
          if (getWorkClass == "Never-worked") {
            numWorkClass = 4;
          }

          //Education
          if (getEdu == "5th") {
            numEdu = 0;
          }
          if (getEdu == "11th") {
            numEdu = 1;
          }
          if (getEdu == "Bachelors") {
            numEdu = 2;
          }
          if (getEdu == "Masters") {
            numEdu = 3;
          }
          if (getEdu == "Doctorate") {
            numEdu = 4;
          }

          //Marital status
          if (getMarital == "Never-married") {
            numMarital = 1;
          }
          if (getMarital == "Married") {
            numMarital = 2;
          }
          if (getMarital == "Divorced") {
            numMarital = 3;
          }
          if (getMarital == "Widowed") {
            numMarital = 4;
          }

          //Relationship
          if (getRelation == "Wife") {
            numRelation = 1;
          }
          if (getRelation == "Husband") {
            numRelation = 2;
          }
          if (getRelation == "Own-child") {
            numRelation = 3;
          }
          if (getRelation == "Not-in-family") {
            numRelation = 4;
          }
          if (getRelation == "Unmarried") {
            numRelation = 5;
          }
          if (getRelation == "Other-relative") {
            numRelation = 6;
          }

          //Sex
          if (getSex == "Female") {
            numSex = 1;
          }
          if (getSex == "Male") {
            numSex = 0;
          }

          const intAge = parseInt(getAge);
          const floatAge = intAge.toFixed(2);

          const intWorkHours = parseInt(getWorkHours);
          const floatWorkHours = intWorkHours.toFixed(2);

          const intMarital = parseInt(numMarital);

          const intWorkClass = parseInt(numWorkClass);

          const intEdu = parseInt(numEdu);

          const intRelation = parseInt(numRelation);

          const intSex = parseInt(numSex);

          setAge(floatAge);
          setWorkclass(intWorkClass);
          setEducation(intEdu);
          setMarital_status(intMarital);
          setRelationship(intRelation);
          setSex(intSex);
          setHours_per_week(floatWorkHours);
          console.log("yyyy", floatWorkHours);

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
            .then(async (res) => {
              const data = res.data.data;
              const parameters = JSON.stringify(params);
              const msg = `Prediction: ${data.prediction}\nInterpretation: ${data.interpretation}\nParameters: ${parameters}`;
              console.log(msg);

              try {
                const examcollref = doc(db, "donations", y[i].id);
                updateDoc(examcollref, {
                  predictDonation: data.interpretation,
                });
              } catch (error) {
                console.log(error);
              }
            })
            .catch((error) => console.log(`Error: ${error.message}`));
        });
      }
    }
  };

  const getDonations = async () => {
    const DonatoinRef = query(
      collection(db, "donations"),
      where("orphangeEmail", "==", "nima@gmail.com")
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
          <div className="totalDonation">
            <h2>Total Number of Donations</h2>
            <div className="totalNumber">
              <CountUp delay={0.6} end={26} duration={0.3} />
            </div>
          </div>

          <div className="futureDonation">
            <h2>Predicted Donations</h2>
            <div className="totalPredction">
              <CountUp delay={0.6} end={20} duration={0.3} />
            </div>
          </div>

          <div className="addDonation">
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
                    {/* <TableCell className="donationCell">No</TableCell> */}
                    <TableCell
                      align="center"
                      style={{ width: "120px", textAlign: "center" }}
                      className="donationCell"
                    >
                      Name
                    </TableCell>
                    <TableCell align="left">Age</TableCell>
                    <TableCell align="left">Gender</TableCell>
                    <TableCell align="left">Marital Status</TableCell>
                    <TableCell align="left">Ocuupation</TableCell>
                    <TableCell align="left">Work Class</TableCell>
                    <TableCell align="left">Donated Amount</TableCell>
                    <TableCell align="left">Donated Date</TableCell>
                    <TableCell align="left" style={{ textAlign: "center" }}>
                      Prediction
                    </TableCell>
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
                      {/* <TableCell component="th" scope="row">
                        {no + 1}
                      </TableCell> */}
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
                      <TableCell
                        align="left"
                        className="donationCell"
                        style={{ width: "120px", textAlign: "center" }}
                      >
                        {row.predictDonation}
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
