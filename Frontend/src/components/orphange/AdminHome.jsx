import React from "react";
import AuthDetails from "../auth/AuthDetails";
import "./orphanageCss/adminHome.css";
import SideBar from "../items/adminSideBar/SideBar";
import Table from "../items/table/Table";

const AdminHome = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <SideBar />
        <div className="MainDash">
          <h1>Dashboard</h1>

          <Table />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
