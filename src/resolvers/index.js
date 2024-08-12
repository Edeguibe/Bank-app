import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models";
import { Account } from "../models"

const resolvers = {

  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (_, args) => {
      return await User.findOne({ _id: args.id });
    },
    accounts: async () => {
      return await Account.find();
    },
    account: async (_, args) => {
      return await Account.findOne({ _id: args.id });
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      const user = new User(args);
      await user.save();
      return user;
    },
    createAccount: async (_, args) => {
      const account = new Account(args);
      await account.save();
      return account;
    },

    updateUser: async (_, args) => {
      const user = await User.findOneAndUpdate({ _id: args.id }, args, {
        new: true,
      });
      return user;
    },
    updateAccount: async (_, args) => {
      const account = await Account.findOneAndUpdate({ _id: args.id }, args, {
        new: true,
      });
      return account;
    },

    deleteUser: async (_, args) => {
      const user = await User.findOneAndDelete({ _id: args.id });
      return user;
    },
    deleteAccount: async (_, args) => {
      const account = await Account.findOneAndDelete({ _id: args.id });
      return account;
    },

    login: async (_, args) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error("User not found");
      }
      const isMatch = await bcrypt.compare(args.password, user.password);
      if (!isMatch) {
        throw new Error("Incorrect password");
      }
      return user;
    },

    createToken: async (_, args) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error("User not found");
      }
      const isMatch = await bcrypt.compare(args.password, user.password);
      if (!isMatch) {
        throw new Error("Incorrect password");
      }
      return user;
    },
  },
};

export default resolvers;