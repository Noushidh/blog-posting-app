
import { createContext, useState } from "react";

export const AuthContext = createContext<any>(null);

function AuthProvider({children}:{children:React.ReactNode}){
    const [user,setuser]=useState(null)

     const login =(userData:any)=>{
     setuser(userData)
    }
    const logout=()=>{
        setuser(null)
    }
    const isAuthenticated = !!user
    return(
        <AuthContext.Provider value={{user,login,logout,isAuthenticated}}>
         {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;