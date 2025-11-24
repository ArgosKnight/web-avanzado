import express from "express";
import postController from "../controllers/posts-controller.js";

const router = express.Router();

router.get("/", postController.getAll);
router.get("/create", postController.createForm);
router.post("/create", postController.create);
router.get("/edit/:id", postController.editForm);
router.post("/edit/:id", postController.update);
router.get("/delete/:id", postController.remove);


export default router;
