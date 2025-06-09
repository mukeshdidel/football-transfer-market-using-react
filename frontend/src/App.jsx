import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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


function App() {
  const {token, setUser} = useAuth();
  

  return (
    <BrowserRouter>
    { token ? <NavBar/> : null}
   

      
      <Routes>

        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>

        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path="/leagues" element={<ProtectedRoute><Leagues /></ProtectedRoute>}/>
        <Route path="/leagues/:id" element={<ProtectedRoute><League /></ProtectedRoute>}/>
        <Route path="/clubs" element={<ProtectedRoute><Clubs /></ProtectedRoute>}/>
        <Route path="/clubs/:id" element={<ProtectedRoute><Club /></ProtectedRoute>}/>
        <Route path="/players" element={<ProtectedRoute><Players /></ProtectedRoute>}/>
        <Route path="/players/:id" element={<ProtectedRoute><Player /></ProtectedRoute>}/>
        <Route path="Transfers" element={<ProtectedRoute><Transfers /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
