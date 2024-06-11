import { createContext  , useReducer , useEffect } from "react";

export const PersonnelsContext = createContext() 

export const  personnelsReducer = (state , action) =>{
    switch(action.type){
        case 'SET_PERSONNELS' :
            return { personnels : action.payload}
        case 'CREATE_PERSONNEL':
            return  {personnels : [action.payload , ...state.personnels]}
        case 'UPDATE_PERSONNEL':

            const updatedPersonnelIndex = state.personnels.findIndex(item => item.id === action.payload.id);
        
            if (updatedPersonnelIndex !== -1) {
                const updatedPersonnel = [...state.personnels];
                updatedPersonnel[updatedPersonnelIndex] = action.payload;
                return { personnels: updatedPersonnel };
            } 
        case 'DELETE_PERSONNEL':
            const filteredPersonnels = state.personnels.filter(item => item.id !== action.payload);
            return { personnels: filteredPersonnels };
        default : 
            return state 

    }
}

export const PersonnelsContextProvider = ({children})=>{
    const [state  , dispatch] = useReducer(personnelsReducer , {
        personnels :  []
    })

   

    return(
        <PersonnelsContext.Provider value={{...state , dispatch}}>
            {children}
        </PersonnelsContext.Provider>
    )
}

