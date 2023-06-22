const blogrouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../Utils/middleware')

blogrouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  response.json(blogs)
})

blogrouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')
  response.json(blog)
})

blogrouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  console.log(request.token, 'tokken3')

  if (!body.likes) {
    body['likes'] = 0
  }
  const NewBlog = new Blog({
    author: body.author,
    title: body.title,
    likes: body.likes,
    url: body.url,
    user: user,
    comments: {},
  })
  console.log(request.token, 'tokken2')

  const result = await NewBlog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  console.log(request.token, 'tokken1')

  response.status(201).json(result)
})

blogrouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blogId = request.params.id
    const blog = await Blog.findById(blogId)

    const user = request.user
    if (user.id !== blog.user.toString()) {
      return response.status(403).json({ error: 'You are forbidden.' })
    }
    await Blog.findByIdAndDelete(blogId)

    response.status(204).end()
  }
)
blogrouter.post(
  '/:id/comments',
  middleware.userExtractor,
  async (request, response) => {
    const blogId = request.params.id
    const blog = await Blog.findById(blogId)
    const newComments = blog.comm
    if (!newComments) {
      const comment = await Blog.findByIdAndUpdate(blogId, {
        comm: request.body.comm,
      })
      response.status(204).json(comment).end()
    } else {
      newComments.push(request.body.comm)
      console.log(newComments)
      const comment = await Blog.findByIdAndUpdate(blogId, {
        comm: newComments,
      })

      response.status(204).json(comment)
    }
  }
)

blogrouter.put('/:id', middleware.userExtractor, async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, {
    likes: request.body.likes + 1,
  })
  console.log(request.body.likes)
  response.status(204)
})

module.exports = blogrouter
