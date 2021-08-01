import asyncHandler from 'express-async-handler'
import Portfolio from '../models/portfolioModel.js'

// @desc    Create a new portfolio for a user
// @route   POST /api/portfolio
// @access  Private
const createPortfolio = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  const portfolioExists = await Portfolio.findOne({ name })

  if (portfolioExists) {
    res.status(400)
    throw new Error('Portfolio with the same name already exists for this user')
  }

  const portfolio = await Portfolio.create({
    createdBy: req.user.id,
    name,
    description,
  })

  if (portfolio) {
    res.status(201).json({
      _id: portfolio._id,
      user: createdBy,
      name: portfolio.name,
      description: portfolio.description,
    })
  } else {
    res.status(400)
    throw new Error('Invalid portfolio data')
  }
})

// @desc    Get a single portfolio
// @route   GET /api/portfolio/id
// @access  Private
const getPortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id)

  if (portfolio) {
    res.status(200).json({
      _id: portfolio._id,
      name: portfolio.name,
      description: portfolio.description,
      stocks: portfolio.stocks,
    })
  } else {
    res.status(404)
    throw new Error('Portfolio not found')
  }
})

// @desc    Get all portfolios of a user
// @route   GET /api/portfolio
// @access  Public
const getAllPortfolio = asyncHandler(async (req, res) => {
    const portfolios = await Portfolio.find({})
  
    if (portfolios) {
      res.status(200).json({
        data: portfolios,
        message: 'All user portfolios fetched successfully'
      })
    } else {
      res.status(404)
      throw new Error('Portfolios not found')
    }
  })

// @desc    Update a single portfolio
// @route   PUT /api/portfolio/id/update
// @access  Private
const updatePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findOne({createdBy: req.user._id, _id: req.params.id})
  if (portfolio) {
    portfolio.name = req.body.name || portfolio.name
    portfolio.description = req.body.description || portfolio.description
    portfolio.stocks = req.body.stocks || portfolio.stocks

    const updatedPortfolio = await portfolio.save()
    res.json({
      _id: updatedPortfolio._id,
      name: updatedPortfolio.name,
      description: updatedPortfolio.description,
      stocks: updatedPortfolio.stocks,
    })
  } else {
    res.status(404)
    throw new Error('Portfolio not found')
  }
})

// @desc    Delete a single portfolio
// @route   PUT /api/portfolio/id/delete
// @access  Private
const deletePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findOne({createdBy: req.user._id, _id: req.params.id})
  if (portfolio) {
    await portfolio.remove();

    res.json({
      message: 'Portfolio removed'
    })
  } else {
    res.status(404)
    throw new Error('Portfolio not found')
  }
})

export {
  createPortfolio,
  getPortfolio,
  getAllPortfolio,
  updatePortfolio,
  deletePortfolio,
}
