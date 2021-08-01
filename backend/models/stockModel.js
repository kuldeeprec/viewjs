import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    relatedPortfolio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    targetPrice: {
      type: Number,
      required: true,
    },
    actionPrice: {
      type: Number,
      required: false,
    },
    stockAction: {
      type: String,
      required: false,
      enum: ['Buy', 'Sell', 'Hold', 'Watch']
    },
    duration: {
      type: String,
      required: false,
    },
    comments: [
      {
        writtenBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    stockData: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
