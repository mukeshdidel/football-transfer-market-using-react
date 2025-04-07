

import {useState, useEffect } from 'react';

import { api } from '../api/data.jsx';

export default function MakeTransfer(){

    const [FLeagues, setFLeagues] = useState([]);
    const [FClubs, setFClubs] = useState([]);
    const [TPlayers, setTPlayers] = useState([]);

    const [TLeagues, setTLeagues] = useState([]);
    const [TClubs, setTClubs] = useState([]);

    const [FSLeagueID, setFSLeagueID] = useState('');
    const [FSClubID, setFSClubID] = useState('');
    const [TSPlayerID, setTSPlayerID] = useState('');

    const [TSLeagueID, setTSLeagueID] = useState('');
    const [TSClubID, setTSClubID] = useState('');    
    // FSLeagueID = from selected league id
    // TSLeagueID = to selected league id 

    const [transferFee, setTransferFee] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [wages, setWages] = useState('')

    useEffect(()=>{
        async function fetch(){
            const fetchedLeagues = await getTransferDivLeagues();
            setFLeagues(fetchedLeagues);
            setTLeagues(fetchedLeagues);
        }
        fetch();
    },[])

    useEffect(()=>{
        async function fetch(){
            const fetchedClubs = await getTransferDivClubs(FSLeagueID);
            setFClubs(fetchedClubs);
        }
        fetch(); 
    },[FSLeagueID])

    useEffect(()=>{
        async function fetch(){
            const fetchedPlayers = await getTransferDivPlayers(FSClubID);
            setTPlayers(fetchedPlayers);
        }
        fetch(); 

    },[FSClubID])

    useEffect(()=>{
        async function fetch(){
            const fetchedClubs = await getTransferDivClubs(TSLeagueID);
            setTClubs(fetchedClubs);
        }
        fetch(); 
    },[TSLeagueID])


    async function handleTransferSubmit(e){
        e.preventDefault();
        if (!TSClubID || !TSPlayerID) {
            alert("Please select all fields.");
            return;
        }
        const player_id = TSPlayerID;
        const from_club_id = FSClubID;
        const to_club_id = TSClubID;
        const transfer_fee = transferFee;
        const start_date = startDate;
        const end_date = endDate;
        const player_wages = wages;

        const transferData = {
            player_id,
            from_club_id,
            to_club_id,
            transfer_fee,
            start_date,
            end_date,
            player_wages
        }
        console.log('transferData:', transferData);

        await postTransferDetails(transferData);

        setTransferFee('');
        setStartDate('');
        setEndDate('');
        setWages('');


    }

    return (
        <>
        <form className='home-grid-item make-transfer-div'>                
            <h1>Make Transfer</h1>
            <h2>select player</h2>
            <div>
                <select name="from-leagues" value={FSLeagueID} onChange={e=> setFSLeagueID(e.target.value)}>
                    <option value="">Select League</option>
                    {FLeagues.map(league => {
                        return <option key={league.league_id} value={league.league_id}>{league.league_name}</option>
                    })}
                </select>
                <select name="from-clubs" value={FSClubID} onChange={e=> setFSClubID(e.target.value)}>
                    <option value="">Select Club</option>
                    {FClubs?.map(club => {
                        return <option key={club.club_id} value={club.club_id}>{club.club_name}</option>
                    })}
                </select>
                <select name="players" value={TSPlayerID} onChange={e=> setTSPlayerID(e.target.value)}>
                    <option value="">Select Player</option>
                    {TPlayers?.map(player => {
                        return <option key={player.player_id} value={player.player_id}>{player.player_name}</option>
                    })}
                </select>
            </div>

            <h2>select destination club</h2>
            <div>
            <select name="leagues" value={TSLeagueID} onChange={e=> setTSLeagueID(e.target.value)}>
                <option value="">Select League</option>
                {TLeagues.map(league => {
                    return <option key={league.league_id} value={league.league_id}>{league.league_name}</option>
                })}
            </select>
                <select name="clubs" value={TSClubID} onChange={e=> setTSClubID(e.target.value)}>
                    <option value="">Select Club</option>
                    {TClubs?.map(club => {
                        return <option key={club.club_id} value={club.club_id}>{club.club_name}</option>
                    })}
                </select>
            </div>
            <h2>transfer details</h2>
            <div>
                <label>transfer fee</label>
                <input placeholder='transfer fee' type="number" value={transferFee} onChange={e=>setTransferFee(e.target.value)} /><br/>
                <label>contract start date</label>
                <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} /><br/>
                <label>contract end date</label>
                <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} /><br/>
                <label>On wages</label>
                <input placeholder='wages' type="number" value={wages} onChange={e=>setWages(e.target.value)} />
            </div>  



            <button type="submit" onClick={e=>handleTransferSubmit(e)}>Make Transfer</button>
        </form>                  
        </>
    );
}


async function  getTransferDivLeagues(){
    try {
        const response = await api.get('/leagues?search=%');
        return response.data;
    } catch (error) {
        console.error('Error fetching transfer div data', error);
    }
} 

async function getTransferDivClubs(leagueId) {
    try{
        const response = await api.get(`/leagues/${leagueId}`);
        return response.data.clubsObj;
    }
    catch (error) {
        console.error('Error fetching transfer div club data', error);
    }
}
async function getTransferDivPlayers(clubId) {
    try{
        const response = await api.get(`/clubs/${clubId}`);
        return response.data.playersObj;
    }
    catch (error) {
        console.error('Error fetching transfer div club data', error);
    }
}


async function postTransferDetails(transferData){
    try {
        console.log('transferData:', transferData);
        await api.post('/post-transfers', transferData);
        alert('Transfer successful!');
    } catch (error) {
        console.error('Error posting transfer details', error);
    }

}