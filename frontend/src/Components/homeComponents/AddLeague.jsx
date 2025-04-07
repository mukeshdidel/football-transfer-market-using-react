import {useState, useEffect } from 'react';
import { api } from '../api/data.jsx';


export default function AddLeague(){

    const [leagueName , setLeagueName] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')
    const [leagueURL, setLeagueURL] = useState();

    async function handleLeagueSubmit(e){
        e.preventDefault();
        if(!leagueName || !country || !description || !leagueURL){
            alert('Please fill all the fields')
            return;
        }
        const data = { leagueName,  country, description, leagueURL}
        await addLeague(data)

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
                <input type='url' name='leagueURL' value={leagueURL} onChange={e=>setLeagueURL(e.target.value)} required />

                <button type='submit' onClick={e=>handleLeagueSubmit(e)}>Add League</button>
            </form>
        </>
    );
}

async function addLeague(league){
    try{
        console.log()
        const response = await api.post('/add-league', league)
        alert('League added successfully', response.data)
    }
    catch(error){
        console.error('Error adding league', error)
    }
}