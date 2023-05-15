import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useRef } from "react";
import { auth } from "../../firebase";

import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FaBars, FaTimes } from "react-icons/fa";
import CountUp from "react-countup";

const OrphangeLogin = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");

  const [semail, setSEmail] = useState("");
  const [spassword, setSPassword] = useState("");

  const navigate = useNavigate();

  const signUpPeople = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, semail, spassword)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInPeople = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password, username)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/AdminHome");
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  return (
    <div className="all2">
      <header>
        <div className="logoImg">
          <img src="images/logo1.png" alt="" className="logo" />
        </div>
        <nav ref={navRef}>
          <a href="/#">HOME</a>
          <a href="/#">PUBLIC USER SIGN IN</a>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
      <div className="mainHeading">
        <br />
        <h3>ORPHANGES</h3>
      </div>

      <div className="wrapper1">
        <div className="boxSignup2">
          <form onSubmit={signUpPeople}>
            <img src="images/profile.svg" className="signUpProfile" />
            <div className="h2Cover">
              <br />
              <h2 className="signintitle">SIGN UP</h2>
            </div>

            <br />
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  placeholder="Enter Your Email Here"
                  type="text"
                  className="input"
                  value={semail}
                  onChange={(e) => setSEmail(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <input
                  placeholder="Enter Your Password Here"
                  type="password"
                  className="input"
                  value={spassword}
                  onChange={(e) => setSPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="buttonClass">
              <button className="submitbutton">Sign Up</button>
            </div>
          </form>
        </div>
        <div className="boxSignIn">
          <form onSubmit={signInPeople}>
            <img src="images/profile.svg" />
            <div className="h2Cover">
              <br />
              <h2 className="signintitle">SIGN IN</h2>
            </div>

            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  placeholder="Enter Your Email Here"
                  type="text"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <input
                  placeholder="Enter Your Password Here"
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="buttonClass">
              <button className="submitbutton">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrphangeLogin;
