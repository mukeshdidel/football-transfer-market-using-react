import { useState, useEffect } from 'react';
import { api } from './api/data.jsx';
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { useAuth } from './AuthContext.jsx';



import './styles/players.css';

export default function Players() {
    const {token,user} = useAuth();
    
    const [players, setPlayers] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        async function fetch() {
            const fetchedPlayers = await getAllPlayers(input,token);
            setPlayers(fetchedPlayers);
        }
        fetch();
    }, [input]);







    return (
        <>
        <div className="players-div">
            <div className='players-list'>
                <h2>Players</h2>
                <div className='search-bar'>
                <input type="text" onChange={e => setInput(e.target.value)} placeholder='search' value={input} />                    
                </div>
                <ul >
                    {players.map(player => <li key={player.player_id}>
                            <NavLink to={`/players/${player.player_id}`}>
                            <div className='card-div'>
                                <h4>{player.player_name}</h4>

                                <p>{player.club_name}</p>

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



async function getAllPlayers(input,token) {
    try {
        const response = await api.get(`/players?search=${input}%`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error('Error fetching leagues', error);
        throw error;
    }
}