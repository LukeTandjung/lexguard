interface SidebarProps {
  onComposeClick: () => void
}

const Sidebar = ({ onComposeClick }: SidebarProps) => {
  return (
    <aside className="gmail-sidebar">
      <button className="compose-btn" onClick={onComposeClick}>
        <span>✏️</span>
        Compose
      </button>
      <ul className="sidebar-nav">
        <li className="active">
          <span>📥</span>
          Inbox
          <span className="count">50</span>
        </li>
        <li>
          <span>⭐</span>
          Starred
        </li>
        <li>
          <span>⏰</span>
          Snoozed
        </li>
        <li>
          <span>📤</span>
          Sent
          <span className="count">1</span>
        </li>
        <li>
          <span>📄</span>
          Drafts
        </li>
        <li>
          <span>🏷️</span>
          Notes
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar 