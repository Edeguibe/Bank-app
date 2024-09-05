import bcrypt from "bcrypt";
import { User, UserTC } from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const resolvers = {
  Mutation: {
    login: {
      type: UserTC.getType(),
      resolve: async (_, args) => {
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

    createToken: {
      type: "String",
      resolve: async (_, args) => {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(args.password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect password");
        }
        const token = generateToken(user);
        return { token, user };
      },
    },
  },
};

export default resolvers;
