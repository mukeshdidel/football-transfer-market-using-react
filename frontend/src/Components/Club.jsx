
import {useParams, NavLink} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {api} from './api/data.jsx';



export default function Club(){
    const { id } = useParams();

    const [clubInfo, setClubInfo] = useState({});
    const [clubFinance, setClubFinance] = useState([]);
    const [playersBYclub, setPlayersBYclub] = useState([]);    
    const [formFinanceYear, setFormFinanceYear] = useState('');
    const [formFinanceRevenue, setFormFinanceRevenue] = useState('');
    
    
    const [formPlayerName, setFormPlayerName] = useState('');
    const [formPlayerNation, setFormPlayerNation] = useState('');
    const [formPlayerDOB, setFormPlayerDOB] = useState('');
    const [formPlayerStartDate, setFormPlayerStartDate] = useState('');
    const [formPlayerEndDate, setFormPlayerEndDate] = useState('');
    const [formPlayerWages, setFormPlayerWages] = useState('');
    const [formPlayerPosi, setFormPlayerPosi] = useState('');



    useEffect(()=>{
        async function fetch(){

            const fetchedClubInfo = await getClubInfo(id);
            
            setClubInfo(fetchedClubInfo.clubObj);
            setClubFinance(fetchedClubInfo.clubFinance);
            setPlayersBYclub(fetchedClubInfo.playersObj);
        }
        fetch();
    },[id])

    async function hanldePlayerSubmit(e){
        e.preventDefault();

        const playerData = {id,formPlayerName,formPlayerNation,formPlayerDOB,formPlayerStartDate,formPlayerEndDate,formPlayerWages, formPlayerPosi}
        await addPlayer(playerData);

        setFormPlayerName('');
        setFormPlayerDOB('');
        setFormPlayerEndDate('');
        setFormPlayerNation('');
        setFormPlayerStartDate('');
        setFormPlayerWages('');
    

        const fetchedClubInfo = await getClubInfo(id);


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


        setClubFinance(fetchedClubInfo.clubFinance);

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
                        {clubFinance.map(club => {
                            return <tr key={club?.finance_id}>
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
            <form className='player-form' onSubmit={e=>hanldePlayerSubmit(e)}>
                <h2>Add Player</h2>
                <label>Player Name</label>
                <input type='text' name='playerName' value={formPlayerName} onChange={e => setFormPlayerName(e.target.value)} required />
                <label>Date of bitth</label>
                <input type='date' name='playerDOB' value={formPlayerDOB} onChange={e => setFormPlayerDOB(e.target.value)} required />
                <label>Nationality</label>
                <input type='text' name='playerNationality' value={formPlayerNation} onChange={e => setFormPlayerNation(e.target.value)} required />
                <label>Position</label>
                <select value={formPlayerPosi} onChange={e=>setFormPlayerPosi(e.target.value)}  >
                    <option value='gk'>Goalkeeper</option>
                    <option value='cb'>Defender</option>
                    <option value='mf'>Midfielder</option>
                    <option value='cf'>Forword</option>
                </select>

                <label>Contract start date</label>
                <input type='date' name='playerStartDate' value={formPlayerStartDate} onChange={e => setFormPlayerStartDate(e.target.value)} required />
                
                <label>Contract end date</label>
                <input type='date' name='playerEndDate' value={formPlayerEndDate} onChange={e => setFormPlayerEndDate(e.target.value)} required />
                
                <label>Wages</label>
                <input type='number' name='playerWages' value={formPlayerWages} onChange={e => setFormPlayerWages(e.target.value)} required />
                

                <button type='submit'>Submit Player</button>
            </form>
            <ul className='playersbyclub-list'>
                {playersBYclub.map(player => <li key={player.player_id}>
                    <NavLink to={`/players/${player.player_id}`}>
                        <div>
                            <h4>{player.player_name}</h4>
                            <p>{player.position}</p>
                        </div>
                    </NavLink>
                </li>)}
            </ul>
            <div className='club-transfers-div'>
                <div>
                    <h3> transfer INs </h3>
                    
                </div>
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



async function addPlayer(playerData){
    try {
        const response = await api.post("/add-player", playerData);
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
