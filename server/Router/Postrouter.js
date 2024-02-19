const express = require("express");
const router = express.Router();
const postsController = require("../Controllers/Postcontroller");
// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, '../client/public/Images')
//     },
//     filename: function(req, file, cb){
//         cb(null,file.originalname)
//     }
// });
// const upload = multer({storage:storage});
// Create a new post
// router.post('/:id',upload.single('image'), postsController.createPost)
router.post("/:id", postsController.createPost);

// GET /posts
// Get all posts
router.get("/", postsController.getAllPosts);

// GET /posts/:id
// Get a post by ID
router.get("/:id", postsController.getPostById);

// DELETE /posts/:id
// Delete a post by ID
router.delete("/:id", postsController.deletePost);
//like
router.put("/like/:postId", postsController.LikePost);
router.get("/users/:userId/posts", postsController.getPostsByUserId); //http://localhost:5001/post/users/65b192432e905295c467323a/posts
module.exports = router;
