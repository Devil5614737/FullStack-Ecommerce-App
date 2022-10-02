import jwtDecode from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthContextI, UserI } from "../interfaces/AuthContext";

export const AuthContext=createContext({} as AuthContextI)

interface AuthProps{
    children:ReactNode
}

export const AuthContextProvider=({children}:AuthProps)=>{
    const [user,setUser]=useState<UserI>();

    const token=typeof window !=='undefined'&& localStorage.getItem('token') ?localStorage.getItem('token') :"";

    useEffect(()=>{
    
        if(token) {

            const decoded=jwtDecode(token as string)
            setUser(decoded as UserI)
        }
        
    },[token])

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}