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
  res.render('posts/index.ejs')
})

// new
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


module.exports = posts
