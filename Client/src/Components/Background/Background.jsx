import './Background.css';
import React, { useEffect, useState } from 'react';
import background from '../../assets/background.jpg';
import background2 from '../../assets/background2.jpg';
import background3 from '../../assets/background3.jpg';

const Background = ({ herocount }) => {
  const [imageSrc, setImageSrc] = useState(background);
  const [fadeClass, setFadeClass] = useState('');

  useEffect(() => {
    setFadeClass('fade-in');
    const timeout = setTimeout(() => setFadeClass(''), 500); // Remove the class after the animation duration
    return () => clearTimeout(timeout);
  }, [herocount]);

  useEffect(() => {
    if (herocount === 0) {
      setImageSrc(background);
    } else if (herocount === 1) {
      setImageSrc(background2);
    } else if (herocount === 2) {
      setImageSrc(background3);
    }
  }, [herocount]);

  return (
    <img src={imageSrc} className={`background ${fadeClass}`} alt="background" />
  );
};

export default Background;
