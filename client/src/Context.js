import { createContext } from "react"
import { useState } from "react"
import { useCookies } from "react-cookie"

export const appContext = createContext()

export default function Context({children}) {
const[cookies, setCookie, removeCookie] = useCookies(null)
const[currentMode, setCurrentMode] = useState('create')
const[userIn, setUserIn] = useState(cookies.Token === undefined ? false : true)
const[data, setData] = useState({
    id: "123",
    email: currentMode === "create" ? cookies.Email : null,
    title: currentMode === "create" ? "" : null,
    progress:   currentMode === "create" ? 50 : null,
    date: currentMode === "create" ? new Date() : null,
});

const handleEdit = (e, task) =>{
    setCurrentMode("edit")
    setData(prev => ({
        ...data,
        email: task.email,
        title: task.title,
        progress: task.progress,
        date: task.date,
        id: task.id
    }))
    
}
  return (
    <appContext.Provider value={{
        currentMode,
        setData,
        data,
        handleEdit,
        userIn,
        cookies
    }}>
        {children}
    </appContext.Provider>
  )
}
