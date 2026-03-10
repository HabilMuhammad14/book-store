import { useState } from "react"
import {useNavigate} from 'react-router-dom'
export default function Cart({cart, setCart}){
  const navigate = useNavigate()
  const [form, setForm] = useState({
    customer_name: '',
    address: '',
    phone: ''
  })
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const removeFromCart = (book_key) => {
        setCart(cart.filter((item) => item.book_key !== book_key))
    }
    const updateQuantity = (book_key, quantity) => {
        if(quantity === 0){
            removeFromCart(book_key)
            return
        }
        setCart(cart.map((item) => {
            if(item.book_key === book_key){
              return {...item, quantity: quantity}
            }
            return item
        }))
    }
    const handleOrder = async () => {
      if(form.customer_name === '' || form.address === '' || form.phone === ''){
        alert('Data Harus Dilengkapi Terlebih Dahulu!!')
      }else{
        try{
            let res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(
                     {
                       customer_name: form.customer_name,
                       address: form.address,
                       phone: form.phone,
                       total_price: totalPrice,
                       items: cart.map((item) => ({
                         book_key: item.book_key,
                         book_title: item.book_title,
                         price: item.price,
                         quantity: item.quantity,
                       }))
                     }
                )
            })
            if(!res.ok){
              throw new Error('Telah Terjadi Error')
            }
            setCart([])
            navigate('/orders')
        }catch(err){
          console.log(err)
        }
    }
      }
    if (cart.length === 0) {
  return (
    <div style={styles.emptyContainer}>
      <p style={styles.emptyIcon}>🛒</p>
      <h2 style={styles.emptyTitle}>Keranjang Kosong</h2>
      <p style={styles.emptyDesc}>Yuk tambahkan buku favoritmu!</p>
    </div>
  )
}

return (
  <div style={styles.container}>
    <h1 style={styles.title}>Keranjang Belanja 🛒</h1>
    <div style={styles.layout}>

      <div style={styles.cartList}>
        {cart.map((item) => (
          <div key={item.book_key} style={styles.cartItem}>
            <div style={styles.itemInfo}>
              <h3 style={styles.itemName}>{item.book_title}</h3>
              <p style={styles.itemPrice}>Rp {item.price.toLocaleString('id-ID')}</p>
            </div>
            <div style={styles.itemActions}>
              <button onClick={() => updateQuantity(item.book_key, item.quantity - 1)} style={styles.qtyBtn}>-</button>
              <span style={styles.qty}>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.book_key, item.quantity + 1)} style={styles.qtyBtn}>+</button>
              <button onClick={() => removeFromCart(item.book_key)} style={styles.removeBtn}>🗑️</button>
            </div>
            <p style={styles.itemTotal}>
              Rp {(item.price * item.quantity).toLocaleString('id-ID')}
            </p>
          </div>
        ))}

        <div style={styles.totalWrapper}>
          <span style={styles.totalLabel}>Total Pembayaran</span>
          <span style={styles.totalPrice}>Rp {totalPrice.toLocaleString('id-ID')}</span>
        </div>
      </div>
      <div style={styles.form}>
        <h2 style={styles.formTitle}>Data Pengiriman</h2>
        <input
          type="text"
          placeholder="Nama Lengkap"
          value={form.customer_name}
          onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Nomor HP"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          style={styles.input}
        />
        <textarea
          placeholder="Alamat Lengkap"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          style={styles.textarea}
        />
        <button onClick={handleOrder} style={styles.orderBtn}>
          Pesan Sekarang 🚀
        </button>
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
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#2b4162',
    marginBottom: '32px',
  },
  layout: {
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-start',
  },
  cartList: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '16px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#2b4162',
    marginBottom: '4px',
  },
  itemPrice: {
    fontSize: '13px',
    color: '#888',
  },
  itemActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  qtyBtn: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: '2px solid #2b4162',
    backgroundColor: '#fff',
    color: '#2b4162',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
  },
  qty: {
    fontSize: '16px',
    fontWeight: 'bold',
    minWidth: '20px',
    textAlign: 'center',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    marginLeft: '8px',
  },
  itemTotal: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#e9c46a',
    minWidth: '120px',
    textAlign: 'right',
  },
  totalWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '20px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    marginTop: '8px',
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2b4162',
  },
  totalPrice: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#e9c46a',
  },
  form: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2b4162',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #dce3ec',
    fontSize: '14px',
    outline: 'none',
  },
  textarea: {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #dce3ec',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    minHeight: '100px',
  },
  orderBtn: {
    padding: '14px',
    backgroundColor: '#2b4162',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(43,65,98,0.3)',
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
}