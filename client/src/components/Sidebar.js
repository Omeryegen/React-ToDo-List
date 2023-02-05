import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { appContext } from '../Context';
import { useCookies } from 'react-cookie';

function SideBar({task, getTasks}) {
    const[cookies, setCookie, removeCookie] = useCookies(null)
    const{currentMode, setData, data} = useContext(appContext)
    const[showError, setShowError] = useState("")
   
    const postData = async() =>{
        const response = await fetch('http://localhost:8000/todos' , {
            method:"POST",
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify(data)
        });
        console.log(response.status)
        if(response.status !== 200){
            setShowError("Fill all fields!")
        }else{
            window.location.reload()
        }
    }
    const editData = async () =>{
        const response = await fetch('http://localhost:8000/todos' , {
            method:"PUT",
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify(data)
        });
        const json = await response.json();
    }

    const onChange = (e) =>{
        const {name, value} = e.target
        setData(prev => ({
            ...data,
            [name]: value
        }))
    }
    const logOut = (e) =>{
        e.preventDefault()
        removeCookie('Email')
        removeCookie('Token')
        window.location.reload()
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(currentMode === "create"){
            postData()
            getTasks()
            
        }else{
            editData()
            getTasks()
            window.location.reload()
        }
    };
  return (
    <div className='sidebar'>
            <h2>Let's {currentMode} your task!</h2>
            <form className='sidebar-form'>
                <input onChange={onChange} type="text" placeholder="Task Title" name="title" id="title" value={data.title}/>
                <input onChange={onChange} type="range" placeholder="Progress" name="progress" id="progress" value={data.progress}/>
                <button type="submit" onClick={handleSubmit} >{currentMode}</button>
                <button onClick={logOut}>Log Out</button>
            </form>
            <p style={{color: "#fff"}}>{showError}</p>
    </div>
  )
}

export default SideBar