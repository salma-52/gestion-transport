import React, { useEffect, useRef, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useTransportsContext } from '../../hooks/useTransportsContext'
import { API_BACKEND, API_FRONTEND } from '../../API/api'
import TableData from '../../components/TableData'

// icons 
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi"
import { FaFilePdf } from "react-icons/fa";
import { usePersonnelsContext } from '../../hooks/usePersonnelsContext'

const GestionTransport = () => {
  const { user } = useAuthContext()
  const {transports , dispatch} = useTransportsContext()
  const {personnels , dispatch:dispatchPersonnels } = usePersonnelsContext()
  const picREf = useRef()
  const [previewImage, setPreviewImage] = useState(API_FRONTEND + '/src/images/transport.jpg');

  const [search , setSearch] = useState("")
  const [filterData , setFilterDate] = useState([])
  const [transportDelete , setTransportDelete]= useState(null)
  const [transportUpdate , setTransportUpdate] = useState(null)
  const [transportDetails , setTransportDetails] = useState(null)
  const [etudiants , setetudiants] = useState([])

  
    // error 
    const [errorDelete ,  setErrorDelete] = useState("")
    const [ errorUpdate , setErrorUpdate] = useState("")
    const [ errorAdd , setErrorAdd] = useState("")

     // add 
     const [photo, setPhoto] = useState(null);
     const [nbPlaces , setNbPplaces] = useState(0)
     const [immatricule , setImmatricule] = useState("")
     const [responsableId , setResponsableId] = useState(null)
     const [chauffeurId , setChauffeurId] = useState(null)

     const [cinResponsable , setCinResponsable] = useState("")
     const [cinChauffeur , setCinChauffeur] = useState("")

     const [dropDownResponsable , setDropDownResposable] = useState(false)
     const [dropDownChauffeur , setDropDropDownChauffeur] = useState(false)
     const [filterDataPersonnels , setFilterDataPersonnels] = useState([])
     const [searchSelectPersonnels , setSearchSelectPersonnels] = useState('')

    
    // details transport 
    
    const [searchTransport , setSearchTransport] = useState("")
    const [filterDataTransport , setFilterDataTransport] = useState([])


     // models 
     const [isModalDeleteOpen , setIsModalDeleteOpen] = useState(false)
     const [isModalAddOpen , setIsModalAddOpen] = useState(false)
     const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
     const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
 
     const clickImage=()=>{
         picREf.current.click();
         
     }

    useEffect(()=>{
        const fetTransport = async ()=>{
            const response = await fetch(API_BACKEND +'/api/admin/transports' , {
                headers :{"Authorization" : `Bearer ${user.access_token}`}
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type : 'SET_TRANSPORTS' , payload : json.data})
                setFilterDate(json.data)
            }

        }

        const fetchPersonnels = async ()=>{
          const response = await fetch(API_BACKEND +'/api/admin/personnels' , {
              headers :{"Authorization" : `Bearer ${user.access_token}`}
          })
          const json = await response.json()

          if(response.ok){
            dispatchPersonnels({type : 'SET_PERSONNELS' , payload : json.data})
            setFilterDataPersonnels(json.data)
          }

      }

        fetchPersonnels()
        fetTransport()

    } , [])

    useEffect(()=>{

        const result = transports.filter((item)=>{
          return JSON.stringify(item)
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
          
        });
      
        setFilterDate(result)      
      
    } , [search , transports ])

    useEffect(()=>{

        const result = personnels.filter((item)=>{
          return JSON.stringify(item)
          .toLowerCase()
          .indexOf(searchSelectPersonnels.toLowerCase()) !== -1
          
        });

     
      
        setFilterDataPersonnels(result)
    
      
    } , [searchSelectPersonnels , personnels ])

    useEffect(()=>{

        const result = etudiants.filter((item)=>{
          return JSON.stringify(item)
          .toLowerCase()
          .indexOf(searchTransport.toLowerCase()) !== -1
          
        });
      
        setFilterDataTransport(result)
      
    } , [searchTransport , etudiants ])

    // toggle functions 

    const handlePhotoChange = (e)=>{
      const selectedPhoto = e.target.files[0]
      setPhoto(selectedPhoto)
      setPreviewImage(URL.createObjectURL(selectedPhoto));
    }

    const toggleModalDelete = () => {
      setIsModalDeleteOpen(!isModalDeleteOpen);
    };
  
    const toggleModalAdd = () => {
        setIsModalAddOpen(!isModalAddOpen);
    };
  
    const toggleModalUpdate = () => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
    };

    const toggleModalDetails = ()=>{
        setIsModalDetailsOpen(!isModalDetailsOpen)
    }

    const toggleDropDownResponsable = ()=>{
      setDropDownResposable(!dropDownResponsable);
      setSearchSelectPersonnels('')
    }

    const toggleDropDownChauffeur = ()=>{
      setDropDropDownChauffeur(!dropDownChauffeur)
      setSearchSelectPersonnels('')
    }

     // change functions 
     const handleChangeNbPlaces = (e)=>{
        setNbPplaces(e.target.value)
    }

    const handleChangeImmatricule = (e)=>{
        setImmatricule(e.target.value)
    }

    
    const handleChangeResponsableId = (e)=>{
      setResponsableId(e.target.value)
    }

    const handleChangeChauffeurId = (e)=>{
      setChauffeurId(e.target.value)
    }

    const columns = [
      {
          name : "Photo",
          selector : (row) => <> <div className="flex-shrink-0 h-10 w-10">
                                     <img className="h-10 w-10 rounded-full" src={API_BACKEND +"/storage/" + row.photo} alt=""/>
                                </div>
                                </>,
          sortable: true
      },
      {
        name : "Immatricule",
        selector : (row) => row.immatricule,
        sortable: true
      },

      {
        name : "Nombre Places ",
        selector : (row) => row.nb_places,
        sortable: true
      },

      {
        name : "Chauffeur",
        selector : (row) => row.chauffeur.nom + " " +row.chauffeur.prenom ,
        sortable: true
      },

      {
        name : "Chauffeur CIN",
        selector : (row) => row.chauffeur.cin,
        sortable: true
      },
      {
        name : "Responsable",
        selector : (row) => row.responsable.nom + ' ' + row.responsable.prenom,
        sortable: true
      },

      {
        name : "Responsable CIN",
        selector : (row) => row.responsable.cin,
        sortable: true
      },
  
      {
        name : "Actions",
        cell : (row) => <div className='flex items-center justify-center'>
              <MdDelete onClick={()=> { deleteItem(row.id )} } className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer mr-2" />
              <FaEdit onClick={()=> {modifierItem(row.id)}} className="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer mr-2" />
              <BiShowAlt onClick={()=>{detailsItem(row.id) }}  className="w-6 h-6 text-green-500 hover:text-green-700 cursor-pointer mr-2" />
              <FaFilePdf onClick={()=>{DownloadItem(row.id) }}  className="w-6 h-6 text-orange-500 hover:text-orange-700 cursor-pointer mr-2" />
    
        </div>
      }
    
    ]
    const columnsEtudiants = [
        {
            name : "Photo",
            selector : (row) => <> <div className="flex-shrink-0 h-10 w-10">
                                       <img className="h-10 w-10 rounded-full" src={API_BACKEND +"/storage/" + row.photo} alt=""/>
                                  </div>
                                  </>,
            sortable: true
        },
        {
          name : "Nom",
          selector : (row) => row.nom,
          sortable: true
        },
        {
            name : "Prenom",
            selector : (row) => row.prenom,
            sortable: true
          },
        {
            name : "CIN",
            selector : (row) => row.cne,
            sortable: true
        },
        {
            name : "Tel",
            selector : (row) => row.tel,
            sortable: true
        },


        {
            name : "Heur Aller",
            selector : (row) => row.heur_aller,
            sortable: true
        },

        {
            name : "Heur Retour",
            selector : (row) => row.heur_retour,
            sortable: true
        },
    
      
      
    ] 



   // ajouter 
  const AjouterItem = ()=>{
      setErrorAdd("")
      setChauffeurId(null)
      setResponsableId(null)
      setImmatricule("")
      setPhoto(null)
      setNbPplaces(0)
      setPreviewImage(API_FRONTEND + '/src/images/transport.jpg')
      setIsModalAddOpen(true)
      
  }

  const handleAddTransportSubmit = async(e)=>{
    e.preventDefault();

    
    const formData = new FormData();
    formData.append('nb_places', nbPlaces);
    formData.append('immatricule', immatricule);
    formData.append('photo', photo);
    formData.append('responsable_id', responsableId);
    formData.append('chauffeur_id', chauffeurId);

   
    

    const response = await fetch(API_BACKEND + '/api/admin/transport', {
        method: 'POST',
        headers: { "Authorization": `Bearer ${user.access_token}` },
        body: formData
    });

      const json = await response.json()

      if(!response.ok){

          setErrorAdd(json.error)

      }

      if(response.ok){
        dispatch({type : 'CREATE_TRANSPORT' , payload : json.data})
        setIsModalAddOpen(false)

        setErrorAdd("")
        setChauffeurId(null)
        setResponsableId(null)
        setImmatricule("")
        setPhoto(null)
        setNbPplaces(0)
        setPreviewImage(API_FRONTEND + '/src/images/transport.jpg')

      }
  
  }

  // modifier 

  const modifierItem= (id) =>{
    setErrorUpdate("")
    const transport = transports.filter(item=> item.id === id)[0]
    setTransportUpdate(transport)
    setIsModalUpdateOpen(true)
    
    setChauffeurId(transport.chauffeur_id)
    setResponsableId(transport.responsable_id)
    setImmatricule(transport.immatricule)
    setPhoto(null)
    setNbPplaces(transport.nb_places)
    setPreviewImage(API_BACKEND +"/storage/" + transport.photo)
    setChauffeurId(transport.chauffeur_id)
    setResponsableId(transport.responsable_id)
    setCinResponsable(transport.responsable.cin)
    setCinChauffeur(transport.chauffeur.cin)
   

   
}

const handleUpdateTransportSubmit = async (e)=>{
    e.preventDefault()
   
    
    const formData = new FormData();
    formData.append('nb_places', nbPlaces);
    formData.append('immatricule', immatricule);
    formData.append('photo', photo);
    formData.append('responsable_id', responsableId);
    formData.append('chauffeur_id', chauffeurId);



    
   

    const response = await fetch(API_BACKEND + '/api/admin/transport/' + transportUpdate.id,  {
        method: 'POST',
        headers: { "Authorization": `Bearer ${user.access_token}` },
        body: formData
    });

      const json = await response.json()


      if(!response.ok){

          setErrorUpdate(json.error)

      }

    if(response.ok){
        dispatch({type : 'UPDATE_TRANSPORT' , payload : json.data})
        setIsModalUpdateOpen(false)
            
     
        setErrorUpdate("")
        setChauffeurId(null)
        setResponsableId(null)
        setImmatricule("")
        setPhoto(null)
        setNbPplaces(0)
        setPreviewImage(API_FRONTEND + '/src/images/transport.jpg')

     }
}


// delete 

const deleteItem = async(id) =>{
   
    const transport = transports.filter(item=> item.id === id)[0]
    
    setTransportDelete(transport)
    setIsModalDeleteOpen(true)
    setErrorDelete("")
}


const handleDeleteTransportSubmit = async(e)=>{
    e.preventDefault();
    try{

      const response = await fetch( API_BACKEND+ "/api/admin/transport/"+ transportDelete.id ,{
        method : 'DELETE' , 
        headers : {"Content-type" : 'application/json'},
       
      })
      
      const res = await response.json() 
      if(response.ok){
        dispatch({type : 'DELETE_TRANSPORT' , payload : res.id})
        setIsModalDeleteOpen(false)
        setErrorDelete("")
      }else{
        setErrorDelete(res.error)
      }

  }catch(error){
    console.log("error" , error);
  }

}


// details 

const detailsItem = async(id)=>{
    const transport = transports.filter(item=> item.id === id)[0]
    setTransportDetails(transport)
    setIsModalDetailsOpen(true)
    setetudiants(transport.etudiants)
}


// download pdf  

const DownloadItem = async(id)=>{
  try {
    const response = await fetch(API_BACKEND + '/api/admin/transport/pdf/' + id, {
      headers: {
        "Authorization": `Bearer ${user.access_token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to download PDF');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'itsolutionstuff.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url); // Libérer l'URL après utilisation
  } catch (error) {
    console.error('Error downloading the PDF:', error);
  }
}







  return (
    <>
        <div className="ml-64">
            <div className="container mx-auto bg-white pt-8">
              <TableData 
                    dataTab={filterData} 
                    columns={columns} 
                    title={"List Transports"}  
                    addActions={AjouterItem} 
                    search={search} 
                    setSearch={setSearch}
                    transactions={true}
                  
                 

              />
            
            </div>
        </div>


        {/* Ajouter  */}

        {isModalAddOpen && (
                    <div id="crud-modal" tabIndex="2" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
                            <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Ajoutre Transport
                                    </h3>
                                    <button onClick={toggleModalAdd} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {errorAdd && <div className='text-red-700 text-center mt-2'>{errorAdd}</div>}
                                <form className="p-4 md:p-5 overflow-y-auto max-h-[75vh]" onSubmit={handleAddTransportSubmit} encType="multipart/form-data">
                                    <div className="mb-2 flex justify-center items-center">
                                        <input ref={picREf} type="file" id="image" accept="image/*" onChange={handlePhotoChange} hidden/>
                                        <img onClick={clickImage} src={previewImage} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg"/>
                                    </div>
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label htmlFor="immatricule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Immatricule</label>
                                            <input type="text" name="immatricule" required id="immatricule" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeImmatricule} value={immatricule} />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="nb_places" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">nb_placesbre de places</label>
                                            <input type="number" name="nb_places" required id="nb_places" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeNbPlaces} value={nbPlaces} />
                                        </div>

                                      
                                        
                                    </div>
                                    {/* Responsable */}
                                      <div className='mt-3'>
                                      <div className="flex">
                                            <div className="w-1/3"> 
                                              <button
                                                  onClick={toggleDropDownResponsable}
                                                  id="dropdownUsersButton"
                                                  data-dropdown-toggle="dropdownUsers"
                                                  data-dropdown-placement="bottom"
                                                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                  type="button"
                                              >
                                                  liste Responsables
                                                  <svg
                                                      className="w-2.5 h-2.5"
                                                      aria-hidden="true"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 10 6"
                                                  >
                                                      <path
                                                          stroke="currentColor"
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="m1 1 4 4 4-4"
                                                      />
                                                  </svg>
                                              </button>

                                            </div>
                                            <div className="ml-3 w-2/3"> 
                                                <input value={cinResponsable} type="text" name="responsable" id="responsable" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Cin Responsable" required readOnly /> 
                                            </div>
                                        </div>

                                          {dropDownResponsable && 
                                              <div id="dropdownUsers" className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                                                  <div className="p-3">
                                                      <label htmlFor="input-group-search" className="sr-only">Search</label>
                                                      <div className="relative">
                                                          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                              </svg>
                                                          </div>
                                                          <input value={searchSelectPersonnels} onChange={(e) => setSearchSelectPersonnels(e.target.value)} type="text" id="input-group-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Responsable" />
                                                      </div>
                                                  </div>
                                                  <ul className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                                                      {filterDataPersonnels && filterDataPersonnels.map((item, index) => (
                                                          <li key={index}>
                                                              <a onClick={() => { 
                                                                      setResponsableId(item.id)
                                                                      setCinResponsable(item.cin)
                                                                      setDropDownResposable(false)
                                                                  }} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                  {item.cin}
                                                              </a>
                                                          </li>
                                                      ))}
                                                  </ul>
                                              </div>
                                          }
                                      </div>
                                     {/* end Responsable */}


                                    {/* Chauffeur */}
                                         <div className='mt-3'>
                                      <div className="flex">
                                            <div className="w-1/3"> 
                                              <button
                                                    onClick={toggleDropDownChauffeur}
                                                    id="dropdownUsersButton"
                                                    data-dropdown-toggle="dropdownUsers"
                                                    data-dropdown-placement="bottom"
                                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    type="button"
                                                >
                                                    liste Chauffeur 
                                                    <svg
                                                        className="w-2.5 h-2.5"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 10 6"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="m1 1 4 4 4-4"
                                                        />
                                                    </svg>
                                                </button>
                                                {/* <button onClick={toggleDropDownChauffeur} id="dropdownUsersButton" data-dropdown-toggle="dropdownUsers" data-dropdown-placement="bottom" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                                    liste Chauffeur 
                                                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                                    </svg>
                                                </button> */}
                                            </div>
                                            <div className="ml-3 w-2/3"> 
                                                <input value={cinChauffeur} type="text" name="responsable" id="responsable" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Cin Chauffeur" required readOnly /> 
                                            </div>
                                        </div>

                                          {dropDownChauffeur && 
                                              <div id="dropdownUsers" className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                                                  <div className="p-3">
                                                      <label htmlFor="input-group-search" className="sr-only">Search</label>
                                                      <div className="relative">
                                                          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                              </svg>
                                                          </div>
                                                          <input value={searchSelectPersonnels} onChange={(e) => setSearchSelectPersonnels(e.target.value)} type="text" id="input-group-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Chauffeur" />
                                                      </div>
                                                  </div>
                                                  <ul className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                                                      {filterDataPersonnels && filterDataPersonnels.map((item, index) => (
                                                          <li key={index}>
                                                              <a onClick={() => { 
                                                                      setChauffeurId(item.id)
                                                                      setCinChauffeur(item.cin)
                                                                      setDropDropDownChauffeur(false)
                                                                  }} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                  {item.cin}
                                                              </a>
                                                          </li>
                                                      ))}
                                                  </ul>
                                              </div>
                                          }
                                         </div>
                                     {/* end Chauffeur */}

                                    <div className='mt-5 flex justify-center'>
                                      <button type="submit" className=" text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                          Ajouter
                                      </button>
                                    </div>

                                   
                                </form>
                            </div>
                        </div>
                
        )}


         {/* update */}
         {isModalUpdateOpen && (
                    <div id="crud-modal" tabIndex="2" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
                    <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Update User
                            </h3>
                            <button onClick={toggleModalUpdate} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {errorUpdate && <div className='text-red-700 text-center mt-2'>{errorUpdate}</div>}
                        <form className="p-4 md:p-5 overflow-y-auto max-h-[75vh]" onSubmit={handleUpdateTransportSubmit} encType="multipart/form-data">
                        <div className="mb-2 flex justify-center items-center">
                                        <input ref={picREf} type="file" id="image" accept="image/*" onChange={handlePhotoChange} hidden/>
                                        <img onClick={clickImage} src={previewImage} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg"/>
                                    </div>
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label htmlFor="immatricule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Immatricule</label>
                                            <input type="text" name="immatricule" required id="immatricule" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeImmatricule} value={immatricule} />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="nb_places" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">nb_placesbre de places</label>
                                            <input type="number" name="nb_places" required id="nb_places" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeNbPlaces} value={nbPlaces} />
                                        </div>

                                      
                                        
                                    </div>
                                    {/* Responsable */}
                                      <div className='mt-3'>
                                      <div className="flex">
                                            <div className="w-1/3"> 
                                              <button
                                                  onClick={toggleDropDownResponsable}
                                                  id="dropdownUsersButton"
                                                  data-dropdown-toggle="dropdownUsers"
                                                  data-dropdown-placement="bottom"
                                                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                  type="button"
                                              >
                                                  liste Responsables
                                                  <svg
                                                      className="w-2.5 h-2.5"
                                                      aria-hidden="true"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 10 6"
                                                  >
                                                      <path
                                                          stroke="currentColor"
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="m1 1 4 4 4-4"
                                                      />
                                                  </svg>
                                              </button>

                                            </div>
                                            <div className="ml-3 w-2/3"> 
                                                <input value={cinResponsable} type="text" name="responsable" id="responsable" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Cin Responsable" required readOnly /> 
                                            </div>
                                        </div>

                                          {dropDownResponsable && 
                                              <div id="dropdownUsers" className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                                                  <div className="p-3">
                                                      <label htmlFor="input-group-search" className="sr-only">Search</label>
                                                      <div className="relative">
                                                          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                              </svg>
                                                          </div>
                                                          <input value={searchSelectPersonnels} onChange={(e) => setSearchSelectPersonnels(e.target.value)} type="text" id="input-group-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Client" />
                                                      </div>
                                                  </div>
                                                  <ul className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                                                      {filterDataPersonnels && filterDataPersonnels.map((item, index) => (
                                                          <li key={index}>
                                                              <a onClick={() => { 
                                                                      setResponsableId(item.id)
                                                                      setCinResponsable(item.cin)
                                                                      setDropDownResposable(false)
                                                                  }} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                  {item.cin}
                                                              </a>
                                                          </li>
                                                      ))}
                                                  </ul>
                                              </div>
                                          }
                                      </div>
                                     {/* end Responsable */}


                                    {/* Chauffeur */}
                                         <div className='mt-3'>
                                      <div className="flex">
                                            <div className="w-1/3"> 
                                              <button
                                                    onClick={toggleDropDownChauffeur}
                                                    id="dropdownUsersButton"
                                                    data-dropdown-toggle="dropdownUsers"
                                                    data-dropdown-placement="bottom"
                                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    type="button"
                                                >
                                                    liste Chauffeur 
                                                    <svg
                                                        className="w-2.5 h-2.5"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 10 6"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="m1 1 4 4 4-4"
                                                        />
                                                    </svg>
                                                </button>
                                                {/* <button onClick={toggleDropDownChauffeur} id="dropdownUsersButton" data-dropdown-toggle="dropdownUsers" data-dropdown-placement="bottom" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                                    liste Chauffeur 
                                                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                                    </svg>
                                                </button> */}
                                            </div>
                                            <div className="ml-3 w-2/3"> 
                                                <input value={cinChauffeur} type="text" name="responsable" id="responsable" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Cin Chauffeur" required readOnly /> 
                                            </div>
                                        </div>

                                          {dropDownChauffeur && 
                                              <div id="dropdownUsers" className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                                                  <div className="p-3">
                                                      <label htmlFor="input-group-search" className="sr-only">Search</label>
                                                      <div className="relative">
                                                          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                              </svg>
                                                          </div>
                                                          <input value={searchSelectPersonnels} onChange={(e) => setSearchSelectPersonnels(e.target.value)} type="text" id="input-group-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Client" />
                                                      </div>
                                                  </div>
                                                  <ul className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                                                      {filterDataPersonnels && filterDataPersonnels.map((item, index) => (
                                                          <li key={index}>
                                                              <a onClick={() => { 
                                                                      setChauffeurId(item.id)
                                                                      setCinChauffeur(item.cin)
                                                                      setDropDropDownChauffeur(false)
                                                                  }} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                  {item.cin}
                                                              </a>
                                                          </li>
                                                      ))}
                                                  </ul>
                                              </div>
                                          }
                                      </div>
                                     {/* end Chauffeur */}

                                     <div className='mt-5 flex justify-center'>
                                      <button type="submit" className=" text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                          Update
                                      </button>
                                    </div>
                        </form>
                    </div>
                </div>
                
        )}


               {/* Delete */}
        {isModalDeleteOpen &&
            <div id="deleteModal" className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50">
                <div className="relative p-4 w-full max-w-md">
                    <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button onClick={toggleModalDelete} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        { errorDelete && <div className='text-red-700'>{errorDelete}</div>}
                        <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
                        <div className="flex justify-center items-center space-x-4">
                            <button onClick={toggleModalDelete} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                No, cancel
                            </button>
                            <button onClick={handleDeleteTransportSubmit} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        }


{/* detials  */}

{isModalDetailsOpen && (
                  <div
                  id="crud-modal1"
                  tabIndex="2"
                  aria-hidden="true"
                  className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
                >
                  <div className="relative p-4 w-full max-w-6xl bg-white rounded-lg shadow dark:bg-gray-700 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Details Transport</h3>
                      <button
                        onClick={toggleModalDetails}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-toggle="crud-modal"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                
                    <div className="p-4 md:p-5 overflow-y-auto">
                      <div className="mb-4">
                        <div className="bg-white overflow-hidden shadow rounded-lg border flex justify-evenly">
                          <div className="px-4 py-5 sm:px-6">
                            <div className="mb-4 flex justify-center items-center">
                              <img
                                src={API_BACKEND + "/storage/" + transportDetails.photo}
                                className="h-auto max-w-40 rounded-lg"
                                alt=""
                              />
                            </div>
                          </div>
                
                          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                              <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Transport</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                    <li>immatricule : {transportDetails.immatricule}</li>
                                    <li>Nombre Places : {transportDetails.nb_places}</li>
                                  </ul>
                                </dd>
                              </div>
                
                              <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Chauffeur</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                    <li>Cin : {transportDetails.chauffeur.cin}</li>
                                    <li>Nom Complete : {transportDetails.chauffeur.nom + " " + transportDetails.chauffeur.prenom}</li>
                                    <li>Email : {transportDetails.chauffeur.email}</li>
                                    <li>Phone : {transportDetails.chauffeur.tel}</li>
                                    <li>Address : {transportDetails.chauffeur.adress}</li>
                                  </ul>
                                </dd>
                              </div>
                
                              <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Responsable</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                    <li>Cin : {transportDetails.responsable.cin}</li>
                                    <li>Nom Complete : {transportDetails.responsable.nom + " " + transportDetails.responsable.prenom}</li>
                                    <li>Email : {transportDetails.responsable.email}</li>
                                    <li>Phone : {transportDetails.responsable.tel}</li>
                                    <li>Address : {transportDetails.responsable.adress}</li>
                                  </ul>
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                
                    <div className="p-4 md:p-5 overflow-y-auto">
                      <TableData
                        dataTab={filterDataTransport}
                        columns={columnsEtudiants}
                        title={"List Personnels"}
                        search={searchTransport}
                        setSearch={setSearchTransport}
                        transactions={false}
                      />
                    </div>
                  </div>
                </div>
                
                
)}

        

    </>
  )
}

export default GestionTransport