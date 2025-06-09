
import './styles/home.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


import MakeTransfer from './homeComponents/MakeTransfer.jsx'
import AddLeague from './homeComponents/AddLeague.jsx';
import TransferNews from './homeComponents/TransferNews.jsx';
import LeagueRecords from './homeComponents/LeagueRecords.jsx';
import ClubRecords from './homeComponents/ClubRecords.jsx';
import PlayerRecords from './homeComponents/PlayerRecords.jsx';
import Formation from './homeComponents/Formation.jsx';


export default function Home(){
    const navigate = useNavigate();
    const {token,user} = useAuth();

    useEffect(() => {
        console.log(user)
    },[])



    return (
        <>
        {
            token ?  
            <div className='home-div'>
                { user.is_admin && <MakeTransfer/> }
                { user.is_admin == 1 && <AddLeague/> }
                <TransferNews/>
                <LeagueRecords/>
                <ClubRecords/>
                <PlayerRecords/>
                <Formation/>
                <div className='home-grid-item info'>
                    <p>Welcome to the Global Football Transfer Market! Explore player transfers, club finances, and the latest deals across leagues.</p>
                </div>
            </div> : null
        }
        </>
    );
}

