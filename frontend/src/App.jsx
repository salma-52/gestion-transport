import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import {Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import SidBarAdmin from "./components/SidBarAdmin"
import NavBar from "./components/NavBar.jsx"
import Register from './pages/Register.jsx'
import Admin from './pages/Admin.jsx'
import Parents from './pages/Parents.jsx'
import SidBarParents from './components/SidBarParents.jsx'
import GestionPersonnels from './pages/admin/GestionPersonnels.jsx'
import GestionEtudaints from './pages/admin/GestionEtudaints.jsx'
import GestionTransport from './pages/admin/GestionTransport.jsx'
import GestionParents from './pages/admin/GestionParents.jsx'


function App() {
  const { user } = useAuthContext()
  
  const [currentUrl , setCurrentUrl] = useState('/');
  const [prevUrl , setPrevUrl] = useState('/')
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    setPrevUrl(currentUrl)
    setCurrentUrl(currentPath);
  
}, [currentPath]);

function ChekAdmin ({children}){
  const utilisateur = JSON.parse(localStorage.getItem('user_etablissement'));

  if(utilisateur){
    const role = utilisateur.role 

      if(role === 0 ){
        return <>{children}</>
      }else{
        return <Navigate to="/parents" />
      }

  }else{
    return  <Navigate to="/login" />
  }
  
}


function ChekParents ({children}){
  const utilisateur = JSON.parse(localStorage.getItem('user_etablissement'));
 
  if(utilisateur){
    const role = utilisateur.role 

      if(role === 1 ){
        return <>{children}</>
      }else{
        return <Navigate to="/parents" />
      }

  }else{
    return  <Navigate to="/login" />
  }
  
}


function CheckLogin ({children}){

    
  if(!user){
    
    return <>{children}</>
  }else{
      return  <Navigate to={"/"} />
    }

  
}



  return (
    <>
    {!user &&  <NavBar/>}

    <Routes>

            {/* routes admin */}

            <Route  path='/' element={user ? 
              <ChekAdmin>
                <SidBarAdmin/>
                <Admin/>
              
              </ChekAdmin> :  <Navigate to="/login" />} 
            />

          

            <Route  path='/transports' element={user ? 
                <ChekAdmin>
                  <SidBarAdmin/>
                  <GestionTransport/>
              
              </ChekAdmin> :  <Navigate to="/login" />} 
            />

            <Route  path='/responsables' element={user ? 
                <ChekAdmin>
                  <SidBarAdmin/>
                  <GestionPersonnels/>
              
              </ChekAdmin> :  <Navigate to="/login" />} 
            />

            
            <Route  path='/personnels' element={user ? 
                <ChekAdmin>
                  <SidBarAdmin/>
                  <GestionEtudaints/>
              
              </ChekAdmin> :  <Navigate to="/login" />} 
            />

            <Route  path='/admin/parents' element={user ? 
                <ChekAdmin>
                  <SidBarAdmin/>
                  <GestionParents/>
              
              </ChekAdmin> :  <Navigate to="/login" />} 
            />

      {/* end Routes admin */}

      {/* start routes Parents */}

      <Route path='/parents' element={ user ? 
        <ChekParents>
          <SidBarParents/>
          <Parents/>
        </ChekParents>  : <Navigate to="/login" /> } 
      />

      {/* start routes Parents */}

    <Route path="/login" element={<CheckLogin><Login /> </CheckLogin>} />
    <Route path="/register" element={!user ? <Register /> :  <Navigate to="/" /> } /> 
    </Routes>
    </>
  )
}

export default App
