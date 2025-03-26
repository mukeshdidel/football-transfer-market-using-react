import mysql from 'mysql2';

const pool = mysql.createPool({ // pool is a collection of connection  in DB
    host: 'localhost',
    user: 'root',
    password: 'Mukesh@7976',
    database: 'football_market'
}).promise();


async function getAllLeagues(league_name){
    const [rows] = await pool.query(`SELECT * FROM leagues where league_name like ?;`,[league_name]);
    return rows;
}

async function getLeagueInfoById(league_id){
    const [rows] = await pool.query(`SELECT * FROM leagues WHERE league_id = ?;`, [league_id]);
    return rows[0];
}

async function getAllClubs(search_name){
    const [rows] = await pool.query(`SELECT * FROM clubs natural join leagues where club_name like ? or league_name like ?;`, [search_name, search_name]);
    return rows;
}

async function getClubInfoById(club_id){
    const [rows] = await pool.query(`select * from clubs natural join finances where club_id = ? order by finance_year desc;`, [club_id]);
    return rows;
}

async function getPlayersByClub(club_id){
    const [rows] = await pool.query(`SELECT * FROM players WHERE club_id =?;`, [club_id]);
    return rows;
}


async function addClub(club_name, league_id, founded_year){
    await pool.query(`INSERT INTO clubs (club_name, league_id, founded_year) VALUES (?,?,?);`, [club_name, league_id, founded_year]);
}

async function getClubsByLeague(league_id){
    const [rows] = await pool.query(`SELECT * FROM clubs WHERE league_id = ?;`, [league_id]);
    return rows;
}

async function getAllPlayers(){
    const [rows] = await pool.query(`SELECT * FROM players natural join clubs;`);
    return rows;
}

async function addFinance(finance_year, revenue, club_id){
    await pool.query(`INSERT INTO finances (finance_year, revenue, club_id) VALUES (?,?,?);`, [finance_year, revenue, club_id]);
}

export {getAllLeagues,getLeagueInfoById, getAllClubs, addClub, getClubsByLeague, getAllPlayers,getClubInfoById,getPlayersByClub,addFinance}