import React, { useState, useEffect } from "react";
import "./newprisoner.css";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

const NewPrisoner = () => {
  const navigate=useNavigate();
  const [prisonerDetails, setPrisonerDetails] = useState({
    name: "",
    age: "",
    gender: "",
    offenseTypes: "",
    previousOffenses: "",
    charges: "",
    laws: "",
    sections: "",
    predictedImprisonment: "",
    photo: null,
    bailable: "",
    specialCase: "",
    convictions: [],
  });

  const [searchResults, setSearchResults] = useState([]);
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
  try {
        const response = await fetch("/Data_bases/Crimes_acts.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJsonData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrisonerDetails({ ...prisonerDetails, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setPrisonerDetails({
      ...prisonerDetails,
      photo: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("New Prisoner Details:", prisonerDetails);
    navigate("/complete-register");
  };

  const search = (crimeName) => {
    if (!jsonData) {
      return [];
    }

    const options = {
      keys: ["offense"],
      threshold: 0.3,
    };

    const fuse = new Fuse(jsonData.crimes, options);
    const results = fuse.search(crimeName);

    return results.map(({ item }) => item);
  };

  const handleOffenseKeyDown = (e) => {
   
    if (e.key === "Shift") {
      const offenseArray = prisonerDetails.offenseTypes
        .split(",")
        .map((offense) => offense.trim())
        .filter((offense) => offense !== "");

      let allConvictions = [];
      let totalImprisonment = 0;
      let hasDeathPenalty = false;
      offenseArray.forEach((offense) => {
        const results = search(offense);
        if (results.length > 0) {
          const firstResult = results[0];
          allConvictions.push({
            act_name: firstResult.act_name,
            section_id: firstResult.section_id,
            offense: firstResult.offense,
            description: firstResult.description,
            imprisonment_period: firstResult.imprisonment_period,
            fine: firstResult.fine,
            bailable: firstResult.bailable,
            special_case: firstResult.special_case,
          });

          if (firstResult.imprisonment_period === "Death Penalty") {
            hasDeathPenalty = true;
          } else {
            const period = Number(firstResult.imprisonment_period);
            if (!isNaN(period)) {
              totalImprisonment += period;
            }
          }
        }
      });

      if (hasDeathPenalty) {
        totalImprisonment = -1;
      }

      setPrisonerDetails((prev) => ({
        ...prev,
        charges:
          allConvictions.length > 0
            ? allConvictions
                .map((conviction) => `Fine: ${conviction.fine}`)
                .join(", ")
            : "",
        laws:
          allConvictions.length > 0
            ? allConvictions.map((conviction) => conviction.act_name).join(", ")
            : "",
        sections:
          allConvictions.length > 0
            ? allConvictions
                .map((conviction) => conviction.section_id)
                .join(", ")
            : "",
        bailable:
          allConvictions.length > 0
            ? allConvictions.map((conviction) => conviction.bailable).join(", ")
            : "",
        predictedImprisonment:
          totalImprisonment === -1
            ? "Death Penalty"
            : totalImprisonment > 0
            ? totalImprisonment.toFixed(2)
            : "",
        specialCase:
          allConvictions.length > 0
            ? allConvictions[0].special_case
              ? "Yes"
              : "No"
            : "",
        convictions: allConvictions,
      
      }));
    }
  };

  return (
    <div className="new-prisoner">
      <h2>Register New Prisoner</h2>
      <form onSubmit={handleSubmit} className="prisoner-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={prisonerDetails.name}
            onChange={handleChange}
            className="input-box"
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={prisonerDetails.age}
            onChange={handleChange}
            className="input-box"
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <select
            name="gender"
            value={prisonerDetails.gender}
            onChange={handleChange}
            className="input-box"
            required
            autoComplete="off"
            id="gender"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="offenseTypes"
            placeholder="Offense Types"
            value={prisonerDetails.offenseTypes}
            onChange={handleChange}
            onKeyDown={handleOffenseKeyDown}
            className="input-box"
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="previousOffenses"
            placeholder="Previous Offenses"
            value={prisonerDetails.previousOffenses}
            onChange={handleChange}
            className="input-box"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Upload Prisoner image</label>
          <input
            type="file"
            name="photo"
            onChange={handlePhotoChange}
            className="input-box"
            autoComplete="off"
            id="lastelement"
          />
        </div>

        {loading && (
          <iframe
            id="loading_frame"
            src="https://lottie.host/embed/7bde49e6-60e9-4660-afc1-7fb82ec86541/Z1zUEnXgPD.json"
          ></iframe>
        )}
        {error && <div className="error">{error}</div>}

        {prisonerDetails.convictions.length > 0 && (
          <div className="crime-summary">
            <h3>Crime Summary</h3>
            <table
              className="summary-table"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Offense
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Section ID
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Act Name
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Imprisonment Period
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Charges
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Special Case
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Bailable
                  </th>
                </tr>
              </thead>

              <tbody>
                {prisonerDetails.convictions.map((conviction, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {conviction.offense}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {conviction.section_id}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {conviction.act_name}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      {conviction.imprisonment_period === -1
                        ? "Death Penalty"
                        : conviction.imprisonment_period}
                    </td>
                    <td
                      style={{ border: "1px solid #ddd", padding: "8px" }}
                    >{`Fine: ${conviction.fine}`}</td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        color: conviction.special_case ? "red" : "black",
                      }}
                    >
                      {conviction.special_case ? "Yes" : "No"}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        color:
                          conviction.bailable == "bailable" ? "green" : "red",
                      }}
                    >
                      {conviction.bailable ? "non-bailable" : "bailable"}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      fontWeight: "bold",
                      textAlign: "right",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    Predicted Imprisonment:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {prisonerDetails.predictedImprisonment || "N/A"}
                  </td>
                  <td
                    colSpan="3"
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  ></td>
                </tr>
              </tbody>
            </table>
          </div> 
        )}

        <div className="form-group">
          <button type="submit" className="btn" id="btn" onClick={()=> { console.log("New Prisoner Details:", prisonerDetails);navigate("/complete-register")}}>
            Register prisoner
          </button>
        </div>
      </form>

      <div className="summary">
        <h3>Prisoner Summary</h3>
        <p>Name: {prisonerDetails.name}</p>
        <p>Age: {prisonerDetails.age}</p>
        <p>Gender: {prisonerDetails.gender}</p>

        {prisonerDetails.convictions.length > 0 && (
          <div id="convictions">
            <h4>Convictions</h4>
            <ul>
              {prisonerDetails.convictions.length > 0 && (
                <div>
                  <center>
                    <div className="convictions-table">
                      {prisonerDetails.convictions.map((conviction, index) => (
                        <div className="conviction-box" key={index}>
                          <h4>Conviction {index + 1}</h4>
                          <div className="conviction-details">
                            <p>
                              <strong>Act:</strong> {conviction.act_name}
                            </p>
                            <p>
                              <strong>Section:</strong> {conviction.section_id}
                            </p>
                            <p>
                              <strong>Offense:</strong> {conviction.offense}
                            </p>
                            <p>
                              <strong>Description:</strong>{" "}
                              {conviction.description}
                            </p>
                            <p>
                              <strong>Imprisonment Period:</strong>{" "}
                              {conviction.imprisonment_period === -1
                                ? "Death Penalty"
                                : conviction.imprisonment_period}
                            </p>
                            <p>
                              <strong>Fine:</strong> {conviction.fine}
                            </p>
                            <p
                              className={`bailable ${
                                conviction.bailable === "non-bailable"
                                  ? "non-bailable"
                                  : "bailable"
                              }`}
                            >
                              <strong>Bailable:</strong> {conviction.bailable}
                            </p>
                            <p
                              className={
                                conviction.special_case ? "special-case" : ""
                              }
                            >
                              <strong>Special Case:</strong>{" "}
                              {conviction.special_case ? "Yes" : "No"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </center>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPrisoner;
