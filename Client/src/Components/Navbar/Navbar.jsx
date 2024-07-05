import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const customstyle = {
        color: "#f44336"
  }
  return (
    <div>
    <header className='header'>
        <a href="/" className='logo'><span style = {customstyle}>Dr.</span>rel</a>

        <nav className='navbar'>
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#Features">Features</a>
            <a href="#footer">Contacts</a>
        </nav>
    </header>
    </div>
  )
}

export default Navbar