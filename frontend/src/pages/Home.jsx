import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Temukan Buku <br />Favoritmu! 📚</h1>
          <p style={styles.subtitle}>
            Jelajahi ribuan judul buku dari seluruh dunia. <br />
            Dari fiksi, sains, sejarah, hingga self-improvement.
          </p>
          <Link to="/search" style={styles.btn}>Cari Buku Sekarang</Link>
        </div>
        <div style={styles.heroImage}>📖</div>
      </div>

      {/* Feature Section */}
      <div style={styles.features}>
        <div style={styles.featureCard}>
          <span style={styles.featureIcon}>🔍</span>
          <h3 style={styles.featureTitle}>Cari Jutaan Buku</h3>
          <p style={styles.featureDesc}>Temukan buku apapun dari database Open Library yang terus berkembang.</p>
        </div>
        <div style={styles.featureCard}>
          <span style={styles.featureIcon}>🛒</span>
          <h3 style={styles.featureTitle}>Beli dengan Mudah</h3>
          <p style={styles.featureDesc}>Tambahkan ke keranjang dan checkout dalam hitungan detik.</p>
        </div>
        <div style={styles.featureCard}>
          <span style={styles.featureIcon}>📦</span>
          <h3 style={styles.featureTitle}>Lacak Pesanan</h3>
          <p style={styles.featureDesc}>Pantau riwayat pembelian bukumu kapan saja dan di mana saja.</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
  },
  hero: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '80px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #dce3ec',
  },
  heroContent: {
    maxWidth: '500px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#2b4162',
    lineHeight: '1.2',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    lineHeight: '1.7',
    marginBottom: '32px',
  },
  btn: {
    display: 'inline-block',
    backgroundColor: '#2b4162',
    color: '#fff',
    padding: '14px 32px',
    borderRadius: '30px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    boxShadow: '0 4px 15px rgba(43,65,98,0.3)',
  },
  heroImage: {
    fontSize: '180px',
    lineHeight: '1',
  },
  features: {
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    padding: '64px 80px',
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '32px',
    textAlign: 'center',
    flex: 1,
    maxWidth: '280px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  featureIcon: {
    fontSize: '40px',
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2b4162',
    margin: '16px 0 8px',
  },
  featureDesc: {
    fontSize: '14px',
    color: '#888',
    lineHeight: '1.6',
  },
}