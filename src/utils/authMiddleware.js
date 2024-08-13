import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
    console.log(`incoming request: ${req.method} ${req.path}`); 

    if (req.method === "POST" && req.body?.query?.includes("createUser")) {
        return next();
    }

    if (req.method === "POST" && req.body?.query?.includes("createToken")) {
        return next();
    }
    if (req.method === "GET" && req.path === "/graphql" ) {
        return next();
    }
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("no auth header");
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        console.log("no token");
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const secret = process.env.JWT_SECRET || "secret";
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        return next();
    } catch (error) {
        console.log("error verifying token", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default authMiddleware;
