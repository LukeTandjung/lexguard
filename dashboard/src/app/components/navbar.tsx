"use client"

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface NavbarProps {
  showHamburger?: boolean
  onHamburgerClick?: () => void
}

export default function Navbar({ showHamburger = false, onHamburgerClick }: NavbarProps) {
  const router = useRouter()

  const handleHamburgerClick = () => {
    if (onHamburgerClick) {
      onHamburgerClick()
    } else {
      router.push('/')
    }
  }

  return (
    <nav className='grid grid-cols-12 px-10 gap-10 bg-primary'>
      <div className='flex px-5 py-8 col-start-2 col-end-10 items-center gap-5'>
        {showHamburger && (
          <button
            onClick={handleHamburgerClick}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors mr-5 font-cabin"
          >
            ← Back to Dashboard
          </button>
        )}
        <Image src={`/icon-white.png`} alt='icon' width={50} height={50}/>
        <div className="text-4xl font-bold tracking-wide italic font-cabin text-white">LexGuard</div>
      </div>
    </nav>
  )
}