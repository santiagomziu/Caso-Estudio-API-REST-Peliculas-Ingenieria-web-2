import { Router } from "express";
import { getMedias, createMedia, updateMedia, deleteMedia } from "../controllers/mediaController.js";

const router = Router();

router.get("/", getMedias);
router.post("/", createMedia);
router.put("/:id", updateMedia);
router.delete("/:id", deleteMedia);

export default router;
