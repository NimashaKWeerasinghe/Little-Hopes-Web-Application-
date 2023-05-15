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
import "./orphanageCss/addEditOrphan.css";
import AuthDetails from "../auth/AuthDetails";
import SideBar from "../items/adminSideBar/SideBar";

const initialState = {
  fullName: "",
  fName: "",
  mName: "",
  odob: "",
  oGender: "",
  oStatus: "",
  oEducation: "",
  oHealth: "",
  oOther: "",
};

const AddEditOrphans = () => {
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
    fullName,
    fName,
    mName,
    odob,
    oGender,
    oStatus,
    oEducation,
    oHealth,
    oOther,
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
    const docRef = doc(db, "orphans", id);
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
              img: downloadURL,
              orphangeEmail: "abc@gmail.com",
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
        await addDoc(collection(db, "orphans"), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "orphans", id), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    }

    navigate("/Orphans");
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <SideBar />
        <div className="MainDash">
          <Grid
            className="grid"
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
                        {id ? "Update Orphan" : "Add Orphan"}
                      </h2>

                      <Form onSubmit={handleSubmit}>
                        Full Name:
                        <input
                          label="Full Name"
                          name="fullName"
                          onChange={handleChange}
                          value={fullName}
                          className="formfill"
                          placeholder="Full Name"
                          autoFocus
                        />
                        Name of Father:
                        <input
                          label=""
                          name="fName"
                          onChange={handleChange}
                          value={fName}
                          className="formfill"
                        />
                        Name of Mother:
                        <input
                          label="Mothers Name"
                          name="mName"
                          onChange={handleChange}
                          value={mName}
                          className="formfill"
                        />
                        Date Of Birth:
                        <input
                          label="Date Of Birth"
                          name="odob"
                          onChange={handleChange}
                          value={odob}
                          className="formfill"
                        />
                        Gender:
                        <input
                          label="Gender"
                          name="oGender"
                          onChange={handleChange}
                          value={oGender}
                          className="formfill"
                        />
                        <div className="rightForm">
                          Status:
                          <input
                            label="Status"
                            name="oStatus"
                            onChange={handleChange}
                            className="formfill"
                            value={oStatus}
                          />
                          Education:
                          <input
                            label="Education"
                            name="oEducation"
                            onChange={handleChange}
                            className="formfill"
                            value={oEducation}
                          />
                          Health:
                          <input
                            label="Health"
                            name="oHealth"
                            onChange={handleChange}
                            value={oHealth}
                            className="formfill"
                          />
                          Other:
                          <input
                            label="Other"
                            name="oOther"
                            onChange={handleChange}
                            value={oOther}
                            className="formfill"
                          />
                          Iamge:
                          <input
                            label="Iamge"
                            type="file"
                            accept="image/png,image/jpg,image/jpeg"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="formfillBut"
                          />
                        </div>
                        <button type="submit" className="addOrphanBut">
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

export default AddEditOrphans;
