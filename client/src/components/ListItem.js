import ProgressBar from "./ProgressBar"
import { useContext } from "react"
import { appContext } from "../Context"
function ListItem({task, getTasks}) {
  const {handleEdit} = useContext(appContext)
  
  const handleDelete = async (e, id) =>{
    e.preventDefault()
    const response = await fetch(`http://localhost:8000/todos` , {
      method:"DELETE",
      headers: {"Content-Type": "Application/json"},
      body: JSON.stringify({id: id})
    })
    const data = await response.json()
    getTasks()
  }

  return (
    <div key={task.id} className='box'>
        <h3>{task.title}</h3>
        <ProgressBar progress={task.progress}/>
        <div className="input-group">
            <button className="edit" onClick={(e)=> handleEdit(e, task)} >EDIT</button>
            <button className="delete" onClick={(e) => handleDelete(e, task.id)}>DELETE</button>
        </div>
        
    </div>
  )
}

export default ListItem