import React from 'react';
import { useLocation } from 'react-router-dom';
import chart from "./chart.png"

const Dashboard = () => {
  const query = new URLSearchParams(useLocation().search);
  const caseNumber = query.get('caseNumber');

 //report fetch frrm power bi/sajitha
  const prisonerInfo = {
    name: 'John Doe',
    charges: 'Theft',
    status: 'Undertrial',
    nextHearingDate: 'September 15, 2024',
  };

  const analyticalReport = {
    convictionRate: '60%',
    averageSentence: '2 years',
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <h3>Case Number: {caseNumber}</h3>
      <h4>Prisoner Information</h4>
      <p>Name: {prisonerInfo.name}</p>
      <p>Charges: {prisonerInfo.charges}</p>
      <p>Status: {prisonerInfo.status}</p>
      <p>Next Hearing Date: {prisonerInfo.nextHearingDate}</p>

      <h4>Analytical Report</h4>
      <p>Conviction Rate: {analyticalReport.convictionRate}</p>
      <p>Average Sentence: {analyticalReport.averageSentence}</p>
      <img src={chart} alt="" />
    </div>
  );
};

export default Dashboard;
