import express from 'express'
const router = express.Router()
import {
  addStock,
  getStock,
  getAllStock,
  updateStock,
  deleteStock
} from '../controllers/stockController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/')
  .post(protect, addStock)
  .get([protect], getAllStock)

router
  .route('/:id')
  .get(getStock)

router
  .route('/update/:id')
  .put(protect, updateStock)

router
  .route('/delete/:id')
  .delete(protect, deleteStock)


export default router
