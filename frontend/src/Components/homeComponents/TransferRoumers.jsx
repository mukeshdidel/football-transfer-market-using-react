import {useState, useEffect } from 'react';
import { api } from '../api/data.jsx';
import { Link } from "react-router-dom";
import moment from "moment";


export default function TransferRoumers(){

    const [FiveRoumers, setFiveRoumers] = useState([]);

    useEffect(()=>{
        async function fetch(){
            let fetchedTransferRoumers = await getTransferRoumers();
            fetchedTransferNews = fetchedTransferNews.filter(transfer => transfer.transfer_id > fetchedTransferNews.length - 5);
            setLast5TransferNews(fetchedTransferNews);
        }
        fetch();
    });

    return (
        <>
        <div className='transfer-wrapper home-grid-item'>
            <h2>Transfer News</h2>
            <div className='slider'>
                {
                    Last5transfers.map(transfer => (
                        <div key={'slider' + transfer.transfer_id} id={'slider' + transfer.transfer_id} className='transfer-news-item' style={{backgroundImage: `url(${transfer.player_url})` }} >

                            <h2>{transfer.player_name}</h2>

                            <h3><img src={transfer.from_club_url} alt={transfer.from_club_name}/> <img src="https://www.freeiconspng.com/uploads/white-arrow-image-png-14.png" alt="" />  {<img src={transfer.to_club_url} alt={transfer.to_club_name} />} </h3>
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



async function getTransferNews(){
    try{
        const response = await api.get('/transfers')
        return response.data;
    }
    catch(error){
        console.error('Error fetching transfer news', error)
    }
}

