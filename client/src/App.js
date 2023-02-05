import { useEffect, useState, useContext } from "react";
import Navbar from "./components/Navbar";
import Showcase from './components/Showcase'
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
import { appContext } from "./Context";

function App() {
  const{userIn, cookies} = useContext(appContext)
  const[tasks, setTasks] = useState([]);

  const getTasks = async() =>{
    const response = await fetch(`http://localhost:8000/todos/${cookies.Email}`)
    const data = await response.json()
    setTasks(data) 
  }
  useEffect(()=>{
     getTasks()
  
  }, [])
  
  return (
    <>
      {
        cookies.Token !== undefined && <><Navbar/><Showcase tasks={tasks} getTasks={getTasks}/></>
      }
      {
        cookies.Token === undefined && <Auth/>
      }
    </>
  );
}

export default App;
