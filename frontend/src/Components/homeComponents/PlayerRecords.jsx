
import {useState, useEffect } from 'react';
import { api } from '../api/data.jsx';
import { Link } from "react-router-dom";
import moment from "moment";


import { useAuth } from '../AuthContext.jsx';


export default function PlayerRecords(){
    const {token,user} = useAuth();
    
    
    const [playerRecords, setPlayerRecords] = useState([]);
    const [selectedPlayerRecord, setSelectedPlayerRecord] = useState('highest-player-wages');



    useEffect(()=>{
        async function fetch(){
            const query = 'highest-player-wages';
            const fetchedPlayerRecords = await getPlayerRecords(query,token);
            setPlayerRecords(fetchedPlayerRecords);

        }
        fetch();
    },[]);

    async function handlePlayerRecordChange(e){
        e.preventDefault();
        const query = e.target.value;
        setSelectedPlayerRecord(query);

        const fetchedPlayerRecords = await getPlayerRecords(query, token);
        setPlayerRecords(fetchedPlayerRecords);
    }

    const PlayerWages = playerRecords.map(record => {
        return (
            <div className='records' key={record.player_id}>
                <h3>{record.player_name}</h3>
                <p>{record.wages}</p>
            </div>
        );
    }) 

    const PlayerCareerFee = playerRecords.map(record => {
        return (
            <div className='records' key={record.player_id}>
                <h3>{record.player_name}</h3>
                <p>{record.career_transfer_fee}</p>
            </div>
        );
    })

    const PlayerNoOfTransfers = playerRecords.map(record => {
        return (
            <div className='records' key={record.player_id}>
                <h3>{record.player_name}</h3>
                <p>{record.total_transfers}</p>
            </div>
        );
    })

    const PlayerTransferFee = playerRecords.map(record => {
        return (
            <div className='records' key={record.player_id}>
                <h3>{record.player_name}</h3>
                <p>{record.transfer_fee}</p>
            </div>
        );
    })

    return (
        <div className='home-grid-item  player-records-container '>
        <h1>Player Records</h1>
        <select name="player-records" value={selectedPlayerRecord} onChange={(e) => handlePlayerRecordChange(e)}> 
            <option value="highest-player-wages">Top Earners</option>
            <option value="highest-player-career-fee">Top Career Transfer Fees</option>
            <option value="player-no-of-transfers">Most number of Transfers</option>
            <option value="player-transfer-fee">Highest Transfer Fee</option>
        
        </select>
        <div className ='player-records' >
            {selectedPlayerRecord == 'highest-player-wages' ? PlayerWages : null}
            {selectedPlayerRecord == 'highest-player-career-fee' ? PlayerCareerFee : null}
            {selectedPlayerRecord == 'player-no-of-transfers'? PlayerNoOfTransfers : null}
            {selectedPlayerRecord == 'player-transfer-fee' ? PlayerTransferFee : null}

        </div>
    </div>
    );
}


async function getPlayerRecords(query, token){
    const response = await api.post('/player-records', { query: query }, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}