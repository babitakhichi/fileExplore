import React, { useEffect, useState } from 'react'
import { fileData } from '../../fileData';
import { FileOutlined, FolderOutlined } from '@ant-design/icons';
import { Button, Modal as AntdModal, Input as AntInput} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addData, deleteFileAction, selectUserData, handleRenameData } from '../../redux/fileSlice';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { addRouteData, selectRouteData } from '../../redux/routeSlice';

function Downloads() {
    const [fileDatas, setfileData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenFolder, setIsModalOpenFolder] = useState(false);
    const [uploadData, setuploadData] = useState({name:'',url:''})
    const [isRenameId, setIsRenameId] = useState(null)
    const [renameData, setRenameData] =  useState("")
    const [folderName, setFolderName] = useState('')
   const userData = useSelector(selectUserData)
   const rout= useSelector(selectRouteData)
   const dispatch =useDispatch()
   const location= useLocation()
  
    const showModal = () => {
      setIsModalOpen(true);
    };
 
    const handleCancel = () => {
      setIsModalOpen(false);
      
    };
    const showModalFolder = () => {
      setIsModalOpenFolder(true);
    };
 
    const handleCancelFolder = () => {
      setIsModalOpenFolder(false);
      
    };
    let path=location.pathname.split('/')
    useEffect(() => {
     let data=  userData?.filter((i)=>i.key===path[1])
    
     setfileData(data[0])
    }, [userData,location])
   const handleAddFolder=()=>{
     let data= {
       "id": uuidv4(),
       "name":folderName,
       "type":"folder",
       
       
      }
      const route={
        "path": `/${folderName}`,
        "name": folderName,
        "key": `/${folderName}`,
        "element": <Downloads/>
      }
      const addSubPath={
        "key": folderName,
        
        "label": folderName,
        data:[
          
          
          
        ],
        
        
      }
      let arrayData=[...userData,addSubPath]
  const updateData = arrayData.map((item) => item.key === path[1] ?  ({...item, data: [...item?.data ?? [], data]}) : item)

    dispatch(addData(updateData))
    dispatch(addRouteData([...rout,route]))
    setIsModalOpenFolder(false)
   }
    
   
    const handleOk = () => {
      let arrayData=[...userData]
      let data= {
        "id": uuidv4(),
        "name":uploadData.name,
        "type":"file",
        "url":uploadData.url

    }
    const updateData = arrayData.map((item) => item.key === path[1] ?  ({...item, data: [...item?.data ?? [], data]}) : item)
  
      dispatch(addData(updateData))
      setIsModalOpen(false);
    };
 const handleChange=(e)=>{
  setuploadData({...uploadData, [ e.target.name]:e.target.value})
 }
const handleDelete=(id)=>{
  let arrayData=[...userData]
  const updateData = arrayData.map((item) => item.key === path[1] ?  ({...item, data: item.data.filter((dItem) => dItem?.id !== id)}) : item)

  dispatch(deleteFileAction(updateData))
}

const handleRename=()=>{
  let arrayData=[...userData]
  const updateData = arrayData.map((item) => item.key === path[1] ?  ({...item, data: item.data.map((dItem) => dItem?.id === isRenameId ? ({...dItem, name: renameData}) : dItem )}) : item)
  dispatch(handleRenameData(updateData))
  setIsRenameId(null)
  setRenameData("")
}


const handleFolderName =(e)=>{
setFolderName(e.target.value)
}
    return (
    <div>
      {fileDatas &&<>
      
    
  {fileDatas?.data?.map((i,index)=>{
    return(
         i.type==='folder'?
       <a href={`/${i.name}` } style={{margin:'5px'}} ><FolderOutlined style={{fontSize: "50px"}} /> {i?.name}</a>:
    <div>
    <img src={i.url} height={50} width={50}   /><br/> {i?.name}<button onClick={()=>handleDelete(i.id)} >Delete</button> {isRenameId !== i?.id && <button onClick={()=> {setIsRenameId(i.id); setRenameData(i.name)}} >Rename</button>} {isRenameId === i?.id && <> <input defaultValue={renameData} value={renameData} onChange={(e) => setRenameData(e.target.value)} /> <button onClick={handleRename} >Ok</button> <button onClick={()=>setIsRenameId(null)} >Cancel</button> </>}  </div>
    
    )
   

})}</>}
   <br/>
  <Button type="primary" onClick={showModal}>
        Upload File
      </Button>
      <AntdModal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <div>
        <AntInput type='text' onChange={handleChange} name='name'  />
       <AntInput type='file' name='url' onChange={handleChange}   />
       </div>
      </AntdModal>
      <Button type="primary" onClick={showModalFolder}>
        Add folder
      </Button>
      <AntdModal title="Basic Modal" open={isModalOpenFolder} onOk={handleAddFolder} onCancel={handleCancelFolder}>
       <div>
        <AntInput type='text' value={folderName} onChange={handleFolderName} name='name'  />
       
       </div>
      </AntdModal>
    </div>
  )
}

export default Downloads