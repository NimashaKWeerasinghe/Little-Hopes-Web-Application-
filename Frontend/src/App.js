import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./components/auth/Home.jsx";
import AuthDetails from "./components/auth/AuthDetails.jsx";
import NearLocation from "./components/publicUser/NearLocation.jsx";
import AdminHome from "./components/orphange/AdminHome.jsx";
import Profile from "./components/orphange/Profile.jsx";
import ChildrenGallery from "./components/publicUser/ChildrenGallery.jsx";
import Orphans from "./components/orphange/Orphans.jsx";
import AddEditOrphans from "./components/orphange/AddEditOrphans.jsx";
import Donations from "./components/orphange/Donations.jsx";
import AddEditDonations from "./components/orphange/AddEditDonations.jsx";
import Adoptions from "./components/orphange/Adoptions.jsx";
import Sponserships from "./components/orphange/Sponserships.jsx";
import AddEditAdoptions from "./components/orphange/AddEditAdoptions.jsx";
import AddEditSponserships from "./components/orphange/AddEditSponserships.jsx";
import SideBar from "./components/items/adminSideBar/SideBar.jsx";
import Table from "./components/items/table/Table.jsx";
import Checkout from "./components/publicUser/CheckOut.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Checkout/:id" element={<Checkout />} />

          <Route path="/AddOrphans" element={<AddEditOrphans />}></Route>

          <Route path="/EditOrphans/:id" element={<AddEditOrphans />}></Route>
          <Route path="/Orphans" element={<Orphans />}></Route>

          <Route path="/AddDonations" element={<AddEditDonations />}></Route>
          <Route path="/Sidebar" element={<SideBar />}></Route>
          <Route path="/Table" element={<Table />}></Route>
          <Route
            path="/EditDonations/:id"
            element={<AddEditDonations />}
          ></Route>
          <Route path="/Donations" element={<Donations />}></Route>
          <Route path="/Sponserships" element={<Sponserships />}></Route>
          <Route path="/AddAdoptions" element={<AddEditAdoptions />}></Route>

          <Route
            path="/EditAdoptions/:id"
            element={<AddEditAdoptions />}
          ></Route>

          <Route path="/Adoptions" element={<Adoptions />}></Route>

          <Route
            path="/AddSponserships"
            element={<AddEditSponserships />}
          ></Route>

          <Route
            path="/EditSponsershios/:id"
            element={<AddEditSponserships />}
          ></Route>

          <Route path="/AuthDetails" element={<AuthDetails />}></Route>
          <Route path="/NearLocation" element={<NearLocation />}></Route>

          <Route path="/AdminHome" element={<AdminHome />}></Route>

          <Route path="/Profile" element={<Profile />}></Route>
          <Route
            path="/ChildrenGallery/:oid"
            element={<ChildrenGallery />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
