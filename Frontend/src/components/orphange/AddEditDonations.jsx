import React, { useState, useEffect } from "react";
import { Form, Grid, Loader } from "semantic-ui-react";
import { db } from "../../firebase";
import { useParams, useNavigate } from "react-router-dom";

import {
  collection,
  Timestamp,
  addDoc,
  getDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";

import SideBar from "../items/adminSideBar/SideBar";

const initialState = {
  dName: "",
  dAge: "",
  dGender: "",
  dMaritalStatus: "",
  dJob: "",
  dWorkClass: "",
  dAmount: "",
  dDate: "",
};

const AddEditDonations = ({ addDonation }) => {
  const [data, setData] = useState(initialState);
  const {
    dName,
    dAge,
    dGender,
    dMaritalStatus,
    dJob,
    dWorkClass,
    dAmount,
    dDate,
  } = data;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const docRef = doc(db, "donations", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addDonation({
      dName,
      dAge,
      dGender,
      dMaritalStatus,
      dJob,
      dMaritalStatus,
      dWorkClass,
      dAmount,
      dDate,
    });

    if (!id) {
      try {
        await addDoc(collection(db, "donations"), {
          ...data,
          orphangeEmail: "abc@gmail.com",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "donations", id), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    }

    navigate("/Donations");
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <SideBar />
        <div className="MainDash">
          <Grid
            centered
            verticalAlign="middle"
            columns={3}
            style={{ height: "80vh" }}
          >
            <Grid.Row>
              <Grid.Column textAlign="center">
                <div>
                  <Loader active inline="centered" size="huge" />

                  <>
                    <h2 className="orphanCap">
                      {id ? "Update Donation" : "Add Donation"}
                    </h2>

                    <Form onSubmit={handleSubmit}>
                      Full Name
                      <input
                        label="Full Name"
                        className="formfill"
                        name="dName"
                        onChange={handleChange}
                        value={dName}
                        autoFocus
                        placeholder="Full Name"
                      />
                      Age
                      <input
                        label="Age"
                        className="formfill"
                        name="dAge"
                        onChange={handleChange}
                        value={dAge}
                        placeholder="Age"
                        autoFocus
                      />
                      Gender
                      <input
                        label="Gender"
                        placeholder="Gender"
                        className="formfill"
                        name="dGender"
                        onChange={handleChange}
                        value={dGender}
                        autoFocus
                      />
                      Marital Status
                      <input
                        label="Marital Status"
                        placeholder="Marital Status"
                        className="formfill"
                        name="dMaritalStatus"
                        onChange={handleChange}
                        value={dMaritalStatus}
                        autoFocus
                      />
                      Occupation
                      <input
                        placeholder="Ocuupation"
                        className="formfill"
                        name="dJob"
                        onChange={handleChange}
                        value={dJob}
                        autoFocus
                      />
                      <div className="rightForm">
                        Work_Class
                        <input
                          placeholder="Work Class"
                          className="formfill"
                          name="dWorkClass"
                          onChange={handleChange}
                          value={dWorkClass}
                          autoFocus
                        />
                        Donated_Amount
                        <input
                          placeholder="Donated Amount"
                          className="formfill"
                          name="dAmount"
                          onChange={handleChange}
                          value={dAmount}
                          autoFocus
                        />
                        Donated_Date
                        <input
                          placeholder="Donated Date"
                          className="formfill"
                          name="dDate"
                          onChange={handleChange}
                          value={dDate}
                          autoFocus
                        />
                      </div>
                      <button
                        type="submit"
                        className="addOrphanBut"
                        style={{ marginTop: "150px" }}
                      >
                        Submit
                      </button>
                    </Form>
                  </>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default AddEditDonations;
