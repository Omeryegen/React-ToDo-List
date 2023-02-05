import React, { useState } from 'react'
import {useCookies} from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const colors = {
    selected: {
        color: "white",
        backgroundColor: "black"
    },
    notSelected: {
        color: "black",
        backgroundColor: "white"
    } 
}
const notify = (message) => toast.success(message);
const error = (message) => toast.error(message);

function Auth() {
    const[cookies, setCookie, removeCookie] = useCookies(null)
    const[authMode, setAuthMode] = useState('register')
    const[values, setValues] = useState({
        email: "",
        password: "",
        confirm: "",
    })
    

    const setColor = (e) =>{
        setAuthMode(e.target.name)
    }
    const getValues = (e) =>{
        const{name, value} = e.target
        setValues(prev => ({
            ...values,
            [name]: value
        }))
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(authMode === "register" && values.password === values.confirm && values.password.length > 5 && values.email.length > 5){
            const response = await fetch(`http://localhost:8000/register`, {
                method:"POST",
                headers: {"Content-Type": "Application/json"},
                body: JSON.stringify(values)
            })
            const data = await response.json()
            if(response.status === 200){
                notify("Succesfully logged in!")
                setTimeout(()=>{
                    setCookie("Email", data.email)
                    setCookie("Token", data.token)
                    window.location.reload()
                }, 2000)
            }else{
                error(data.detail)
            }
        }else if(authMode === 'login'){
            const response = await fetch(`http://localhost:8000/login`, {
                method:"POST",
                headers: {"Content-Type": "Application/json"},
                body: JSON.stringify(values)
            })
            const data = await response.json()
            if(response.status===200) {
                notify("Succesfully logged in!")
                setTimeout(()=>{
                    setCookie("Email", data.email)
                    setCookie("Token", data.token)
                    window.location.reload()
                }, 2000)
            }
        }
    }

    return (
        <div className='auth'>
            <div className='modal'>
                <div className='auth-inputs'>
                    <button style={authMode === "register" ? colors.selected : colors.notSelected} onClick={setColor} name="register" className='register'>Register</button>
                    <button style={authMode === "login" ? colors.selected : colors.notSelected} onClick={setColor} name="login" className='login'>Login</button>
                </div>
                <form className='auth-form'>
                    <input type="email" value={values.email} name="email" onChange={getValues} placeholder='Email'></input>
                    <input type="password" value={values.password} name="password" onChange={getValues} placeholder='Password'></input>
                    {authMode === "register" && <input onChange={getValues} value={values.confirm} name="confirm" placeholder='Confirm your password' type="password" ></input>}
                    <button type='submit' onClick={handleSubmit}>Confirm</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Auth