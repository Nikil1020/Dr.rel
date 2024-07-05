import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Railfan_details.css';
import { Link } from 'react-router-dom';

const Railfan_details = () => {
  const [fanNumber, setfanNumber] = useState('');
  const [fanDetails, setfanDetails] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      console.log(`Fetching fan details for the place: ${fanNumber}`);
      const response = await axios.get(`http://localhost:3000/fan-detail?fanno=${fanNumber}`);
      console.log('Response from server:', response.data);
      setfanDetails(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching locomotive details:', error);
      setError('Error fetching locomotive details');
      setfanDetails([]);
    }
  };

  useEffect(() => {
    // Apply background class when component mounts
    document.body.classList.add('fan-background');

    // Clean up background class when component unmounts
    return () => {
      document.body.classList.remove('fan-background');
    };
  }, []);

  return (
    <section className="Details">
      <div className="container">
        <div className="header1">
          <div className="text">Your Place</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              placeholder="place"
              value={fanNumber}
              onChange={(e) => setfanNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            Get Details
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        {fanDetails.length > 0 && (
          <div className="loco-details">
            <h2>Place Details</h2>
            {fanDetails.map((detail, index) => (
              <div key={index} className="fan-detail">
                <p>
                  <strong>Railfannning Spot:</strong> {detail.rail_fan_loc}
                </p>
                <p>
                  <strong>Best Time:</strong> {detail.rail_fan_time}
                </p>
              </div>
            ))}
            <p>
              <Link to="/Railfan_details_post"><h4><strong>Click here to contribute to our database.</strong></h4></Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Railfan_details;
