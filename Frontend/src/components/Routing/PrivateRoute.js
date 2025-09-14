import { useEffect,useState,useContext } from 'react';
import {Outlet, useNavigate} from 'react-router-dom'
import Home from '../GeneralScreens/Home';
import axios from 'axios';
import { AuthContext } from "../../Context/AuthContext";

const PrivateRoute =( ) => {
    const bool =localStorage.getItem("authToken") ? true :false
    const [auth ,setAuth] =useState(bool)
    const [error ,setError] =useState("")
    const navigate = useNavigate()
    const {setActiveUser,setConfig } = useContext(AuthContext)

    useEffect(() => {

       const controlAuth = async () => {
        console.log("PrivateRoute: Checking authentication...")
        const config = {
            headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };
        try {
            const { data } = await axios.get("/auth/private", config); 
            console.log("PrivateRoute: Authentication successful", data.user)

            setAuth(true)
            setActiveUser(data.user)
            setConfig(config)

        } 
        catch (error) {
            console.log("PrivateRoute: Authentication failed", error)

            localStorage.removeItem("authToken");

            setAuth(false)
            setActiveUser({})

            navigate("/")

            setError("You are not authorized please login"); 
        }
        };

        controlAuth()
    }, [bool,navigate])


    if (!auth) {
        return <Home error={error} />
    }
    
    return <Outlet />
}

export default PrivateRoute;
