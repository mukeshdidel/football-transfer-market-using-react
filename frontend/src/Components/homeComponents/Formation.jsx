import {useState, useEffect } from 'react';
import { api } from '../api/data.jsx';
import { Link } from "react-router-dom";
import moment from "moment";


export default function Formation(){

    const [selectedFormation, setSelectedFormation] = useState('highest-wages');

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
            const query = 'highest-wages';
            const fetchedFormation = await getFormation(query);

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
        const fetchedFormation = await getFormation(query);

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
                    <option value="highest-wages">Highest Wages</option>
                    <option value="youngest-players">youngest Players</option>
                    <option value="oldest-players">Oldest Players</option>
                </select>
            </div>


            <div className=' formation-item cf'>
                <div className='formation-player' key={cf.player_id}>
                    <div>
                        <p>cf</p> 
                        <img src={cf.player_url} alt={cf.player_name} />
                    </div>
                    <p>{cf.player_name}</p>
                </div>
            </div>
            <div className=' formation-item lw'>
                <div className='formation-player' key={lw.player_id}>
                    <div>
                        <p>lw</p> 
                        <img src={lw.player_url} alt={lw.player_name} />
                    </div>
                    <p>{lw.player_name}</p>
                </div>
            </div>
            <div className=' formation-item rw'>
                <div className='formation-player' key={rw.player_id}>
                    <div>
                        <p>rw</p> 
                        <img src={rw.player_url} alt={rw.player_name} />
                    </div>
                    <p>{rw.player_name}</p>
                </div>
            </div>
            <div className=' formation-item cam'>
                <div className='formation-player' key={cam.player_id}>
                    <div>
                        <p>cam</p> 
                        <img src={cam.player_url} alt={cam.player_name} />
                    </div>
                    <p>{cam.player_name}</p>
                </div>
            </div>
            <div className=' formation-item cm'>
                <div className='formation-player' key={cm.player_id}>
                    <div>
                        <p>cm</p> 
                        <img src={cm.player_url} alt={cm.player_name} />
                    </div>
                    <p>{cm.player_name}</p>
                </div>
            </div>
            <div className=' formation-item dm'>
                <div className='formation-player' key={dm.player_id}>
                    <div>
                        <p>dm</p> 
                        <img src={dm.player_url} alt={dm.player_name} />
                    </div>
                    <p>{dm.player_name}</p>
                </div>
            </div>
            <div className=' formation-item lb'>
                <div className='formation-player' key={lb.player_id}>
                    <div>
                        <p>lb</p> 
                        <img src={lb.player_url} alt={lb.player_name} />
                    </div>
                    <p>{lb.player_name}</p>
                </div>
            </div>
            <div className=' formation-item cb1'>
                <div className='formation-player' key={cb1.player_id}>
                    <div>
                        <p>cb</p> 
                        <img src={cb1.player_url} alt={cb1.player_name} />
                    </div>
                    <p>{cb1.player_name}</p>
                </div>
            </div>
            <div className=' formation-item cb2'>
                <div className='formation-player' key={cb2.player_id}>
                    <div>
                        <p>cb</p> 
                        <img src={cb2.player_url} alt={cb2.player_name} />
                    </div>
                    <p>{cb2.player_name}</p>
                </div>
            </div>
            <div className=' formation-item rb'>
                <div className='formation-player' key={rb.player_id}>
                    <div>
                        <p>rb</p> 
                        <img src={rb.player_url} alt={rb.player_name} />
                    </div>
                    <p>{rb.player_name}</p>
                </div>
            </div>
            <div className=' formation-item gk'>
                <div className='formation-player' key={gk.player_id}>
                    <div>
                        <p>gk</p> 
                        <img src={gk.player_url} alt={gk.player_name} />
                    </div>
                    <p>{gk.player_name}</p>
                </div>
            </div>
        </div>
        </>
    );
}


async function getFormation(query){
    try{
        const response = await api.post('/formation', {query: query});
        return response.data;
    }catch(error){
        console.error(error);
    }
}