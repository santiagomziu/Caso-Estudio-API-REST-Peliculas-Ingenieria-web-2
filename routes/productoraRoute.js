import {Router} from "express";
import { getProductoras, createProductora, updateProductora } from "../controllers/productorController.js";

const router = Router();

router.get("/", getProductoras);
router.post("/", createProductora);
router.put("/:id", updateProductora);

export default router;