const express = require("express");
const userController = require("../controller/UserController");

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/admin/users", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.post("/admin/create", userController.createOneUser);
router.put("/update/:id", userController.updateUser);
router.delete("/admin/delete/:id", userController.deleteUser);

module.exports = router;
