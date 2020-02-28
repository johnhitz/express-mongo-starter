const express = require('express');
// const Posts = require('../models/logs.js')
const posts = express.Router()

/*************************************************
Authentication Middleware
*************************************************/

/*************************************************
Presentation Routes
*************************************************/
posts.get('/', (req, res) => {
  res.send('Hello Index')
})

/*************************************************
Functional Routes
*************************************************/


module.exports = posts
