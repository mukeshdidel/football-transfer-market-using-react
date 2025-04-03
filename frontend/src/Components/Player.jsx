

import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {api} from './api/data.jsx';
import moment from "moment";



export default function Player(){
    const { id } = useParams();

    const [playerInfo, setPlayerInfo] = useState([]);

    useEffect(()=>{
        async function fetch(){
            const fetchedPlayerInfo = await getPlayerInfo(id);
            setPlayerInfo(fetchedPlayerInfo[0]);
        }
        fetch();
    },[id])

    function playerPositionCalculator(posi){
        if(posi === 'mf'){
            return 'Midfielder';
        }
        else if(posi === 'cb'){
            return 'Defender';
        }
        else if(posi === 'cf'){
            return 'forword';
        }
        else if(posi === 'gk'){
            return 'goalkeeper';
        }
    }

    return (
        <>
        <div className='player-info'>                
            <div className='player-description'>
                <h2>{playerInfo.player_name}</h2>
                <p>{playerPositionCalculator(playerInfo.position)}</p>
                <p>date of birth: {moment(playerInfo.date_of_birth).format("DD MMMM YYYY")}</p>
                <p>Nationality: {playerInfo.nationality}</p>


            </div>
            <div className='player-description'>
                <h2>Contract Details</h2>
                <p>Club: {playerInfo.club_name}</p>
                <p>contracted till: {moment(playerInfo.end_date).format("DD MMMM YYYY")}</p>
                <p>wages: {playerInfo.wages}</p>
            </div>
            <div className='player-transfers-div'>
                <h2>Player Transfers</h2>
            </div>
        </div>
        </>
    );
}


async function getPlayerInfo(playerId){
    try{
        const response = await api.get(`/players/${playerId}`);
        return response.data;
    }catch(error){
        console.error('Error fetching league info', error);
        throw error;
    }
}



async function addclub(clubData){
    try {
        const response = await api.post("/add-club", clubData);
    } catch (error) {
        console.error("Error adding club:", error);
    } 
}

async function addFinance(financeData){
    try {
        const response = await api.post("/add-finance", financeData);
    } catch (error) {
        console.error("Error adding finance:", error);
    }
}
