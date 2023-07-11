import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../components'

export const UserLayout = () => {
  return (
    <div className='flex flex-col h-screen'>
    <Header />
    <main className='flex-auto'>
        <Outlet/>
    </main>
    <Footer />
    </div>
  )
}
