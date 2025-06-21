const Header = () => {
  return (
    <header className="gmail-header">
      <button className="hamburger-menu">
        <span>☰</span>
      </button>
      <div className="gmail-logo">
        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ea4335' }}>Gmail</span>
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