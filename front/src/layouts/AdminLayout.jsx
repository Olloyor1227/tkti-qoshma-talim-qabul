import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components'

export const AdminLayout = () => {
  return (
    <div className='flex'>
      <Navbar />
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  )
}
