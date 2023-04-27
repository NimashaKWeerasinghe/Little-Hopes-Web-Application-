import React, { useEffect, useState } from "react";
import { db, storage, auth } from "../../firebase";
import SideBar from "../items/adminSideBar/SideBar";
import { Button, Card, Grid, Container, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  onSnapshot,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./orphanageCss/orphans.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AuthDetails from "../auth/AuthDetails";
import ModalOrphan from "./ModalOrphan";
import AddEditOrphans from "./AddEditOrphans";

const Orphans = () => {
  const [authUser, setAuthUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [orphan, setOrphan] = useState({});
  // const emailuser = authUser.email;

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        console.log(user.email);
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

  const [orphans, setOrphans] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getOrphans();
  }, [orphans]);

  const getOrphans = async () => {
    const OrphanRef = query(
      collection(db, "orphans"),
      where("orphanageEmail", "==", "nima@gmail.com")
    );
    const getAllOrphans = () => {
      return getDocs(OrphanRef);
    };

    const data = await getAllOrphans();
    console.log(data.docs);
    setOrphans(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleModal = (item) => {
    setOpen(true);
    setOrphan(item);
  };

  const handleDelete = async (id) => {
    setOpen(false);
    await deleteDoc(doc(db, "orphans", id));
    setOrphans(orphans.filter((orphan) => orphan.id !== id));
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <SideBar />
        <div className="MainDash">
          <div className="addOrphan">
            <button className="add" onClick={() => navigate(`/AddOrphans`)}>
              Add Orphan
            </button>
          </div>
          <div>
            {orphans.map((item, index) => (
              <div className="card" key={item.id}>
                <div className="imageChild">
                  <img src={item.img} />
                </div>
                <div className="fullName">
                  <p>{item.fullName}</p>
                </div>
                <div className="des">
                  <p className="gender">{item.oGender}</p>
                  <button
                    className="update"
                    onClick={() => navigate(`/EditOrphans/${item.id}`)}
                  >
                    Update
                  </button>
                  <br />
                  <br />

                  <button className="delete" onClick={() => handleModal(item)}>
                    Veiw
                  </button>
                </div>
              </div>
            ))}
          </div>
          {open && (
            <ModalOrphan
              open={open}
              setOpen={setOpen}
              handleDelete={handleDelete}
              {...orphan}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Orphans;
