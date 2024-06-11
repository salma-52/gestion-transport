import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { PersonnelsContextProvider } from './context/personnelsContext.jsx';
import { EtudiantsContextProvider } from './context/EtudiantsContext.jsx';
import { TransportsContextProvider } from './context/TransportsContext.jsx';
import { ParentsContextProvider } from './context/ParentsContext.jsx';
import { StatistiquesContextProvider } from './context/StatistiquesContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <PersonnelsContextProvider>
        <EtudiantsContextProvider>
          <TransportsContextProvider>
            <ParentsContextProvider>
              <StatistiquesContextProvider>
                <App />
              </StatistiquesContextProvider>
            </ParentsContextProvider>
          </TransportsContextProvider>
        </EtudiantsContextProvider>
      </PersonnelsContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
)
