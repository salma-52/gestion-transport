import { createContext  , useReducer , useEffect } from "react";

export const EtudiantsContext = createContext() 

export const  etudiantsReducer = (state , action) =>{
    switch(action.type){
        case 'SET_ETUDIANTS' :
            return { etudiants : action.payload}
        case 'CREATE_ETUDIANT':
            return  {etudiants : [action.payload , ...state.etudiants]}
        case 'UPDATE_ETUDIANT':

            const updatedEtudiantIndex = state.etudiants.findIndex(item => item.id === action.payload.id);
        
            if (updatedEtudiantIndex !== -1) {
                const updatedUtudiant = [...state.etudiants];
                updatedUtudiant[updatedEtudiantIndex] = action.payload;
                return { etudiants: updatedUtudiant };
            } 
        case 'DELETE_ETUDIANT':
            const filteredEtudiants = state.etudiants.filter(item => item.id !== action.payload);
            return { etudiants: filteredEtudiants };
        default : 
            return state 

    }
}

export const EtudiantsContextProvider = ({children})=>{
    const [state  , dispatch] = useReducer(etudiantsReducer , {
        etudiants :  []
    })

   

    return(
        <EtudiantsContext.Provider value={{...state , dispatch}}>
            {children}
        </EtudiantsContext.Provider>
    )
}

