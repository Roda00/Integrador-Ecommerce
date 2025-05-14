import React from 'react'
import { useUser } from '../../src/Components/context/UserContext'
import { Navigate } from 'react-router'


export default function AdminGuard({children}) {

    const { user } = useUser()

  return user?.role === "admin" ? children : <Navigate to="/"/>
}
