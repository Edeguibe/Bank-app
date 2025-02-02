import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import { composeWithMongoose } from "graphql-compose-mongoose";

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cpfCnpj: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async (next) => {
  try {
    if (!this.isModified("password")) {
      next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

const UserTC = composeWithMongoose(User);

export { User, UserTC };
