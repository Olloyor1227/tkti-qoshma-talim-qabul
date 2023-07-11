import { Navigate } from "react-router-dom"

export const PrivateRoute = ({children, key}) => {
    const user = JSON.parse(localStorage.getItem("user"))
    // localdan olib backkendga jonatadi agar bor bolsa kiradi bulmasa yuq 
    // ungacha loading bolib turadi
    if ("ss") return children
    else return <Navigate to="/login" replace />
}
