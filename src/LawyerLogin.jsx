import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LawyersLoginPage.css"
import lawyer_icon from "./lawyer_icon.png"

const LawyerLogin = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [lawyerId, setLawyerId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // case number validation logic can be added here
    // Navigate to the dashboard with the caseNumber in the query params
    navigate(`/dashboard?caseNumber=${caseNumber}`);
  };

  return (

    <div className="lawyer-login">
     <div id="lawyer-icon">
      <img src={lawyer_icon} alt=""  id="lawyer-1"/>
      <h2 id="lawyer-text">LAWYER LOGIN </h2>
     
     </div>
      <form onSubmit={handleSubmit}>
        <div id="lawyer-2">
         <h3 style={{marginTop: "130px",marginLeft:"30px",fontSize:"25px"}}>Lawyer Id</h3>
          <input
            type="text"
            id="lawyerId"
            value={lawyerId}
            onChange={(e) => setLawyerId(e.target.value)}
            required
            autoFocus
            autoComplete='off'
          />
          <br />
          <h3 style={{marginTop: "50px",marginLeft:"30px",fontSize:"25px"}}>Case Number</h3>
          <input
            type="text"
            id="caseNumber"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            required
            autoFocus
            autoComplete='off'
          />
          <br />
          <button type="submit"  id="button">Login</button>
        </div>
        
        
      </form>
    </div>
  );
};

export default LawyerLogin;
