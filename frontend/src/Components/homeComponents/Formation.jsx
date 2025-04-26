import {useState, useEffect } from 'react';
import { api } from '../api/data.jsx';
import { Link } from "react-router-dom";
import moment from "moment";

import { useAuth } from '../AuthContext.jsx';



export default function Formation(){
    const {token,user} = useAuth();
    
    const [selectedFormation, setSelectedFormation] = useState('youngest-players');

    const [cf, setCf] = useState([]);
    const [lw, setLw] = useState([]);
    const [rw, setRw] = useState([]);
    const [cam, setCam] = useState([]);
    const [cm, setCm] = useState([]);
    const [dm, setDm] = useState([]);
    const [lb, setLb] = useState([]);
    const [cb1, setCb1] = useState([]);
    const [cb2, setCb2] = useState([]);

    const [rb, setRb] = useState([]);
    const [gk, setGk] = useState([]);
    


    useEffect(() => {
        async function fetch() {
            const query = 'youngest-players';
            const fetchedFormation = await getFormation(query,token);

            const temp = {
                cf: {}, lw: {}, rw: {}, cam: {},cm: {},dm: {}, lb: {}, cb1: {}, cb2: {}, rb: {},gk: {}
            };

            let cbCount = 0;
    
            fetchedFormation.forEach(player => {
                const pos = player.position;
                if (pos === 'cb') {
                    if (cbCount === 0) {
                        cbCount++;
                        temp.cb1 = {
                            player_id: player.player_id,
                            player_name: player.player_name,
                            player_url: player.player_url,
                            player_wage: player.player_wage,
                            position: pos
                        };
                    } else {
                        temp.cb2 = {
                            player_id: player.player_id,
                            player_name: player.player_name,
                            player_url: player.player_url,
                            player_wage: player.player_wage,
                            position: pos
                        };
                    }
                }
                else if (temp[pos]) {
                    temp[pos] = {
                        player_id: player.player_id,
                        player_name: player.player_name,
                        player_url: player.player_url,
                        player_wage: player.player_wage,
                        position: pos
                    };
                }
            });
    

            setCf(temp.cf);
            setLw(temp.lw);
            setRw(temp.rw);
            setCam(temp.cam);
            setCm(temp.cm);
            setDm(temp.dm);
            setLb(temp.lb);
            setCb1(temp.cb1);
            setCb2(temp.cb2);
            setRb(temp.rb);
            setGk(temp.gk);
    

        }
        fetch();
    }, []);
    

    async function handleChangeFormation(e) {
        setSelectedFormation(e.target.value);
        const query = e.target.value;
        const fetchedFormation = await getFormation(query,token);

        const temp = {
            cf: {}, lw: {}, rw: {}, cam: {},cm: {},dm: {}, lb: {}, cb1: {}, cb2: {}, rb: {},gk: {}
        };

        let cbCount = 0;

        console.log(fetchedFormation);
        

        fetchedFormation.forEach(player => {
            const pos = player.position;
            if (pos === 'cb') {
                if (cbCount === 0) {
                    cbCount++;
                    temp.cb1 = {
                        player_id: player.player_id,
                        player_name: player.player_name,
                        player_url: player.player_url,
                        player_wage: player.player_wage,
                        position: pos
                    };
                } else {
                    temp.cb2 = {
                        player_id: player.player_id,
                        player_name: player.player_name,
                        player_url: player.player_url,
                        player_wage: player.player_wage,
                        position: pos
                    };
                }
            }
            else if (temp[pos]) {
                temp[pos] = {
                    player_id: player.player_id,
                    player_name: player.player_name,
                    player_url: player.player_url,
                    player_wage: player.player_wage,
                    position: pos
                };
            }
        });

        setCf(temp.cf);
        setLw(temp.lw);
        setRw(temp.rw);
        setCam(temp.cam);
        setCm(temp.cm);
        setDm(temp.dm);
        setLb(temp.lb);
        setCb1(temp.cb1);
        setCb2(temp.cb2);
        setRb(temp.rb);
        setGk(temp.gk);

    }

    return (
        <>
        <div className='home-grid-item  formation-container' >
            <div className='formation-selector'>
                <select name="formation-selector" onChange={(e) => handleChangeFormation(e)}>
                    <option value="youngest-players">youngest Players</option>
                    <option value="oldest-players">Oldest Players</option>
                </select>
            </div>


            <div className=' formation-item cf'>
                <div className='formation-player' key={cf.player_id}>
                    <h3>cf</h3> 
                    <img src={cf.player_url} alt={cf.player_name} />
                    <p>{cf.player_name}</p>
                </div>
            </div>
            <div className=' formation-item lw'>
                <div className='formation-player' key={lw.player_id}>
                    <h3>lw</h3> 
                    <img src={lw.player_url} alt={lw.player_name} />
                    <p>{lw.player_name}</p>
                </div>
            </div>
            <div className=' formation-item rw'>
                <div className='formation-player' key={rw.player_id}>
                    <h3>rw</h3> 
                    <img src={rw.player_url} alt={rw.player_name} />
                    <p>{rw.player_name}</p>
                </div>
            </div>
            <div className=' formation-item cam'>
                <div className='formation-player' key={cam.player_id}>
                    <h3>cam</h3> 
                    <img src={cam.player_url} alt={cam.player_name} />
                    <p>{cam.player_name}</p>
                </div>
            </div>
            <div className=' formation-item cm'>
                <div className='formation-player' key={cm.player_id}>
                    <h3>cm</h3> 
                    <img src={cm.player_url} alt={cm.player_name} />
                    <p>{cm.player_name}</p>
                </div>
            </div>
            <div className=' formation-item cdm'>
                <div className='formation-player' key={dm.player_id}>
                    <h3>dm</h3> 
                    <img src={dm.player_url} alt={dm.player_name} />
                    <p>{dm.player_name}</p>
                </div>
            </div>
            <div className=' formation-item lb'>
                <div className='formation-player' key={lb.player_id}>
                    <h3>lb</h3> 
                    <img src={lb.player_url} alt={lb.player_name} />
                    <p>{lb.player_name}</p>
                </div>
            </div>
            <div className=' formation-item cb1'>
                <div className='formation-player' key={cb1.player_id}>
                    <h3>cb</h3> 
                    <img src={cb1.player_url} alt={cb1.player_name} />
                    <p>{cb1.player_name}</p>
                </div>
            </div>
            <div className=' formation-item cb2'>
                <div className='formation-player' key={cb2.player_id}>
                    <h3>cb</h3> 
                    <img src={cb2.player_url} alt={cb2.player_name} />
                    <p>{cb2.player_name}</p>
                </div>
            </div>

            <div className=' formation-item rb'>
                <div className='formation-player' key={rb.player_id}>
                    <h3>rb</h3> 
                    <img src={rb.player_url} alt={rb.player_name} />
                    <p>{rb.player_name}</p>
                </div>
            </div>
            <div className=' formation-item gk'>
                <div className='formation-player' key={gk.player_id}>
                    <h3>gk</h3> 
                    <img src={gk.player_url} alt={gk.player_name} />
                    <p>{gk.player_name}</p>
                </div>
            </div>
        </div>
        </>
    );
}


async function getFormation(query,token){
    try{
        const response = await api.post('/formation', {query: query}, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    }catch(error){
        console.error(error);
    }
}