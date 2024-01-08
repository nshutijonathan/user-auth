import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Usershelpers from "../helpers/user.js";
import { checkUserName } from "../middlewares/usernameFilterMiddleware.js";
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;
  if (!(email || password)) {
    return res.status(401).send({
      status: 401,
      message: "INVALID email or password",
    });
  }
  const user = await User.findOne({ email });

  if (user && Usershelpers.comparePassword(user.password, password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).send({
      status: 401,
      message: "INVALID email or password",
    });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  let { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(409).json({
      status: 409,
      message: "User with that Email already exists",
    });
  }
  password = Usershelpers.hashPassword(password);
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      return res.status(201).json({
        status: 201,
        message: "User successfully created",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    }
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
export { authUser, registerUser, getUserProfile };
