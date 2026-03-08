import { Link } from 'react-router-dom'

export default function Navbar({ cart }) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>📚 BookStore</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/search" style={styles.link}>Cari Buku</Link>
        <Link to="/orders" style={styles.link}>Orders</Link>
        <Link to="/cart" style={styles.cartBtn}>
          🛒 <span style={styles.badge}>{totalItems}</span>
        </Link>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 80px',
    backgroundColor: '#2b4162',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#fff',
    textDecoration: 'none',
    letterSpacing: '1px',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
  },
  cartBtn: {
    position: 'relative',
    backgroundColor: '#e9c46a',
    color: '#2b4162',
    padding: '8px 16px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  badge: {
    backgroundColor: '#2b4162',
    color: '#fff',
    borderRadius: '50%',
    padding: '2px 7px',
    fontSize: '12px',
    fontWeight: 'bold',
  }
}