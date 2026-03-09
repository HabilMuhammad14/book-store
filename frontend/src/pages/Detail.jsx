import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Detail({ cart, setCart }) {
  const { key } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true)
      const res = await fetch(`https://openlibrary.org/works/${key}.json`)
      const data = await res.json()
      setBook(data)
      setLoading(false)
    }
    fetchBook()
  }, [key])

  const addToCart = () => {
    const existing = cart.find((item) => item.book_key === key)
    if (existing) {
      setCart(cart.map((item) =>
        item.book_key === key
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, {
        book_key: key,
        book_title: book.title,
        price: 85000,
        quantity: 1
      }])
    }
  }

  if (loading) return <p style={styles.loading}>Loading...</p>
  if (!book) return <p style={styles.loading}>Buku tidak ditemukan.</p>

  const coverUrl = book.covers
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : 'https://via.placeholder.com/300x400?text=No+Cover'

  const description = book.description
    ? typeof book.description === 'string'
      ? book.description
      : book.description.value
    : 'Deskripsi tidak tersedia.'

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={coverUrl} alt={book.title} style={styles.cover} />
        <div style={styles.body}>

          {book.subjects && (
            <div style={styles.subjects}>
              {book.subjects.slice(0, 3).map((subject, index) => (
                <span key={index} style={styles.subject}>{subject}</span>
              ))}
            </div>
          )}

          <h1 style={styles.title}>{book.title}</h1>
          <p style={styles.price}>Rp 85.000</p>

          <button onClick={addToCart} style={styles.cartBtn}>
            + Tambah ke Keranjang
          </button>

          <div style={styles.divider} />

          <h2 style={styles.sectionTitle}>Deskripsi</h2>
          <p style={styles.description}>{description}</p>

        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '40px 80px',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  card: {
    display: 'flex',
    gap: '48px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
  },
  cover: {
    width: '280px',
    height: '380px',
    objectFit: 'cover',
    borderRadius: '12px',
    flexShrink: 0,
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  subjects: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  subject: {
    backgroundColor: '#e8edf5',
    color: '#2b4162',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2b4162',
    marginBottom: '8px',
  },
  price: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#e9c46a',
    marginBottom: '20px',
  },
  cartBtn: {
    alignSelf: 'flex-start',
    padding: '12px 32px',
    backgroundColor: '#2b4162',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(43,65,98,0.3)',
  },
  divider: {
    height: '1px',
    backgroundColor: '#dce3ec',
    margin: '24px 0',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2b4162',
    marginBottom: '12px',
  },
  description: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.8',
    overflowY: 'auto',
    maxHeight: '200px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
    marginTop: '100px',
  },
}