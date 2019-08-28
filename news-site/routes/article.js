const express = require('express');
const router = express.Router();

const NewsEditor = require('../model/newsEditor');
const newsEditor = new NewsEditor();

const { isLoggedIn, isNotLoggedIn, loginConfig } = require('./middlewares');

router.get('/:id', loginConfig, async (req, res, next) => {
    const article = await newsEditor.getArticleById(req.params.id);
    res.render('article', { user: req.user, article });
});

module.exports = router;
