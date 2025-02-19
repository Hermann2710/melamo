import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export default function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if(decoded instanceof String) {
            throw new Error("Invalid token provided" + decoded);
        }else {
            return decoded.user;
        }
    } catch (error) {
        console.log("Error while verifying token", error);
        throw new Error(error.message);
    }
}