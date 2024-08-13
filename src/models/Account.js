import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

accountSchema.pre('save', function (next) {
  if (!this.accountNumber) {
    this.accountNumber = Math.floor(Math.random() * 1000000) + 1;
  }
  next();
});

const Account = mongoose.model('Account', accountSchema);
const AccountTC = composeWithMongoose(Account);

export { Account, AccountTC };
