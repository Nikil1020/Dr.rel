import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Coach_details.css';
import { Link } from 'react-router-dom';

const Coach_details = () => {
  
  const [coachNumber, setcoachNumber] = useState('');
  const [CoachDetails, setCoachDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Apply background class when component mounts
    document.body.classList.add('coach-background');

    // Clean up background class when component unmounts
    return () => {
      document.body.classList.remove('coach-background');
    };
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(`Fetching Coach details for the Coach Type: ${coachNumber}`);
      const response = await axios.get(`http://localhost:3000/coach-detail?coachno=${coachNumber}`);
      console.log('Response from server:', response.data);
      setCoachDetails(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching Coach details:', error);
      setError('Error fetching Coach details');
      setCoachDetails(null);
    }
  };

  return (
    <section className="Details">
      <div className="container">
        <div className="header1">
          <div className="text">Coach Type</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              placeholder="Coach Type"
              value={coachNumber}
              onChange={(e) => setcoachNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            Get Details
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        {CoachDetails && (
          <div className="loco-details">
            <h2>Coach Details</h2>
            <p>
              <strong>Locomotive Number:</strong> {CoachDetails.coach_type}
            </p>
            <p>
              <strong>Locomotive Class:</strong> {CoachDetails.coach_built}
            </p>
            <p>
              <strong>Locomotive Type:</strong> {CoachDetails.coach_desc}
            </p>

            <p>
                <Link to = "/Coach_details_post"><h4><strong>Click here to contribute to our database.</strong></h4></Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Coach_details;
