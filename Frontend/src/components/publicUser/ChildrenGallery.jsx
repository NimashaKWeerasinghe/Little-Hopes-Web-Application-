import React, { useRef } from "react";
import "./publicUserCSS/childrenGallery.css";
import { FaBars, FaTimes } from "react-icons/fa";

import { useParams, useNavigate } from "react-router-dom";

import ModalOrphanUser from "./ModalOrphanUser";

//import firebase from "firebase";
import { useState, useEffect } from "react";

import { db } from "../../firebase";

import axios from "axios";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const initialState = {
  dName: "",
  dAge: "",
  dJob: "",
  dAmount: "",
  dDate: "",
  dPhone: "",
  dHours: "",
};
const initialStateAdoption = {
  fName: "",
  fAge: "",
  fEmail: "",
  fPhone: "",
  fJob: "",
  fIncome: "",

  mName: "",
  mAge: "",
  mEmail: "",
  mPhone: "",
  mJob: "",
  mIncome: "",
};

const ChildrenGallery = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const [open, setOpen] = useState(false);
  const [orphans, setOrphans] = useState([]);
  const [orphan, setOrphan] = useState({});
  const [dataI, setData] = useState(initialState);
  const [dataAdoption, setDataAdoption] = useState(initialStateAdoption);
  const { dName, dAge, dJob, dAmount, dDate, dPhone, dHours } = dataI;
  const {
    fName,
    fAge,
    fEmail,
    fPhone,
    fJob,
    fIncome,
    mName,
    mAge,
    mEmail,
    mPhone,
    mJob,
    mIncome,
  } = dataAdoption;
  const [dMaritalStatus, setMarital] = useState();
  const [dRelationship, setRelation] = useState();
  const [dWorkClass, setdWorkclass] = useState();
  const [dEdu, setEdu] = useState();
  const [dGender, setGender] = useState();
  const navigate = useNavigate();
  const { oid } = useParams();
  const futurePrediction = "";

  const [age, setAge] = useState("");
  const [workclass, setWorkclass] = useState("");
  const [education, setEducation] = useState("");
  const [marital_status, setMarital_status] = useState("");
  const [relationship, setRelationship] = useState("");
  const [sex, setSex] = useState("");
  const [hours_per_week, setHours_per_week] = useState("");

  const handleModal = (item) => {
    setOpen(true);
    setOrphan(item);
  };

  const [books, setBooks] = useState([]); // Store Data
  useEffect(() => {
    getBooks();
  }, []);

  const [orphange, setOrphange] = useState([]); // Store Data
  useEffect(() => {
    getOrphange();
  }, []);

  const handleDonationChange = (e) => {
    setData({ ...dataI, [e.target.name]: e.target.value });
  };

  const handleDonation = async (e) => {
    e.preventDefault();
    // console.log(dMaritalStatus);
    const convertAge = parseInt(dAge);
    const conveertHours = parseInt(dHours);
    const FloatAge = convertAge.toFixed(2);
    const FloatHours = conveertHours.toFixed(2);
    const convertMarital = parseInt(dMaritalStatus);
    const convertWork = parseInt(dWorkClass);
    const convertEdu = parseInt(dEdu);
    const convertRelation = parseInt(dRelationship);
    const convertsex = parseInt(dGender);
    console.log(convertEdu);

    if (dMaritalStatus == "1") {
      setMarital("Never-Married");
    }
    if (dMaritalStatus == "2") {
      setMarital("Married");
    }
    if (dMaritalStatus == "3") {
      setMarital("Divorced");
    }
    if (dMaritalStatus == "4") {
      setMarital("Widowed");
    }

    if (dMaritalStatus == "0") {
      setEdu("5th-11th");
    }
    if (dMaritalStatus == "1") {
      setEdu("11th-13th");
    }
    if (dMaritalStatus == "2") {
      setEdu("Bachelors");
    }
    if (dMaritalStatus == "3") {
      setEdu("Masters");
    }
    if (dMaritalStatus == "4") {
      setEdu("Doctorate");
    }

    if (dRelationship == "1") {
      setRelation("Wife");
    }
    if (dMaritalStatus == "2") {
      setRelation("Husband");
    }
    if (dMaritalStatus == "3") {
      setRelation("Own-child");
    }
    if (dMaritalStatus == "4") {
      setRelation("Not-in-family");
    }
    if (dMaritalStatus == "5") {
      setRelation("Unmarried");
    }
    if (dMaritalStatus == "6") {
      setRelation("Other-relative");
    }

    if (dWorkClass == "0") {
      setdWorkclass("Private");
    }
    if (dMaritalStatus == "1") {
      setdWorkclass("Self-employee");
    }
    if (dMaritalStatus == "2") {
      setdWorkclass("Government");
    }
    if (dMaritalStatus == "") {
      setdWorkclass("Semi-Government");
    }
    if (dMaritalStatus == "4") {
      setdWorkclass("Never-worked");
    }

    if (dGender == "1") {
      setGender("Female");
    }
    if (dGender == "0") {
      setGender("Male");
    }

    setAge(FloatAge);
    setWorkclass(convertWork);
    setEducation(convertEdu);
    setMarital_status(convertMarital);
    setRelationship(convertRelation);
    setSex(convertsex);
    setHours_per_week(FloatHours);
    console.log(FloatHours);

    //Marital status

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
      .then(async (res) => {
        const data = res.data.data;
        const parameters = JSON.stringify(params);
        const msg = `Prediction: ${data.prediction}\nInterpretation: ${data.interpretation}\nParameters: ${parameters}`;
        console.log(msg);
        //console.log(data.interpretation);
        console.log(dMaritalStatus);
        try {
          await addDoc(collection(db, "donations"), {
            ...dataI,
            orphangeEmail: "nima@gmail.com",
            dMaritalStatus: dMaritalStatus,
            dEdu: dEdu,
            dRelationship: dRelationship,
            dWorkClass: dWorkClass,
            dGender: dGender,
            predictDonation: data.interpretation,
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => console.log(`Error: ${error.message}`));

    // try {
    //   await addDoc(collection(db, "donations"), {
    //     ...data,
    //     orphangeEmail: "nima@gmail.com",
    //     dMaritalStatus: dMaritalStatus,
    //     dEdu: dEdu,
    //     dRelationship: dRelationship,
    //     dWorkClass: dWorkClass,
    //     dGender: dGender,
    //     predictDonation: data.interpretation,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    //navigate(`/CheckOut/${dAmount}`);
  };

  //Adoption
  const handleAdoptionChange = (e) => {
    setDataAdoption({ ...dataAdoption, [e.target.name]: e.target.value });
  };

  const handleAdoption = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "adoptions"), {
        ...dataAdoption,
        orphangeEmail: "nima@gmail.com",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Function for fetching all docs for children gallery
  const getBooks = async () => {
    const OrphansRef = collection(db, "orphans");
    const getAllBooks = () => {
      return getDocs(OrphansRef);
    };

    const data = await getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Function for fetching all docs for particular orphange
  const getOrphange = async () => {
    const OrphansRef = query(
      collection(db, "orphangaeLocation"),
      where("orphangeEmail", "==", oid)
    );
    const getAll = () => {
      return getDocs(OrphansRef);
    };

    const dataO = await getAll();
    console.log(dataO.docs);
    setOrphange(dataO.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div>
      <header>
        <div className="logoImg"></div>
        <nav ref={navRef}>
          <a href="/#">HOME</a>
          <a href="/#">OUR CHILDREN</a>
          <a href="/#">DONATION</a>
          <a href="/#">ADOPTION</a>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
      <div className="homeOrphange">
        <div className="orphangeHomeImageCover">
          <div className="orphanageShapeCover"></div>
          <div className="orphangeimageCover"></div>
        </div>
        <div className="orphangeWelcome">
          {orphange.map((orphange, index) => {
            return (
              <>
                <div className="orphangeWelcomeSen">Little Hope is Waiting</div>
                <div className="nameOfOrphange"> {orphange.orphangeName} </div>
                <div className="emailOfOrphange">
                  {" "}
                  {orphange.orphangeEmail}{" "}
                </div>
                <div className="addressOfOrphange">
                  {orphange.orphanageAddress}{" "}
                </div>
              </>
            );
          })}
          <div className="orphanCountHome">
            <div className="iconOrphan"></div>
            <div className="countdiv">Orphans - 15 </div>
          </div>
        </div>
      </div>

      <div className="gallery" id="gallery">
        <div className="galleryTitle">
          <h2 className="galleryTitleH2">Children Gallery</h2>
        </div>{" "}
        <div className="slide-container">
          <div className="slide-content">
            <div className="card-wrapper">
              {books.map((doc, index) => {
                return (
                  <div className="card" key={doc.id}>
                    <div className="image-content">
                      <span className="overlay"></span>
                      <div className="card-image">
                        <img
                          src="../images/child.jpg"
                          alt=""
                          className="card-img"
                        />
                      </div>
                    </div>
                    <div className="card-content">
                      <h2 className="name">{doc.fullName}</h2>
                      <p className="description">{doc.oGender}</p>
                      <p className="description">10/10/2005</p>
                      <button
                        className="buttonSponser"
                        onClick={() => handleModal(doc)}
                      >
                        {" "}
                        {doc.oStatus}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {open && (
              <ModalOrphanUser open={open} setOpen={setOpen} {...orphan} />
            )}
            <div className="donationSection" id="donation">
              <div className="galleryTitle">
                <h2 className="galleryTitleH2">Give Donation</h2>
              </div>{" "}
              <div className="donationimage">
                <div className="donationShape"></div>
                <div className="donationImageImg"></div>
              </div>
              <div className="donationForm">
                <form onSubmit={handleDonation}>
                  <div className="donationdetalis">
                    <div className="donation-box">
                      <input
                        type="text"
                        placeholder=" Full Name"
                        className="inputDonation"
                        name="dName"
                        onChange={handleDonationChange}
                        value={dName}
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="donationdetalis">
                    <div className="donation-box">
                      <input
                        type="text"
                        placeholder=" Age"
                        required
                        name="dAge"
                        className="inputDonation"
                        onChange={handleDonationChange}
                        value={dAge}
                      ></input>
                    </div>
                  </div>

                  <div className="donationdetalis">
                    <div className="donation-box">
                      <input
                        type="text"
                        placeholder=" Phone Number"
                        className="inputDonation"
                        name="dPhone"
                        onChange={handleDonationChange}
                        value={dPhone}
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="donationdetalis">
                    <div className="donation-box">
                      <input
                        type="text"
                        placeholder=" Occupation"
                        required
                        className="inputDonation"
                        onChange={handleDonationChange}
                        value={dJob}
                        name="dJob"
                      ></input>
                    </div>
                  </div>
                  <div className="donationdetalis">
                    <div className="donation-box">
                      <input
                        type="text"
                        placeholder=" Amount of Donation"
                        required
                        className="inputDonation"
                        onChange={handleDonationChange}
                        value={dAmount}
                        name="dAmount"
                      ></input>
                    </div>
                  </div>
                  <div className="donationdetalis">
                    <div className="donation-box">
                      <input
                        type="date"
                        placeholder=" Date"
                        required
                        className="inputDonation"
                        onChange={handleDonationChange}
                        value={dDate}
                        name="dDate"
                      ></input>
                    </div>
                  </div>

                  <div className="donationRight">
                    <div className="donationdetalis">
                      <div className="donation-box">
                        <input
                          type="text"
                          placeholder=" Working Hours Per Week"
                          className="inputDonation"
                          name="dHours"
                          onChange={handleDonationChange}
                          value={dHours}
                          required
                        ></input>
                      </div>
                    </div>

                    <div className="donationdetalis">
                      <div className="donation-box">
                        <select
                          name="marital"
                          id="marital"
                          className="inputDonation"
                          onChange={(e) => setMarital(e.target.value)}
                          value={dMaritalStatus}
                        >
                          <option value="Marital Status">
                            Select Marital Status
                          </option>
                          <option value="1">Never-married</option>
                          <option value="2">Married</option>
                          <option value="3">Divorced</option>
                          <option value="4">Widowed</option>
                        </select>
                      </div>
                    </div>
                    <div className="donationdetalis">
                      <div className="donation-box">
                        <select
                          name="workclass"
                          id="workclass"
                          className="inputDonation"
                          onChange={(e) => setdWorkclass(e.target.value)}
                          value={dWorkClass}
                        >
                          <option value="WorkClass">Select Work Class</option>
                          <option value="0">Private</option>
                          <option value="2">Government</option>
                          <option value="3">Semi-government</option>
                          <option value="1">Self-employment</option>
                          <option value="4">Never-worked</option>
                        </select>
                      </div>
                    </div>

                    <div className="donationdetalis">
                      <div className="donation-box">
                        <select
                          name="education"
                          id="education"
                          className="inputDonation"
                          onChange={(e) => setEdu(e.target.value)}
                          value={dEdu}
                        >
                          <option value="Education">
                            Select Education Status
                          </option>
                          <option value="0">5th-11th</option>
                          <option value="1">11th-13th</option>
                          <option value="2">Bachelors</option>
                          <option value="3">Masters</option>
                          <option value="4">Doctorate</option>
                        </select>
                      </div>
                    </div>

                    <div className="donationdetalis">
                      <div className="donation-box">
                        <select
                          name="relationship"
                          id="relationship"
                          className="inputDonation"
                          onChange={(e) => setRelation(e.target.value)}
                          value={dRelationship}
                        >
                          <option value="Relationship">
                            Select Relationship Status
                          </option>
                          <option value="4">Not-in-family</option>
                          <option value="3">Own-child</option>
                          <option value="1">Wife</option>
                          <option value="2">Husband</option>
                          <option value="5">Unmarried</option>
                          <option value="6">Other-relative</option>
                        </select>
                      </div>
                    </div>
                    <div className="donationdetalis">
                      <div className="donation-box">
                        <select
                          name="gender"
                          id="gender"
                          className="inputDonation"
                          onChange={(e) => setGender(e.target.value)}
                          value={dGender}
                        >
                          <option value="Gender">Select Gender</option>
                          <option value="0">Female</option>
                          <option value="1">Male</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="bottonDonation">
                    <button>Donate</button>
                  </div>
                </form>
              </div>
            </div>

            <div className="adoptionSection">
              <div className="galleryTitle">
                <h2 className="galleryTitleH2">Apply Adoption</h2>
                <div className="adoptionimg">
                  <div className="adoptionShape"></div>
                  <div className="adoptionHomeImage"></div>
                </div>
                <div className="adoptionForm">
                  <form onSubmit={handleAdoption}>
                    <div className="donationdetalis">
                      <div className="donation-box">
                        <input
                          type="text"
                          placeholder=" Full Name - Female Parent"
                          className="inputDonation"
                          name="fName"
                          onChange={handleAdoptionChange}
                          value={fName}
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="donationdetalis">
                      <div className="donation-box">
                        <input
                          type="text"
                          placeholder=" Age - Female Parent"
                          required
                          name="fAge"
                          className="inputDonation"
                          onChange={handleAdoptionChange}
                          value={fAge}
                        ></input>
                      </div>
                    </div>
                    <div className="donationdetalis">
                      <div className="donation-box">
                        <input
                          type="email"
                          placeholder=" Email - Female Parent"
                          required
                          className="inputDonation"
                          onChange={handleAdoptionChange}
                          value={fEmail}
                          name="fEmail"
                        ></input>
                      </div>
                    </div>
                    <div className="donationdetalis">
                      <div className="donation-box">
                        <input
                          type="text"
                          placeholder=" Phone Number - Female Parent"
                          required
                          className="inputDonation"
                          onChange={handleAdoptionChange}
                          value={fPhone}
                          name="fPhone"
                        ></input>
                      </div>
                    </div>
                    <div className="donationdetalis">
                      <div className="donation-box">
                        <input
                          type="text"
                          placeholder=" Occupation - Female Parent"
                          required
                          className="inputDonation"
                          onChange={handleAdoptionChange}
                          value={fJob}
                          name="fJob"
                        ></input>
                      </div>
                    </div>
                    <div className="donationdetalis">
                      <div className="donation-box">
                        <input
                          type="text"
                          placeholder=" Annual Income - Female Parent"
                          required
                          className="inputDonation"
                          onChange={handleAdoptionChange}
                          value={fIncome}
                          name="fIncome"
                        ></input>
                      </div>
                    </div>
                    <div className="adoptionRight">
                      <div className="donationdetalis">
                        <div className="donation-box">
                          <input
                            type="text"
                            placeholder=" Full Name - Male Parent"
                            className="inputDonation"
                            name="mName"
                            onChange={handleAdoptionChange}
                            value={mName}
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="donationdetalis">
                        <div className="donation-box">
                          <input
                            type="text"
                            placeholder=" Age - Male Parent"
                            required
                            name="mAge"
                            className="inputDonation"
                            onChange={handleAdoptionChange}
                            value={mAge}
                          ></input>
                        </div>
                      </div>
                      <div className="donationdetalis">
                        <div className="donation-box">
                          <input
                            type="email"
                            placeholder=" Email - Male Parent"
                            required
                            className="inputDonation"
                            onChange={handleAdoptionChange}
                            value={mEmail}
                            name="mEmail"
                          ></input>
                        </div>
                      </div>
                      <div className="donationdetalis">
                        <div className="donation-box">
                          <input
                            type="text"
                            placeholder=" Phone Number - Male Parent"
                            required
                            className="inputDonation"
                            onChange={handleAdoptionChange}
                            value={mPhone}
                            name="mPhone"
                          ></input>
                        </div>
                      </div>
                      <div className="donationdetalis">
                        <div className="donation-box">
                          <input
                            type="text"
                            placeholder=" Occupation - Male Parent"
                            required
                            className="inputDonation"
                            onChange={handleAdoptionChange}
                            value={mJob}
                            name="mJob"
                          ></input>
                        </div>
                      </div>
                      <div className="donationdetalis">
                        <div className="donation-box">
                          <input
                            type="text"
                            placeholder=" Annual Income - Male Parent"
                            required
                            className="inputDonation"
                            onChange={handleAdoptionChange}
                            value={mIncome}
                            name="mIncome"
                          ></input>
                        </div>
                      </div>
                    </div>

                    <div className="bottonDonation">
                      <button>Apply for Adoption</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChildrenGallery;
