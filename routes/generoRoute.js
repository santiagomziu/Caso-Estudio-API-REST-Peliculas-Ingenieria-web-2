import {Router} from "express";
import {getGeneros, createGenero, updateGenero} from "../controllers/generoController.js";

const router= Router();

router.get("/", getGeneros);
router.post("/", createGenero);
router.put("/:id", updateGenero);

export default router;
