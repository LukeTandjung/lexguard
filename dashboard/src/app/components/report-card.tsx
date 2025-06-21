import React from 'react'
import { Alert } from '../types/types'
import MessageCard from './message-card';

interface ReportCardProps {
  alert: Alert | null;
}

export default function ReportCard({ alert }: ReportCardProps) {
  if (!alert) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="font-cabin text-lg text-gray-500">Select an alert to view details</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1 flex-col gap-4 py-2">
        <div className="font-cabin text-lg font-bold">Time: <span className="font-normal">{alert.time.toDate().toLocaleString()}</span></div>
        <div className="font-cabin text-lg font-bold">Sender: <span className="font-normal">{alert.sender}</span></div>
        <div className="font-cabin text-lg font-bold">Receiver: <span className="font-normal">{alert.receiver}</span></div>
        <div className="font-cabin text-lg font-bold">Category: <span className="font-normal">{alert.violation}</span></div>
        <div className="font-cabin text-lg font-bold">Status: <span className="font-normal">{alert.status}</span></div>
        <div className="font-cabin text-lg font-bold">Subject: <span className="font-normal">{alert.subject}</span></div>
        <div className="font-cabin text-lg font-bold">Email Content:
          <MessageCard message={alert.message} />
        </div>

      </div>
    </div>
  )
}
