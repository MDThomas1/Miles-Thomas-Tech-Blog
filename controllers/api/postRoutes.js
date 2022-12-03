const router = require('express').Router();
const sequelize = require('../../config/connection');
const Post = require("../../models/Post");

router.post('/upload', async (req, res) => {
    try {
        const newPost = await Post.create({ 
            message: req.body.message, 
            posted_by: req.session.username,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });

        res.status(200).json(newPost); 

    } catch (err) {
        res.status(400).json(err);
    };
});

router.put('/update/:id', async (req, res) => {
    try {
        const postData = await Post.update({
            message: req.body.message 
        }, {
            where: {
                id: req.params.id
            },
        });

        if (!postData[0]) {
            res.status(404).json('This post could not be found!')
        };

        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    };
});

router.delete('/delete/:id', async (req, res) => {
    try {
      const removePost = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!removePost) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      };
  
      res.status(200).json(removePost);
    } catch (err) {
      res.status(500).json(err);
    };
});
  