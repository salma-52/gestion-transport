import React, { useEffect, useRef, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useEtudiantsContext } from '../../hooks/useEtudiantsContext'
import { API_BACKEND, API_FRONTEND } from '../../API/api'
import TableData from '../../components/TableData'

// icons 
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi"
import { useTransportsContext } from '../../hooks/useTransportsContext'

const GestionEtudaints = () => {
    const { user } = useAuthContext()
    const {etudiants , dispatch} = useEtudiantsContext()
    const {transports , dispatch:dispatchTransport} = useTransportsContext()
    const picREf = useRef()
    const [previewImage, setPreviewImage] = useState(API_FRONTEND + '/src/images/avatar.jpg');


    const [search , setSearch] = useState("")
    const [filterData , setFilterDate] = useState([])
    const [etudaintDelete , setEtudiantDelete]= useState(null)
    const [etudiantUpdate , setEtudiantUpdate] = useState(null)
    const [etudiantDetails, setEtudiantDetails] = useState(null);
    const [transportDetails, setTransportDetails] = useState(null);
    // error 
    const [errorDelete ,  setErrorDelete] = useState("")
    const [ errorUpdate , setErrorUpdate] = useState("")
    const [ errorAdd , setErrorAdd] = useState("")
    
    // add 
    const [photo, setPhoto] = useState(null);
    const [nom , setNom] = useState("")
    const [prenom , setPrenom] = useState("")
    const [tel , setTel] = useState("")
    const [adress , setAdress] = useState("")
    const [cne , setCne] = useState("")
    const [timeA , setTimeA] = useState("06:00")
    const [timeR , setTimeR] = useState("16:00")
    const [transportId , setTransportId] = useState(null)

    // models 
    const [isModalDeleteOpen , setIsModalDeleteOpen] = useState(false)
    const [isModalAddOpen , setIsModalAddOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
    

    // dropDown  
    const [immatriculeTransport , setImmatriculeTransport] = useState('')
    const [dropDownTransport , setDropDownTransport] = useState(false)
    const [filterDataTransports, setFilterDataTransports] = useState([])
     const [searchSelectTransports , setSearchSelectTransports] = useState('')

    

    const clickImage=()=>{
        picREf.current.click();
        
    }

    useEffect(()=>{
        const fetchusers = async ()=>{
            const response = await fetch(API_BACKEND +'/api/admin/etudiants' , {
                headers :{"Authorization" : `Bearer ${user.access_token}`}
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type : 'SET_ETUDIANTS' , payload : json.data})
                setFilterDate(json.data)
                
            }

        }

        const fetTransport = async ()=>{
            const response = await fetch(API_BACKEND +'/api/admin/transports' , {
                headers :{"Authorization" : `Bearer ${user.access_token}`}
            })
            const json = await response.json()

            if(response.ok){
                dispatchTransport({type : 'SET_TRANSPORTS' , payload : json.data})
                setFilterDataTransports(json.data)
              

            }

           
        }
        fetchusers()
        fetTransport()

    } , [])

    useEffect(()=>{

        const result = etudiants.filter((item)=>{
          return JSON.stringify(item)
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
          
        });
      
        setFilterDate(result)
      
      
    } , [search , etudiants ])


    useEffect(()=>{

        const result = transports.filter((item)=>{
          return JSON.stringify(item)
          .toLowerCase()
          .indexOf(searchSelectTransports.toLowerCase()) !== -1
          
        });
      
        setFilterDataTransports(result)
      
       
      
    } , [searchSelectTransports , transports ])

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

    const toggleDropDownTransport = ()=>{
        setDropDownTransport(!dropDownTransport);
        setSearchSelectTransports('')
      }

    // change functions 
    const handleChangeNom = (e)=>{
        setNom(e.target.value)
    }
    const handleChangePrenom = (e)=>{
        setPrenom(e.target.value)
    }
    const handleChangeEmail = (e)=>{
        setEmail(e.target.value)
    }

    const handleChangeTel = (e)=>{
        setTel(e.target.value)
    }

    const handleChangeAdress =(e)=>{
        setAdress(e.target.value)
    }
    const handleChangeCne = (e)=>{
        setCne(e.target.value)
    }

    const hendleChangeTimeA = (e)=>{
        setTimeA(e.target.value)
    }

    const hendleChangeTimeR = (e)=>{
        setTimeR(e.target.value)
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
            name : "Transport",
            selector : (row) => row.transport.immatricule,
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
    
        {
          name : "Actions",
          cell : (row) => <div className='flex items-center justify-center'>
                <MdDelete onClick={()=> { deleteItem(row.id )} } className="w-7 h-7 text-red-500 hover:text-red-700 cursor-pointer mr-3" />
                <FaEdit onClick={()=> {modifierItem(row.id)}} className="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer mr-3" />
                <BiShowAlt onClick={()=>{detailsItem(row.id) }}  className="w-6 h-6 text-green-500 hover:text-green-700 cursor-pointer mr-3" />
      
          </div>
        }
      
    ] 

    // ajouter 
    const AjouterItem = ()=>{
        setErrorAdd("")
        setNom("")
        setPrenom("")
        setTel("")
        setAdress("")
        setCne("")
        setTimeA("06:00")
        setTimeR("16:00")
        setTransportId(null)
        setImmatriculeTransport('')
      
       
        setIsModalAddOpen(true)
    }

    const handleAddEtudiantSubmit = async(e)=>{
        e.preventDefault();

        
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('photo', photo);
        formData.append('cne', cne);
        formData.append('adress', adress);
        formData.append('tel', tel);
        formData.append('heur_aller', timeA);
        formData.append('heur_retour', timeR);
        formData.append('transport_id' , transportId)

        const response = await fetch(API_BACKEND + '/api/admin/etudiant', {
            method: 'POST',
            headers: { "Authorization": `Bearer ${user.access_token}` },
            body: formData
        });
  
          const json = await response.json()
  
          if(!response.ok){
  
              setErrorAdd(json.error)
  
          }
  
          if(response.ok){
            dispatch({type : 'CREATE_ETUDIANT' , payload : json.data})
            setIsModalAddOpen(false)

           setPhoto(null)
           setPreviewImage(API_FRONTEND + '/src/images/avatar.jpg')
           setErrorAdd("")
           setNom("")
           setPrenom("")
           setTel("")
           setAdress("")
           setCne("")
           setTimeA("06:00")
           setTimeR("16:00")
           setTransportId(null)
           setImmatriculeTransport('')

          }
      
    }

    // update

    const modifierItem= (id) =>{
        setErrorUpdate("")
        const etudiant = etudiants.filter(item=> item.id === id)[0]
        setEtudiantUpdate(etudiant)
        setIsModalUpdateOpen(true)
        
        setNom(etudiant.nom)
        setPrenom(etudiant.prenom)
        setCne(etudiant.cne)
        setAdress(etudiant.adress)
        setTel(etudiant.tel)
        setPhoto(null)
        setPreviewImage(API_BACKEND +"/storage/" + etudiant.photo)
        setTimeA(etudiant.heur_aller)
        setTimeR(etudiant.heur_retour)
        setTransportId(etudiant.transport.id)
        setImmatriculeTransport(etudiant.transport.immatricule)

       
    }

    const handleUpdateEtudaintSubmit = async (e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('photo', photo);
        formData.append('cne', cne);
        formData.append('adress', adress);
        formData.append('tel', tel);
        formData.append('heur_aller', timeA);
        formData.append('heur_retour', timeR);
        formData.append('transport_id' , transportId)


        console.log(etudiantUpdate);
       

        const response = await fetch(API_BACKEND + '/api/admin/etudiant/' + etudiantUpdate.id,  {
            method: 'POST',
            headers: { "Authorization": `Bearer ${user.access_token}` },
            body: formData
        });
  
          const json = await response.json()
  
          console.log( "response " , json.data);
  
          if(!response.ok){
  
              setErrorUpdate(json.error)
  
          }
  
        if(response.ok){
            dispatch({type : 'UPDATE_ETUDIANT' , payload : json.data})
            setIsModalUpdateOpen(false)
                
            setPhoto(null)
            setPreviewImage(API_FRONTEND + '/src/images/avatar.jpg')
            setErrorUpdate("")
            setNom("")
            setPrenom("")
            setTel("")
            setAdress("")
            setCne("")
            setTimeA("06:00")
            setTimeR("16:00")
       

         }
    }

    // delete

    const deleteItem= async(id) =>{
        const etudiant = etudiants.filter(item=> item.id === id)[0]
        setEtudiantDelete(etudiant)
        setIsModalDeleteOpen(true)
        setErrorDelete("")
    
    }

    const handleDeleteEtudiantSubmit = async(e)=>{
        e.preventDefault();
        try{
    
          const response = await fetch( API_BACKEND+ "/api/admin/etudiant/"+ etudaintDelete.id ,{
            method : 'DELETE' , 
            headers : {"Content-type" : 'application/json'},
           
          })
          
          const res = await response.json() 
          if(response.ok){
            dispatch({type : 'DELETE_ETUDIANT' , payload : res.id})
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
        const etudiant =  etudiants.filter(item=> item.id === id)[0]
        const transport = transports.filter(item =>item.id === etudiant.transport.id)[0]

        setEtudiantDetails(etudiant)
        setTransportDetails(transport)
        setIsModalDetailsOpen(true)
        
        
    }

   

  return (
    <>
        <div className="ml-64">
            <div className="container mx-auto bg-white pt-8">
                <TableData 
                    dataTab={filterData} 
                    columns={columns} 
                    title={"List Personnels"}  
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
                                        Ajouter Personnel
                                    </h3>
                                    <button onClick={toggleModalAdd} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {errorAdd && <div className='text-red-700 text-center mt-2'>{errorAdd}</div>}
                                <form className="p-4 md:p-5 overflow-y-auto max-h-[75vh]" onSubmit={handleAddEtudiantSubmit} encType="multipart/form-data">
                                    <div className="mb-2 flex justify-center items-center">
                                        <input ref={picREf} type="file" id="image" accept="image/*" onChange={handlePhotoChange} hidden/>
                                        <img onClick={clickImage} src={previewImage} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg"/>
                                    </div>
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label htmlFor="cne" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cin</label>
                                            <input type="text" name="cne" required id="cne" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeCne} value={cne} />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                                            <input type="text" name="nom" required id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeNom} value={nom} />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prenom</label>
                                            <input type="text" name="prenom" required id="prenom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangePrenom} value={prenom} />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                            <input type="text" name="phone" required id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeTel} value={tel} />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="adress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                            <input type="text" name="adress" required id="adress" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeAdress} value={adress} />
                                        </div>

                                        <div className="col-span-2">
                                            <label htmlFor="timeA" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time aller:</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                                                    </svg>
                                                </div>
                                                <input value={timeA} onChange={hendleChangeTimeA}   type="time" id="timeA" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   required />
                                            </div>
                                        </div>

                                        <div className="col-span-2">
                                            <label htmlFor="timeR" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time aller:</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                                                    </svg>
                                                </div>
                                                <input value={timeR} onChange={hendleChangeTimeR}   type="time" id="timeR" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="06:00" max="20:00"  required />
                                            </div>
                                        </div>



                                    </div>

                                    {/* Transport */}
                                        <div className='mt-3'>
                                            <div className="flex">
                                                <div className="w-1/3"> 
                                                <button
                                                    onClick={toggleDropDownTransport}
                                                    id="dropdownUsersButton"
                                                    data-dropdown-toggle="dropdownUsers"
                                                    data-dropdown-placement="bottom"
                                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    type="button"
                                                >
                                                    liste Transports
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
                                                    <input value={immatriculeTransport} type="text" name="responsable" id="responsable" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="matricule" required readOnly /> 
                                                </div>
                                            </div>

                                            {dropDownTransport && 
                                                <div id="dropdownUsers" className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                                                    <div className="p-3">
                                                        <label htmlFor="input-group-search" className="sr-only">Search</label>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                                </svg>
                                                            </div>
                                                            <input value={searchSelectTransports} onChange={(e) => setSearchSelectTransports(e.target.value)} type="text" id="input-group-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Transport" />
                                                        </div>
                                                    </div>
                                                    <ul className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                                                        {filterDataTransports && filterDataTransports.map((item, index) => (
                                                            <li key={index}>
                                                                <a onClick={() => { 
                                                                        
                                                                        setTransportId(item.id)
                                                                        setImmatriculeTransport(item.immatricule)
                                                                        setDropDownTransport(false)
                                                                    }} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                    {item.immatricule}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                     {/* end Transport */}


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
                                Modifier Personnel
                            </h3>
                            <button onClick={toggleModalUpdate} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {errorUpdate && <div className='text-red-700 text-center mt-2'>{errorUpdate}</div>}
                        <form className="p-4 md:p-5 overflow-y-auto max-h-[75vh]" onSubmit={handleUpdateEtudaintSubmit} encType="multipart/form-data">
                                <div className="mb-2 flex justify-center items-center">
                                    <input ref={picREf} type="file" id="image" accept="image/*" onChange={handlePhotoChange} hidden/>
                                    <img onClick={clickImage} src={previewImage} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg"/>
                                </div>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label htmlFor="cne" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cne</label>
                                        <input type="text" name="cne" required id="cne" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeCne} value={cne} />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                                        <input type="text" name="nom" required id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeNom} value={nom} />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prenom</label>
                                        <input type="text" name="prenom" required id="prenom" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangePrenom} value={prenom} />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                        <input type="text" name="phone" required id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeTel} value={tel} />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="adress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                        <input type="text" name="adress" required id="adress" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeAdress} value={adress} />
                                    </div>

                                    <div className="col-span-2">
                                        <label htmlFor="timeA" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time aller:</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                            <input value={timeA} onChange={hendleChangeTimeA}   type="time" id="timeA" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="06:00" max="20:00"  required />
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label htmlFor="timeR" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time aller:</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                            <input value={timeR} onChange={hendleChangeTimeR}   type="time" id="timeR" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   required />
                                        </div>
                                    </div>



                                </div>

                                {/* Transport */}
                                        <div className='mt-3'>
                                            <div className="flex">
                                                <div className="w-1/3"> 
                                                <button
                                                    onClick={toggleDropDownTransport}
                                                    id="dropdownUsersButton"
                                                    data-dropdown-toggle="dropdownUsers"
                                                    data-dropdown-placement="bottom"
                                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    type="button"
                                                >
                                                    liste Transports
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
                                                    <input value={immatriculeTransport} type="text" name="responsable" id="responsable" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="cne Responsable" required readOnly /> 
                                                </div>
                                            </div>

                                            {dropDownTransport && 
                                                <div id="dropdownUsers" className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                                                    <div className="p-3">
                                                        <label htmlFor="input-group-search" className="sr-only">Search</label>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                                </svg>
                                                            </div>
                                                            <input value={searchSelectTransports} onChange={(e) => setSearchSelectTransports(e.target.value)} type="text" id="input-group-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Transport" />
                                                        </div>
                                                    </div>
                                                    <ul className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                                                        {filterDataTransports && filterDataTransports.map((item, index) => (
                                                            <li key={index}>
                                                                <a onClick={() => { 
                                                                        
                                                                        setTransportId(item.id)
                                                                        setImmatriculeTransport(item.immatricule)
                                                                        setDropDownTransport(false)
                                                                    }} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                    {item.immatricule}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                {/* end Transport */}


                                <div className='mt-5 flex justify-center'>
                                    <button type="submit" className=" text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Modifier
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
                            <button onClick={handleDeleteEtudiantSubmit} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
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
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Details Personnels</h3>
                            <button
                                onClick={toggleModalDetails}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal1"
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
                                    <div className="mb-4 flex flex-col justify-center items-center">
                                    <img
                                        src={API_BACKEND + "/storage/" + etudiantDetails.photo}
                                        className="h-auto max-w-40 rounded-lg"
                                        alt=""
                                    />

                                    <div>
                                        <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Personnel</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                                <li>Nom : {etudiantDetails.nom}</li>
                                                <li>Prenom : {etudiantDetails.prenom}</li>
                                                <li>CIN : {etudiantDetails.cne}</li>
                                                <li>Address : {etudiantDetails.adress}</li>
                                                <li>Phone : {etudiantDetails.tel}</li>                                    
                                                <li>Heur Aller : {etudiantDetails.heur_aller}</li>
                                                <li>Heur Retour : {etudiantDetails.heur_retour}</li>
                                            
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
                                            <div>
                                            <img
                                                src={API_BACKEND + "/storage/" + etudiantDetails.transport.photo}
                                                className="h-auto max-w-40 rounded-lg"
                                                alt=""
                                            />
                                            </div>
                                            <li> Immatricule : {transportDetails.immatricule}</li>
                                            <li> Nombre Places : {transportDetails.nb_places}</li>
                                            
                                        </ul>
                                        </dd>
                                    </div>


                                    <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Responsable</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">   
                                            <li> Nom : {transportDetails.responsable.nom + " " + transportDetails.responsable.prenom}</li>
                                            <li> Email : {transportDetails.responsable.email}</li>
                                            <li> Cin : {transportDetails.responsable.cin}</li>
                                            <li> Phone : {transportDetails.responsable.tel}</li>                 
                                            <li> Address : {transportDetails.responsable.adress}</li>                 
                                            
                                        </ul>
                                        </dd>
                                    </div>

                                    
                                    <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Chauffeur</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">   
                                            <li> Nom : {transportDetails.chauffeur.nom + " " + transportDetails.chauffeur.prenom}</li>
                                            <li> Email : {transportDetails.chauffeur.email}</li>
                                            <li> Cin : {transportDetails.chauffeur.cin}</li>
                                            <li> Phone : {transportDetails.chauffeur.tel}</li>                 
                                            <li> Address : {transportDetails.chauffeur.adress}</li>                 
                                            
                                        </ul>
                                        </dd>
                                    </div>


                                    
                        
                                    

                                    </dl>
                                </div>
                                </div>
                            </div>
                            </div>
                        
                        
                        </div>
                        </div>
                        
                        
        )}



    
    </>
  )
}

export default GestionEtudaints