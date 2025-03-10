import User from "../../models/User.js";
import validator from "validator";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";
import verifyToken from "../../utils/verifyToken.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

dotenv.config();
const salt = await bcrypt.genSalt(parseInt(process.env.SALT));

export async function fetchUsers(req, res) {
  try {
    const users = await User.find({});
    return res.json({
      success: true,
      users: users,
    });
  } catch (error) {
    console.log(`Error fetching users ${error}`);
    if (error instanceof Error) {
      res.json({
        success: false,
        message: error.message,
      });
    } else {
      res.json({
        success: false,
        message: error,
      });
    }
  }
}

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

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({
        success: false,
        message: "User's identifier required",
      });
    } else {
      const { username, firstname, lastname, email, role, avatar } = req.body;
      const user = await User.findById(id).populate([
        "followers",
        "followings",
      ]);
      if (!user) {
        return res.json({
          success: false,
          message: "User not found",
        });
      } else {
        if (email && !validator.isEmail(email)) {
          return res.json({
            success: false,
            message: "Email is not valid",
          });
        }
        user.username = username || user.username;
        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.firstname;
        user.email = email || user.firstname;
        user.role = role || user.firstname;
        user.avatar = avatar || user.firstname;
        await user.save();

        return res.json({
          success: true,
          message: "User updated successfully",
          user: user,
        });
      }
    }
  } catch (error) {
    console.log(`Error updating user ${error}`);
    if (error instanceof Error) {
      return res.json({
        success: false,
        message: error.message,
      });
    } else {
      return res.json({
        success: false,
        message: error,
      });
    }
  }
}

export async function deleteProfile(req, res) {
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
        const posts = await Post.find({ author: user._id });
        const comments = await Comment.find({ author: user._id });
        posts.forEach(async (post) => {
          await post.deleteOne();
        });
        comments.forEach(async (comment) => {
          await comment.deleteOne();
        });
        res.clearCookie("token");
        return res.json({
          success: true,
          message: "User deleted successfully",
          user: user,
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
        const posts = await Post.find({ author: user._id });
        const comments = await Comment.find({ author: user._id });
        posts.forEach(async (post) => {
          await post.deleteOne();
        });
        comments.forEach(async (comment) => {
          await comment.deleteOne();
        });
        return res.json({
          success: true,
          message: "User deleted successfully",
          user: user,
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

export async function updateProfileDetails(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({
        success: false,
        message: "A user ID is required",
      });
    } else {
      const user = await User.findById(id).populate([
        "followers",
        "followings",
      ]);

      if (!user) {
        return res.json({
          success: false,
          message: "User not found",
        });
      } else {
        const { username, firstname, lastname, email } = req.body;
        if (email && !validator.isEmail(email)) {
          return res.json({
            success: false,
            message: "The email must be valid",
          });
        } else {
          user.username = username || user.username;
          user.firstname = firstname || user.firstname;
          user.lastname = lastname || user.lastname;
          user.email = email || user.email;
          await user.save();

          return res.json({
            success: true,
            message: "Profile updated successfully",
            user: user,
          });
        }
      }
    }
  } catch (error) {
    console.log(`Error updating profile ${error}`);
    if (error instanceof Error) {
      return res.json({
        success: false,
        message: error.message,
      });
    } else {
      return res.json({
        success: false,
        message: error,
      });
    }
  }
}

export async function updateProfilePassword(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({
        success: false,
        message: "A user ID is required",
      });
    } else {
      const user = await User.findById(id).populate([
        "followers",
        "followings",
      ]);
      if (!user) {
        return res.json({
          success: false,
          message: "User not found",
        });
      } else {
        const { currentPassword, newPassword } = req.body;
        if (
          !validator.isStrongPassword(currentPassword) ||
          !validator.isStrongPassword(newPassword)
        ) {
          return res.json({
            success: false,
            message: "All password must be valid",
          });
        } else {
          const valid = await bcrypt.compare(currentPassword, user.password);
          if (!valid) {
            return res.json({
              success: false,
              message: "The current password don't match",
            });
          } else {
            user.password = await bcrypt.hash(newPassword, salt);
            await user.save();

            return res.json({
              success: true,
              message: "Password changed successfully",
              user: user,
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(`Error while updating profile password ${error}`);
    if (error instanceof Error) {
      return res.json({
        success: false,
        message: error.message,
      });
    } else {
      return res.json({
        success: false,
        message: error,
      });
    }
  }
}

export async function updateProfileAvatar(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({
        success: false,
        message: "A user ID is required",
      });
    } else {
      const user = await User.findById(id).populate([
        "followers",
        "followings",
      ]);
      if (!user) {
        return res.json({
          success: false,
          message: "User not found",
        });
      } else {
        const { avatar } = req.body;
        user.avatar = avatar ? avatar : "";
        await user.save();

        return res.json({
          success: true,
          message: "Profile image updated successfully",
          user: user,
        });
      }
    }
  } catch (error) {
    console.log(`Error while updating profile image ${error}`);
    if (error instanceof Error) {
      return res.json({
        success: false,
        message: error.message,
      });
    } else {
      return res.json({
        success: false,
        message: error,
      });
    }
  }
}

export async function followUser(req, res) {
  try {
    const { user_1, user_2 } = req.body;
    if (!user_1) {
      return res.json({
        success: false,
        message: "You must select a valid user",
      });
    } else {
      if (!user_2) {
        return res.json({
          success: false,
          message: "You must be authenticated",
        });
      } else {
        const user1 = await User.findById(user_1);
        const user2 = await User.findById(user_2);
        if (!user1) {
          return res.json({
            success: false,
            message: "The user that you want to follow doesn't exist",
          });
        } else {
          if (!user2) {
            return res.json({
              success: false,
              message: "You must be authenticated",
            });
          } else {
            user1.followers.push(user2._id);
            user2.followings.push(user1._id);
            await user1.save();
            await user2.save();

            return res.json({
              success: true,
              message: `You follow now ${user1.username}`,
              user: user1,
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(`Error in auth controller ${error.message}`);
    res.json({
      success: false,
      message: error.message,
    });
  }
}

export async function unFollowUser(req, res) {
  try {
    const { user_1, user_2 } = req.body;
    if (!user_1) {
      return res.json({
        success: false,
        message: "You must select a valid user",
      });
    } else {
      if (!user_2) {
        return res.json({
          success: false,
          message: "You must be authenticated",
        });
      } else {
        const user1 = await User.findById(user_1);
        const user2 = await User.findById(user_2);
        if (!user1) {
          return res.json({
            success: false,
            message: "The user that you want to follow doesn't exist",
          });
        } else {
          if (!user2) {
            return res.json({
              success: false,
              message: "You must be authenticated",
            });
          } else {
            const followers = user1.followers.filter(
              (val) => val.toString() !== user2._id.toString()
            );
            user1.followers = followers;
            await user1.save();

            const followings = user2.followings.filter((val) => val.toString() !== user1._id.toString());
            user2.followings = followings;
            await user2.save();

            return res.json({
              success: true,
              message: `You have unfollow ${user1.username}`,
              user: user1,
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(`Error in auth controller ${error.message}`);
    res.json({
      success: false,
      message: error.message,
    });
  }
}
