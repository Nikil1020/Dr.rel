import './Footer.css'; // You can create a separate CSS file for the footer styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text"><span>Dr.</span>rel</h1>
          <p>
            Your ultimate destination for exploring the world of railways and railfanning!
          </p>
          <div className="contact">
            <span><i className="fas fa-phone"></i> &nbsp; +91 766431235</span>
            <span><i className="fas fa-envelope"></i> &nbsp; nikilnatarajan10@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Dr.rel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
