import './index.css'
import {Link} from 'react-router-dom'

const HomePage = () => {
    return (
        <div className="homeContainer">
        <h1 className="heading">ShopMart</h1>
        <div className="buttons">
        <Link to="/UserRegistration"><button type="button" className="button">Register / Login as User</button></Link>
                
                <Link to="/AdminRegistration"><button type="button" className="button">Register / Login as Admin</button></Link>
            </div>
        </div>
    );
};

export default HomePage