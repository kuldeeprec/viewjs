import asyncHandler from 'express-async-handler'
import Stock from '../models/stockModel.js'

// @desc    Add a new stock for a user in a portfolio selected
// @route   POST /api/stock
// @access  Private
const addStock = asyncHandler(async (req, res) => {
  const { name, description, relatedPortfolio, duration, currentPrice, targetPrice, stockAction, actionPrice } = req.body

  const stockExists = await Stock.findOne({ name, createdBy: req.user._id, relatedPortfolio })

  if (stockExists) {
    res.status(400)
    throw new Error('Stock with the same name already exists for this user')
  }

  const stock = await Stock.create({
    createdBy: req.user.id,
    relatedPortfolio,
    name,
    description,
    currentPrice,
    targetPrice,
    stockAction,
    actionPrice,
    duration
  })

  if (stock) {
    res.status(201).json({
      message: 'Stock added successfully',
      data: stock
    })
  } else {
    res.status(400)
    throw new Error('Invalid stock data')
  }
})

// @desc    Get a single stock
// @route   GET /api/stock/id
// @access  Private
const getStock = asyncHandler(async (req, res) => {
  const stock = await Stock.findById(req.params.id).populate([
    {
      path: 'comments.writtenBy',
      model: 'User',
      select: 'firstName lastName'
    },
    {
      path: 'relatedPortfolio'
    }
  ])

  if (stock) {
    res.status(200).json({
      message: 'Stock data fetched successfully',
      data: stock
    })
  } else {
    res.status(404)
    throw new Error('Stock not found')
  }
})

// @desc    Get all stocks of a user
// @route   GET /api/stock
// @access  Public
const getAllStock = asyncHandler(async (req, res) => {
    const stocks = await Stock.find({})
  
    if (stocks) {
      res.status(200).json({
        data: stocks,
        message: 'All user stocks fetched successfully'
      })
    } else {
      res.status(404)
      throw new Error('Stocks not found')
    }
  })

// @desc    Update a single stock
// @route   PUT /api/stock/id/update
// @access  Private
const updateStock = asyncHandler(async (req, res) => {
  const stock = await Stock.findOne({createdBy: req.user._id, _id: req.params.id})
  if (stock) {
    stock.name = req.body.name || stock.name
    stock.description = req.body.description || stock.description
    stock.currentPrice = req.body.currentPrice || stock.currentPrice
    stock.targetPrice = req.body.targetPrice || stock.targetPrice
    stock.duration = req.body.duration || stock.duration
    stock.relatedPortfolio = req.body.relatedPortfolio || stock.relatedPortfolio
    stock.actionPrice = req.body.actionPrice || stock.actionPrice
    stock.stockAction = req.body.stockAction || stock.stockAction

    const updatedStock = await stock.save()
    res.json({
      message: 'Stock data updated successfully',
      data: stock
    })
  } else {
    res.status(404)
    throw new Error('Stock not found')
  }
})

// @desc    Delete a single stock
// @route   DELETE /api/stock/id/delete
// @access  Private
const deleteStock = asyncHandler(async (req, res) => {
  const stock = await Stock.findOne({createdBy: req.user._id, _id: req.params.id})
  if (stock) {
    await stock.remove();

    res.json({
      message: 'Stock removed'
    })
  } else {
    res.status(404)
    throw new Error('Stock not found')
  }
})

// @desc    Add comment to a single stock
// @route   POST /api/stock/id/comment
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const stock = await Stock.findOneAndUpdate({createdBy: req.user._id, _id: req.params.id}, { $push: { comments: {
    writtenBy: req.user._id,
    text: req.body.text
  } } }, {
    new: true,
  })
  .populate([
    {
      path: 'comments.writtenBy',
      model: 'User',
      select: 'firstName lastName'
    },
    {
      path: 'relatedPortfolio'
    }
  ])
  if (stock) {
    res.json({
      message: 'Comment added to stock',
      data: stock
    })
  } else {
    res.status(404)
    throw new Error('Stock not found')
  }
})

// @desc    Delete comment added to a stock
// @route   POST /api/stock/id/comment/:commentId
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const stock = await Stock.findOneAndUpdate({createdBy: req.user._id, _id: req.params.id}, 
    { $pull: { comments: { _id: req.params.commentId } } }, {
      new: true,
    })
  .populate([
    {
      path: 'comments.writtenBy',
      model: 'User',
      select: 'firstName lastName'
    },
    {
      path: 'relatedPortfolio'
    }
  ])
  if (stock) {
    res.json({
      message: 'Comment deleted',
      data: stock
    })
  } else {
    res.status(404)
    throw new Error('Stock not found')
  }
})

// @desc    Update a comment previously added to a stock
// @route   PUT /api/stock/id/comment/edit/:commentId
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  const stock = await Stock.findOneAndUpdate({createdBy: req.user._id, _id: req.params.id, "comments._id": req.params.commentId}, {
    "$set": { "comments.$.text": req.body.commentText }
  }, {
    new: true
  })
  .populate([
    {
      path: 'comments.writtenBy',
      model: 'User',
      select: 'firstName lastName'
    },
    {
      path: 'relatedPortfolio'
    }
  ])
  if (stock) {
    res.json({
      message: 'Comment updated',
      data: stock
    })
  } else {
    res.status(404)
    throw new Error('Stock not found')
  }
})

export {
  addStock,
  getStock,
  getAllStock,
  updateStock,
  deleteStock,
  addComment,
  deleteComment,
  updateComment
}
