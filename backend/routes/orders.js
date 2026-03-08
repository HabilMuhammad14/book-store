import express from 'express';
import ordersController from '../controllers/ordersController';
const router = express.Router()

router.post('/', ordersController.createOrder);
router.get('/', ordersController.getOrders);

export default router;