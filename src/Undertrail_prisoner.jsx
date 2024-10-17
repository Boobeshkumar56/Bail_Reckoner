import React, { Children } from "react";
import prisonericon from "./prisoner-icon.png"
import { useNavigate } from "react-router-dom";
import "./undertrailprisoner.css";
import prisoner from "./prisoner.png";
import addprisoner from "./add_prisoner.png"
import { useState,createContext } from "react";



const prisoner_context=createContext();
const Undertrail_prisoner = () => {
  const navigate = useNavigate();
  const [prisonerId, setPrisonerId] = useState(0); 

  
  return (
    <div className="prisoner-interface" style={{width:"900px",height:"700px",
    }}>
      <div id="title">
      <img src={prisonericon} alt="Prisoner Icon" className="icon" />
      <h1 id="head" > Welcome to the Prisoner System</h1>
      </div>
     <div id="line"></div>
      <div id="oldprisoner">
        <img src={prisoner} alt="Prisoner" id="prisoner" /><br />
        <label htmlFor="prisoner id">Enter Prisoner ID <br></br>
          <input type="text" id="prisoner_id" placeholder="Prisoner Id" autoComplete="off" onChange={(e)=>setPrisonerId(e.target.value)} autoFocus /><br />
        </label>
        <button id="search" onClick={()=>prisonerId!=0 && navigate("/old-prisoner")} >Search</button>

      </div>
      <div id="newprisoner">
      <img src={addprisoner} alt="Prisoner" id="addprisoner" /><br />
        <button id="new_register" onClick={()=>navigate("/Register-Prisoner")}>Register</button>
      </div>
    </div>
  );
};
export default Undertrail_prisoner;

