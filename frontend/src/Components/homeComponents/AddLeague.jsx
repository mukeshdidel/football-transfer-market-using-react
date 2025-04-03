import {useState, useEffect } from 'react';
import { api } from '../api/data.jsx';


export default function AddLeague(){

    const [leagueName , setLeagueName] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')

    async function handleLeagueSubmit(e){
        e.preventDefault();
        const data = { leagueName,  country, description }
        await addLeague(data)

        setLeagueName('');
        setCountry('');
        setDescription('');
    }

    return (
        <>
        <div className='add-league'>
            <h2>Add League</h2>
            <form >
                <label>League Name</label>
                <input type='text' name='leagueName' value={leagueName} onChange={e=> setLeagueName(e.target.value)} required />
                <label>Counrty</label>
                <input type='text' name='Country' value={country} onChange={e=>setCountry(e.target.value)} required />
                <label>Description</label>
                <textarea id="message" name="message" rows="4" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
                <button type='submit' onClick={e=>handleLeagueSubmit(e)}>Add League</button>
            </form>
        </div>
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