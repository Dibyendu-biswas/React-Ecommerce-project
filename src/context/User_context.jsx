import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext=createContext()

export const UserProvider=({children})=>{

const {logout,loginWithRedirect,error,user}=useAuth0()
const[myUser,setMyUser]=useState(null)

useEffect(() => {
setMyUser(user)
}, [user])

    return <UserContext.Provider value={{user,logout,error,myUser,loginWithRedirect}}>
        {children}
    </UserContext.Provider>
}

export const useUserContext=()=>{
    return useContext(UserContext)
}