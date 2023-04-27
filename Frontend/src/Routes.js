import React from "react";
import { BrowserRouter, Route, Routes as sw } from "react-router-dom";
import Home from "././components/auth/Home";

const Routes = () => {
  <BrowserRouter>
    <sw>
      <Route exact path="/" component={<Home />}></Route>
    </sw>
  </BrowserRouter>;
};
export default Routes;
