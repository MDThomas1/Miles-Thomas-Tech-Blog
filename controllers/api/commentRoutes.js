const router = require('express').Router();
const sequelize = require('../../config/connection');
const Comment = require("../../models/Comment");

router.post('/upload', async (req, res) => {
    try {
        const newComment = await Comment.create({ 
            title: req.body.title,
            contents: req.body.contents, 
            posted_by: req.session.username,
            user_id: req.session.user_id
        });

        res.status(200).json(newComment); 

    } catch (err) {
        res.status(400).json(err);
    };
});

router.put('/update', async (req, res) => {
    try {
        const commentData = await Comment.update({
            title: req.body.title,
            contents: req.body.contents, 
        }, {
            where: {
                id: req.params.id
            },
        });

        if (!commentData[0]) {
            res.status(404).json('This comment could not be found!')
        };

        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err);
    };
});

router.delete('/delete/:id', async (req, res) => {
    try {
      const removeComment = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!removeComment) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      };
  
      res.status(200).json(removeComment);
    } catch (err) {
      res.status(500).json(err);
    };
});