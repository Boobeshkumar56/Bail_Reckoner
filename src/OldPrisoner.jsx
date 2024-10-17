import React, { useEffect, useState,useContext } from "react";
import "./oldprisoners.css"; 
import prisonerimg from "./prisoner.png"



const PrisonerDetails = ({ prisonerId }) => {
    const [prisoner, setPrisoner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchPrisoner = async () => {
            try {
                const dummyPrisoner = {
                    id: prisonerId,
                    name: "John Doe",
                    age: 30,
                    gender: "Male",
                    offenseType: "Theft",
                    charges: "Theft under section 378 of IPC",
                    timeServed: 12,
                    bailEligibility: "Yes", 
                    riskFactors: "Low", 
                    legalAidAssigned: "Yes",
                    status: "Awaiting Bail",
                    photoUrl:"prisonerimg"}
                setPrisoner(dummyPrisoner);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrisoner();
    }, [prisonerId]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const getBailColor = (bailEligibility) => {
        switch (prisoner.status.toLowerCase()) {
            case "yes":
                return "green";
            case "no":
                return "red";
            default:
                return "black";
        }
    };

    const getRiskFactorColor = (riskFactors) => {
        return riskFactors.toLowerCase() === "high" ? "red" : "green";
    };
    //just for example

    //
    
    return (
        <div className="prisoner-details" >
           
            <div className="photo-container">
                <img src={eval(prisoner.photoUrl)} alt={`${prisoner.name}'s photo`} id="prisoner-photo" />
            </div>
            <div className="details-container">
                <h1>Prisoner Details</h1>
                <div className="detail-item">
                    <strong>ID:</strong> {prisoner.id}
                </div>
                <div className="detail-item">
                    <strong>Name:</strong> {prisoner.name}
                </div>
                <div className="detail-item">
                    <strong>Age:</strong> {prisoner.age}
                </div>
                <div className="detail-item">
                    <strong>Gender:</strong> {prisoner.gender}
                </div>
                <div className="detail-item">
                    <strong>Offense Type:</strong> {prisoner.offenseType}
                </div>
                <div className="detail-item">
                    <strong>Charges:</strong> {prisoner.charges}
                </div>
                <div className="detail-item">
                    <strong>Time Served (Months):</strong> {prisoner.timeServed}
                </div>
                <div className="detail-item">
                    <strong>Bail Eligibility:</strong> {prisoner.bailEligibility}
                </div>
                <div className="detail-item" style={{ color: getRiskFactorColor(prisoner.riskFactors) }}>
                    <strong>Risk Factors:</strong> {prisoner.riskFactors}
                </div>
                <div className="detail-item">
                    <strong>Legal Aid Assigned:</strong> {prisoner.legalAidAssigned}
                </div>
                <div className="detail-item" style={{ color: getBailColor(prisoner.status) }}>
                    <strong style={{ color:"black" }}>Status:</strong> {prisoner.status}
                </div>
                {/* <div className="Analytics">
                  <h1 style={{textAlign:"center"}}>Analytical Report</h1>
                <img src={chart} alt="chart" id="Analytics" />
                </div> */}
            </div>
            

        </div>
    );
};

export default PrisonerDetails;
