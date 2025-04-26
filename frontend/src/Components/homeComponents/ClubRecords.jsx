import {useState, useEffect } from 'react';
import { api } from '../api/data.jsx';
import { Link } from "react-router-dom";
import moment from "moment";

import { useAuth } from '../AuthContext.jsx';



export default function ClubRecords(){
    
    const {token,user} = useAuth();
    
    
    const [clubRecords, setClubRecords] = useState([]);
    const [selectedClubRecord, setSelectedClubRecord] = useState('total-club-wages');

        useEffect(()=>{
            async function fetch(){
                const query = 'total-club-wages';
                const fetchedClubRecords = await getClubRecords(query,token);
                setClubRecords(fetchedClubRecords);
            
            }     
            fetch();     
        },[]);


        async function handleClubRecordChange(e){
            e.preventDefault();
            const query = e.target.value;
            setSelectedClubRecord(query);
    
            const fetchedClubRecords = await getClubRecords(query,token);
            setClubRecords(fetchedClubRecords);

        }
    

        const ClubWages = clubRecords.map(record => {
            return (
                <div className='records' key={record.club_id}>
                    <h3>{record.club_name}</h3>
                    <p>{record.total_wages}</p>
                </div>
            );
        }) 

        const ClubProfit = clubRecords.map(record => {
            return (
                <div className='records' key={record.club_id}>
                    <h3>{record.club_name}</h3>
                    <p>{record.total_profit}</p>
                </div>
            );
        })

        const ClubLoss = clubRecords.map(record => {
            return (
                <div className='records' key={record.club_id}>
                    <h3>{record.club_name}</h3>
                    <p>{record.total_loss}</p>
                </div>
            );
        })

        const ClubNetSpent = clubRecords.map(record => {
            return (
                <div className='records' key={record.club_id}>
                    <h3>{record.club_name}</h3>
                    <p>{record.total_net_spent}</p>
                </div>
            );
        })

        const ClubAvgAge = clubRecords.map(record => {
            return (
                <div className='records' key={record.club_id}>
                    <h3>{record.club_name}</h3>
                    <p>{record.avg_age}</p>
                </div>
            );
        })


        return (

            <div className='home-grid-item  club-records-container '>
                <h1>CLub Records</h1>
                <select name="club-records" value={selectedClubRecord} onChange={(e) => handleClubRecordChange(e)}> 
                    <option value="total-club-wages">Highest Club Wages</option>
                    <option value="total-club-profit">Highest Sellers</option>
                    <option value="total-club-loss">Highest spenders</option>
                    <option value="total-club-net-spent">Highest Net spenders</option>
                    <option value="club-avg-age">Average Age</option>
                </select>
                <div className ='league-records'>
                    {selectedClubRecord == 'total-club-wages' ? ClubWages : null}
                    {selectedClubRecord == 'total-club-profit' ? ClubProfit : null}
                    {selectedClubRecord == 'total-club-loss' ? ClubLoss : null}
                    {selectedClubRecord == 'total-club-net-spent' ? ClubNetSpent : null}
                    {selectedClubRecord == 'club-avg-age'? ClubAvgAge : null}
                </div>
            </div>
        );

}

async function getClubRecords(query,token){
    try{
        const response = await api.post('/club-records', {query: query}, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    }catch(error){
        console.error(error);
    }
}