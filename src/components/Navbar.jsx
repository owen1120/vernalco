import { Link } from 'react-router-dom'

function Navbar() {
  const navStyle = {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    background: '#eee',
    borderBottom: '2px solid #ff69b4'
  }

  return (
    <nav style={navStyle}>
      <Link to="/">首頁</Link>
      <Link to="/about">關於我們</Link>
    </nav>
  )
}

export default Navbar