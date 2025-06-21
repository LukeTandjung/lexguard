import React from 'react'
import Image from 'next/image'

export default function Dashboard() {
  return (
    <div className='h-screen flex flex-col'>
        <nav className='grid grid-cols-12 px-10 gap-10 bg-primary'>
          <div className='flex px-5 py-8 col-start-2 col-end-10 items-center gap-5'>
            <Image src={`/icon-white.png`} alt='icon' width={50} height={50}/>
            <div className="text-4xl font-bold tracking-wide italic font-cabin text-white">LexGuard</div>
          </div>
        </nav>
        <main className='grid grid-cols-12 px-10 gap-10 bg-light flex-1'>
            <div className='col-start-2 col-span-4 bg-white p-8 rounded-3xl my-5'>
                <div className='text-4xl font-semibold tracking-wide font-cabin text-dark'>Alerts</div>
                <div className='flex flex-col gap-4'>
                  <div>Alert 1</div>
                  <div>Alert 2</div>
                  <div>Alert 3</div>
                  <div>Alert 4</div>
                </div>
            </div>
            <div className='col-start-6 col-span-6 bg-white p-8 rounded-3xl my-5'>
                <div className='text-4xl font-semibold tracking-wide font-cabin text-dark'>Email Flagged</div>
                <div className='flex flex-col gap-4'>
                  <div>Alert 1</div>
                  <div>Alert 2</div>
                  <div>Alert 3</div>
                  <div>Alert 4</div>
                </div>
            </div>
        </main>
    </div>
  )
}
