import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { API_BACKEND } from "../API/api";
import { Navigate } from "react-router-dom";



export const useLogin = ()=>{
    const [error , setError] = useState(null)
    const [isLoading , setIsLoading] =useState(null)
    const {dispatch} = useAuthContext()
   

    const login = async(email , password) =>{
        setIsLoading(true)
        setError(null)

        const response =await fetch( API_BACKEND +'/api/login', {
            method : 'POST' , 
            headers : {"Content-type" : 'application/json'},
            body: JSON.stringify({email , password})

        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError("Email or passwor Incorrect")

        }

        

        if(response.ok){
            const result = JSON.stringify(json.info)
             //save the user to local storage 

            localStorage.setItem("user_etablissement" , result)
            dispatch({type : 'LOGIN' , payload : json.info})

            setIsLoading(false)

            return <Navigate to="/" />;

           

             


        }
    }

    return {login , isLoading , error}
}