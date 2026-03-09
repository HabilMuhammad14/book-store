import { Link } from 'react-router-dom'

export default function BookCard({ book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/200x280?text=No+Cover'

  const bookKey = book.key.replace('/works/', '')

  return (
    <div style={styles.card}>
      <img src={coverUrl} alt={book.title} style={styles.cover} />
      <div style={styles.body}>
        <h3 style={styles.title}>{book.title}</h3>
        <p style={styles.author}>
          {book.author_name ? book.author_name[0] : 'Unknown Author'}
        </p>
        <p style={styles.price}>Rp 85.000</p>
        <Link to={`/book/${bookKey}`} style={styles.detailBtn}>
          Lihat Detail
        </Link>
      </div>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
  },
  cover: {
    width: '100%',
    height: '240px',
    objectFit: 'cover',
  },
  body: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  title: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#2b4162',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  author: {
    fontSize: '13px',
    color: '#888',
  },
  price: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#e9c46a',
    marginTop: '4px',
  },
  detailBtn: {
    marginTop: '8px',
    padding: '8px 0',
    textAlign: 'center',
    borderRadius: '20px',
    border: '2px solid #2b4162',
    color: '#2b4162',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600',
  },
}