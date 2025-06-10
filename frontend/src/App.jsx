import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import { useAuth } from './Components/AuthContext';

import NavBar from "./Components/NavBar.jsx";
import Leagues from './Components/Leagues.jsx';
import Clubs from './Components/Clubs.jsx';
import Players from './Components/Players.jsx';
import Transfers from './Components/Transfers.jsx'; 
import Home from './Components/Home.jsx';
import League from './Components/League.jsx';
import Club from './Components/Club.jsx';
import Player from './Components/Player.jsx';
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";

import "./App.css";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import { useEffect } from "react";
import { api } from "./Components/api/data.jsx";


function App() {
  const {token, setUser} = useAuth();
  
  useEffect(()=>{
    async function fetchUser() {
      try {
        if (token){
          const response = await api.get('/me', { headers: { Authorization: `Bearer ${token}` } });
          const user = response.data;
          setUser(user);
        } 
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser();
    
  },[])

  return (
    <BrowserRouter>  
      <Routes>

        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>

        <Route path='/' element={<Layout />}>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path="/leagues" element={<ProtectedRoute><Leagues /></ProtectedRoute>}/>
          <Route path="/leagues/:id" element={<ProtectedRoute><League /></ProtectedRoute>}/>
          <Route path="/clubs" element={<ProtectedRoute><Clubs /></ProtectedRoute>}/>
          <Route path="/clubs/:id" element={<ProtectedRoute><Club /></ProtectedRoute>}/>
          <Route path="/players" element={<ProtectedRoute><Players /></ProtectedRoute>}/>
          <Route path="/players/:id" element={<ProtectedRoute><Player /></ProtectedRoute>}/>
          <Route path="Transfers" element={<ProtectedRoute><Transfers /></ProtectedRoute>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const Layout = () => {
  return <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
    <div style={{height: '10vh'}}>
      <NavBar />
    </div>
    <div>
      <div style={{flex: 1, padding: '20px', height: '85vh', overflowY: 'auto'}}>
      <Outlet />
      </div>
      <footer style={{textAlign: 'center', padding: '10px', backgroundColor: '#f1f1f1', height: '5vh'}}>
        <p>© 2023 Football Manager. All rights reserved.</p>
      </footer>
    </div>
  </div>
}

export default App;
