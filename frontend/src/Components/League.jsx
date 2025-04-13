
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {api} from './api/data.jsx';
import {NavLink} from 'react-router-dom';


export default function League(){
    const { id } = useParams();
    const [leagueInfo, setLeagueInfo] = useState({});
    const [clubsByleague, setClubsBYleague] = useState([]);

    const [formClubName, setFormClubName] = useState('');
    const [formClubFoundedYear, setFormClubFoundedYear] = useState('');
    const [formClubLogo, setFormClubLogo] = useState('');

    useEffect(()=>{
        async function fetch(){
            const fetchedLeagueInfo = await getLeagueInfo(id);
            setLeagueInfo(fetchedLeagueInfo.leagueObj);
            setClubsBYleague(fetchedLeagueInfo.clubsObj);
        }
        fetch();
    },[id])

    async function hanldeClubSubmit(e){
        e.preventDefault();
        if (!formClubName || !formClubFoundedYear) {
            alert("Please fill in all fields.");
            return;
        }
        const ClubData = {formClubName,id,formClubFoundedYear,formClubLogo};
        await addClub(ClubData);

        setFormClubName('');
        setFormClubFoundedYear('');
        setFormClubLogo('');

        const fetchedLeagueInfo = await getLeagueInfo(id);
        setLeagueInfo(fetchedLeagueInfo.leagueObj);
        setClubsBYleague(fetchedLeagueInfo.clubsObj);

    }


    return (
        <>
        <div className='league-info'>
            <div className='league-description'>
                <h2>{leagueInfo.league_name}</h2>
                <p>{leagueInfo.description}</p>
            </div>
            <form onSubmit={e=>hanldeClubSubmit(e)}>
                <h2>Add Club</h2>
                <label>Club Name</label>
                <input type='text' name='clubName' value={formClubName} onChange={e => setFormClubName(e.target.value)} required />
                <label>Founded Year</label>
                <input type='number' name='clubFoundedYear' value={formClubFoundedYear} onChange={e => setFormClubFoundedYear(e.target.value)} required />
                <label>Club Logo URL</label>
                <input type='text' name='clubLogo' value={formClubLogo} onChange={e => setFormClubLogo(e.target.value)} required />

                <button type='submit'>Submit Club</button>
            </form>

            <ul className='clubsbyleague-list'>
                {clubsByleague.map(club => <li key={club.club_id}>
                    <NavLink to={`/clubs/${club.club_id}`}>
                        <div className='card-div'>
                            <div>
                                <h4>{club.club_name}</h4>
                                <p>{club.founded_year}</p>
                            </div>
                            <div>
                                <img src={club.club_url} alt={club.club_name}/>
                            </div>
                        </div> 
                    </NavLink>
                </li>)}
            </ul>
        </div>
        </>
    );
}


async function getLeagueInfo(leagueId){
    try{
        const response = await api.get(`/leagues/${leagueId}`);
        return response.data;
    }catch(error){
        console.error('Error fetching league info', error);
        throw error;
    }
}



async function addClub(clubData){
    try {
        const response = await api.post("/add-club", clubData);
        alert(response.data.message || 'Club added successfully');
        
    } catch (error) {
        if(error.response?.data?.error){
            alert(`Error: ${error.response.data.error}`);            
        }
    } 
}

