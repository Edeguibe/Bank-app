import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  user: {
    mongoose: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Account', accountSchema);
