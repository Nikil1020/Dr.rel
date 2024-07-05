import './Welcome.css'
import arrow from '../../assets/arrow.png'

const Welcome = ({herodata, herocount, setherocount}) => {
  return (
    <div className='welcome'>
           <div className="welcome-text">
               <p>{herodata.text1}</p>
               <p>{herodata.text2}</p>
           </div>
           <div className="welcome-explore">
            <p>Explore the features</p>
            <img src={arrow} alt="" />
           </div>
           <div className="welcome-dot-play">
            <ul className="welcome-dots">
                <li onClick={() => setherocount(0)} className = {herocount === 0 ? "welcome-dot orange" : "welcome-dot"}></li>
                <li onClick={() => setherocount(1)} className= {herocount === 1 ? "welcome-dot orange" : "welcome-dot"}></li>
                <li onClick={() => setherocount(2)} className= {herocount === 2 ? "welcome-dot orange" : "welcome-dot"}></li>
            </ul>
           </div>
    </div>
  )
}

export default Welcome