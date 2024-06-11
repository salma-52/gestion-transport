import React, { useEffect, useRef, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import TableData from '../../components/TableData';
import { usePersonnelsContext } from '../../hooks/usePersonnelsContext';
import { API_BACKEND, API_FRONTEND } from '../../API/api';


// icons 
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";

const GestionPersonnels = () => {
    const { user } = useAuthContext()
    const {personnels , dispatch} = usePersonnelsContext()

    const picREf = useRef()
    const [previewImage, setPreviewImage] = useState(API_FRONTEND + '/src/images/avatar.jpg');


    const [search , setSearch] = useState("")
    const [filterData , setFilterDate] = useState([])
    const [personnelDelete , setPersonnelDelete]= useState(null)
    const [personnelUpdate , setPersonnelUpdate] = useState(null)
    const [personnelDetails, setPersonnelDetails] = useState(null);

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
    const [cin , setCin] = useState("")
    const [email , setEmail] = useState("")


    // models 
    const [isModalDeleteOpen , setIsModalDeleteOpen] = useState(false)
    const [isModalAddOpen , setIsModalAddOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);

    const clickImage=()=>{
        picREf.current.click();
        
    }

    
    
    useEffect(()=>{
        const fetchusers = async ()=>{
            const response = await fetch(API_BACKEND +'/api/admin/personnels' , {
                headers :{"Authorization" : `Bearer ${user.access_token}`}
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type : 'SET_PERSONNELS' , payload : json.data})
                setFilterDate(json.data)
            }

        }

        fetchusers()

    } , [])

    useEffect(()=>{

        const result = personnels.filter((item)=>{
          return JSON.stringify(item)
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
          
        });
              
        setFilterDate(result)
      
    } , [search , personnels ])

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
    const handleChangeCin = (e)=>{
        setCin(e.target.value)
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
            name : "Cin",
            selector : (row) => row.cin,
            sortable: true
        },
        {
            name : "Email",
            selector : (row) => row.email,
            sortable: true
        },
        {
          name : "Adress",
          selector : (row) => row.adress,
          sortable: true
        },
        {
            name : "Tel",
            selector : (row) => row.tel,
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
    

     // ajouter Personnel

    const AjouterItem = ()=>{
        setErrorAdd("")
        setNom("")
        setPrenom("")
        setTel("")
        setAdress("")
        setCin("")
        setEmail("")
       
        setIsModalAddOpen(true)
    }

    const handleAddPersonnelSubmit = async(e)=>{
        e.preventDefault();

        
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('photo', photo);
        formData.append('cin', cin);
        formData.append('adress', adress);
        formData.append('tel', tel);
        formData.append('email', email);

        const response = await fetch(API_BACKEND + '/api/admin/personnel', {
            method: 'POST',
            headers: { "Authorization": `Bearer ${user.access_token}` },
            body: formData
        });
  
          const json = await response.json()
  
          if(!response.ok){
  
              setErrorAdd(json.error)
  
          }
  
          if(response.ok){
            dispatch({type : 'CREATE_PERSONNEL' , payload : json.data})
            setIsModalAddOpen(false)

           setPhoto(null)
           setPreviewImage(API_FRONTEND + '/src/images/avatar.jpg')
           setErrorAdd("")
           setNom("")
           setPrenom("")
           setTel("")
           setAdress("")
           setCin("")
           setEmail("")

          }
      
    }


    // update Personnel 

    const modifierItem= (id) =>{
        setErrorUpdate("")
        const personnel = personnels.filter(item=> item.id === id)[0]
        setPersonnelUpdate(personnel)
        setIsModalUpdateOpen(true)
        
        setNom(personnel.nom)
        setPrenom(personnel.prenom)
        setCin(personnel.cin)
        setAdress(personnel.adress)
        setTel(personnel.tel)
        setEmail(personnel.email)
        setPhoto(null)
        setPreviewImage(API_BACKEND +"/storage/" + personnel.photo)

       
    }

    const handleUpdatePersonnelSubmit = async (e)=>{
        e.preventDefault()

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('photo', photo);
        formData.append('cin', cin);
        formData.append('adress', adress);
        formData.append('tel', tel);
        formData.append('email', email);

        const response = await fetch(API_BACKEND + '/api/admin/personnel/' + personnelUpdate.id,  {
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
            dispatch({type : 'UPDATE_PERSONNEL' , payload : json.data})
            setIsModalUpdateOpen(false)
                
            setPhoto(null)
            setPreviewImage(API_FRONTEND + '/src/images/avatar.jpg')
            setErrorAdd("")
            setNom("")
            setPrenom("")
            setTel("")
            setAdress("")
            setCin("")
            setEmail("")
        }


    }

    // delete personnel 
    const deleteItem = async(id) =>{
        //setClients(clients.filter(C=> C._id !== id));
        const personnel = personnels.filter(item=> item.id === id)[0]
        setPersonnelDelete(personnel)
        setIsModalDeleteOpen(true)
        setErrorDelete("")
    
    }

    const handleDeletePersonnelSubmit = async(e)=>{
        e.preventDefault();
        try{
    
          const response = await fetch( API_BACKEND+ "/api/admin/personnel/"+ personnelDelete.id ,{
            method : 'DELETE' , 
            headers : {"Content-type" : 'application/json'},
           
          })
          
          const res = await response.json() 
          if(response.ok){
            dispatch({type : 'DELETE_PERSONNEL' , payload : res.id})
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
        const personnel =  personnels.filter(item=> item.id === id)[0]
        console.log(personnel);

       
       
        setPersonnelDetails(personnel)
        setIsModalDetailsOpen(true)
        
        
    }

     

    
    




  return (
    <>
     <div className="ml-64">
      <div className="container mx-auto bg-white pt-8">
       
        <TableData 
            dataTab={filterData} 
            columns={columns} 
            title={"List Responsbles"}  
            addActions={AjouterItem} 
            search={search} 
            setSearch={setSearch}
            transactions={true}
        />
      </div>
    </div>
    

     {/* Ajouter Personnel */}

     {isModalAddOpen && (
                   <div id="crud-modal" tabIndex="2" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
                        <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Ajouter Responsable
                                </h3>
                                <button onClick={toggleModalAdd} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {errorAdd && <div className='text-red-700 text-center mt-2'>{errorAdd}</div>}
                            <form className="p-4 md:p-5 overflow-y-auto max-h-[75vh]" onSubmit={handleAddPersonnelSubmit} encType="multipart/form-data">
                                <div className="mb-2 flex justify-center items-center">
                                    <input ref={picREf} type="file" id="image" accept="image/*" onChange={handlePhotoChange} hidden/>
                                    <img onClick={clickImage} src={previewImage} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg"/>
                                </div>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label htmlFor="cin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cin</label>
                                        <input type="text" name="cin" required id="cin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeCin} value={cin} />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="email" name="email" required id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeEmail} value={email} />
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
                                </div>
                                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Ajouter
                                </button>
                            </form>
                        </div>
                    </div>
               
      )}


      {/* update Personnel  Modal */}
      {isModalUpdateOpen && (
                   <div id="crud-modal" tabIndex="2" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
                   <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                       <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                               Modifier Responsable
                           </h3>
                           <button onClick={toggleModalUpdate} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                               <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                               </svg>
                               <span className="sr-only">Close modal</span>
                           </button>
                       </div>
                       {errorUpdate && <div className='text-red-700 text-center mt-2'>{errorUpdate}</div>}
                       <form className="p-4 md:p-5 overflow-y-auto max-h-[75vh]" onSubmit={handleUpdatePersonnelSubmit} encType="multipart/form-data">
                           <div className="mb-2 flex justify-center items-center">
                               <input ref={picREf} type="file" id="image" accept="image/*" onChange={handlePhotoChange} hidden/>
                               <img onClick={clickImage} src={previewImage} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg"/>
                           </div>
                           <div className="grid gap-4 mb-4 grid-cols-2">
                               <div className="col-span-2">
                                   <label htmlFor="cin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cin</label>
                                   <input type="text" name="cin" required id="cin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeCin} value={cin} />
                               </div>
                               <div className="col-span-2">
                                   <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                   <input type="email" name="email" required id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeEmail} value={email} />
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
                           </div>
                           <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                               Modifier
                           </button>
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
                        <button onClick={handleDeletePersonnelSubmit} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
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
                        id="crud-modal"
                        tabIndex="2"
                        aria-hidden="true"
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
                        >
                        <div className="relative p-4 w-full max-w-6xl bg-white rounded-lg shadow dark:bg-gray-700 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Details Responsable</h3>
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
                                            <div className="mb-4 flex flex-col justify-center items-center">
                                            <img
                                                src={API_BACKEND + "/storage/" + personnelDetails.photo}
                                                className="h-auto max-w-40 rounded-lg"
                                                alt=""
                                            />

                                            <div>
                                            
                                            </div>
                                            
                                            </div>
                                        </div>
                                
                                            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                                <dl className="sm:divide-y sm:divide-gray-200">             
                                                        
                                                    <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">  Nom :</dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                {personnelDetails.nom} 
                                                            </dd>
                                                    </div>

                                                    <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">  Prenom :</dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                            {personnelDetails.prenom}
                                                            </dd>
                                                    </div>

                                                    <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500"> Cin :</dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                {personnelDetails.cin}
                                                            </dd>
                                                    </div>

                                                    <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500"> Address : </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                Address : {personnelDetails.Address}
                                                            </dd>
                                                    </div>

                                                    <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">  Phone : </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                 {personnelDetails.tel}
                                                            </dd>
                                                    </div>

                                                    {personnelDetails.responsable &&
                                                    
                                                    <>
                                                    <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                           <dt className="text-sm font-medium text-gray-500">  Emploi : </dt>
                                                           <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                           Responsable 
                                                           </dd>
                                                   </div>
                                                    <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                       
                                                       <dt className="text-sm font-medium text-gray-500">Transport</dt>
                                                       <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                         <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                                           <div> 
                                                               <img
                                                                   src={API_BACKEND + "/storage/" +personnelDetails.responsable.photo}
                                                                   className="h-auto max-w-40 rounded-lg"
                                                                   alt=""
                                                               />
                                                           </div>
                                                           <li>immatricule : {personnelDetails.responsable.immatricule}</li>
                                                           <li>Nombre Places : {personnelDetails.responsable.nb_places }</li>
                                                           
                                                         </ul>
                                                       </dd>
                                                       </div>
                                                           
                                                   </>
                                                    }

                                                    {personnelDetails.chauffeur &&

                                                    <>
                                                     <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-gray-500">  Emploi : </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                            Chauffeur 
                                                            </dd>
                                                    </div>
                                                     <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                        
                                                        <dt className="text-sm font-medium text-gray-500">Transport</dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                                            <div> 
                                                                <img
                                                                    src={API_BACKEND + "/storage/" +personnelDetails.chauffeur.photo}
                                                                    className="h-auto max-w-40 rounded-lg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <li>immatricule : {personnelDetails.chauffeur.immatricule}</li>
                                                            <li>Nombre Places : {personnelDetails.chauffeur.nb_places }</li>
                                                            
                                                          </ul>
                                                        </dd>
                                                        </div>
                                                            
                                                    </>
                                                   
                                                    }




                                                
                                    
                                                

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

export default GestionPersonnels