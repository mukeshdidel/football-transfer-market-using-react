import { useState, useEffect } from 'react';
import { api } from './api/data.jsx';
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";


import './styles/leagues.css';

export default function Leagues() {
    const [leagues, setLeagues] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        async function fetch() {
            const fetchedLeagues = await getAllLeagues(input);
            setLeagues(fetchedLeagues);
        }
        fetch();
    }, [input]);





    return (
        <>
        <div className="leagues-div">
            <div className='leagues-list'>
                <h2>Leagues</h2>
                <div className='search-bar'>
                    <input type="text" onChange={e => setInput(e.target.value)} placeholder='search' value={input} />                    
                </div>
                <ul >
                    {leagues.map(league => <li key={league.league_id}>
                            <NavLink to={`/leagues/${league.league_id}`}>
                            <div className='league'>
                                <h4>{league.league_name}</h4>
                                <p>{league.country}</p>
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

async function getAllLeagues(input) {
    try {
        const response = await api.get(`/leagues?search=${input}%`);
        return response.data;
    } catch (error) {
        console.error('Error fetching leagues', error);
        throw error;
    }
}
