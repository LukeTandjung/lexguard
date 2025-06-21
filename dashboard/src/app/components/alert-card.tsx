import React from 'react'
import { Alert } from '../types/types'

interface AlertCardProps {
  alert: Alert;
}

export default function AlertCard({ alert }: AlertCardProps) {
  return (
    <div>
      <div className="flex flex-row items-center px-4 py-2 hover:bg-gray-100 hover:scale-105 transition-all duration-300 rounded-lg m-2">
        <div className="font-cabin text-lg text-dark">
          {alert.time.toDate().toLocaleString()} - {alert.sender}
        </div>
      </div>
    </div>
  )
}
