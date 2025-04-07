import { useState, useEffect } from 'react';
import { api } from './api/data.jsx';
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";


import './styles/clubs.css';

export default function Leagues() {
    const [clubs, setClubs] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        async function fetch() {
            const fetchedClubs = await getAllClubs(input);
            setClubs(fetchedClubs);
        }
        fetch();
    }, [input]);





    return (
        <>
        <div className="clubs-div">
            <div className='clubs-list'>
                <h2>Clubs</h2>
                <div className='search-bar'>
                <input type="text" onChange={e => setInput(e.target.value)} placeholder='search' value={input} />                    
                </div>
                <ul >
                    {clubs.map(club => <li key={club.club_id}>
                            <NavLink to={`/clubs/${club.club_id}`}>
                            <div className='card-div'>
                                <div>
                                    <h4>{club.club_name}</h4>
                                    <p>{club.founded_year}</p>   
                                </div> 
                                <div>
                                    <img src={club.club_url} alt={club.club_name}/>
                                </div>

                            </div>
                            </NavLink>
                        </li>)}
                </ul>

            </div>
            <Outlet />      
        </div>

        </>
    );
}

async function getAllClubs(input) {
    try {
        const response = await api.get(`/clubs?search=${input}%`);
        return response.data;
    } catch (error) {
        console.error('Error fetching clubs', error);
        throw error;
    }
}
