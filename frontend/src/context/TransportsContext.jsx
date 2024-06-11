import { createContext  , useReducer , useEffect } from "react";

export const TransportsContext = createContext() 

export const  transportsReducer = (state , action) =>{
    switch(action.type){
        case 'SET_TRANSPORTS' :
            return { transports : action.payload}
        case 'CREATE_TRANSPORT':
            return  {transports : [action.payload , ...state.transports]}
        case 'UPDATE_TRANSPORT':

            const updatedTransportIndex = state.transports.findIndex(item => item.id === action.payload.id);
        
            if (updatedTransportIndex !== -1) {
                const updatedTransport = [...state.transports];
                updatedTransport[updatedTransportIndex] = action.payload;
                return { transports: updatedTransport };
            } 
        case 'DELETE_TRANSPORT':
            const filteredTransports = state.transports.filter(item => item.id !== action.payload);
            return { transports: filteredTransports };
        default : 
            return state 

    }
}

export const TransportsContextProvider = ({children})=>{
    const [state  , dispatch] = useReducer(transportsReducer , {
        transports :  []
    })

   

    return(
        <TransportsContext.Provider value={{...state , dispatch}}>
            {children}
        </TransportsContext.Provider>
    )
}

