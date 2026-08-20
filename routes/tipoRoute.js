import {Router} from "express";
import { getTipos, createTipo, updateTipo } from "../controllers/tipoController.js";

const router = Router();

router.get("/", getTipos);
router.post("/", createTipo);
router.put("/:id", updateTipo);

export default router;