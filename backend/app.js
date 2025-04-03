import express from 'express';
import cors from 'cors'

import { getAllLeagues,getLeagueInfoById,addLeague, getAllClubs, getClub, getClubInfoById,getPlayersByClub, addClub, getClubsByLeague, getAllPlayers,getPlayerInfoById, addFinance,transferPlayer, addPlayer,getAllTransfers } from './database.js';


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

app.post(`/add-league`,async(req, res,)=>{
    const league = addLeague(req.body.leagueName, req.body.country, req.body.description)
    res.json(league);
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
        const club = await getClub(req.params.id);
        const clubFinance = await getClubInfoById(req.params.id);
        const players = await getPlayersByClub(req.params.id);
        const clubInfo = {clubObj: club, clubFinance: clubFinance , playersObj: players}
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
        const searchQuery = req.query.search || '';
        const players = await getAllPlayers(searchQuery);
        res.json(players);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error fetching leagues');
    }
})

app.post('/add-player',async  (req, res) => {
    try{
        const playerData = req.body;
        const player = await addPlayer(playerData.formPlayerName, playerData.formPlayerNation, playerData.formPlayerDOB, playerData.formPlayerStartDate, playerData.formPlayerEndDate, playerData.formPlayerWages, playerData.id,playerData.formPlayerPosi);
        res.json(player);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error fetching leagues');
    }
})

app.get('/players/:id', async (req, res) => {
    try{
        const player = await getPlayerInfoById(req.params.id);
        res.json(player);
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


app.post(`/post-transfers`,async (req, res) => {
    try{
        const transfers = req.body;

        const response = await transferPlayer(
            transfers.player_id,
            transfers.from_club_id,
            transfers.to_club_id,
            transfers.transfer_fee,
            transfers.start_date,
            transfers.end_date,
            transfers.player_wages
        );
        res.json(response);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error posting transfers');
    }
})


app.get('/transfers' , async (req, res) => {
    try{
        const transfers = await getAllTransfers();
        res.json(transfers);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error fetching transfers');
    }
})


app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send('something went wrong')
})

app.listen(5000, function () {
    console.log('Server is running on port 5000');  // Server started on port 5000
})