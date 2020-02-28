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
  res.send('Hello Index')
})

// Show
posts.get('/:id', (req, res) => {
  res.send('Hello Show')
})

// Edit
posts.get('/:id/edit', (req, res) => {
  res.send('Hello edit')
})


/*************************************************
Functional Routes
*************************************************/


module.exports = posts
