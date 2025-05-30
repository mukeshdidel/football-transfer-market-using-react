import { useState, useEffect } from 'react';
import { api } from './api/data.jsx';
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { useAuth } from './AuthContext.jsx';



import './styles/leagues.css';

export default function Leagues() {
    const {token,user} = useAuth();
    const [leagues, setLeagues] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        async function fetch() {
            const fetchedLeagues = await getAllLeagues(input,token);
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
                            <div className='card-div'>
                                <div>
                                    <h4>{league.league_name}</h4>
                                    <p>{league.country}</p>  
                                </div>
                                <div>
                                    <img src={league.league_url} alt={league.league_name}/>
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




async function getAllLeagues(input,token) {
    try {
        const response = await api.get(`/leagues?search=${input}%`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error('Error fetching leagues', error);
        throw error;
    }
}
