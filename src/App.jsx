import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LawyerLogin from "./Lawyerlogin";
import OldPrisoner from "./OldPrisoner";
import NewPrisoner from "./NewPrisoner";
import CardComponent from "./CardComponent";
import Judies from "./Judies";
import Undertrail_prisoner from "./Undertrail_prisoner";
import RegistrationCompleted from "./register-complete";
import Dashboard from "./Lawyers";


function App() {
  return (
    <>
   
    <Router>
      <Routes>
        <Route path="/" element={<CardComponent />} />
        <Route path="/old-prisoner" element={<OldPrisoner />} />
        <Route path="/complete-register" element={< RegistrationCompleted/>} />
        <Route path="/Lawyers" element={<LawyerLogin />} />
       <Route path="/Lawyers_dashboard" element={<Dashboard/>}></Route>
        <Route path="/undertrail-prisoner" element={<Undertrail_prisoner />} />
        <Route path="/Judies" element={<Judies />} />
        <Route path="/Register-Prisoner" element={<NewPrisoner/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
