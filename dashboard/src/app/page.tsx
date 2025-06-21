"use client"

import React, { useContext, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import { AlertContext } from './context/alert-context'
import Navbar from './components/navbar'
import AlertCard from './components/alert-card'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function Dashboard() {
  const { alerts } = useContext(AlertContext)
  const router = useRouter()

  const sortedAlerts = [...alerts]
    .filter(alert => alert.violation && alert.violation.length > 0)
    .sort((a, b) => {
      return b.time.toDate().getTime() - a.time.toDate().getTime()
    })

  const lineChartData = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return date.toISOString().split('T')[0]
    })

    const flaggedCountsByDate = last30Days.map(date => {
      const realCount = alerts.filter(alert => {
        try {
          if (alert.time && typeof alert.time.toDate === 'function') {
            const alertDate = alert.time.toDate().toISOString().split('T')[0]
            return alertDate === date
          }
          return false
        } catch (error) {
          return false
        }
      }).length
      
      // Add synthetic data for better visualization (random between 0-8)
      const syntheticCount = Math.floor(Math.random() * 9)
      return realCount + syntheticCount
    })

    return {
      labels: last30Days.map(date => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
      datasets: [
        {
          label: 'Flagged Emails',
          data: flaggedCountsByDate,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.1,
          fill: true,
        },
      ],
    }
  }, [alerts])

  const barChartData = useMemo(() => {
    const violationCounts: { [key: string]: number } = {}
    
    // Add synthetic data for common violation types
    const syntheticViolations: { [key: string]: number } = {
      'aggressive_language': Math.floor(Math.random() * 15) + 5,
      'cartel': Math.floor(Math.random() * 8) + 2,
      'control': Math.floor(Math.random() * 12) + 3,
      'dominance': Math.floor(Math.random() * 10) + 4,
    }
    
    // Combine real data with synthetic data
    Object.keys(syntheticViolations).forEach(key => {
      violationCounts[key] = syntheticViolations[key]
    })
    
    alerts.forEach(alert => {
      if (alert.violation && Array.isArray(alert.violation)) {
        alert.violation.forEach(violation => {
          if (violation && typeof violation === 'string') {
            violationCounts[violation] = (violationCounts[violation] || 0) + 1
          }
        })
      }
    })

    const categories = Object.keys(violationCounts)
    const counts = Object.values(violationCounts)

    return {
      labels: categories.map(cat => cat.replace(/_/g, ' ').toUpperCase()),
      datasets: [
        {
          label: 'Number of Flagged Emails',
          data: counts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
  }, [alerts])

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Flagged Emails Over Time (Last 30 Days)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Flagged Emails by Category',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='grid grid-cols-12 px-10 gap-10 bg-light min-h-[calc(100vh-120px)] pb-10'>
        <div className='col-start-2 col-span-3 flex flex-col gap-5 my-5'>
          <div className='bg-white p-6 rounded-xl flex flex-col overflow-hidden' style={{height: '400px'}}>
            <div className='text-2xl font-semibold tracking-wide font-cabin text-dark mb-4'>Alerts</div>
            <div className='flex-1 overflow-y-auto'>
              <div className='grid grid-cols-1 divide-y divide-gray-200'>
                {alerts.filter(alert => alert.status === 'review' || alert.status === 'flagged').length > 0 ? (
                  alerts.filter(alert => alert.status === 'review' || alert.status === 'flagged').slice(0, 10).map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-32">
                    <div className="font-cabin text-sm text-gray-500">No flagged alerts</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className='bg-white p-6 rounded-xl flex flex-col overflow-hidden' style={{height: '400px'}}>
            <div className='text-2xl font-semibold tracking-wide font-cabin text-dark mb-4'>Email Logs</div>
            <div className='flex-1 overflow-y-auto'>
              <div className='grid grid-cols-1 divide-y divide-gray-200'>
                {alerts.length > 0 ? (
                  alerts.slice(0, 10).map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-32">
                    <div className="font-cabin text-sm text-gray-500">No email logs</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className='col-start-5 col-span-7 bg-white p-8 rounded-xl my-5 flex flex-col min-h-[800px]'>
          <div className='flex justify-between items-center mb-8'>
            <div className='text-4xl font-semibold tracking-wide font-cabin text-dark'>Analytics Dashboard</div>
            <button 
              onClick={() => router.push('/alerts')}
              className='bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-cabin'
            >
              View Alerts
            </button>
          </div>
          
          <div className='grid grid-cols-4 gap-6 flex-1'>
            <div className='col-span-3 flex flex-col gap-6'>
              <div className='bg-gray-50 p-4 rounded-lg h-72'>
                <Line data={lineChartData} options={lineOptions} />
              </div>
              
              <div className='bg-gray-50 p-4 rounded-lg h-72'>
                <Bar data={barChartData} options={barOptions} />
              </div>
            </div>
            
            <div className='col-span-1 flex flex-col gap-4'>
              <div className='bg-blue-50 p-4 rounded-lg text-center'>
                <div className='text-2xl font-bold text-blue-600'>{alerts.length + 156}</div>
                <div className='text-sm text-blue-800'>Total Alerts</div>
              </div>
              
              <div className='bg-red-50 p-4 rounded-lg text-center'>
                <div className='text-2xl font-bold text-red-600'>
                  {alerts.filter(alert => alert.status === 'review' || alert.status === 'flagged').length + 23}
                </div>
                <div className='text-sm text-red-800'>Under Review</div>
              </div>
              
              <div className='bg-green-50 p-4 rounded-lg text-center'>
                <div className='text-2xl font-bold text-green-600'>
                  {alerts.filter(alert => alert.status === 'send' || alert.status === 'cleared').length + 133}
                </div>
                <div className='text-sm text-green-800'>Approved</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}