
import { PersonnelsContext } from "../context/personnelsContext"; 
import { useContext } from "react";

export const usePersonnelsContext = () =>{
    const context = useContext(PersonnelsContext)
    
    if (!context){
        throw Error('useContext must be used inside an PersonnelsContextProvider')
    }
    
    return context
}