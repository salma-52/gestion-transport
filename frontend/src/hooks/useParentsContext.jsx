import { ParentsContext } from "../context/ParentsContext";
import { useContext } from "react";

export const useParentsContext = () =>{
    const context = useContext(ParentsContext)
    
    if (!context){
        throw Error('useContext must be used inside an ParentsContextProvider')
    }
    
    return context
}