import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Welcome from './Components/Welcome/Welcome';
import Background from './Components/Background/Background';
import About from './Components/About/About';
import Features from './Components/Features/Features';
import Footer from './Components/Footer/Footer';
import Loco_Status from './Components/Loco_Status/Loco_Status'; // Import your new page component
import Loco_details from './Components/Loco_details/Loco_details';
import Loco_details_post from './Components/Loco_details_post/Loco_details_post';
import Coach_details from './Components/Coach_details/Coach_details';
import Coach_details_post from './Components/Coach_details_post/Coach_details_post';
import Railfan_details from './Components/Railfan_details/Railfan_details';
import Railfan_details_post from './Components/Railfan_details_post/Railfan_details_post';


const App = () => {
  let herodata = [
    { text1: "Hey Railfans,", text2: "Know anything about railways!!" },
    { text1: "Rail-o-pedia", text2: "Know about Locomotives and Coaches!!" },
    { text1: "Fan-spots", text2: "Know about all the railfanning spots!!" }
  ];

  const [herocount, setherocount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setherocount((count) => (count === 2 ? 0 : count + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <section id="hero">
              <div>
                <Background herocount={herocount} />
                <Navbar />
                <Welcome
                  herodata={herodata[herocount]}
                  herocount={herocount}
                  setherocount={setherocount}
                />
              </div>
            </section>
            <section id="about">
              <About />
            </section>
            <hr />
            <section id="Features">
              <Features />
            </section>
            <section id="footer">
              <Footer />
            </section>
          </>
        } />
        <Route path="/Loco_Status" element=
        {
          <>
          <Loco_Status />
          </>
        } 
        />
        <Route path="/Loco_details" element=
        {
          <>
          <Loco_details />
          </>
        } 
        />
        <Route path="/Loco_details_post" element=
        {
          <>
          <Loco_details_post />
          </>
        } 
        />
        <Route path="/Coach_details" element=
        {
          <>
          <Coach_details />
          </>
        } 
        />
        <Route path="/Coach_details_post" element=
        {
          <>
          <Coach_details_post />
          </>
        } 
        />
        <Route path="/Railfan_details" element=
        {
          <>
          <Railfan_details />
          </>
        } 
        />
        <Route path="/Railfan_details_post" element=
        {
          <>
          <Railfan_details_post />
          </>
        } 
        />
      </Routes>
    </Router>
  );
};

export default App;
