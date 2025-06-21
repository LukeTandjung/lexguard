interface Email {
  id: string
  sender: string
  subject: string
  snippet: string
  date: string
  isRead: boolean
  isStarred: boolean
}

interface EmailItemProps {
  email: Email
  isSelected: boolean
  onToggleSelection: (emailId: string) => void
}

const EmailItem = ({ email, isSelected, onToggleSelection }: EmailItemProps) => {
  return (
    <div className={`email-item ${!email.isRead ? 'unread' : ''}`}>
      <input
        type="checkbox"
        className="email-checkbox"
        checked={isSelected}
        onChange={() => onToggleSelection(email.id)}
      />
      <button className="star-btn">
        {email.isStarred ? '★' : '☆'}
      </button>
      <div className="sender-name">{email.sender}</div>
      <div className="email-subject">
        {email.subject}
        {email.snippet && (
          <span className="email-snippet"> - {email.snippet}</span>
        )}
      </div>
      <div className="email-date">{email.date}</div>
    </div>
  )
}

export default EmailItem 