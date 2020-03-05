const express = require('express');
const Posts = require('../models/posts.js')
const posts = express.Router()
const _ = require('lodash')

/*************************************************
Authentication Middleware
*************************************************/
const isAuth = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

/*************************************************
Presentation Routes
*************************************************/
// Index
posts.get('/', (req, res) => {
  const query = req.query
  let search = "{"
  if (Object.keys(query).length > 1) {
    const fields = Object.entries(query)
    fields.forEach(field => {
      const key = field[0]
      const value = field[1]
      // const segment = `{ "${key}": { "$regex": "/${value}/", "$options": "i" }}`
      search += `"${key}": { "$regex": "${value}", "$options": "i"},`

    })



    search = search.slice(0, -1)
    search += "}"

    search = JSON.parse(search)
  Posts.find(search, (err, foundPosts) => {
      console.log("Errors are: ", err);
      res.render('posts/index.ejs', {
        posts: foundPosts,
        currentUser: req.session.currentUser
      })
    })
  } else {
    Posts.find(query, (err, foundPosts) => {
      res.render('posts/index.ejs', {
        posts: foundPosts,
        currentUser: req.session.currentUser
      })
    })
  }


  // if(query === { tags: 'tech' } || { tags: 'musings' } || {  tags: recipes } || {}) {
  //   Posts.find(query, (err, foundPosts) => {
  //     res.render('posts/index.ejs', {
  //       posts: foundPosts,
  //       currentUser: req.session.currentUser
  //     })
  //   })
  // } else {
  //   log(query)
  // }
})

// New
posts.get('/new', isAuth, (req, res) => {
  res.render('posts/new.ejs', {
    currentUser: req.session.currentUser
  })
})

// Show
posts.get('/:id', isAuth, (req, res) => {
  Posts.findById(req.params.id, (err, foundPost) => {
    res.render('posts/show.ejs', {
      post: foundPost,
      currentUser: req.session.currentUser
    })
  })
})


// Edit
posts.get('/:id/edit', isAuth, (req, res) => {
  Posts.findById(req.params.id, (err, foundPost) => {
    res.render('posts/edit.ejs', {
      post: foundPost,
      currentUser: req.session.currentUser
    })
  })
})


/*************************************************
Functional Routes
*************************************************/
// Create
posts.post('/', isAuth, (req, res) => {
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
posts.put('/:id', isAuth, (req, res) => {
  Posts.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, foundPost) => {
    res.redirect('/posts')
  })
})

posts.delete('/:id', isAuth, (req, res) => {
  Posts.findByIdAndRemove(req.params.id, (err, foundPost) => {
    res.redirect('/posts')
  })
})

module.exports = posts
