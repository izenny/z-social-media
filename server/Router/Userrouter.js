const router = require("express").Router();
const userController = require("../Controllers/Usercontroller");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.verifyLogin);
router.put("/friendreq/:userId", userController.friendReqestsId);
router.get('/friends/:id',userController.getFriends)
router.get("/search/:searchText", userController.searchUsers);
router.post("/addfriend/:userId", userController.newFriend);
module.exports = router;
