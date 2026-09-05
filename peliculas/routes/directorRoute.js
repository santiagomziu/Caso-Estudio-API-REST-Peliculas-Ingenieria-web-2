import {Router} from "express";
import { getDirectores, createDirector, updateDirector} from "../controllers/directorController.js";


const router = Router();

router.get("/", getDirectores);
router.post("/", createDirector);
router.put("/:id", updateDirector);

export default router;