import express from 'express';
import cors from 'cors'

import { getAllLeagues,getLeagueInfoById, getAllClubs,getClubInfoById,getPlayersByClub, addClub, getClubsByLeague, getAllPlayers,addFinance } from './database.js';


const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));


app.get('/leagues', async (req, res) => {
    try{
        const searchQuery = req.query.search || '';
        const leagues = await getAllLeagues(searchQuery);
        res.json(leagues);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error fetching leagues');
    }
})


app.get('/leagues/:id', async (req, res) => {
    try{
        const league = await getLeagueInfoById(req.params.id);
        const clubs = await getClubsByLeague(req.params.id);
        const leagueInfo = {leagueObj: league , clubsObj: clubs}
        res.json(leagueInfo);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error fetching leagues');
    }
})

app.get('/clubs', async (req, res) => {
    try{
        const searchQuery = req.query.search || '';
        const clubs = await getAllClubs(searchQuery);
        res.json(clubs);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error fetching leagues');
    }
})

app.get('/clubs/:id', async (req, res) => {
    try{
        const club = await getClubInfoById(req.params.id);
        const players = await getPlayersByClub(req.params.id);
        const clubInfo = {clubObj: club , playersObj: players}
        res.json(clubInfo);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error fetching leagues');
    }
})

app.post('/add-club', async (req, res) => {
    try{

        const club = await addClub(req.body.formClubName,req.body.id ,req.body.formClubFoundedYear);
        res.json(club);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error adding club');
    }
})


app.get('/players', async (req, res) => {
    try{
        const players = await getAllPlayers();
        res.json(players);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error fetching leagues');
    }
})


app.post(`/add-finance`,async (req, res) => {
    try{
        const finance = await addFinance(req.body.formFinanceYear, req.body.formFinanceRevenue, req.body.id);
        res.json(finance);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error adding finance');
    }
})



app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send('something went wrong')
})

app.listen(5000, function () {
    console.log('Server is running on port 5000');  // Server started on port 5000
})