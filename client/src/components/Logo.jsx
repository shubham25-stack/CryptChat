import React from 'react'

// Modern logo: icon + full name; palette uses orange/black/white
const Logo = ({ name = 'CryptChat', size = 40, className = '', rounded = true, showText = true }) => {
  const iconSize = size;

  const iconStyle = {
    width: iconSize,
    height: iconSize,
    borderRadius: rounded ? Math.max(6, Math.floor(iconSize * 0.25)) : 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #ff8a3d 0%, #d35400 50%, #1f1a17 100%)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
  }

  const letterStyle = {
    color: '#ffffff',
    fontWeight: 800,
    fontSize: Math.max(12, Math.floor(iconSize / 2.2)),
    lineHeight: 1,
  }

  const textStyle = {
    display: 'flex',
    alignItems: 'baseline',
    gap: 6,
  }

  const nameStyle = {
    color: '#ffffff',
    fontWeight: 800,
    fontSize: Math.max(14, Math.floor(iconSize / 2.2)),
    letterSpacing: '-0.02em'
  }

  const accentStyle = { color: '#ff8a3d' }

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label={name} title={name}>
      <div style={iconStyle}>
        <span style={letterStyle}>C</span>
      </div>

      {showText && (
        <div style={textStyle}>
          <div style={nameStyle} className="select-none">{String(name).replace(/Chat$/, '')}</div>
          <div style={accentStyle} className="select-none font-extrabold">Chat</div>
        </div>
      )}
    </div>
  )
}

export default Logo
