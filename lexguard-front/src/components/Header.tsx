import gmailLogo from '../assets/logo_gmail_lockup_default_1x_r5.webp'

const Header = () => {
  return (
    <header className="gmail-header">
      <button className="hamburger-menu">
        <span>☰</span>
      </button>
      <div className="gmail-logo">
        <img src={gmailLogo} alt="Gmail" />
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search mail"
        />
      </div>
      <div className="header-actions">
        <button className="header-btn">?</button>
        <button className="header-btn">⚙️</button>
        <button className="header-btn">⚡</button>
        <button className="header-btn" style={{ backgroundColor: '#1a73e8', color: 'white', borderRadius: '50%' }}>
          Y
        </button>
      </div>
    </header>
  )
}

export default Header 