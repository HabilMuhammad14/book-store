import { useState } from "react"
import BookCard from '../components/BookCard.jsx'
export default function Search() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false)
  const handleSearch = async() => {
    try{
        setLoading(true)
        let res = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=20`)
        if(!res.ok){
            console.log('Terjadi Error');
            throw new Error('Terjadi Error!!!')
        }
        let data = await res.json()
        setBooks(data.docs)
        setLoading(false)
    }catch(err){
        console.log(`Error: ${err}`)
    }
  }
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cari Buku 🔍</h1>

      <div style={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Cari judul, penulis, atau topik..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchBtn}>Cari</button>
      </div>

      {loading && <p style={styles.loading}>Mencari buku...</p>}

      {!loading && books.length === 0 && query && (
        <p style={styles.empty}>Tidak ada buku yang ditemukan untuk "{query}"</p>
      )}

      {!loading && books.length > 0 && (
        <>
          <p style={styles.resultInfo}>Menampilkan {books.length} hasil untuk "{query}"</p>
          <div style={styles.grid}>
            {books.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: '40px 80px',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#2b4162',
    marginBottom: '24px',
  },
  searchWrapper: {
    display: 'flex',
    gap: '12px',
    marginBottom: '32px',
  },
  searchInput: {
    flex: 1,
    padding: '12px 20px',
    borderRadius: '30px',
    border: '2px solid #dce3ec',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: '#fff',
  },
  searchBtn: {
    padding: '12px 28px',
    backgroundColor: '#2b4162',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#888',
    marginTop: '60px',
  },
  empty: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#888',
    marginTop: '60px',
  },
  resultInfo: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '24px',
  },
}