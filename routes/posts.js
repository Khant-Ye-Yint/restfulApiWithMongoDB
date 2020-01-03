const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//Get back all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (e) {
    res.json({ message: e });
  }
});

//Submits post
router.post('/', jsonParser, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (e) {
    res.json({ message: e });
  }
});
//This is the same
// .then(data => {
//   res.json(data);
// })
// .catch(err => {
//   res.json({ message: err });
// });

//Specific Post
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (e) {
    res.json({ message: e });
  }
});

//Delete Post
router.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (e) {
    res.json({ message: e });
  }
});

//Update Post
router.patch('/:postId', jsonParser, async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
