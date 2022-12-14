const router = require('express').Router();
const User = require('../../models/User');

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.loggedIn = true
            req.session.username = userData.username

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'The login entered does not match a user in our database. Please try again or sign up to create a new account!' });
            return;
        }

        const userPassword = await userData.checkPassword(req.body.password);

        if (!userPassword) {
            res
                .status(400)
                .json({ message: 'The login entered does not match a user in our database. Please try again or sign up to create a new account!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.loggedIn = true
            req.session.username = userData.username

            res.status(200).json({ message: 'Welcome to Tech Blog' });
        });
    } catch (err) {
        res.status(500).json(err);
    };

});

router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    };
});

module.exports = router