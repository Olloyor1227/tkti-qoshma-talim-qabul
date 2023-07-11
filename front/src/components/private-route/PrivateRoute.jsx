import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import i18next from "i18next"

import { useAppContext } from "../../context/app.context"
import { ApiClietServices } from "../../helpers"
const { post, get } = new ApiClietServices()

export const PrivateRoute = ({children, key}) => {
    const { authState, setAuthState } = useAppContext()
    const user = JSON.parse(localStorage.getItem("user")) 

    useEffect(() => {
        if (user) setAuthState(true)
        else setAuthState(false)
    }, [user])
    
    // localdan olib backkendga jonatadi agar bor bolsa kiradi bulmasa yuq 
    // ungacha loading bolib turadi
    if (user) return children
    else return <Navigate to={`/${i18next.language}/login`} replace />
}
