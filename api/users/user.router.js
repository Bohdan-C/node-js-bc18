const { Router } = require("express");
const userController = require("./user.controller");
const router = Router();

// GET contacts
router.get("/contacts", userController.getAllUsers);

//GET contact by Id
router.get(
  "/contacts/:id",
  userController.validateGetUserById,
  userController.getUserById
);


// CREATE contacts
router.post(
  "/contacts",
  userController.validateCreateUser,
  userController.createUser
);

// DELETE contacts
router.delete("/contacts/:id", userController.deleteUser);


// UPDATE contacts
router.patch(
  "/contacts/:id",
  userController.validateUpdateUser,
  userController.updateUser
);

module.exports = router;