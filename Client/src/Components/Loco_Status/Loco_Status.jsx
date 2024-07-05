import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Loco_Status.css';

const Loco_Status = () => {
  const [trainNumber, setTrainNumber] = useState('');
  const [trainDetails, setTrainDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Apply background class when component mounts
    document.body.classList.add('train-background');

    // Clean up background class when component unmounts
    return () => {
      document.body.classList.remove('train-background');
    };
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(`Fetching train details for train number: ${trainNumber}`);
      const response = await axios.get(`http://localhost:3000/train-details/${trainNumber}`);
      console.log('Response from server:', response.data);
      setTrainDetails(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching train details:', error);
      setError('Error fetching train details');
      setTrainDetails(null);
    }
  };

  return (
    <section className="Details">
      <div className="container">
        <div className="header1">
          <div className="text">Train Number</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              placeholder="Train Number"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            Get Details
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        {trainDetails && (
          <div className="train-details">
            <h2>Train Details</h2>
            <p>
              <strong>Train Number:</strong> {trainDetails.trainNumber}
            </p>
            <p>
              <strong>Train Name:</strong> {trainDetails.trainName}
            </p>
            <p>
              <strong>Route:</strong>
              <ul>
                {trainDetails.route.map((routeItem, index) => (
                  <li key={index}>
                    <strong>Station:</strong> {routeItem.station} , 
                    <strong>Arrival Time:</strong> {routeItem.arrivalTime} , 
                    <strong>Departure Time:</strong> {routeItem.departureTime}
                  </li>
                ))}
              </ul>
            </p>
            <p>
              <strong>Coach Type:</strong> {trainDetails.CoachType}
            </p>
            {trainDetails.videoURL && (
              <div className="video-container">
                <video width="320" height="240" controls>
                  <source src={trainDetails.videoURL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {trainDetails.liveStatus && (
              <>
                <p>
                  <strong>Live Status:</strong> {trainDetails.liveStatus.message}
                </p>
                <p>
                  <strong>Last Updated:</strong> {trainDetails.liveStatus.updatedTime}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Loco_Status;
