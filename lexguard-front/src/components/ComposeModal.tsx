import { useState, useRef } from 'react'
import SuggestedEmailRenderer from './SuggestedEmailRenderer'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase'

interface ComposeModalProps {
  isVisible: boolean
  onClose: () => void
}

interface ReviewResponse {
  has_issue: boolean
  reason: string[]
  suggested_email: string
}

const ComposeModal = ({ isVisible, onClose }: ComposeModalProps) => {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [showReview, setShowReview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [reviewResponse, setReviewResponse] = useState<ReviewResponse | null>(null)
  const messageRef = useRef<HTMLDivElement>(null)

  const handleSend = async () => {
    setShowReview(true)
    setIsLoading(true)
    try {
      const reviewData = {
        sender: 'michael.yin@gmail.com',
        receiver: to,
        session_id: crypto.randomUUID(),
        title: subject,
        content: message,
        status: 'review'
      }
      const response = await fetch('http://localhost:8000/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
      })
      const data = await response.json()
      setReviewResponse(data)

      if (!data.has_issue) {
        handleSendAnyway()
      }

    } catch (error) {
      console.error('Error reviewing email:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendAnyway = async () => {
    console.log(reviewResponse)
    const alertsCollection = collection(db, 'alerts')
    addDoc(alertsCollection, {
      sender: 'michael.yin@gmail.com',
      receiver: to,
      status: 'sent',
      subject: subject,
      title: subject,
      time: Timestamp.now(),
      message: reviewResponse?.suggested_email || message,
      violation: reviewResponse?.reason || []
    })
    setTo('')
    setSubject('')
    setMessage('')
    setShowReview(false)
    onClose()
  }


  const handleCloseReview = () => {
    setShowReview(false)
    setReviewResponse(null)
  }

  if (!isVisible) return null

  return (
    <>
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
              padding: '15px',
              borderRadius: '4px',
              outline: 'none',
              direction: 'ltr',
              textAlign: 'left'
            }}
          />
        </div>
        <div className="compose-footer">
          <button className="send-btn" onClick={handleSend}>Send</button>
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

      {showReview && (
        <div className="review-modal-overlay">
          <div className="review-modal">
            {isLoading ? (
              <div className="review-loading">
                <div className="review-spinner"></div>
                <p className="review-loading-text">Reviewing your email for potential issues...</p>
              </div>
            ) : reviewResponse ? (
              <div>
                <div className="review-modal-header">
                  <h2 className="review-modal-title">Words matter!</h2>
                  <button className="review-modal-close" onClick={handleCloseReview}>×</button>
                </div>
                {reviewResponse.has_issue ? (
                  <>
                    <div className="review-issues">
                      <p className="review-issues-title">Issues Found:</p>
                      <ul className="review-issues-list">
                        {reviewResponse.reason.map((reason, index) => (
                          <li key={index}>{reason.charAt(0).toUpperCase() + reason.slice(1)}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="review-suggestion">
                      <p className="review-suggestion-title">Suggested Revision:</p>
                      <div className="review-suggestion-content">
                        <SuggestedEmailRenderer content={reviewResponse.suggested_email} />
                      </div>
                    </div>
                    <p className="review-suggestion-title">
                        Refer to company <a href="https://embed.documentcloud.org/documents/7016657-Five-Rules-of-Thumb-for-Written-Communications/"> Policy </a> for more details.
                      </p>
                    <div className="review-actions">
                      <button 
                        onClick={() => window.alert('Contacting legal team...')}
                        className="review-edit-btn"
                      >
                        Contact Legal Team
                      </button>
                      <button 
                        onClick={handleCloseReview}
                        className="review-edit-btn"
                      >
                        Edit Message
                      </button>
                      <button 
                        onClick={handleSendAnyway}
                        className="review-send-btn"
                      >
                        Send Anyway
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                  </>
                )}
              </div>
            ) : (
              <div className="review-error">
                <p className="review-error-text">An error occurred while reviewing the email.</p>
                <button 
                  onClick={handleCloseReview}
                  className="review-send-btn"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ComposeModal 