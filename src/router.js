import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
import EmployeeList from "./pages/Employee_list";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/employee-list"
          element={<EmployeeList></EmployeeList>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
