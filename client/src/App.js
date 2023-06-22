import { useRef, useReducer } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  Spinner, Nav, Navbar,
} from 'react-bootstrap'
import Blog from './components/blog'
import './App.css'

import {
  getAll,
  sendBlog,
  updateLikes,
  deletePost,
  sendComment,
} from './services/blogservice'
import LoginForm from './Forms/loginForm'
import login from './services/loginService'
import Notification, { changeNote } from './components/notifications'
import notificatReducer from './reducers/notificationReducer'
import Users from './components/users'
import User from './components/user'
import BiggerBlogForm from './components/biggerBlog'

function App() {
  const bottomRef = useRef(null)
  const refOfBlog = useRef()
  const [state, dispatch] = useReducer(notificatReducer, null)
  const queryClient = useQueryClient()

  const { status, data, error } = useQuery('blogs', getAll, {
    refetchOnWindowFocus: false,
  })

  const mutationOfDeletion = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: (err) => {
      changeNote(err, dispatch)
    },
  })

  const mutationOfUpdate = useMutation(updateLikes, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: (err) => {
      changeNote(err, dispatch)
    },
  })

  const mutationOfComment = useMutation(sendComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: (err) => {
      changeNote(err, dispatch)
    },
  })

  const mutationOfCreation = useMutation(sendBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      refOfBlog.current.changeVisible()
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    },
    onError: (err) => {
      changeNote(err, dispatch)
    },
  })

  if (status === 'loading') {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  if (status === 'error') {
    return (
      <span>
        Error:
        {error.message}
      </span>
    )
  }

  const createBlog = async (newBlog) => {
    mutationOfCreation.mutate(newBlog)
  }

  const isItSame = (blog) => {
    try {
      const userForNow = JSON.parse(
        window.localStorage.getItem('loggedUser'),
      ).username
      if (blog.user.username === userForNow) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  const deleteThepost = async (id) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Do you wanna delete?')) {
      mutationOfDeletion.mutate(id)
    }
  }

  const newComment = async (comm, id) => {
    mutationOfComment.mutate({ comm, id })
  }

  const increaseLikes = async (newBlog, id) => {
    mutationOfUpdate.mutate({ newBlog, id })
  }

  return (
    <div>
      <h1>BLOGS</h1>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
        <Nav>
          <Nav.Link href="#" as="span">
            <Link to="/">HOME</Link>
          </Nav.Link>

          <Nav.Link href="#" as="span">
            <Link to="/users">USERS</Link>
          </Nav.Link>
        </Nav>
      </Navbar>
      <LoginForm login={login} dispatchNotify={dispatch} />
      <Notification message={state} />

      <Routes>
        <Route path="/" element={BiggerBlogForm(createBlog, refOfBlog, data)} />

        <Route path="/blogs">
          <Route
            path="/blogs:blogId"
            element={(
              <Blog
                isItSame={isItSame}
                updateLikes={increaseLikes}
                deleteBlog={deleteThepost}
                newComment={newComment}
              />
            )}
          />
        </Route>

        <Route path="users" element={<Users />}>
          <Route path="/users:userId" element={<User />} />
        </Route>
      </Routes>

      <div ref={bottomRef} />
    </div>
  )
}

export default App
