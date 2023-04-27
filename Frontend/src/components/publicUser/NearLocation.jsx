import "./publicUserCSS/nearLocation.css";
import Geocode from "react-geocode";
import * as geofirestore from "geofirestore";
import { useNavigate } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";

import AuthDetails from "../auth/AuthDetails";

import { db } from "../../firebase";

import { useState } from "react";

const NearLocation = () => {
  const [books, setBooks] = useState({});
  const [loc, setloc] = useState("");
  const [distenceGiven, setDistenceGiven] = useState("");
  const [names, setNames] = useState([]);
  const [emails, setEmails] = useState([]);
  const list = [];
  const navigate = useNavigate();

  const test = (e) => {
    e.preventDefault();

    // API key for get latitite and longitute
    Geocode.setApiKey("AIzaSyAn5-eo86wrdrWJsaGeiUy6RfbrlhHnt7Q");

    Geocode.setLanguage("en");

    Geocode.setRegion("lk");

    Geocode.setLocationType("ROOFTOP");

    // Firebase initialization
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

    // Get lat ang lng
    Geocode.fromAddress(loc).then((response) => {
      const { lat, lng } = response.results[0].geometry.location;

      console.log(lat, lng);

      // Referenace for firestore collection
      const geocollection = GeoFirestore.collection("orphangaeLocation");

      // Firestore query to get location details
      const query = geocollection.near({
        center: new firebase.firestore.GeoPoint(lat, lng),
        radius: 1000,
      });

      // Get query (as Promise)
      query.get().then((value) => {
        const locrResult = value.docs;
        console.log(locrResult);

        for (let i = 0; i < locrResult.length; i++) {
          if (locrResult[i].distance < distenceGiven) {
            const xid = locrResult[i].id;
            console.log(xid);
            const locRef = doc(db, "orphangaeLocation", xid);

            onSnapshot(locRef, (doc) => {
              const abc = doc.data();
              setBooks(doc.data(), doc.id);
              console.log(abc.orphangeName);
              //setNames((current) => [...current, abc.orphangeName]);
              setEmails((current) => [...current, abc]);
            });
          }
        }
      });
    });
  };
  return (
    <div className="banner">
      <div className="navbar">
        <div className="logoImg">
          <img src="images/logo1.png" alt="" className="logo" />
        </div>
        <div className="accountCont">
          <div className="userImage"></div>
          <div className="accbtncover">
            <button className="accountbtn">
              <AuthDetails />
            </button>
          </div>
        </div>
      </div>

      <div className="formcont">
        <form>
          <div className="find">
            <input
              className="location"
              type="text"
              placeholder="Enter Location"
              value={loc}
              onChange={(e) => setloc(e.target.value)}
            ></input>
            <br /> <br />
            <input
              className="location"
              type="text"
              placeholder="Enter Distense KM"
              value={distenceGiven}
              onChange={(e) => setDistenceGiven(e.target.value)}
            ></input>
            <br /> <br />
            <br />
            <button type="submit" className="locbutton" onClick={test}>
              Find
            </button>
          </div>
          <div className="shapes">
            <div className="shapeCover">
              <img
                src="../images/graph.png"
                alt="images"
                className="shapebac"
              ></img>
            </div>
            <div className="imageCover">
              <img
                src="../images/child1.png"
                alt="image"
                className="childbac"
              ></img>
            </div>
          </div>
        </form>
      </div>
      <div className="nearOph">
        <h2 className="orphangeListTitle"> Nearest Orphanges From Location</h2>{" "}
        <br />
        <hr className="nearestHR" />
        <div>
          {" "}
          {emails.map((element, index) => {
            return (
              <div key={index} className="resultSet">
                <button
                  className="nearbtn"
                  onClick={() =>
                    navigate(`/ChildrenGallery/${element.orphangeEmail}`)
                  }
                >
                  <div>{element.orphangeName}</div>
                  <div>{element.orphangeEmail}</div>
                  <div>{element.orphanageAddress}</div>
                  <div>{element.id}</div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NearLocation;
