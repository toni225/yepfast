
import {Navigate, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {isLoggedIn, getUserInfo} from "../services/auth.service";

export const AdminProtected = ({children}) => {
    const [accessible,setAccessible] = useState(null)

    useEffect(()=>{
       isLoggedIn()
           .then((loginned)=>{
               if(!loginned) return setAccessible(false)

               getUserInfo().then(res=> {
                   try{
                       const isAdmin = res.data.data.user.user_metadata?.isAdmin

                       if(isAdmin == null){
                           return setAccessible(false)
                       }

                       setAccessible(isAdmin)
                   }catch (e) {
                       setAccessible(false)
                   }
                   console.log(res)
               }).catch(e=>setAccessible(false))
           })
           .catch(()=>{setAccessible(false)})
    },[])

    switch (accessible){
        case true:
            return children
        case false:
            return <Navigate to={'/admin'}/>
        case null:
            return <div>Loading...</div>
    }
}
