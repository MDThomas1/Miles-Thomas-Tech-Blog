const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('homepage');
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

router.get('/postlist', withAuth, (req, res) => {
    res.render('posts');
});

router.get('/viewpost', withAuth, (req, res) => {
    res.render('viewpost');
});

router.get('/userposts', withAuth, (req, res) => {
    res.render('userposts')
});