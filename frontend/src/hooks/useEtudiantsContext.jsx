import { EtudiantsContext } from "../context/EtudiantsContext";
import { useContext } from "react";

export const useEtudiantsContext = () =>{
    const context = useContext(EtudiantsContext)
    
    if (!context){
        throw Error('useContext must be used inside an EtudaintsContextProvider')
    }
    
    return context
}