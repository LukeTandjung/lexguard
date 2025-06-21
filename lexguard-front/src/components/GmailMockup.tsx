import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import EmailList from './EmailList'
import ComposeModal from './ComposeModal'

interface Email {
  id: string
  sender: string
  subject: string
  snippet: string
  date: string
  isRead: boolean
  isStarred: boolean
}

const mockEmails: Email[] = [
  {
    id: '1',
    sender: 'no-reply',
    subject: 'Confirmation instructions',
    snippet: 'Confirmation instructions Welcome ybaicheng@gmail.com! You can confirm your e...',
    date: '17 May',
    isRead: false,
    isStarred: true
  },
  {
    id: '2',
    sender: 'The Telegraph',
    subject: 'Hello, create or reset your password',
    snippet: 'Create a new password Set up your new password for your Telegraph ...',
    date: '27 Mar',
    isRead: false,
    isStarred: true
  },
  {
    id: '3',
    sender: 'xAI',
    subject: 'Your data export is ready',
    snippet: 'You can ...',
    date: '',
    isRead: false,
    isStarred: true
  },
  {
    id: '4',
    sender: 'Pitch',
    subject: 'Set up Pitch on your computer',
    snippet: 'Pitch ...',
    date: '',
    isRead: false,
    isStarred: true
  },
  {
    id: '5',
    sender: 'Jazz Clarinet Lesso.',
    subject: 'Your member request was approv',
    snippet: '',
    date: '',
    isRead: false,
    isStarred: true
  },
  {
    id: '6',
    sender: 'Coinbase',
    subject: "There's an easier and more secur",
    snippet: '',
    date: '',
    isRead: false,
    isStarred: true
  },
  {
    id: '7',
    sender: 'Kubera',
    subject: 'Download Portfolio',
    snippet: 'Hi Baicheng, A ...',
    date: '',
    isRead: false,
    isStarred: true
  },
  {
    id: '8',
    sender: 'Coinbase 2',
    subject: 'New Device Confirmation',
    snippet: 'Confirm ...',
    date: '',
    isRead: false,
    isStarred: true
  },
  {
    id: '9',
    sender: 'Binance',
    subject: '[Binance] Verification Code - 2025-1',
    snippet: '',
    date: '',
    isRead: false,
    isStarred: true
  },
  {
    id: '10',
    sender: 'Binance',
    subject: '[Binance] Login Attempted from N',
    snippet: '',
    date: '',
    isRead: false,
    isStarred: true
  }
]

const GmailMockup = () => {
  const [showCompose, setShowCompose] = useState(false)
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])

  const toggleEmailSelection = (emailId: string) => {
    setSelectedEmails(prev =>
      prev.includes(emailId)
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    )
  }

  const toggleSelectAll = () => {
    setSelectedEmails(prev =>
      prev.length === mockEmails.length ? [] : mockEmails.map(e => e.id)
    )
  }

  return (
    <div className="gmail-container">
      <Header />
      <main className="gmail-main">
        <Sidebar onComposeClick={() => setShowCompose(true)} />
        <EmailList
          emails={mockEmails}
          selectedEmails={selectedEmails}
          onToggleEmailSelection={toggleEmailSelection}
          onToggleSelectAll={toggleSelectAll}
        />
      </main>
      <ComposeModal
        isVisible={showCompose}
        onClose={() => setShowCompose(false)}
      />
    </div>
  )
}

export default GmailMockup 