import './App.css';
import React, { useContext } from 'react'
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom"
import { AuthContextProvider } from "./Components/context/AuthContext";



// import AuthContext from './Components/context/AuthContext'
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import AuthContext from './Components/context/AuthContext';
import Profile from "./Components/auth/Profile";


axios.defaults.withCredentials = true;

function App() {

  // const { loggedIn } = useContext(AuthContext);
  return (


    <AuthContextProvider>
      <Router>
        <div>
        
          <Route exact path="/register"><Register /></Route>
          <Route exact path="/"><Login /></Route>
          <Route exact path="/profile"><Profile /></Route>


        </div>

      </Router>
    </AuthContextProvider>

  );
}

export default App;
