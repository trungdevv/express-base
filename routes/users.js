import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/index.js";
const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/login", userController.login);
router.post("/register", userController.register);
// if not =>create
router.patch("/", (req, res) => {
  res.send("Update or create user");
});

// update
router.put("/", (req, res) => {
  res.send("Update user");
});

// fake data user
router.post("/generated", userController.generated);

router.delete("/delete/:id", userController.deleteUser);
export default router;
