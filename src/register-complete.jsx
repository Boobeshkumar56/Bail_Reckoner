import React, { useState, useEffect } from 'react';
import './RegistrationCompleted.css';
import registered from"./registered.png"
import { useNavigate } from 'react-router-dom';

const RegistrationCompleted = () => {
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="registration-completed">
      {loading ? (
        <div className="loading-animation">
            <iframe id="loadingID" src="https://lottie.host/embed/ff51b742-59d8-466a-bdf9-379b37734d31/QrLYBktURt.json"></iframe>
          Loading...
        </div>
      ) : (
        <div className="completed-message">
          <img src={registered} alt="Completed" id='Completed' />
          <h1 style={{color:"red"}}>Case Registered!</h1>
          <button id="back" onClick={()=>navigate("/undertrail-prisoner")} >Go Back</button>
        </div>
      )}
    </div>
  );
};

export default RegistrationCompleted;
