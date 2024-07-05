import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Loco_details_post.css';

const Loco_details_post = () => {
    const [formData, setFormData] = useState({
        lono: '',
        loclass: '',
        lotype: '',
        loshed: '',
        lostatus: '',
        lodesc: ''
    });

    useEffect(() => {
        // Apply background class when component mounts
        document.body.classList.add('loco-post-background');
    
        // Clean up background class when component unmounts
        return () => {
          document.body.classList.remove('loco-post-background');
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
            await axios.post('http://localhost:3000/loco-post', formData);
            alert('Locomotive details inserted successfully');
        } catch (error) {
            console.error('Error inserting the data:', error);
            alert('Error inserting the data');
        }
    };

    return (
        <div className="loco-post-container">
            <h1>Add Locomotive Details</h1>
            <form onSubmit={handleSubmit} className="loco-post-form">
                <div className="loco-post-form-group">
                    <label htmlFor="lono">Locomotive Number</label>
                    <input
                        type="text"
                        id="lono"
                        name="lono"
                        value={formData.lono}
                        onChange={handleChange}
                        placeholder='Loco No'
                        required
                    />
                </div>
                <div className="loco-post-form-group">
                    <label htmlFor="loclass">Class</label>
                    <input
                        type="text"
                        id="loclass"
                        name="loclass"
                        value={formData.loclass}
                        onChange={handleChange}
                        placeholder='Loco Class'
                        required
                    />
                </div>
                <div className="loco-post-form-group">
                    <label htmlFor="lotype">Type</label>
                    <input
                        type="text"
                        id="lotype"
                        name="lotype"
                        value={formData.lotype}
                        onChange={handleChange}
                        placeholder='Loco Type'
                        required
                    />
                </div>
                <div className="loco-post-form-group">
                    <label htmlFor="loshed">Shed</label>
                    <input
                        type="text"
                        id="loshed"
                        name="loshed"
                        value={formData.loshed}
                        onChange={handleChange}
                        placeholder='Loco Shed'
                        required
                    />
                </div>
                <div className="loco-post-form-group">
                    <label htmlFor="lostatus">Status</label>
                    <input
                        type="text"
                        id="lostatus"
                        name="lostatus"
                        value={formData.lostatus}
                        onChange={handleChange}
                        placeholder='Loco Status'
                        required
                    />
                </div>
                <div className="loco-post-form-group">
                    <label htmlFor="lodesc">Description</label>
                    <textarea
                        id="lodesc"
                        name="lodesc"
                        value={formData.lodesc}
                        onChange={handleChange}
                        placeholder='Loco Description'
                        required
                    ></textarea>
                </div>
                <button className='loco-post-submit' type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Loco_details_post;
