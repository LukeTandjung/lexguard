import React from 'react'
import { Alert } from '../types/types'
import { Timestamp } from 'firebase/firestore'

export default function AlertCard() {

  let alerttest = {
    id: "1",
    time: Timestamp.fromDate(new Date()),
    sender: "test@test.com",
    receiver: "test@test.com",
    name: "Test",
    violation: "Test",
    status: "Test",
  }

  return (
    <div>
      <div className="flex flex-row items-center px-4 py-2 hover:bg-gray-100 rounded-lg">
        <div className="font-cabin text-lg text-dark">
          {alerttest.time.toDate().toLocaleString()} - {alerttest.sender}
        </div>
      </div>
    </div>
  )
}
