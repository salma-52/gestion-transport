import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { API_BACKEND } from '../API/api'

const Parents = () => {
  const { user } = useAuthContext()

  const [detilsParant , setDetailsParant] =useState(null)

  useEffect(()=>{
    const fetDetailsParant = async ()=>{
        const response = await fetch(API_BACKEND +'/api/parent/details/' + user.id , {
            headers :{"Authorization" : `Bearer ${user.access_token}`}
        })
        const json = await response.json()

        if(response.ok){
           console.log(json);
           setDetailsParant(json.data)
        }

    }

 
    fetDetailsParant()

} , [])


  return (
    <>
    
    <div className="ml-64 mb-6">
      <div className="container mx-auto bg-white pt-8">



            {detilsParant && 
            <>
            <div className="flex rounded justify-center my-2 ">
                 
            <div className="bg-white w-11/12 overflow-hidden shadow rounded-lg border flex justify-evenly">
                          <div className="px-4 py-5 sm:px-6">
                            
                              <div className="mb-4 flex flex-col items-center">
                                  <div>
                                    <dl className="sm:divide-y sm:divide-gray-200">
                                        <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        
                                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                              <li>Nom : {detilsParant.nom}</li>
                                              <li>Prenom: {detilsParant.prenom}</li>
                                              <li>Email: {detilsParant.email}</li>
                                            </ul>
                                          </dd>
                                        </div>
                          
                                      </dl>
                                  </div>
                              </div>
                          </div>

                          <div className="px-4 py-5 sm:px-6">
                            
                            <div className="mb-4 flex flex-col items-center">
                                <div>
                                  <dl className="sm:divide-y sm:divide-gray-200">
                                      <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                      
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                          <li>CIN : {detilsParant.cin}</li>
                                          <li>Address : {detilsParant.adress}</li>
                                          <li>Phone : {detilsParant.tel}</li>
                                          </ul>
                                        </dd>
                                      </div>
                        
                                    </dl>
                                </div>
                            </div>
                        </div>

                       

            </div>
         </div>

         {detilsParant.fils.map((fils, index) => (
           <div key={index} className="flex rounded justify-center my-2 ">
                        <div  className="bg-white w-11/12 overflow-hidden shadow rounded-lg border flex justify-evenly">
                          <div className="px-4 py-5 sm:px-6">
                            
                            <div className="mb-4 flex flex-col items-center">
                              <img
                                src={`${API_BACKEND}/storage/${fils.photo}`}
                                className="h-auto max-w-40 rounded-lg"
                                alt=""
                              />

                                      <div>
                                        <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Fils </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                                <li>Nom : {fils.nom}</li>
                                                <li>Prenom : {fils.prenom}</li>
                                                <li>Cne : {fils.cne}</li>
                                                <li>Address : {fils.adress}</li>
                                                <li>Phone : {fils.tel}</li>                                    
                                                <li>Heur Aller : {fils.heur_aller}</li>
                                                <li>Heur Retour : {fils.heur_retour}</li>
                                            
                                            </ul>
                                            </dd>
                                        </div>
                                      </div>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                              <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Transport</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                    <li>immatricule : {fils.transport.immatricule}</li>
                                    <li>Nombre Places : {fils.transport.nb_places}</li>
                                  </ul>
                                </dd>
                              </div>
                              <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Chauffeur</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                    <li>Nom Complete : {`${fils.transport.chauffeur.nom} ${fils.transport.chauffeur.prenom}`}</li>
                                    <li>Email : {fils.transport.chauffeur.email}</li>
                                    <li>Phone : {fils.transport.chauffeur.tel}</li>
                                    <li>Address : {fils.transport.chauffeur.adress}</li>
                                  </ul>
                                </dd>
                              </div>
                              <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Responsable</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">

                                    <li>Nom Complete : {`${fils.transport.responsable.nom} ${fils.transport.responsable.prenom}`}</li>
                                    <li>Email : {fils.transport.responsable.email}</li>
                                    <li>Phone : {fils.transport.responsable.tel}</li>
                                    <li>Address : {fils.transport.responsable.adress}</li>
                                  </ul>
                                </dd>
                              </div>
                            </dl>
                          </div>

                        </div>

                        </div>
                      ))}

             
                 
                      
                
             

            </>
            }
      </div>
    </div>

    </>
  )
}

export default Parents