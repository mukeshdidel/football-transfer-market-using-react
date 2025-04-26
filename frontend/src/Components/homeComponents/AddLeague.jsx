import {useState, useEffect } from 'react';
import { api } from '../api/data.jsx';

import { useAuth } from '../AuthContext.jsx';


export default function AddLeague(){
    const {token,user} = useAuth();
    
    const [leagueName , setLeagueName] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')
    const [leagueURL, setLeagueURL] = useState('');

    async function handleLeagueSubmit(e){
        e.preventDefault();
        if(!leagueName || !country || !description || !leagueURL){
            alert('Please fill all the fields')
            return;
        }
        const data = { leagueName,  country, description, leagueURL}
        await addLeague(data, token)

        setLeagueName('');
        setCountry('');
        setDescription('');
        setLeagueURL('');
    }

    return (
        <>
            <form className='add-league home-grid-item'>            
                <h1>Add League</h1>
                <label>League Name</label>
                <input type='text' name='leagueName' value={leagueName} onChange={e=> setLeagueName(e.target.value)} required />
                <label>Counrty</label>
                <input type='text' name='Country' value={country} onChange={e=>setCountry(e.target.value)} required />
                <label>Description</label>
                <textarea id="message" name="message" rows="4" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
                <label>League Logo URL</label>
                <input type='text' name='leagueURL' value={leagueURL} onChange={e=>setLeagueURL(e.target.value)} required />

                <button type='submit' onClick={e=>handleLeagueSubmit(e)}>Add League</button>
            </form>
        </>
    );
}

async function addLeague(league, token) {
    try {
        const response = await api.post('/add-league', league, { headers: { Authorization: `Bearer ${token}` } });
        alert(response.data.message || 'League added successfully');
    } 
    catch (error) {
        if (error.response?.data?.error) {
            alert(`Error: ${error.response.data.error}`);
        }
    }
}