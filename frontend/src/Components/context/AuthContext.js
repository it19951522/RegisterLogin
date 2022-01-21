import axios from 'axios';
import React,{createContext, useContext, useEffect, useState} from 'react'

const AuthContext = createContext();

function AuthContextProvider(props) {

    const [loggedIn, setloggedIn] = useState("false");

    async function getLogged(){
        const loggedInRes = await axios.get("http://localhost:8070/user/loggedIn");
        setloggedIn(loggedInRes.data);
        console.log(loggedInRes.data)
    }

    useEffect(() => {
        getLogged();
    }, [])

    return <AuthContext.Provider value={{loggedIn, getLogged}}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
export {AuthContextProvider}