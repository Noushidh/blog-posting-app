import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


function ProtectedRoute({children}:{children:React.ReactNode}){
   const {isAuthenticated} = useContext(AuthContext)
   if(!isAuthenticated){
    return <Navigate to="/" replace/>
   }
   return <>{children}</>
}

export default ProtectedRoute;