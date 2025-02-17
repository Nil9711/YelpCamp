const express = require('express')
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register')
};

module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp-Camp!')
            res.redirect('/campgrounds')
        })

    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login')
};

module.exports.logOut = (req, res) => {
    req.logout();
    req.flash('success', 'logged you out!')
    res.redirect('/campgrounds')
};

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect('/campgrounds')
};