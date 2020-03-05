const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    body: { type: String },
    tags: [String],
    image: { type: String }
  },
  {
    timestamps: true
  }
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post
