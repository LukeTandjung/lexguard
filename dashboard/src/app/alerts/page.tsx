"use client"

import React, { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import AlertCard from '../components/alert-card'
import ReportCard from '../components/report-card'
import Navbar from '../components/navbar'
import { Alert } from '../types/types'
import { AlertContext } from '../context/alert-context'


export default function Dashboard() {
  const [selectAlert, setSelectAlert] = useState<Alert | null>(null)
  const { alerts } = useContext(AlertContext)
  const router = useRouter()

  const sortedAlerts = [...alerts].sort((a, b) => {
    return b.time.toDate().getTime() - a.time.toDate().getTime()
  })

  return (
    <div className='h-screen flex flex-col'>
        <Navbar />
        <main className='grid grid-cols-12 px-10 gap-10 bg-light h-[calc(100vh-120px)]'>
            <div className='col-start-2 col-span-4 bg-white p-8 rounded-xl my-5 flex flex-col overflow-hidden'>
                <div className='text-4xl font-semibold tracking-wide font-cabin text-dark mb-5'>Alerts</div>
                <div className='flex-1 overflow-y-auto'>
                    <div className='grid grid-cols-1 divide-y divide-gray-200'>
                      {sortedAlerts.length > 0 ? (
                        sortedAlerts.map((alert) => (
                          <button key={alert.id} onClick={() => setSelectAlert(alert)} className="w-full text-left cursor-pointer">
                            <AlertCard alert={alert} />
                          </button>
                        ))
                      ) : (
                        <div className="flex items-center justify-center h-32">
                          <div className="font-cabin text-lg text-gray-500">No alerts found</div>
                        </div>
                      )}
                    </div>
                </div>
            </div>
            <div className='col-start-6 col-span-6 bg-white p-8 rounded-xl my-5 flex flex-col overflow-hidden'>
                <div className='text-4xl font-semibold tracking-wide font-cabin text-dark mb-5'>Email Flagged</div>
                <div className='flex-1 overflow-y-auto'>
                    <ReportCard alert={selectAlert} />
                </div>
            </div>
        </main>
    </div>
  )
}
