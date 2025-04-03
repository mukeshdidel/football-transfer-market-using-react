
import './styles/home.css';
import {useState, useEffect } from 'react';
import { api } from './api/data.jsx';


import MakeTransfer from './homeComponents/MakeTransfer.jsx'
import AddLeague from './homeComponents/AddLeague.jsx';

export default function Home(){


    return (
        <>
        <div className='home-div'>
            <MakeTransfer/>
            <AddLeague/>
        </div>

        </>
    );
}

