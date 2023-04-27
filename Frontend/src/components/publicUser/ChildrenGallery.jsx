import React from "react";
import "./publicUserCSS/childrenGallery.css";

import { useParams, useNavigate } from "react-router-dom";

import ModalOrphanUser from "./ModalOrphanUser";

//import firebase from "firebase";
import { useState, useEffect } from "react";

import { db } from "../../firebase";

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
  const [open, setOpen] = useState(false);
  const [orphans, setOrphans] = useState([]);
  const [orphan, setOrphan] = useState({});
  const [data, setData] = useState(initialState);
  const [dataAdoption, setDataAdoption] = useState(initialStateAdoption);
  const { dName, dAge, dJob, dAmount, dDate } = data;
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
  const [dWorkClass, setWorkclass] = useState();
  const [dEdu, setEdu] = useState();
  const [dGender, setGender] = useState();
  const navigate = useNavigate();
  const { oid } = useParams();

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
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDonation = async (e) => {
    e.preventDefault();
    // console.log(dMaritalStatus);

    try {
      await addDoc(collection(db, "donations"), {
        ...data,
        orphangeEmail: "nima@gmail.com",
        dMaritalStatus: dMaritalStatus,
        dEdu: dEdu,
        dRelationship: dRelationship,
        dWorkClass: dWorkClass,
        dGender: dGender,
      });
    } catch (error) {
      console.log(error);
    }

    navigate(`/CheckOut/${dAmount}`);
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
    <div className="banner">
      <div className="navbar">
        <div className="logoImgGallery"></div>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#gallery">Children Gallery</a>
          </li>
          <li>
            <a href="#donation">Donation</a>
          </li>
          <li>
            <a href="#">Adoption</a>
          </li>
        </ul>
      </div>
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
                        placeholder="Full Name"
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
                        placeholder="Age"
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
                        placeholder="Occupation"
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
                        placeholder="Amount of Donation"
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
                        placeholder="Date"
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
                        <select
                          name="marital"
                          id="marital"
                          className="inputDonation"
                          onChange={(e) => setMarital(e.target.value)}
                          value={dMaritalStatus}
                        >
                          <option value="1">Select Marital Status</option>
                          <option value="Never-married">Never-married</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </select>
                      </div>
                    </div>
                    <div className="donationdetalis">
                      <div className="donation-box">
                        <select
                          name="workclass"
                          id="workclass"
                          className="inputDonation"
                          onChange={(e) => setWorkclass(e.target.value)}
                          value={dWorkClass}
                        >
                          <option value="1">Select Work Class</option>
                          <option value="Private">Private</option>
                          <option value="Government">Government</option>
                          <option value="Semi-government">
                            Semi-government
                          </option>
                          <option value="Self-employment">
                            Self-employment
                          </option>
                          <option value="Never-worked">Never-worked</option>
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
                          <option value="1">Select Education Status</option>
                          <option value="5th">5th-11th</option>
                          <option value="11th">11th-13th</option>
                          <option value="Bachelors">Bachelors</option>
                          <option value="Masters">Masters</option>
                          <option value="Doctorate">Doctorate</option>
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
                          <option value="1">Select Relationship Status</option>
                          <option value="Not-in-family">Not-in-family</option>
                          <option value="Own-child">Own-child</option>
                          <option value="Wife">Wife</option>
                          <option value="Husband">Husband</option>
                          <option value="Unmarried">Unmarried</option>
                          <option value="Other-relative">Other-relative</option>
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
                          <option value="1">Select Gender</option>
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
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
                          placeholder="Full Name - Female Parent"
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
                          placeholder="Age - Female Parent"
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
                          placeholder="Email - Female Parent"
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
                          placeholder="Phone Number - Female Parent"
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
                          placeholder="Occupation - Female Parent"
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
                          placeholder="Annual Income - Female Parent"
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
                            placeholder="Full Name - Male Parent"
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
                            placeholder="Age - Male Parent"
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
                            placeholder="Email - Male Parent"
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
                            placeholder="Phone Number - Male Parent"
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
                            placeholder="Occupation - Male Parent"
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
                            placeholder="Annual Income - Male Parent"
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
