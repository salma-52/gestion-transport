import { TransportsContext } from "../context/TransportsContext";
import { useContext } from "react";

export const useTransportsContext = () =>{
    const context = useContext(TransportsContext)
    
    if (!context){
        throw Error('useContext must be used inside an TransportContextProvider')
    }
    
    return context
}