const Post = require("../Modals/Postschema");
const User = require("../Modals/Userschema");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/postimages/");
  },
  filename: function (req, file, cb) {
    // Save the filename to a variable for later use
    const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    // Pass the filename to the callback
    cb(null, filename);
  },
});
const upload = multer({
  storage: storage,
}).single("image");
exports.createPost = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to upload image" });
      }
      const { author, content } = req.body;
      let imageFilename = null;
      if (req.file) {
        imageFilename = req.file.filename;
      }
      const newPost = new Post({ author, content, image: imageFilename });
      const savedPost = await newPost.save();
      const user = await User.findById(author);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.posts.push(savedPost._id);
      await user.save();

      console.log("Posted");
      res.status(201).json(savedPost);
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({ message: err.message });
  }
};




//like fuction
exports.LikePost = async (req, res) => {
  try {
    const userId = req.query.userId;

    const postId = req.params.postId;
    console.log("user iddddddd", userId);
    console.log("post iddddddd", postId);
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
      console.log("like added");
    } else {
      const index = post.likes.indexOf(userId);
      post.likes.splice(index, 1);
      await post.save();
      console.log("like removed");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("err likes");
  }
};

//get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//get post by id
exports.getPostById = async (req, res) => {
  
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//delete

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.json({ message: " post deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPostsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ author: userId })
      .populate("author", "firstname lastname profilePic ")
      .lean();

    res.json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
