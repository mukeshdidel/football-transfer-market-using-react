import { Link, NavLink } from "react-router-dom";
import './styles/navBar.css';

export default function NavBar(){
    return (
            <ul className="nav-bar">
                <li><NavLink to="/" className={({isActive})=> isActive ? "active-link" : "" }>Home</NavLink></li>
                <li><NavLink to="/leagues" className={({isActive})=> isActive ? "active-link" : "" }>Leagues</NavLink></li>
                <li><NavLink to="/clubs" className={({isActive})=> isActive ? "active-link" : "" }>Clubs</NavLink></li>
                <li><NavLink to="/players" className={({isActive})=> isActive ? "active-link" : "" }>Players</NavLink></li>
                <li><NavLink to="/transfers" className={({isActive})=> isActive ? "active-link" : "" }>transfers</NavLink></li>
            </ul>
    );
}