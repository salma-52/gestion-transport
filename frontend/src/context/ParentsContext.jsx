import { createContext  , useReducer , useEffect } from "react";

export const ParentsContext = createContext() 

export const  parentsReducer = (state , action) =>{
    switch(action.type){
        case 'SET_PARENTS' :
            return { parents : action.payload}
        case 'CREATE_PARENT':
            return  {parents : [action.payload , ...state.parents]}
        case 'UPDATE_PARENT':

            const updatedParentIndex = state.parents.findIndex(item => item.id === action.payload.id);
        
            if (updatedParentIndex !== -1) {
                const updatedParent = [...state.parents];
                updatedParent[updatedParentIndex] = action.payload;
                return { parents: updatedParent };
            } 
        case 'DELETE_PARENT':
            const filteredParents = state.parents.filter(item => item.id !== action.payload);
            return { parents: filteredParents };
        default : 
            return state 

    }
}

export const ParentsContextProvider = ({children})=>{
    const [state  , dispatch] = useReducer(parentsReducer , {
        parents :  []
    })

   

    return(
        <ParentsContext.Provider value={{...state , dispatch}}>
            {children}
        </ParentsContext.Provider>
    )
}

