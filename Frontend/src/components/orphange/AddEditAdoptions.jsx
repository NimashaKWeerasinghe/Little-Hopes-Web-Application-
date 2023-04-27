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
  fName: "",
  mName: "",
  fdob: "",
  mdob: "",
  fJob: "",
  mJob: "",
  fIncome: "",
  mIncome: "",
  fnic: "",
  mnic: "",
  fPhone: "",
  mPhone: "",
  fEmail: "",
  mEmail: "",
};

const AddEditAdoptions = () => {
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
  const {
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
  } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const docRef = doc(db, "adoptions", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Paused");
              break;
            case "running":
              console.log("Running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({
              ...prev,
              reqDoc: downloadURL,
              orphangeEmail: authUser.email,
            }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (!id) {
      try {
        await addDoc(collection(db, "adoptions"), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "adoptions", id), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    }

    navigate("/Adoptions");
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
            style={{ height: "100vh" }}
          >
            <Grid.Row>
              <Grid.Column textAlign="center">
                <div>
                  {isSubmit ? (
                    <Loader active inline="centered" size="huge" />
                  ) : (
                    <>
                      <h2 className="orphanCap">
                        {id ? "Update Adoption" : "Add Adoption"}
                      </h2>

                      <Form onSubmit={handleSubmit}>
                        Female Name
                        <input
                          label="Mother Name"
                          className="formfill"
                          name="mName"
                          onChange={handleChange}
                          value={mName}
                          autoFocus
                        />
                        Male Name
                        <input
                          label="Father Name"
                          className="formfill"
                          name="fName"
                          onChange={handleChange}
                          value={fName}
                          autoFocus
                        />
                        Female Date of Birth
                        <input
                          label="Female Date of Birth"
                          className="formfill"
                          name="fdob"
                          onChange={handleChange}
                          value={fdob}
                          autoFocus
                        />
                        Male Date Of Birth
                        <input
                          label="Male Date Of Birth"
                          className="formfill"
                          name="mdob"
                          onChange={handleChange}
                          value={mdob}
                          autoFocus
                        />
                        Female Occupation
                        <input
                          label="Female Occupation"
                          className="formfill"
                          name="fJob"
                          onChange={handleChange}
                          value={fJob}
                          autoFocus
                        />
                        Male Occupation
                        <input
                          label="Male Occupation"
                          className="formfill"
                          name="mJob"
                          onChange={handleChange}
                          value={mJob}
                          autoFocus
                        />
                        Female_Income
                        <input
                          label="Female Income"
                          className="formfill"
                          name="fIncome"
                          onChange={handleChange}
                          value={fIncome}
                          autoFocus
                        />
                        Male_Income
                        <input
                          label="Male Income"
                          className="formfill"
                          name="mIncome"
                          onChange={handleChange}
                          value={mIncome}
                          autoFocus
                        />
                        <div
                          className="rightForm"
                          style={{ marginTop: "-510px" }}
                        >
                          Female_NIC
                          <input
                            label="Female NIC"
                            className="formfill"
                            name="fnic"
                            onChange={handleChange}
                            value={fnic}
                            autoFocus
                          />
                          Male_NIC
                          <input
                            label="Male NIC"
                            className="formfill"
                            name="mnic"
                            onChange={handleChange}
                            value={mnic}
                            autoFocus
                          />
                          Female_Phone
                          <input
                            label="Female Phone"
                            className="formfill"
                            name="fPhone"
                            onChange={handleChange}
                            value={fPhone}
                            autoFocus
                          />
                          Male_Phone
                          <input
                            label="Male Phone"
                            className="formfill"
                            name="mPhone"
                            onChange={handleChange}
                            value={mPhone}
                            autoFocus
                          />
                          Female_Email
                          <input
                            label="Female Email"
                            className="formfill"
                            name="fEmail"
                            onChange={handleChange}
                            value={fEmail}
                            autoFocus
                          />
                          Male_Email
                          <input
                            label="Male Email"
                            className="formfill"
                            name="mnic"
                            onChange={handleChange}
                            value={mnic}
                            autoFocus
                          />
                          Required_Document
                          <input
                            label="Required Document"
                            type="file"
                            className="formfillBut"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </div>
                        <button
                          type="submit"
                          className="addOrphanBut"
                          style={{ marginTop: "100px" }}
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

export default AddEditAdoptions;
