import express from 'express'
const router = express.Router()
import {
  createPortfolio,
  getPortfolio,
  getAllPortfolio,
  updatePortfolio,
  deletePortfolio
} from '../controllers/portfolioController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/')
  .post(protect, createPortfolio)
  .get([protect], getAllPortfolio)

router
  .route('/:id')
  .get(getPortfolio)

router
  .route('/update/:id')
  .put(protect, updatePortfolio)

router
  .route('/delete/:id')
  .delete(protect, deletePortfolio)


export default router
