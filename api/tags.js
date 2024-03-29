const express = require('express');
const { client, getPostsByTagName } = require('../db');
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");

    next();
});

tagsRouter.get('/', async (res, next) => {
    try {
        const tags = await client.query(
            `SELECT * FROM tags`
        )

        res.send({
            tags
        });

    } catch (error) {
        next()
    }
});

tagsRouter.get('/:tagName/posts', async (res, next) => {
    try {
        const tags = await getPostsByTagName()

        return (
            tags,
            res.send({ posts: tags })
        )

    } catch ({ name, message }) {
        next({ name, message })
    }
});

module.exports = tagsRouter;