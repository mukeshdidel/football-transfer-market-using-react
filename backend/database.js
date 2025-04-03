import mysql from 'mysql2';

const pool = mysql.createPool({ // pool is a collection of connection  in DB
    host: 'localhost',
    user: 'root',
    password: 'Mukesh@7976',
    database: 'football_market',
    multipleStatements: true
}).promise();


async function getAllLeagues(league_name){
    const [rows] = await pool.query(`SELECT * FROM leagues where league_name like ?;`,[league_name]);
    return rows;
}

async function getLeagueInfoById(league_id){
    const [rows] = await pool.query(`SELECT * FROM leagues WHERE league_id = ?;`, [league_id]);
    return rows[0];
}

async function addLeague(league_name, country, description) {
    await pool.query(`INSERT INTO leagues (league_name, country, description) VALUES (?,?,?);`, [league_name, country, description]);
}

async function getAllClubs(search_name){
    const [rows] = await pool.query(`SELECT * FROM clubs natural join leagues where club_name like ? or league_name like ?;`, [search_name, search_name]);
    return rows;
}

async function getClub(club_id) {
    const [rows] = await pool.query(`SELECT * FROM clubs WHERE club_id =?;`, [club_id]);
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

async function getAllPlayers(search_name){
    const [rows] = await pool.query(`SELECT * FROM players natural join clubs WHERE player_name LIKE ? OR club_name LIKE ?;`, [search_name,search_name]);
    return rows;
}


async function getPlayerInfoById(player_id){
    const [rows] = await pool.query(`SELECT * FROM clubs natural join players natural join contracts WHERE player_id =? order by contract_id desc limit 1;`, [player_id]);
    return rows;
}

async function addPlayer(player_name, nationality, date_of_birth, start_date, end_date, wages, club_id,position){
    const [InsertResult] = await pool.query(`INSERT INTO players (player_name, date_of_birth, club_id, nationality, position)
                    VALUES (?,?,?,?,?);`,[player_name, date_of_birth, club_id, nationality, position ]);
    await pool.query(`insert into contracts (player_id, club_id, start_date, end_date, wages) values(?,?,?,?,?);`,[InsertResult.insertId, club_id, start_date, end_date, wages]);
    return InsertResult;
}

async function addFinance(finance_year, revenue, club_id){
    await pool.query(`INSERT INTO finances (finance_year, revenue, club_id) VALUES (?,?,?);`, [finance_year, revenue, club_id]);
}

async function transferPlayer(player_id, from_club_id, to_club_id, transfer_fee, start_date, end_date, player_wages) {
    try {
        const [response] = await pool.query(
            `CALL transfer_player(?,?,?,?,?,?,?,?);`,
            [player_id, from_club_id, to_club_id, transfer_fee, start_date, start_date, end_date, player_wages]
        );
        return response;
    } catch (error) {
        throw error;
    }
}


async function getAllTransfers(){
    const [rows] = await pool.query(`SELECT t.transfer_id, t.player_id, p.player_name, c1.club_name AS from_club_name, c2.club_name AS to_club_name, t.transfer_fee, t.transfer_date 
                                    FROM transfers t
                                    JOIN players p ON t.player_id = p.player_id
                                    JOIN clubs c1 ON t.from_club_id = c1.club_id    
                                    JOIN clubs c2 ON t.to_club_id = c2.club_id; `);
    return rows;
}


export {getAllLeagues,getLeagueInfoById,addLeague, getAllClubs,getClub, addClub, getClubsByLeague, getAllPlayers,getClubInfoById,getPlayersByClub,getPlayerInfoById, addFinance,transferPlayer,addPlayer,getAllTransfers }