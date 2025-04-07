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

async function addLeague(league_name, country, description, league_url) {
    await pool.query(`INSERT INTO leagues (league_name, country, description, league_url) VALUES (?,?,?,?);`, [league_name, country, description, league_url]);
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

async function getTotalClubWages(club_id) {
    const [rows] = await pool.query(`select get_total_wages(?) as total_wages;`, [club_id]);
    return rows[0].total_wages;
}

async function getPlayersByClub(club_id){
    const [rows] = await pool.query(`SELECT * FROM players WHERE club_id =?;`, [club_id]);
    return rows;
}


async function addClub(club_name, league_id, founded_year, club_url) {
    await pool.query(`INSERT INTO clubs (club_name, league_id, founded_year, club_url) VALUES (?,?,?,?);`, [club_name, league_id, founded_year, club_url]);
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

async function addPlayer(player_name, nationality, date_of_birth, start_date, end_date, wages, club_id,position, player_url) {
    const [InsertResult] = await pool.query(`INSERT INTO players (player_name, date_of_birth, club_id, nationality, position, player_url)
                    VALUES (?,?,?,?,?,?);`,[player_name, date_of_birth, club_id, nationality, position, player_url]);
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
    const [rows] = await pool.query(`SELECT t.transfer_id, t.player_id, p.player_name,p.player_url, c1.club_name AS from_club_name, c1.club_url as from_club_url, c2.club_name AS to_club_name, c2.club_url as to_club_url, t.transfer_fee, t.transfer_date 
                                    FROM transfers t
                                    JOIN players p ON t.player_id = p.player_id
                                    JOIN clubs c1 ON t.from_club_id = c1.club_id    
                                    JOIN clubs c2 ON t.to_club_id = c2.club_id order by t.transfer_id desc; `);
    return rows;
}

async function getTransferOUTclub(club_id){
    const [rows] = await pool.query(`select p.player_name, c.club_name, t1.transfer_fee, t1.transfer_date from transfers t1 join players p on t1.player_id = p.player_id join clubs c on t1.to_club_id = c.club_id  where (p.player_id , t1.to_club_id, t1.transfer_id ) in (select t2.player_id, t2.to_club_id,  t2.transfer_id from transfers t2 where t2.from_club_id = ?);`,[club_id]);

    return rows;
}

async function getTransferINclub(club_id) {
    const [rows] = await pool.query(`select p.player_name, c.club_name, t1.transfer_fee, t1.transfer_date from transfers t1 join players p on t1.player_id = p.player_id join clubs c on t1.from_club_id = c.club_id where (p.player_id , t1.from_club_id, t1.transfer_id ) in (select t2.player_id, t2.from_club_id,  t2.transfer_id from transfers t2 where t2.to_club_id = ?);`,[club_id]);

    return rows; 
}

async function getPlayerJourney(player_id) {
    const [rows] = await pool.query(`select t1.transfer_id,  c1.club_name as from_club_name, c2.club_name as to_club_name, t1.transfer_fee, t1.transfer_date  from transfers t1 join players p on t1.player_id = p.player_id join clubs c1 on t1.from_club_id = c1.club_id join clubs c2 on t1.to_club_id = c2.club_id where ( p.player_id ) in ( select player_id from transfers t2 where t2.player_id = ?);`,[player_id]);

    return rows;
}

/*  ---------------------some home page queries --------------------   */

async function toalLeageWages() {
    const [rows] = await pool.query(`select league_id, league_name, get_total_wages_by_league(league_id) as total_wages from leagues order by total_wages desc;`);
    return rows;
}

async function totalLeaguePlayers() {
    const [rows] = await pool.query(`select league_id, league_name, count(player_id) as no_of_players from leagues natural join clubs natural join players group by league_id order by no_of_players desc ;`);
    return rows;
}

async function totalClubWages() {
    const [rows] = await pool.query(`select club_id , club_name, sum(wages) as total_wages from clubs natural join contracts group by club_id order by total_wages desc;`);
    return rows;
}


async function totalClubProfit() {
    const [rows] = await pool.query(`select club_id, club_name, sum(sales) as total_profit from clubs natural join finances group by club_id order by total_profit desc;`);
    return rows;
}

async function totalClubLoss() {
    const [rows] = await pool.query(`select club_id, club_name, sum( expenses ) as total_loss from clubs natural join finances group by club_id order by total_loss desc;`);
    return rows;
}

async function totalClubNetSpent() {
    const [rows] = await pool.query(`select club_id, club_name, sum( net_spent ) as total_net_spent from clubs natural join finances group by club_id order by total_net_spent desc;`);
    return rows;
}

async function ClubAvgAge() {
    const [rows] = await pool.query(`select club_id, club_name,  avg(TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE())) as avg_age from clubs natural join players group by club_id order by avg_age ; `);
    return rows;
}

async function PlayerWages() {
    const [rows] = await pool.query(`select player_id, player_name, player_url, wages from players natural join contracts order by wages desc;`);
    return rows;
 }

async function  playerCareerFee() {
    const [rows] = await pool.query(`select player_id, player_name,player_url, sum( transfer_fee ) as career_transfer_fee from players natural join transfers group by player_id order by career_transfer_fee desc;`);
    return rows;
}


async function PlayerNoOfTransfers() {
    const [row] = await pool.query(`select player_id, player_name, player_url, count( transfer_id ) as total_transfers from  players natural join transfers group by player_id order by total_transfers desc;`);
    return row;
}

async function playerTransferFee(){
    const [row] = await pool.query(`select transfer_id, player_name , player_url, transfer_fee from players natural join transfers order by transfer_fee desc;`);
    return row;
}

async function playerAge() {
    const [rows] = await pool.query(`select player_id, player_name, player_url, date_of_birth from players order by date_of_birth desc;`);
    return rows;
}

async function highestWagesFormation(){
    const [rows] = await pool.query(`select p.player_id, p.player_url, p.player_name, p.position, c1.wages from players p natural JOIN contracts c1 
                                    where (p.position, c1.wages) in ( select p2.position, max(c2.wages) from players p2 natural join contracts c2  where p2.position != 'cb' group by p2.position )

                                    UNION
                                    (select p.player_id, p.player_url, p.player_name, p.position, c.wages from players p natural join contracts c where p.position = 'cb' order by c.wages desc limit 2 ) order by position;`);
    return rows;

}

async function youngestFormation(){
    const [rows] = await pool.query(`select p.player_id, p.player_url, p.player_name, p.position  from players p 
                                    where (p.position, p.date_of_birth) in ( select p2.position, max(p2.date_of_birth) from players p2 where p2.position != 'cb' group by p2.position )
                                    union 
                                    (select p.player_id, p.player_url, p.player_name, p.position from players p where p.position = 'cb' order by p.date_of_birth desc limit 2  );`);
    return rows;
}

async function oldestFormation(){
    const [rows] = await pool.query(`select p.player_id, p.player_url, p.player_name, p.position  from players p 
                                    where (p.position, p.date_of_birth) in ( select p2.position, min(p2.date_of_birth) from players p2 where p2.position != 'cb' group by p2.position )
                                    union 
                                    (select p.player_id, p.player_url, p.player_name, p.position from players p where p.position = 'cb' order by p.date_of_birth  limit 2  );`);
    return rows;
}

export {getAllLeagues,getLeagueInfoById,addLeague, getAllClubs,getClub, addClub, getClubsByLeague, getAllPlayers,getClubInfoById ,getTotalClubWages,  getPlayersByClub,getPlayerInfoById, addFinance,transferPlayer,addPlayer,getAllTransfers,getTransferOUTclub,getTransferINclub,getPlayerJourney,toalLeageWages,totalClubWages ,totalLeaguePlayers, totalClubProfit, totalClubLoss, totalClubNetSpent, ClubAvgAge, PlayerWages, playerCareerFee, PlayerNoOfTransfers, playerTransferFee, highestWagesFormation , youngestFormation, playerAge, oldestFormation};