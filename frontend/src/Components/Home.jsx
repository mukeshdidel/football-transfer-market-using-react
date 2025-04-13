
import './styles/home.css';
import {useState, useEffect } from 'react';
import { api } from './api/data.jsx';


import MakeTransfer from './homeComponents/MakeTransfer.jsx'
import AddLeague from './homeComponents/AddLeague.jsx';
import TransferNews from './homeComponents/TransferNews.jsx';
import LeagueRecords from './homeComponents/LeagueRecords.jsx';
import ClubRecords from './homeComponents/ClubRecords.jsx';
import PlayerRecords from './homeComponents/PlayerRecords.jsx';
import Formation from './homeComponents/Formation.jsx';

export default function Home(){


    return (
        <>
        <div className='home-div'>
            <MakeTransfer/>
            <AddLeague/>
            <TransferNews/>
            <LeagueRecords/>
            <ClubRecords/>
            <PlayerRecords/>
            <Formation/>
            <div className='home-grid-item info'>
                <p>Welcome to the Global Football Transfer Market! Explore player transfers, club finances, and the latest deals across leagues.</p>

            </div>
        </div>

        </>
    );
}

