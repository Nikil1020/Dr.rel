import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Loco_details.css';
import { Link } from 'react-router-dom';

const Loco_details = () => {
  const [locoNumber, setLocoNumber] = useState('');
  const [locoDetails, setLocoDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Apply background class when component mounts
    document.body.classList.add('loco-background');

    // Clean up background class when component unmounts
    return () => {
      document.body.classList.remove('loco-background');
    };
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(`Fetching locomotive details for locomotive number: ${locoNumber}`);
      const response = await axios.get(`http://localhost:3000/loco-detail?lono=${locoNumber}`);
      console.log('Response from server:', response.data);
      setLocoDetails(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching locomotive details:', error);
      setError('Error fetching locomotive details');
      setLocoDetails(null);
    }
  };

  return (
    <section className="Details">
      <div className="container">
        <div className="header1">
          <div className="text">Loco Number</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              placeholder="Loco Number"
              value={locoNumber}
              onChange={(e) => setLocoNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            Get Details
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        {locoDetails && (
          <div className="loco-details">
            <h2>Locomotive Details</h2>
            <p>
              <strong>Locomotive Number:</strong> {locoDetails.loco_no}
            </p>
            <p>
              <strong>Locomotive Class:</strong> {locoDetails.loco_class}
            </p>
            <p>
              <strong>Locomotive Type:</strong> {locoDetails.loco_type}
            </p>
            <p>
              <strong>Locomotive Shed:</strong> {locoDetails.loco_shed}
            </p>
            <p>
              <strong>Locomotive Status:</strong> {locoDetails.loco_status}
            </p>
            <p>
              <strong>Locomotive Description:</strong> {locoDetails.loco_desc}
            </p>
            <p>
                <Link to = "/Loco_details_post"><h4><strong>Click here to contribute to our database.</strong></h4></Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Loco_details;
