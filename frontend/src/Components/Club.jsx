
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {api} from './api/data.jsx';



export default function Club(){
    const { id } = useParams();

    const [clubInfo, setClubInfo] = useState([]);
    const [playersBYclub, setPlayersBYclub] = useState([]);
    const [formPlayerName, setFormPlayerName] = useState('');

    const [formFinanceYear, setFormFinanceYear] = useState('');
    const [formFinanceRevenue, setFormFinanceRevenue] = useState('');

    useEffect(()=>{
        async function fetch(){
            const fetchedClubInfo = await getClubInfo(id);
            setClubInfo(fetchedClubInfo.clubObj);
            setPlayersBYclub(fetchedClubInfo.playersObj);
        }
        fetch();
    },[id])

    async function hanldeClubSubmit(e){
        e.preventDefault();
        if (!formPlayerName) {
            alert("Please fill in all fields.");
            return;
        }
        const playerData = {formPlayerName,id, }
        await addclub(playerData);

        setFormPlayerName('');

        const fetchedClubInfo = await getClubInfo(id);
        setClubInfo(fetchedClubInfo.clubObj);
        setPlayersBYclub(fetchedClubInfo.playersObj);
    }

    async function handleFinanceSubmit(e){
        e.preventDefault();
        
        if(!formFinanceRevenue || !formFinanceRevenue){
            alert("Please fill in all fields.");
            return;
        }

        const financeData = {formFinanceYear, formFinanceRevenue, id }
        await addFinance(financeData);

        setFormFinanceYear('');
        setFormFinanceRevenue('');

        const fetchedClubInfo = await getClubInfo(id);
        setClubInfo(fetchedClubInfo.clubObj);
        setPlayersBYclub(fetchedClubInfo.playersObj);
    }


    return (
        <>
        <div className='club-info'>                
            <div className='club-finance'>
                <h2>{clubInfo[0]?.club_name || "Loading..."}</h2>
            </div>
            <div className='club-finance'>
                <h3>finances</h3>
                <form className='finance-form' onSubmit={e =>handleFinanceSubmit(e)}>
                    <label>Year</label>
                    <input type='number' name='financeYear' value={formFinanceYear} onChange={e => setFormFinanceYear(e.target.value)} required />  
                    <label>Revenue</label>
                    <input type='number' name='financeRevenue' value={formFinanceRevenue} onChange={e => setFormFinanceRevenue(e.target.value)} required />
                    <button type='submit'>+</button>
                </form>
                <table className='finance-table'>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Revenue</th>
                            <th>Sales</th>
                            <th>Expenses</th>
                            <th>Net Spent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clubInfo.map(club => {
                            return <tr key={club.finance_id}>
                                <td>{club.finance_year}</td>
                                <td>{club.revenue}</td>
                                <td>{club.sales}</td>
                                <td>{club.expenses}</td>
                                <td>{club.net_spent}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <form className='player-form' onSubmit={e=>hanldeClubSubmit(e)}>
                <h2>Add Player</h2>
                <label>Player Name</label>
                <input type='text' name='playerName' value={formPlayerName} onChange={e => setFormPlayerName(e.target.value)} required />

                <button type='submit'>Submit Player</button>
            </form>
            <ul className='playersbyclub-list'>
                {playersBYclub.map(player => <li key={player.player_id}>
                    <div>
                        <h4>{player.player_name}</h4>
                        <p>{player.position}</p>
                    </div>
                </li>)}
            </ul>
            <div className='club-transfers-div'>
                <h2>Club Transfers</h2>
            </div>
        </div>
        </>
    );
}


async function getClubInfo(clubId){
    try{
        const response = await api.get(`/clubs/${clubId}`);
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
