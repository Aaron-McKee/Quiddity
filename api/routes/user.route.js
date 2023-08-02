import express from "express";
import {deleteUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser)        // "/:id" = parameter  deleteUser = function
router.get("/:id", verifyToken, getUser)


export default router;
