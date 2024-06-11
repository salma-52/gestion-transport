import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { API_BACKEND } from "../API/api";

export const useSignup = ()=>{
    const [error , setError] = useState('')
    const [isLoading , setIsLoading] =useState(null)
    const {dispatch} = useAuthContext()
    const navigate = useNavigate();

    const signup = async(email , password ) =>{
        setIsLoading(true)
        setError('')

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const response =await fetch( API_BACKEND+ '/api/register', {
            method : 'POST' , 
            // headers : {"Content-type" : 'application/json'},
            body: formData

        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError("email deja existe")

        }

        if(response.ok){
             setIsLoading(false)
             navigate('/login');
        }


    }

    return {signup , isLoading , error}
}