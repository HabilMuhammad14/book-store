import React from 'react';

export default function Orders(){
    const [orders, setOrder] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const fetchOrders = async () => {
            try{
                let res = await fetch('http://localhost:5000/api/orders')
                if(!res.ok){
                    throw new Error('Terjadi Error saat fetch data!!!')
                }
                let data = await res.json()
                setOrder(data)
                setLoading(false)
            }catch(err){
                console.log(err)
            }
        }
        fetchOrders()
    }, [])

    if (loading) return <p style={styles.loading}>Loading...</p>

if (orders.length === 0) {
  return (
    <div style={styles.emptyContainer}>
      <p style={styles.emptyIcon}>📋</p>
      <h2 style={styles.emptyTitle}>Belum Ada Order</h2>
      <p style={styles.emptyDesc}>Yuk pesan buku favoritmu!</p>
    </div>
  )
}

return (
  <div style={styles.container}>
    <h1 style={styles.title}>Riwayat Order 📋</h1>
    <div style={styles.orderList}>
      {orders.map((order) => (
        <div key={order.id} style={styles.orderCard}>
          <div style={styles.orderHeader}>
            <div>
              <h3 style={styles.orderName}>{order.customer_name}</h3>
              <p style={styles.orderInfo}>📞 {order.phone}</p>
              <p style={styles.orderInfo}>📍 {order.address}</p>
            </div>
            <div style={styles.orderMeta}>
              <span style={styles.statusBadge}>{order.status}</span>
              <p style={styles.orderDate}>
                {new Date(order.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div style={styles.divider} />

          <div style={styles.itemList}>
            {order.items.map((item) => (
              <div key={item.id} style={styles.item}>
                <span style={styles.itemName}>{item.book_title}</span>
                <span style={styles.itemQty}>x{item.quantity}</span>
                <span style={styles.itemPrice}>
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>

          <div style={styles.divider} />

          <div style={styles.totalWrapper}>
            <span style={styles.totalLabel}>Total Pembayaran</span>
            <span style={styles.totalPrice}>
              Rp {Number(order.total_price).toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      ))}
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
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#2b4162',
    marginBottom: '32px',
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2b4162',
    marginBottom: '6px',
  },
  orderInfo: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '4px',
  },
  orderMeta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
  },
  statusBadge: {
    backgroundColor: '#e8edf5',
    color: '#2b4162',
    padding: '4px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  orderDate: {
    fontSize: '13px',
    color: '#aaa',
  },
  divider: {
    height: '1px',
    backgroundColor: '#dce3ec',
    margin: '16px 0',
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    flex: 1,
    fontSize: '14px',
    color: '#2b4162',
  },
  itemQty: {
    fontSize: '14px',
    color: '#888',
    marginRight: '16px',
  },
  itemPrice: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#e9c46a',
  },
  totalWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#2b4162',
  },
  totalPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#e9c46a',
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
  },
  emptyIcon: {
    fontSize: '80px',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2b4162',
    marginBottom: '8px',
  },
  emptyDesc: {
    fontSize: '16px',
    color: '#888',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
    marginTop: '100px',
  },
}