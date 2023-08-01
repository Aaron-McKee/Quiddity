import express from "express";
import {
  createQuid,
  deleteQuid,
  getQuid,
  getAllQuids
} from "../controllers/quid.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createQuid);
router.delete("/:id", verifyToken, deleteQuid);
router.get("/single/:id", getQuid);
router.get("/", getAllQuids);


export default router;