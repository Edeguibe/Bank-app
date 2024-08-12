import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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

accountSchema.pre('save', async (next) => {
  this.accountNumber = Math.floor(Math.random() * 1000000) + 1;
});

export default mongoose.model('Account', accountSchema);
