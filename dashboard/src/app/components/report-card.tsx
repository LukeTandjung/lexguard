import React from 'react'
import { Alert } from '../types/types'
import MessageCard from './message-card';
import Image from 'next/image';

interface ReportCardProps {
  alert: Alert | null;
}

const DESCRIPTION = {
  "aggressive_language": "Language which is war-like or about harming competitors",
  "cartel": "Language which is indicative of price fixing or cartelisation",
  "control": "Language which indicates that our firm somehow controls other market actors (such as by locking them in or tying products together)", 
  "dominance": "Language which indicates that our firm has market power or dominates the market"
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
      <div className="grid grid-cols-2">
        <div className="col-span-1 flex flex-1 flex-col gap-4 py-2 font-cabin text-dark text-lg">
          <div className="font-bold">Time: <span className="font-normal">{alert.time.toDate().toLocaleString()}</span></div>
          <div className="font-bold">Sender: <span className="font-normal">{alert.sender}</span></div>
          <div className="font-bold">Receiver: <span className="font-normal">{alert.receiver}</span></div>
          <div className="font-bold">Status: <span className="font-normal">{alert.status}</span></div>
          <div className="font-bold">Category: <span className="font-normal">{alert.violation[0]?.toUpperCase() || "No Issue"}</span></div>
          <div className="font-bold">Description: <span className="font-normal">{DESCRIPTION[alert.violation[0] as keyof typeof DESCRIPTION] || "None"}</span></div>
          <div className="font-bold">Subject: <span className="font-normal">{alert.subject}</span></div>
        </div>
        <div className="flex flex-col gap-y-2 py-2 col-span-1">
          <div className="font-bold text-lg font-cabin text-dark">Actions:</div>
          <div className="flex">
            <button className="flex flex-row items-center gap-x-2 cursor-pointer border-3 border-primary text-dark px-4 py-2 rounded-md hover:text-white hover:bg-blue-600 transition-all duration-300">
              <div className="text-start font-cabin text-md">Schedule Meeting with {alert.sender}</div>
              <Image src="/calendar.png" alt="calendar" width={30} height={30} className="w-10 h-10 p-1 bg-white rounded-sm" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="font-bold font-cabin text-lg text-dark flex flex-col gap-y-2 py-2">
          <div>Email Content:</div>
          <div className="text-sm">
            <MessageCard message={alert.message} />
          </div>
        </div>
    </div>
  )
}
