import { createContext  , useReducer , useEffect } from "react";

export const StatistiquesContext = createContext() 

export const statistiquesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_TOTAL_STATISTIQUE':
        return {
          ...state,
          statistiques: {
            ...state.statistiques,
            nbEtudiant: action.payload.nbEtudiant,
            nbPersonnel: action.payload.nbPersonnel,
            nbParents: action.payload.nbParents,
            nbTransport: action.payload.nbTransport
          }
        };
  
      case 'SET_TRANSPORT_STATISTIQUE':
        return {
          ...state,
          statistiques: {
            ...state.statistiques,
            dataTransport: action.payload.dataTransport
          }
        };
  
      default:
        return state;
    }
  };

export const StatistiquesContextProvider = ({children})=>{
    const [state  , dispatch] = useReducer(statistiquesReducer , {
        statistiques :  {
            "nbEtudiant" : 0 ,
            "nbPersonnel" : 0,
            "nbTransport" : 0,
            "nbParents" : 0,
            "dataTransport" : []

        }
    })

   

    return(
        <StatistiquesContext.Provider value={{...state , dispatch}}>
            {children}
        </StatistiquesContext.Provider>
    )
}

