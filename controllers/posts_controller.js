const express = require('express');
const Posts = require('../models/posts.js')
const posts = express.Router()

/*************************************************
Authentication Middleware
*************************************************/

/*************************************************
Presentation Routes
*************************************************/
// Index
posts.get('/', (req, res) => {
  Posts.find({}, (err, foundPosts) => {
    console.log(foundPosts);
    res.render('posts/index.ejs', {
      posts: foundPosts
    })
  })
})

// New
posts.get('/new', (req, res) => {
  res.render('posts/new.ejs')
})

// Show
posts.get('/:id', (req, res) => {
  res.render('posts/show.ejs')
})

// Edit
posts.get('/:id/edit', (req, res) => {
  res.render('posts/edit.ejs')
})


/*************************************************
Functional Routes
*************************************************/
// Create
posts.post('/', (req, res) => {
  console.log(`req.body is: `, req.body);
  Posts.create(req.body, (err, newPost) => {
    res.redirect('/posts')
  })
})

module.exports = posts
