import React, { useState, useEffect } from "react";
import AuthDetails from "../auth/AuthDetails";
import "./orphanageCss/adminHome.css";
import SideBar from "../items/adminSideBar/SideBar";
import CountUp from "react-countup";
import { collection, getCountFromServer } from "firebase/firestore";
import { db, storage, auth } from "../../firebase";

const AdminHome = () => {
  const [countDonation, setCountDonation] = useState("");
  const [countOrphan, setCountOrphan] = useState("");
  const [countAdoption, setCountAdoption] = useState("");
  const [countSponsering, setCountSponsering] = useState("");

  useEffect(() => {
    calculations();
  });

  const calculations = async () => {
    const donationRef = collection(db, "donations");
    const snapshotDonation = await getCountFromServer(donationRef);
    const dataDonation = snapshotDonation.data().count;
    setCountDonation(dataDonation);

    const orphanRef = collection(db, "orphans");
    const snapshotOrphan = await getCountFromServer(orphanRef);
    const dataOrphan = snapshotOrphan.data().count;
    setCountOrphan(dataOrphan);

    const adoptionRef = collection(db, "adoptions");
    const snapshotAdoption = await getCountFromServer(adoptionRef);
    const dataAdoption = snapshotAdoption.data().count;
    setCountAdoption(dataAdoption);

    const sponseringRef = collection(db, "sponsorships");
    const snapshotSponsering = await getCountFromServer(sponseringRef);
    const dataSponsering = snapshotSponsering.data().count;
    setCountSponsering(dataSponsering);
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <SideBar />
        <div className="MainDash">
          <h1 className="dashh1">Dashboard - abc Orphange</h1>
          <div className="donationCounter">
            <div class="counter1">
              <CountUp delay={0.3} end={countOrphan} duration={0.3} />
            </div>
            <br />
            <h1 className="orphnCountTitle">ORPHANS</h1>
          </div>
          <br />
          <div className="SponsorCounter">
            <div class="counter1">
              <CountUp delay={0.3} end={countSponsering} duration={0.3} />
            </div>
            <br />
            <h1 className="orphnCountTitle">SPONSORS</h1>
          </div>
          <div className="OrphanCounter">
            <div class="counter1">
              <CountUp delay={0.3} end={countDonation} duration={0.3} />
            </div>
            <br />
            <h1 className="orphnCountTitle">DONORS</h1>
          </div>
          <br /> <br />
          <div className="AdoptionCounter">
            <div class="counter1">
              <CountUp delay={0.3} end={countAdoption} duration={0.3} />
            </div>
            <br />
            <h1 className="orphnCountTitle">ADOPTERS</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
