import User from "../../models/User.js";
import validator from "validator";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";
import verifyToken from "../../utils/verifyToken.js";

dotenv.config();
const salt = await bcrypt.genSalt(parseInt(process.env.SALT));

export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid email",
      });
    } else if (!validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }
    let exist = await User.findOne({ username });
    if (exist) {
      return res.json({
        success: false,
        message: "Username already exists",
      });
    } else {
      exist = await User.findOne({ email });
      if (exist) {
        return res.json({
          success: false,
          message: "Email already exists",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
          username: username,
          email: email,
          password: hashedPassword,
        });
        await user.save();
        generateToken(user, res);
        return res.json({
          success: true,
          message: "User registered successfully",
          user: user,
        });
      }
    }
  } catch (error) {
    console.log("Error while creating user", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid email",
      });
    } else if (!validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      generateToken(user, res);
      if (isMatch) {
        return res.json({
          success: true,
          message: "User logged in successfully",
          user: user,
        });
      } else {
        return res.json({
          success: false,
          message: "Invalid credentials",
        });
      }
    }
  } catch (error) {
    console.log("Error while logging in", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({
        success: false,
        message: "User ID is required",
      });
    } else {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.json({
          success: false,
          message: "User does not exist",
        });
      } else {
        res.clearCookie("token");
        return res.json({
          success: true,
          message: "User deleted successfully",
        });
      }
    }
  } catch (error) {
    console.log("Error while deleting user", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
}

export async function logoutUser(req, res) {
  try {
    res.clearCookie("token");
    return res.json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("Error while logging out", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
}

export async function checkAuth(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({
        success: false,
        message: "User not authenticated",
      });
    } else {
      let id = verifyToken(token)._id;
      const user = await User.findById(id);
      if (!user) {
        return res.json({
          success: false,
          message: "User not found",
        });
      } else {
        return res.json({
          success: true,
          message: "User authenticated successfully",
          user: user,
        });
      }
    }
  } catch (error) {
    console.log("Error while checking auth", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
}
