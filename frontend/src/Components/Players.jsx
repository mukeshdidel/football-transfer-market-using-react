import { useState, useEffect } from 'react';
import { api } from './api/data.jsx';
import { Link, NavLink } from "react-router-dom";

import './styles/players.css';

export default function Players(){

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        async function fetch() {
            const fetchedPlayers = await getAllPlayers();
            setPlayers(fetchedPlayers);
        }
        fetch();
    }, []);



    return (
        <>
        <div className="players-div">
            <ul className='players-list'>
                {players.map(player => <li key={player.player_id}>
                        <NavLink to={`/players/${player.player_id}`}>
                        <div>
                            <h4>{player.player_name}</h4>
                            <p>{player.club_name}</p>
                        </div>
                        </NavLink>
                    </li>)}
            </ul>
        </div>
        </>
    );
}



async function getAllPlayers() {
    try {
        const response = await api.get('/players');
        return response.data;
    } catch (error) {
        console.error('Error fetching leagues', error);
        throw error;
    }
}