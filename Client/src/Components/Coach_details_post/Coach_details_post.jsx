import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Coach_details_post.css';

const Coach_details_post = () => {
    const [formData, setFormData] = useState({
        cotype: '',
        coshed: '',
        codesc: ''
    });

    useEffect(() => {
        // Apply background class when component mounts
        document.body.classList.add('coach-post-background');
    
        // Clean up background class when component unmounts
        return () => {
          document.body.classList.remove('coach-post-background');
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
            await axios.post('http://localhost:3000/coach-post', formData);
            alert('Coach details inserted successfully');
        } catch (error) {
            console.error('Error inserting the data:', error);
            alert('Error inserting the data');
        }
    };

    return (
        <div className="loco-post-container">
            <h1>Add Coach Details</h1>
            <form onSubmit={handleSubmit} className="loco-post-form">
                <div className="loco-post-form-group">
                    <label htmlFor="cotype">Coach Type</label>
                    <input
                        type="text"
                        id="cotype"
                        name="cotype"
                        value={formData.cotype}
                        onChange={handleChange}
                        placeholder='Coach Type'
                        required
                    />
                </div>
                <div className="loco-post-form-group">
                    <label htmlFor="coshed">Coach Built</label>
                    <input
                        type="text"
                        id="coshed"
                        name="coshed"
                        value={formData.coshed}
                        onChange={handleChange}
                        placeholder='Coach Manufacturer'
                        required
                    />
                </div>
                <div className="loco-post-form-group">
                    <label htmlFor="codesc">Description</label>
                    <textarea
                        id="codesc"
                        name="codesc"
                        value={formData.codesc}
                        onChange={handleChange}
                        placeholder='Coach Description'
                        required
                    ></textarea>
                </div>
                <button className='loco-post-submit' type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Coach_details_post;
