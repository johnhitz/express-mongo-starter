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
  const query = req.query
  Posts.find(query, (err, foundPosts) => {
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
  Posts.findById(req.params.id, (err, foundPost) => {
    res.render('posts/show.ejs', {
      post: foundPost
    })
  })
})


// Edit
posts.get('/:id/edit', (req, res) => {
  Posts.findById(req.params.id, (err, foundPost) => {
    res.render('posts/edit.ejs', {
      post: foundPost
    })
  })
})


/*************************************************
Functional Routes
*************************************************/
// Create
posts.post('/', (req, res) => {
  let tagsArr = []
  if(req.body.tech === 'on') {
    tagsArr.push('tech')
  }
  if(req.body.musings === 'on') {
    tagsArr.push('musings')
  }
  if(req.body.recipes === "on") {
    tagsArr.push('recipes')
  }
  req.body.tags = tagsArr
  Posts.create(req.body, (err, newPost) => {
    console.log(err);
    res.redirect('/posts')
  })
})

// Update
posts.put('/:id', (req, res) => {
  Posts.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, foundPost) => {
    res.redirect('/posts')
  })
})

posts.delete('/:id', (req, res) => {
  Posts.findByIdAndRemove(req.params.id, (err, foundPost) => {
    res.redirect('/posts')
  })
})

module.exports = posts
