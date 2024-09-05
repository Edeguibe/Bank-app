import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || "secret";

  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  return token;
};

export default generateToken;
