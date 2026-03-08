import pool from '../config/db.js';

const createOrder = async (req, res) =>{
    const {customer_name, address, phone, total_price, items} = req.body;
    try{
        const result = await pool.query("INSERT INTO orders(customer_name, address, phone, total_price) VALUES($1, $2, $3, $$", [customer_name, address, phone, total_price])
        const orderId = result.rows[0].id
        for (const item of items) {
              await pool.query(
                `INSERT INTO order_items (order_id, book_key, book_title, price, quantity)
                 VALUES ($1, $2, $3, $4, $5)`,
                [orderId, item.book_key, item.book_title, item.price, item.quantity]
              )
            }
        res.status(200).json({
            success: true,
            message: 'Pesanan Berhasil Dibuat',
            data: result.rows[0]
        })
    }catch(err){
        res.status(500).json({ message: 'Gagal membuat order', error: err.message })
    }
}
const getOrders = async (req, res) =>{
    try{
        const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC RETURNING *');
        const orders = await Promise.all(
        result.rows.map(async (order) => {
          const itemsResult = await pool.query(
            `SELECT * FROM order_items WHERE order_id = $1`,
            [order.id]
          )
          return { ...order, items: itemsResult.rows }
        })
      )
      res.status(200).json(orders)
    }catch(err){
        res.status(500).json({
            success: false, 
            message: 'Data Gagal Dimuat'
        })
    }
}

export default {createOrder, getOrders}