import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Railfan_details_post.css';

const Railfan_details_post = () => {
    const [formData, setFormData] = useState({
        fantype: '',
        fanstate: '',
        fandesc: ''
    });

    useEffect(() => {
        // Apply background class when component mounts
        document.body.classList.add('fan-post-background');
    
        // Clean up background class when component unmounts
        return () => {
          document.body.classList.remove('fan-post-background');
        };
      }, []);
    


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form data:', formData);  // Log the form data to ensure it's set correctly
        try {
            await axios.post('http://localhost:3000/fan-post', formData);
            alert('fan details inserted successfully');
        } catch (error) {
            console.error('Error inserting the data:', error);
            alert('Error inserting the data');
        }
    };

    return (
        <div className="loco-post-container">
            <h1>Add RailFan Spot Details</h1>
            <form onSubmit={handleSubmit} className="loco-post-form">
                <div className="loco-post-form-group">
                    <label htmlFor="fantype">Place</label>
                    <input
                        type="text"
                        id="fantype"
                        name="fantype"
                        value={formData.fantype}
                        onChange={handleChange}
                        placeholder='Place'
                        required
                    />
                </div>
                <div className="loco-post-form-group">
                    <label htmlFor="fanstate">State</label>
                    <input
                        type="text"
                        id="fanstate"
                        name="fanstate"
                        value={formData.fanstate}
                        onChange={handleChange}
                        placeholder='State'
                        required
                    />
                </div>
                <div className="loco-post-form-group">
                    <label htmlFor="fandesc">Best Time</label>
                    <input
                        type="text"
                        id="fandesc"
                        name="fandesc"
                        value={formData.fandesc}
                        onChange={handleChange}
                        placeholder='Timings'
                        required
                    />
                </div>
                <button className='loco-post-submit' type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Railfan_details_post;
