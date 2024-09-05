import { UserTC } from "../models/User.js";
import { AccountTC } from "../models/Account.js";
import { SchemaComposer } from "graphql-compose";
import resolvers from "../resolvers/index.js";

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  userById: UserTC.getResolver("findById"),
  userMany: UserTC.getResolver("findMany"),
  accountById: AccountTC.getResolver("findById"),
  accountMany: AccountTC.getResolver("findMany"),
});

schemaComposer.Mutation.addFields({
  createUser: UserTC.getResolver("createOne"),
  createAccount: AccountTC.getResolver("createOne"),
  updateUser: UserTC.getResolver("updateById"),
  updateAccount: AccountTC.getResolver("updateById"),
  deleteUser: UserTC.getResolver("removeById"),
  deleteAccount: AccountTC.getResolver("removeById"),

  login: resolvers.Mutation.login,
  createToken: resolvers.Mutation.createToken,
});

const schema = schemaComposer.buildSchema();

export default schema;
