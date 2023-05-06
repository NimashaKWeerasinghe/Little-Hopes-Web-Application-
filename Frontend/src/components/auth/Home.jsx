import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useRef } from "react";
import { auth } from "../../firebase";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FaBars, FaTimes } from "react-icons/fa";

const Home = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const [selects, setSelects] = useState();
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

        if (selects === "user") {
          console.log("User");
        } else {
          console.log("Orphanage");
        }
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
        if (selects === "user") {
          navigate("/NearLocation");
        } else {
          navigate("/AdminHome");
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  return (
    <div>
      <div className="">
        <header>
          <div className="logoImg">
            <img src="images/logo1.png" alt="" className="logo" />
          </div>
          <nav ref={navRef}>
            <a href="/#">HOME</a>
            <a href="/#">SIGN IN</a>
            <a href="/#">SIGN UP</a>
            <a href="/#">ORPHANAGE LOGIN</a>
            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
              <FaTimes />
            </button>
          </nav>
          <button className="nav-btn" onClick={showNavbar}>
            <FaBars />
          </button>
        </header>

        <section id="home">
          <div className="content">
            <div className="homeImageCover"></div>
            <div className="title">
              <h1 className="slogan"></h1>
            </div>
            <div className="homebtnCover">
              <a class="homebtn" href="#signin">
                Make Child Smile
              </a>
            </div>
          </div>
        </section>
      </div>

      <section id="signin">
        <div className="containerSignIn">
          <div className="imgClass">
            <img src="images/signin1.svg" />
          </div>
          <div className="login-content">
            <form onSubmit={signInPeople}>
              <img src="images/profile.svg" />
              <div className="h2Cover">
                <h2 className="signintitle">Sign In</h2>
              </div>
              <br /> <br /> <br />
              <div className="selectContainer">
                <select
                  className="select"
                  name="category"
                  id="format"
                  value={selects}
                  onChange={(e) => setSelects(e.target.value)}
                >
                  <option value="cat">Select User Category</option>
                  <option value="user">User</option>
                  <option value="orphange">orphange</option>
                </select>
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
              <br />
              <div className="buttonClass">
                <button className="submitbutton">Login</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section id="signup">
        <div className="containerSignIn">
          <div className="imgClass">
            <img src="images/signup.svg" />
          </div>
          <div className="login-content">
            <form onSubmit={signUpPeople}>
              <img src="images/profile.svg" />
              <div className="h2Cover">
                <h2 className="signintitle">Sign Up</h2>
              </div>
              <br /> <br /> <br />
              <div className="selectContainer">
                <select
                  className="select"
                  name="category"
                  id="format"
                  value={selects}
                  onChange={(e) => setSelects(e.target.value)}
                >
                  <option value="cat">Select User Category</option>
                  <option value="user">User</option>
                  <option value="orphange">orphange</option>
                </select>
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
              <br /> <br />
              <div className="buttonClass">
                <button className="submitbutton">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
