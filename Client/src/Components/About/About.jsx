// About.jsx
import { useRef, useEffect } from 'react';
import './About.css';
import train from '../../assets/train.jpg';

const About = () => {
  const aboutRef = useRef(null);

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

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section className='About' ref={aboutRef}>
      <div className="about-content">
        <div className="about-text">
          <h1>About Us</h1>
          <p>Your ultimate destination for exploring the world of railways and railfanning!</p>
          <p>At Dr.rel, we are passionate about railways and aim to provide enthusiasts, travelers, and curious minds with comprehensive information about locomotives, coaches, railfanning spots, and everything in between. Our mission is to educate, entertain, and inspire our visitors by sharing the rich history, technological advancements, and cultural impact of railways worldwide.</p>
        </div>
        <div className='about-image'>
          <img src={train} alt="Train" />
        </div>
      </div>
    </section>
  );
};

export default About;
