
import {useState, useEffect } from 'react';
import { api } from '../api/data.jsx';
import { Link } from "react-router-dom";
import moment from "moment";


export default function LeagueRecords(){

    const [leagueRecords, setLeagueRecords] = useState([]);
    const [selectedLeagueRecord, setSelectedLeagueRecord] = useState('total-league-wages');

    useEffect(()=>{
        async function fetch(){
            const query = 'total-league-wages';
            const fetchedLeagueRecords = await getLeagueRecords(query);
            setLeagueRecords(fetchedLeagueRecords);
        }     
        fetch();     
    },[]);


    async function handleLeagueRecordChange(e){
        e.preventDefault();
        const query = e.target.value;
        setSelectedLeagueRecord(query);

        const fetchedLeagueRecords = await getLeagueRecords(query);
        setLeagueRecords(fetchedLeagueRecords);
    }

    const LeagueWages = leagueRecords.map(record => {
        return (
            <div className='records' key={record.league_id}>
                <h3>{record.league_name}</h3>
                <p>{record.total_wages}</p>
            </div>
        );
    }) 

    const LeaguePlayers = leagueRecords.map(record => {
        return (
            <div className='records' key={record.league_id}>
                <h3>{record.league_name}</h3>
                <p>{record.no_of_players}</p>
            </div>
        );
    })

    const LeagueProfit = leagueRecords.map(record => {
        return (
            <div className='records' key={record.league_id}>
                <h3>{record.league_name}</h3>
                <p>{record.league_profit}</p>
            </div>
        );
    })

    

    return (
        <>
            <div className='home-grid-item  league-records-container '>
                <h1>League Records</h1>
                <select name="league-records" value={selectedLeagueRecord} onChange={(e) => handleLeagueRecordChange(e)}> 
                    <option value="total-league-wages">Highest League Wages</option>
                    <option value="total-league-players">Most Players</option>
                    
                </select>
                <div className ='league-records'>
                    {selectedLeagueRecord == 'total-league-wages' ? LeagueWages : null}
                    {selectedLeagueRecord == 'total-league-players' ? LeaguePlayers : null}
                </div>
            </div>
        </>
    );
}

async function getLeagueRecords(query){
    try{
        const response = await api.post('/league-records', {query: query});
        return response.data;
    }catch(error){
        console.error(error);
    }
}



