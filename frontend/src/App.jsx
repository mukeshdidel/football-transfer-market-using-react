import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./Components/NavBar.jsx";


import Leagues from './Components/Leagues.jsx';
import Clubs from './Components/Clubs.jsx';
import Players from './Components/Players.jsx';
import Transfers from './Components/Transfers.jsx'; 
import Home from './Components/Home.jsx';
import League from './Components/League.jsx';
import Club from './Components/Club.jsx';
import Player from './Components/Player.jsx';


import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <Home />
      </>
    ),
  },
  {
    path: "/leagues",
    element: (
      <>
        <NavBar />
        <Leagues />
      </>
    ),
    children: [{
      path:':id',
      element: <League />  
      }]
  },
  {
    path: "/clubs",
    element: (
      <>
        <NavBar />
        <Clubs />
      </>
    ),
    children: [{
      path:':id',
      element: <Club />  
      }]
  },
  {
    path: "/players",
    element: (
      <>
        <NavBar />
        <Players />
      </>
    ),
    children: [{
      path:':id',
      element: <Player />  
      }]
  },
  {
    path: "/transfers",
    element: (
      <>
        <NavBar />
        <Transfers />
      </>
    ),
  },
/*   {
    path: 'student/:id',
    element: 
      <>
        <NavBar />
        <ParamComp />
      </>
  }, */
  {
    path: "*", 
    element: <h1>404-Page Not Found</h1>,
  },

]);

function App() {
  return (
  <>
    <RouterProvider router={router} />
  </>
  );
}

export default App;
