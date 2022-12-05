const router = require('express').Router();
const withAuth = require('../utils/auth');
const Post = require('../models/Post')

router.get('/', (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
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

router.get('/postlist', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
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

router.get('/viewpost', withAuth, (req, res) => {
    res.render('viewpost');
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