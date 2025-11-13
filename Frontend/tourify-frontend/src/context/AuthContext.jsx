import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [loadingUser,setLoadingUser] = useState(true);

    useEffect(() =>{
        const fetchCurrentUser = async () =>{
            setLoadingUser(true)
            try{
                const response = await axios.get('users/me');
                setUser(response.data.data.user);
            } catch {
                setUser(null);
            } finally {
                setLoadingUser(false);
            }
        }
        fetchCurrentUser();
    },[]);

    const login = (userData) =>{
        setUser(userData);
    }

    const logout = async () =>{
        await axios.get("/users/logout");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, loadingUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )  
}

export const useAuth = () => useContext(AuthContext);