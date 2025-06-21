import EmailItem from './EmailItem'

interface Email {
  id: string
  sender: string
  subject: string
  snippet: string
  date: string
  isRead: boolean
  isStarred: boolean
}

interface EmailListProps {
  emails: Email[]
  selectedEmails: string[]
  onToggleEmailSelection: (emailId: string) => void
  onToggleSelectAll: () => void
}

const EmailList = ({ emails, selectedEmails, onToggleEmailSelection, onToggleSelectAll }: EmailListProps) => {
  return (
    <section className="email-list-container">
      <div className="email-list-header">
        <input
          type="checkbox"
          className="select-all-checkbox"
          checked={selectedEmails.length === emails.length}
          onChange={onToggleSelectAll}
        />
        <div className="toolbar-actions">
          <button className="toolbar-btn" title="Archive">🗃️</button>
          <button className="toolbar-btn" title="Report spam">⚠️</button>
          <button className="toolbar-btn" title="Delete">🗑️</button>
          <button className="toolbar-btn" title="Mark as read">📖</button>
          <button className="toolbar-btn" title="Snooze">⏰</button>
          <button className="toolbar-btn" title="Add to Tasks">✓</button>
          <button className="toolbar-btn" title="Move to">📁</button>
          <button className="toolbar-btn" title="Labels">🏷️</button>
          <button className="toolbar-btn" title="More">⋮</button>
        </div>
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#5f6368' }}>
          1–25 of 164
        </span>
      </div>

      <div className="email-list">
        {emails.map(email => (
          <EmailItem
            key={email.id}
            email={email}
            isSelected={selectedEmails.includes(email.id)}
            onToggleSelection={onToggleEmailSelection}
          />
        ))}
      </div>
    </section>
  )
}

export default EmailList 