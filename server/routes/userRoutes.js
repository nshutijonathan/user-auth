import express from "express";
const router = express.Router();

import { authUser, registerUser } from "../controllers/userController.js";
import { checkUserName } from "../middlewares/usernameFilterMiddleware.js";

router.route("/").post(checkUserName, registerUser);
router.post("/login", authUser);

export default router;
