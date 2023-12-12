import React from 'react'
import { Sidebar } from '../components/admin/Sidebar'
import { Header } from '../components/admin/Header'
import { Outlet } from 'react-router-dom';

export const DashboardPage = () => {
  return (
    <>
        <div>
            <div className="flex overflow-hidden ">
                <div className="basis-[12%] h-[100vh]">
                    <Sidebar />
                </div>
                <div className="basis-[88%] border overflow-hidden h-[100vh]">
                    <Header />
                    <div>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
