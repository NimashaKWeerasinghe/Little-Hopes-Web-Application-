import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { db, storage, auth } from "../../firebase";
import { useParams, useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  Timestamp,
  addDoc,
  getDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AuthDetails from "../auth/AuthDetails";
import SideBar from "../items/adminSideBar/SideBar";

const initialState = {
  childID: "",
  childName: "",
  childAge: "",
  sName: "",
  sTime: "",
  sPhone: "",
};

const AddEditSponserships = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
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

  const [data, setData] = useState(initialState);
  const { childID, childName, childAge, sName, sTime, sPhone } = data;

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const docRef = doc(db, "sponserships", id);
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
    setIsSubmit(true);

    if (!id) {
      try {
        await addDoc(collection(db, "sponserships"), {
          ...data,
          orphangeEmail: authUser.email,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "sponserships", id), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    }

    navigate("/Sponserships");
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
                  {isSubmit ? (
                    <Loader active inline="centered" size="huge" />
                  ) : (
                    <>
                      <h2 className="orphanCap">
                        {id ? "Update Donation" : "Add Donation"}
                      </h2>

                      <Form onSubmit={handleSubmit}>
                        Child ID
                        <input
                          label="Child ID"
                          className="formfill"
                          name="childID"
                          onChange={handleChange}
                          value={childID}
                          autoFocus
                        />
                        Child Name
                        <input
                          label="Child Name"
                          className="formfill"
                          name="childName"
                          onChange={handleChange}
                          value={childName}
                          autoFocus
                        />
                        Child Age
                        <input
                          label="Child Age"
                          className="formfill"
                          name="childAge"
                          onChange={handleChange}
                          value={childAge}
                          autoFocus
                        />
                        Name of Sponsor
                        <input
                          label="Name of Sponsor"
                          className="formfill"
                          name="sName"
                          onChange={handleChange}
                          value={sName}
                          autoFocus
                        />
                        Phone Number of Spnsor
                        <input
                          label="Phone Number of Sponsor"
                          className="formfill"
                          name="sPhone"
                          onChange={handleChange}
                          value={sPhone}
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="addOrphanBut"
                          style={{ marginTop: "150px" }}
                        >
                          Submit
                        </button>
                      </Form>
                    </>
                  )}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default AddEditSponserships;
