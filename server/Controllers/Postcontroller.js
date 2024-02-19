const Post = require("../Modals/Postschema");
const User = require("../Modals/Userschema");

exports.createPost = async (req, res) => {
  console.log("working");
  try {
    // Create a new Post
    const { author, content } = req.body;
    const newPost = new Post({ author, content });

    // Store the image filename in the Images field
    if (req.file) {
      newPost.image = req.file.originalname;
    }

    // Save the newPost to the database
    const savedPost = await newPost.save();

    // Update the User's posts array with the new Post's ObjectId
    const user = await User.findById(author);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.posts.push(savedPost._id); // Add the new Post's ObjectId to the User's posts array
    await user.save();

    console.log("Posted");
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({ message: err.message });
  }
};

// exports.createPost =  async (req, res) => {

//     console.log('working')

//     try {
// Create a new Post
// const { author, content } = req.body;

// const newPost = new Post({ author, content });
// if(req.file){
// newPost.image.data = req.file.buffer;
// newPost.image.contentType= req.file.mimetype
//   newPost.Images=req.file.originalname
// }
// const savedPost = await newPost.save();
// res.status(201).json(savedPost);

// const user = await User.findById(author);
// if (!user) {
//   return res.status(404).json({ message: 'User not found' });
// }

// user.posts.push(savedPost._id);
//     await user.save();
//     console.log('posted');

//   } catch (err) {
//     res.status(400).json({ message: err.message });
//     console.log('err',err);
//   }
// };
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
  // let post;
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
// posts by userid
exports.getPostsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ author: userId })
      // .populate("author", "firstname lastname")
      // .lean();

    // Extract image data from posts
    const postsWithImageData = await Promise.all(
      posts.map(async (post) => {
        if (post.image && post.image.data) {
          // Convert Buffer to base64 string
          const imageData = Buffer.from(post.image.data).toString("base64");
          const imageSrc = `data:${post.image.contentType};base64,${imageData}`;
          return { ...post, imageSrc }; // Add imageSrc field to the post object
        }
        return post;
      })
    );

    res.json(postsWithImageData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
