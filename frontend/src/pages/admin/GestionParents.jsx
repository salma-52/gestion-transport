import React, { useEffect, useRef, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useParentsContext } from '../../hooks/useParentsContext';
import TableData from '../../components/TableData';
import { API_BACKEND, API_FRONTEND } from '../../API/api';


// icons 
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { useEtudiantsContext } from '../../hooks/useEtudiantsContext';
import MultiSelectComponent from '../../components/MultiSelectComponent ';
const GestionParents = () => {
  const { user } = useAuthContext()
  const {parents , dispatch} = useParentsContext()
  const {etudiants , dispatch :dispatchEtudiant} = useEtudiantsContext()
  
  const [search , setSearch] = useState("")
  const [filterData , setFilterDate] = useState([])

  const [searchEtudiant , setSearchEtudiant] = useState("")
  const [filterDataEtudiant , setFilterDataEtudiant] = useState([])

  const [parentDelete , setParentDelete]= useState(null)
  const [parentUpdate , setParentUpdate] = useState(null)
  const [parentDetails, setParentDetails] = useState(null);

  // error 
  const [errorDelete ,  setErrorDelete] = useState("")
  const [ errorUpdate , setErrorUpdate] = useState("")
  const [ errorAdd , setErrorAdd] = useState("")

  // add 
  const [nom , setNom] = useState("")
  const [prenom , setPrenom] = useState("")
  const [tel , setTel] = useState("")
  const [adress , setAdress] = useState("")
  const [cin , setCin] = useState("")
  const [email , setEmail] = useState("")
  const [etudiantId , setetudiantId] = useState(null)
  const [password , setPassword] = useState("")

  // models 
  const [isModalDeleteOpen , setIsModalDeleteOpen] = useState(false)
  const [isModalAddOpen , setIsModalAddOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
  const [isModalVerifyOpen , setIsModalVerifyOpen] = useState(false)

//dropdown  
const [dropDownEtudiant , setDropDownEtudiant] = useState(false)
const [cneEtudiant , setCneEtudiant] = useState('')

// verification mails  

const [code , setCode ] = useState("")
const [errorCode , setErrorCode] = useState("")
const [errorSignUp , setErrorSignUp] = useState("")

// select multiple  

const [options , setOptions] = useState([]);
const [selectedEtudiants, setSelectedEtudiants] = useState([]);
const [fils , setFils ]=useState([])



  useEffect(()=>{
    const fetchParents= async ()=>{
        const response = await fetch(API_BACKEND +'/api/admin/parents' , {
            headers :{"Authorization" : `Bearer ${user.access_token}`}
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type : 'SET_PARENTS' , payload : json.data})
            setFilterDate(json.data)
        }

    }
    const fetchEtudiants = async ()=>{
      const response = await fetch(API_BACKEND +'/api/admin/etudiants' , {
          headers :{"Authorization" : `Bearer ${user.access_token}`}
      })
      const json = await response.json()

      if(response.ok){
          dispatchEtudiant({type : 'SET_ETUDIANTS' , payload : json.data})
          setFilterDataEtudiant(json.data)
          
      }

  }

  fetchParents()
  fetchEtudiants()

} , [])

  useEffect(()=>{

      const result = parents.filter((item)=>{
        return JSON.stringify(item)
        .toLowerCase()
        .indexOf(search.toLowerCase()) !== -1
        
      });
            
      setFilterDate(result)
      console.log(result);
    
  } , [search , parents ])

  useEffect(()=>{

    const result = etudiants.filter((item)=>{
      return JSON.stringify(item)
      .toLowerCase()
      .indexOf(searchEtudiant.toLowerCase()) !== -1
      
    });

    console.log("etudiants" , result);
  
    setFilterDataEtudiant(result)
  
  
} , [searchEtudiant , etudiants ])

// select : 
useEffect(()=>{
    setOptions(etudiants.map((item) => ({ label: item.cne, value: item.id })));
},[etudiants])

// etudiants selectionner 
useEffect(()=>{
    setFils(selectedEtudiants.map((item)=> item.value));

},[selectedEtudiants])


// toggle functions 
const handleSelectionChange = (selected) => {
    setSelectedEtudiants(selected);
    console.log("fils", fils);

  };

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

const toggleDropDownEtudiant = ()=>{
    setDropDownEtudiant(!dropDownEtudiant)
}
 

const toggleModalVerify = ()=>{
    setIsModalVerifyOpen(!isModalVerifyOpen)
    
    
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

const handleChangePassword = (e)=>{
  setPassword(e.target.value)
}



const handleChangeCode = (e)=>{
    setCode(e.target.value)
}




const columns = [
 
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

const retournVerModelADD = ()=>{
    setIsModalAddOpen(true)
    setIsModalVerifyOpen(false)
}

const AjouterItem = ()=>{
  setErrorAdd("")
  setNom("")
  setPrenom("")
  setTel("")
  setAdress("")
  setCin("")
  setEmail("")
  setPassword('')
  setetudiantId(null)
  setCneEtudiant('')
  setDropDownEtudiant(false)
 
  setIsModalAddOpen(true)

  setSelectedEtudiants([])
  setFils([])
}



const handleAddParentSubmit = async(e)=>{
  e.preventDefault();

  setErrorSignUp("")
  setErrorCode("")
  
  const formData = new FormData();
  formData.append('title', "verification mail");
  formData.append('email' , email)

  const response = await fetch(API_BACKEND + '/api/email' , {
    method: 'POST',
    headers: {
       // "Accept": "application/json" 
    },
    body: formData
    });

    const json = await response.json()

           

    if(!response.ok){
        setErrorSignUp("email deja existe")
    }

    if(response.ok){
        console.log(json.result); 
        setIsModalVerifyOpen(true)
        setIsModalAddOpen(false)
    }




}

const handleVerifyMailSubmit = async (e)=>{
    e.preventDefault()

    const formData1 = new FormData();
    formData1.append('code', code);
    formData1.append('email' , email)

    const response = await fetch(API_BACKEND + '/api/email/verify' , {
        method: 'POST',
        headers: {
           // "Accept": "application/json" 
        },
        body: formData1
    });

    const json = await response.json()

    if(!response.ok){
        setErrorCode(json.error)
    }

     if(response.ok){
      
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('cin', cin);
        formData.append('tel', tel);
        formData.append('adress', adress);
        //formData.append('etudiant_id', etudiantId);
        formData.append('etudiant_id', fils);
      
        const response = await fetch(API_BACKEND + '/api/admin/parent', {
            method: 'POST',
            headers: { "Authorization": `Bearer ${user.access_token}` },
            body: formData
        });
      
          const json = await response.json()
      
          if(!response.ok){
      
              setErrorAdd(json.error)
      
          }
      
          if(response.ok){

            console.log("result" , json.data);
            dispatch({type : 'CREATE_PARENT' , payload : json.data})
            setIsModalAddOpen(false)
      
            setErrorAdd("")
            setNom("")
            setPrenom("")
            setTel("")
            setAdress("")
            setCin("")
            setEmail("")
            setPassword('')
            setetudiantId(null)
            setCneEtudiant('')
            setIsModalVerifyOpen(false)
            setSelectedEtudiants([])
            setFils([])
        
          }
      
      
        
     }
}


// update 

const modifierItem= (id) =>{
    setErrorUpdate("")
    const parent = parents.filter(item=> item.id === id)[0]

    setSelectedEtudiants(parent.fils.map((item) => ({ label: item.cne, value: item.id })));

    
    setParentUpdate(parent)
    setDropDownEtudiant(false)
    setIsModalUpdateOpen(true)
    
    setNom(parent.nom)
    setPrenom(parent.prenom)
    setCin(parent.cin)
    setEmail(parent.email)
    setAdress(parent.adress)
    setTel(parent.tel)
    setPassword('')

    if(parent.fils.length > 0){
        setCneEtudiant(parent.fils[0].cne)
        setetudiantId(parent.fils[0].id)
    }else{
        setCneEtudiant("")
        setetudiantId(null)
    }
    
    
   

   
}


const handleUpdateParentSubmit = async(e)=>{

    e.preventDefault();

    
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('cin', cin);
    formData.append('tel', tel);
    formData.append('adress', adress);
    formData.append('etudiant_id', fils);
  
    const response = await fetch(API_BACKEND + '/api/admin/parent/'+ parentUpdate.id, {
        method: 'POST',
        headers: { "Authorization": `Bearer ${user.access_token}` },
        body: formData
    });
    const json = await response.json()

    if(!response.ok){
  
        setErrorUpdate(json.error)

    }

 
    dispatch({type : 'UPDATE_PARENT' , payload : json.data})
    setIsModalUpdateOpen(false)
    setErrorUpdate("")

    setNom("")
    setPrenom("")
    setTel("")
    setAdress("")
    setCin("")
    setEmail("")
    setPassword('')
    setetudiantId(null)
    setCneEtudiant('')

    setSelectedEtudiants([])
    setFils([])
        

}

// delete

const deleteItem= async(id) =>{
    const parent = parents.filter(item=> item.id === id)[0]
    setParentDelete(parent)
    setIsModalDeleteOpen(true)
    setErrorDelete("")

}

const handleDeleteParentSubmit = async(e)=>{
    e.preventDefault();
    try{

      const response = await fetch( API_BACKEND+ "/api/admin/parent/"+ parentDelete.id ,{
        method : 'DELETE' , 
        headers : {"Content-type" : 'application/json'},
       
      })
      
      const res = await response.json() 
      if(response.ok){
        dispatch({type : 'DELETE_PARENT' , payload : res.id})
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
    const parent =  parents.filter(item=> item.id === id)[0]
    

    setParentDetails(parent)
    setIsModalDetailsOpen(true)
    
    
}



  return (
    <>
     <div className="ml-64">
            <div className="container mx-auto bg-white pt-8">
      
                <TableData 
                    dataTab={filterData} 
                    columns={columns} 
                    title={"List Parents"}  
                    addActions={AjouterItem} 
                    search={search} 
                    setSearch={setSearch}
                    transactions={true}
                />
            </div>
        </div>

          {/* Verify Mail */}
       {isModalVerifyOpen &&

        <div id="deleteModal" className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50">
            <div className="relative p-4 w-full max-w-md">
                <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <button onClick={toggleModalVerify} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    {errorCode && <div className='text-red-500'>{errorCode}</div> }
                    {/* { errorDelete && <div className='text-red-700'>{errorDelete}</div>} */}
                    <div className='mb-4'>
                            <label htmlFor="code" className=" float-start block text-sm font-medium text-gray-700">Code Verification</label>
                            <input type="Number" id="code" name="code"  value={code} required onChange={handleChangeCode}   className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                        
                    </div>

                    <div className="flex justify-center items-center space-x-4">
                        <button onClick={retournVerModelADD} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            cancel
                        </button>
                        <button onClick={handleVerifyMailSubmit} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900">
                            verify
                        </button>
                    </div>
                </div>
            </div>
        </div>
        }

        {isModalAddOpen && (
                   <div id="crud-modal" tabIndex="2" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
                        <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Ajoutre Parent
                                </h3>
                                <button onClick={toggleModalAdd} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {errorAdd && <div className='text-red-700 text-center mt-2'>{errorAdd}</div>}
                            <form className="p-4 md:p-5 overflow-y-auto max-h-[75vh]" onSubmit={handleAddParentSubmit} encType="multipart/form-data">
                               
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    
                                    <div className="col-span-2">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fils</label>
                                        <MultiSelectComponent 
                                            options={options} 
                                            selectedOptions={selectedEtudiants} 
                                            onSelectionChange={handleSelectionChange} 
                                        />
                                    </div>

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

                                    <div className="col-span-2">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" required id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangePassword} value={password} />
                                    </div>


                                </div>

                                
                                    {/* Etudiant */}
                                    {/* <div className='mt-3'>
                                            <div className="flex">
                                                <div className="w-1/3"> 
                                                <button
                                                    onClick={toggleDropDownEtudiant}
                                                    id="dropdownUsersButton"
                                                    data-dropdown-toggle="dropdownUsers"
                                                    data-dropdown-placement="bottom"
                                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    type="button"
                                                >
                                                    liste Etudiants
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
                                                    <input value={cneEtudiant} type="text" name="etudiant" id="etudiant" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="cne Etudiant" required readOnly /> 
                                                </div>
                                            </div>

                                            {dropDownEtudiant && 
                                                <div id="dropdownUsers" className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                                                    <div className="p-3">
                                                        <label htmlFor="input-group-search" className="sr-only">Search</label>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                                </svg>
                                                            </div>
                                                            <input value={searchEtudiant} onChange={(e) => setSearchEtudiant(e.target.value)} type="text" id="input-group-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Etudiant (cne)" />
                                                        </div>
                                                    </div>
                                                    <ul className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                                                        {filterDataEtudiant && filterDataEtudiant.map((item, index) => (
                                                            <li key={index}>
                                                                <a onClick={() => { 
                                                                     
                                                                        setCneEtudiant(item.cne)
                                                                        setetudiantId(item.id)    
                                                                        setDropDownEtudiant(false)
                                                                    }} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                    {item.cne}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            }
                                        </div> */}
                                     {/* end Etudiant */}

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
                        <form className="p-4 md:p-5 overflow-y-auto max-h-[75vh]" onSubmit={handleUpdateParentSubmit} encType="multipart/form-data">
                        <div className="grid gap-4 mb-4 grid-cols-2">

                                  <div className="col-span-2">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fils</label>
                                        <MultiSelectComponent 
                                            options={options} 
                                            selectedOptions={selectedEtudiants} 
                                            onSelectionChange={handleSelectionChange} 
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="cin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cin</label>
                                        <input type="text" name="cin" required id="cin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeCin} value={cin} />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="email" name="email" readOnly required id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangeEmail} value={email} />
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
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password"  id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChangePassword} value={password} />
                                    </div>

                                </div>

                                
                                   


                                <div className='mt-5 flex justify-center'>
                                    <button type="submit" className=" text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Update
                                    </button>
                                </div>
                           
                        </form>
                    </div>
                </div>
                
        )}


        {isModalDeleteOpen &&

        <div id="deleteModal" className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50">
            <div className="relative p-4 w-full max-w-md">
                <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <button onClick={toggleModalDelete} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    { errorDelete && <div className='text-red-700 mt-3'>{errorDelete}</div>}
                    <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
                    <div className="flex justify-center items-center space-x-4">
                        <button onClick={toggleModalDelete} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            No, cancel
                        </button>
                        <button onClick={handleDeleteParentSubmit} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Details Etudiants</h3>
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
                       
                            <div>
                                <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Parent</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                        <li>Nom : {parentDetails.nom}</li>
                                        <li>Prenom : {parentDetails.prenom}</li>
                                        <li>CIN : {parentDetails.cin}</li>
                                        <li>Email : {parentDetails.email}</li>
                                        <li>Address : {parentDetails.adress}</li>
                                        <li>Phone : {parentDetails.tel}</li>                                    
                                       
                                    
                                    </ul>
                                    </dd>
                                </div>
                            </div>
                    
                        
                        </div>
                    </div>
            
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">

                        
                        {parentDetails.fils.length > 0 && 
                            parentDetails.fils.map((item , index) => (
                                <div key={item.id}>
                                    <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Fils {index + 1}</dt> 
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                                <li>Nom : {item.nom}</li>
                                                <li>Prenom : {item.prenom}</li>
                                                <li>Cne : {item.cne}</li>
                                                <li>Address : {item.adress}</li>
                                                <li>Phone : {item.tel}</li>                                    
                                                <li>Heur Aller : {item.heur_aller}</li>
                                                <li>Heur Retour : {item.heur_retour}</li>
                                            </ul>
                                        </dd>
                                    </div>
                                </div>
                            ))
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

export default GestionParents