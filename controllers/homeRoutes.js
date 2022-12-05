const router = require('express').Router();
const withAuth = require('../utils/auth');
const Post = require('../models/Post')
const Comment = require('../models/Comment')

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [
                ['id', 'DESC']
            ]
        })

        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('homepage', {
            posts,
            loggenIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }
});


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/createpost', withAuth, (req, res) => {
    res.render('createpost');
});

router.get('/viewpost/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id)

        const post = postData.get({ plain: true })

        const commentData = await Comment.findAll({
            where: {
                post_id: post.id
            },
            order: [
                ['id', 'DESC']
            ]
        })

        const comments = commentData.map((comment) => comment.get({ plain: true }))

        res.render('viewpost', {
            post,
            comments,
            userID: req.session.user_id,
            username: req.session.username
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/userposts', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            order: [
                ['id', 'DESC']
            ]
        })

        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('posts', {posts})
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router