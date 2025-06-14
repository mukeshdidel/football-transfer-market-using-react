import { Link, NavLink, useNavigate } from "react-router-dom";
import './styles/navBar.css';
import { useAuth } from './AuthContext';

export default function NavBar(){

    const { token, setToken} = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () => {

        localStorage.removeItem('token');
        setToken('');
        navigate('/login');
    
    };

    return (
            <ul className="nav-bar">
                <li><NavLink to="/" className={({isActive}) => isActive ? "active-link" : ""}>Home</NavLink></li>
                <li><NavLink to="/leagues" className={({isActive}) => isActive ? "active-link" : ""}>Leagues</NavLink></li>
                <li><NavLink to="/clubs" className={({isActive}) => isActive ? "active-link" : ""}>Clubs</NavLink></li>
                <li><NavLink to="/players" className={({isActive}) => isActive ? "active-link" : ""}>Players</NavLink></li>
                <li><NavLink to="/transfers" className={({isActive}) => isActive ? "active-link" : ""}>Transfers</NavLink></li>
                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>  
            </ul>
    );
}