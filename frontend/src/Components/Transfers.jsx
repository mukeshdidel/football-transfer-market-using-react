import { useState, useEffect } from 'react';
import { api } from './api/data.jsx';
import { Link, NavLink } from "react-router-dom";
import moment from "moment";

import { useAuth } from './AuthContext.jsx';


import './styles/transfers.css';

export default function Players() {
    const {token,user} = useAuth();
    
    const [transfers, setTransfers] = useState([]);

    useEffect(() => {
        async function fetch() {
            const fetchedTransfers = await getAllTransfers(token);
            setTransfers(fetchedTransfers);
            console.log(fetchedTransfers);
        }
        fetch();
    }, []);

    return (
        <>
        <div className="transfers-div">
            <div className='transfers-list'>
                <h2>Transfers</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>from</th>
                            <th>to</th>
                            <th>date</th>
                            <th>Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transfers.map(transfer => <tr key={transfer.transfer_id}>
                            <td><Link to={`/players/${transfer.player_id}`}>{transfer.player_name}</Link></td>
                            <td><Link to={`/clubs/${transfer.from_club_id}`}>{transfer.from_club_name}</Link></td>
                            <td><Link to={`/clubs/${transfer.to_club_id}`}>{transfer.to_club_name}</Link></td>
                            <td>{moment(transfer.transfer_date).format("DD MMMM YYYY")}</td>
                            <td>{transfer.transfer_fee}</td>
                        </tr>
                        )}
                    </tbody>
                    </table>
            </div>   
        </div>
        </>
    );
}



async function getAllTransfers(token) {
    try {
        const response = await api.get(`/transfers`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error('Error fetching leagues', error);
        throw error;
    }
}