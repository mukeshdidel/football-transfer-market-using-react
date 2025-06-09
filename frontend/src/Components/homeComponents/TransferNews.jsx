import {useState, useEffect } from 'react';
import { api } from '../api/data.jsx';
import { Link } from "react-router-dom";
import moment from "moment";

import whiteArrow from '../../assets/white-arrow-png-41955.png';

import { useAuth } from '../AuthContext.jsx';


export default function TransferNews(){
    const {token,user} = useAuth();
    const [Last5transfers, setLast5TransferNews] = useState([]);

    useEffect(()=>{
        async function fetch(){
            let fetchedTransferNews = await getTransferNews(token);
            fetchedTransferNews = fetchedTransferNews.filter(transfer => transfer.transfer_id > fetchedTransferNews.length - 5);
            setLast5TransferNews(fetchedTransferNews);
        }
        fetch();
    },[]);

    return (
        <>
        <div className='transfer-wrapper home-grid-item'>
            <h2>Transfer News</h2>
            <div className='slider'>
                {
                    Last5transfers.map(transfer => (
                        <div key={'slider' + transfer.transfer_id} id={'slider' + transfer.transfer_id} className='transfer-news-item' style={{backgroundImage: `url(${transfer.player_url})` }} >

                            <h2>{transfer.player_name}</h2>

                            <h3><img src={transfer.from_club_url} alt={transfer.from_club_name}/> <img src={whiteArrow} alt="" />  {<img src={transfer.to_club_url} alt={transfer.to_club_name} />} </h3>
                            <p>Transfer Fee: {transfer.transfer_fee}</p>
                            <p>{moment(transfer.transfer_date).format('MMMM Do YYYY')}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    );
}



async function getTransferNews(token){
    try{
        const response = await api.get('/transfers', { headers: { Authorization: `Bearer ${token}` } })
        return response.data;
    }
    catch(error){
        console.error('Error fetching transfer news', error)
    }
}

