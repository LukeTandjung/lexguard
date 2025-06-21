import { useState, useRef } from 'react'

interface ComposeModalProps {
  isVisible: boolean
  onClose: () => void
}

const ComposeModal = ({ isVisible, onClose }: ComposeModalProps) => {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const messageRef = useRef<HTMLDivElement>(null)

  const [reviewed, setReviewed] = useState(false)
  const [reviewing, setReviewing] = useState(false)


  const handleReview = () => {
    setReviewing(true)
    
    // Add red duplicate text
    if (messageRef.current && message) {
      const originalContent = message
      const redDuplicateText = `<span class="compose-red-text" style="color: red;">${originalContent}</span>`
      messageRef.current.innerHTML = originalContent + redDuplicateText
      setMessage(messageRef.current.innerHTML)
    }
    
    setTimeout(() => {
      setReviewed(true)
    }, 1000)
  }

  const handleSend = () => {
    console.log('Sending email:', { to, subject, message })
    onClose()
  }

  if (!isVisible) return null

  return (
    <div className="compose-modal">
      <div className="compose-header">
        <span className="compose-title">New Message</span>
        <div className="compose-actions">
          <button className="compose-action-btn">−</button>
          <button className="compose-action-btn">□</button>
          <button className="compose-action-btn" onClick={onClose}>×</button>
        </div>
      </div>
      <div className="compose-content">
        <input
          type="text"
          className="compose-field"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="text"
          className="compose-field"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <div
          ref={messageRef}
          className="compose-message"
          contentEditable
          data-placeholder="Compose email"
          onInput={(e) => setMessage(e.currentTarget.innerHTML)}
          style={{
            minHeight: '150px',
            border: '1px solid #ddd',
            padding: '8px',
            borderRadius: '4px',
            outline: 'none',
            direction: 'ltr',
            textAlign: 'left'
          }}
        />
      </div>
      <div className="compose-footer">
        { reviewed ? (
          <div className="compose-footer-actions">
            <button className="send-btn" onClick={handleSend}>Send</button>
            <button className="review-again-btn" onClick={handleReview}>Review Again</button>
          </div>
        ) : reviewing ? (
          <button className="send-btn" onClick={handleReview}>Reviewing...</button>
        ) : (
            <button className="send-btn" onClick={handleReview}>Review</button>
        )}
        <div className="compose-tools">
          <button className="compose-tool-btn" title="Formatting options">A</button>
          <button className="compose-tool-btn" title="Attach files">📎</button>
          <button className="compose-tool-btn" title="Insert link">🔗</button>
          <button className="compose-tool-btn" title="Insert emoji">😊</button>
          <button className="compose-tool-btn" title="Insert files using Drive">💿</button>
          <button className="compose-tool-btn" title="Insert photo">📷</button>
          <button className="compose-tool-btn" title="Toggle confidential mode">🔒</button>
          <button className="compose-tool-btn" title="More options">⋮</button>
        </div>
      </div>
    </div>
  )
}

export default ComposeModal 