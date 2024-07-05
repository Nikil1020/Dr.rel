import './Features.css'
import { Link } from 'react-router-dom';

const Featuredata = (props) => {
  return (
    <div className='f-card'>
       <div className="f-image">
          <img src={props.image} alt="" />
       </div>
       <Link to = {props.link}><h4>{props.heading}</h4></Link>
       <p>{props.text}</p>
    </div>
  );
}

export default Featuredata