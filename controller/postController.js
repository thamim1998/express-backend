const Post = require("../model/Post");

const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(404).send(err);
  }
};

const findPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).send(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("successfully updated");
    } else {
      res.status(400).json("You can update only your post");
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const deletePost = (req, res) => {
 //not needed
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("successfully liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(400).json("Disliked");
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const getAllPost = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  createPost,
  findPost,
  updatePost,
  deletePost,
  getAllPost,
  likePost,
};
