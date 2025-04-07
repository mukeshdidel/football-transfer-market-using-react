

import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {api} from './api/data.jsx';
import moment from "moment";



export default function Player(){
    const { id } = useParams();

    const [playerInfo, setPlayerInfo] = useState([]);
    const [playerJourney, setPlayerJourney] = useState([]);

    useEffect(()=>{
        async function fetch(){
            const fetchedPlayerInfo = await getPlayerInfo(id);
            setPlayerInfo(fetchedPlayerInfo.playerInfo[0]);
            setPlayerJourney(fetchedPlayerInfo.playerJourney);

            console.log(fetchedPlayerInfo.playerInfo[0]);
            console.log(fetchedPlayerInfo.playerJourney);

            
        }
        fetch();
    },[id])

    function playerPositionCalculator(posi){
        if(posi === 'cm'){
            return 'Central Midfielder';
        }
        else if(posi === 'cb'){
            return 'Center Back';
        }
        else if(posi === 'lb'){
            return 'Left Back';
        }
        else if(posi === 'gk'){
            return 'goalkeeper';
        }
        else if(posi === 'rb'){
            return 'Right Back';
        }
        else if(posi === 'dm'){
            return 'Defensive Midfielder';
        }
        else if(posi === 'cam'){
            return 'Attacking Midfielder';
        }
        else if(posi === 'lw'){
            return 'Left Winger';
        }
        else if(posi === 'rw'){
            return 'Right Winger';
        }
        else if(posi === 'cf'){
            return 'Center Forward';
        }

    }

    return (
        <>
        <div className='player-info'>                
            <div className='player-description' style={{backgroundImage: `url(${playerInfo.player_url})` }}>
                <h2>{playerInfo.player_name}</h2>
                <p>{playerPositionCalculator(playerInfo.position)}</p>
                <p>date of birth: {moment(playerInfo.date_of_birth).format("DD MMMM YYYY")}</p>
                <p>Nationality: {playerInfo.nationality}</p>
            </div>
            <div className='player-contract'>
                <h2>Contract Details</h2>
                <p>Club: {playerInfo.club_name}</p>
                <p>contracted till: {moment(playerInfo.end_date).format("DD MMMM YYYY")}</p>
                <p>wages: {playerInfo.wages}</p>
            </div>
            <div className='player-transfers-div'>
                <h2>player career</h2>
                <div>
                    <table>
                        <tbody>
                            {playerJourney.map(transfer => <tr key={transfer.transfer_id}>
                                <td>{transfer.from_club_name}  {`➡️`}  {transfer.to_club_name}</td>
                                <td>{moment(transfer.transfer_date).format("DD MMMM YYYY")}</td>
                                <td>{transfer.transfer_fee + ' $' }</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
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



