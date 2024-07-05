import Featuredata from './Featuredata'
import { useRef, useEffect } from 'react';
import './Features.css'
import loco_2 from '../../assets/loco_2.jpg';
import coach from '../../assets/coach.jpg';
import railfan from '../../assets/railfan.jpg';
import train_status from '../../assets/train_status.jpg';


const Features = () => {

    const featureRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate');
            } else {
              entry.target.classList.remove('animate');
            }
          });
        },
        { threshold: 0.1 }
      );
  
      if (featureRef.current) {
        observer.observe(featureRef.current);
      }
  
      return () => {
        if (featureRef.current) {
          observer.unobserve(featureRef.current);
        }
      };
    }, []);
  
  return (
    <div className='Features' ref = {featureRef}>
        <h1>Features</h1>
        <p>Ferroequinologists and Railfans are presented with accurate, engaging, and insightful content</p>
        <div className='featurecard'>
            <Featuredata 
                image = {loco_2}
                heading = "Locomotives: The Power-houses of the Rails"
                text = "Discover the engines that drive the trains. Our collection of locomotive information covers everything from the early steam engines to the latest diesel and electric models."
                link = "/Loco_details"
            />
            <Featuredata 
                image = {coach}
                heading = "Coaches: The Comfort of the Journey"
                text = "Explore the different types of railway coaches designed to offer passengers comfort, convenience, and safety during their travels."
                link = "/Coach_details"
            />
            <Featuredata 
                image = {railfan}
                heading = "Railfans: Celebrating the Passion for Railways"
                text = "Join a community of railway enthusiasts who share a common love for trains, railroads, and everything related to railways."
                link = "/Railfan_details"
            />
            <Featuredata 
                image = {train_status}
                heading = "Live Train Status: Stay Updated on Train Schedules"
                text = "Stay informed with real-time updates on train schedules, delays, and movements."
                link = "/Loco_Status"
            />
        </div>
    </div>
  )
}

export default Features