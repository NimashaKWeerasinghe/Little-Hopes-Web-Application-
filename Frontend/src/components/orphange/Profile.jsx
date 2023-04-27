import "./orphanageCss/profile.css";
import AuthDetails from "../auth/AuthDetails";

import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { geofire } from "geofire";

import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import Geocode from "react-geocode";
import * as geofirestore from "geofirestore";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

//import { db } from "../../firebase";

const Profile = () => {
  const [loc, setloc] = useState("");
  const [orpanageName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const testing = (e) => {
    e.preventDefault();

    Geocode.setApiKey("AIzaSyAn5-eo86wrdrWJsaGeiUy6RfbrlhHnt7Q");

    Geocode.setLanguage("en");

    Geocode.setRegion("lk");

    Geocode.setLocationType("ROOFTOP");

    firebase.initializeApp({
      apiKey: "AIzaSyDfmZpppBgMZL2Mrpi4MYeBc9mX5fBAKVg",
      authDomain: "littlehopes.firebaseapp.com",
      projectId: "littlehopes",
      storageBucket: "littlehopes.appspot.com",
      messagingSenderId: "15014456263",
      appId: "1:15014456263:web:f0ca2659400a5ac71b87e2",
      measurementId: "G-W1DDRK7EP9",
    });

    // Create a Firestore reference
    const firestore = firebase.firestore();

    // Create a GeoFirestore reference
    const GeoFirestore = geofirestore.initializeApp(firestore);

    Geocode.fromAddress(loc).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;

        console.log(lat, lng);

        const geocollection = GeoFirestore.collection("orphangaeLocation");

        // Add a GeoDocument to a GeoCollection
        geocollection.add({
          orphangeName: orpanageName,
          orphangeEmail: email,
          orphanageAddress: address,
          // The coordinates field must be a GeoPoint!
          coordinates: new firebase.firestore.GeoPoint(lat, lng),
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div className="body">
      <div className="wrapper">
        <div className="sidebar">
          <div className="adminlogo">
            <img src="" alt="" />
            <h3>
              {" "}
              <AuthDetails />
            </h3>
            <p> Address </p>
          </div>
          <ul>
            <li>
              <a href="/AdminHome">
                <span className="icon">
                  <i className="fas fa-home"></i>
                </span>
                <span className="item">Home</span>
              </a>
            </li>
            <li>
              <a href="/Orphans">
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
                <span className="item">Orphans</span>
              </a>
            </li>
            <li>
              <a href="/Donations">
                <span className="icon">
                  <i className="fas fa-chart-line"></i>
                </span>
                <span className="item">Donations</span>
              </a>
            </li>
            <li>
              <a href="/Adoptions">
                <span className="icon">
                  <i className="fas fa-users"></i>
                </span>
                <span className="item">Adoptions</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <i className="fas fa-users"></i>
                </span>
                <span className="item">Sponserships</span>
              </a>
            </li>
            <li>
              <a href="/Profile">
                <span className="icon">
                  <i className="fas fa-user-shield"></i>
                </span>
                <span className="item">Profile</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <i className="fas fa-chevron-left"></i>
                </span>
                <span className="item">Log Out</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="section">
          <div className="top_navbar">
            <div className="logOut">
              <a href="/" className="add">
                Log Out
              </a>
            </div>
          </div>
        </div>
        <div className="profileContaoner">
          <div className="otitle"> Orphanage Profile</div>
          <hr />
          <br />
          <div className="innercon">
            <div className="stitle">Orphanage Name</div> <br />
            <div className="inputbox1">
              <input
                className="box"
                type="text"
                placeholder="Enter Name"
                value={orpanageName}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <br />
            <div className="sstitle">Orphanage Email</div>{" "}
            <div className="inputbox2">
              <input
                className="box"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <br />
            <br />
            <div className="sstitle">Orphanage Location</div>{" "}
            <div className="inputbox3">
              <input
                className="box"
                type="text"
                placeholder="Enter Location"
                value={loc}
                onChange={(e) => setloc(e.target.value)}
              ></input>
            </div>
            <br />
            <br />
            <div className="sstitle">Orphange Address</div>{" "}
            <div className="inputbox4">
              <input
                className="box"
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </div>
            <div className="buttonbox">
              <button type="submit" className="updatebutton" onClick={testing}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
