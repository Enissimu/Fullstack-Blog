import { useRef, useReducer } from "react";
import Blog from "./components/blog";
import "./App.css";

import { Routes, Route, Link } from "react-router-dom";
import {
  getAll,
  sendBlog,
  updateLikes,
  deletePost,
  sendComment,
} from "./services/blogservice";
import BlogForm from "./Forms/blogForm";
import LoginForm from "./Forms/loginForm";
import { login } from "./services/loginService";
import Toggelable from "./components/toggle";
import Notification, { changeNote } from "./components/notifications";
import notificatReducer from "./reducers/notificationReducer";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Users from "./components/users";
import { User } from "./components/user";
import { Spinner, Nav, Navbar, Table } from "react-bootstrap";

function App() {
  const bottomRef = useRef(null);
  const refOfBlog = useRef();
  const [state, dispatch] = useReducer(notificatReducer, null);
  const queryClient = useQueryClient();

  const { status, data, error } = useQuery("blogs", getAll, {
    refetchOnWindowFocus: false,
  }); // agagaga

  const mutationOfDeletion = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
    onError: (err) => {
      changeNote(err, dispatch);
    },
  });

  const mutationOfUpdate = useMutation(updateLikes, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
    onError: (err) => {
      changeNote(err, dispatch);
    },
  });

  const mutationOfComment = useMutation(sendComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
    onError: (err) => {
      changeNote(err, dispatch);
    },
  });

  const mutationOfCreation = useMutation(sendBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
      refOfBlog.current.changeVisible();
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    },
    onError: (err) => {
      changeNote(err, dispatch);
    },
  });

  if (status === "loading") {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (status === "error") {
    return (
      <span>
        Error:
        {error.message}
      </span>
    );
  }

  const createBlog = async (newBlog) => {
    mutationOfCreation.mutate(newBlog);
  };

  const isItSame = (blog) => {
    try {
      const userForNow = JSON.parse(
        window.localStorage.getItem("loggedUser")
      ).username;
      if (blog.user.username === userForNow) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const deleteThepost = async (id) => {
    if (window.confirm("aga silionmu")) {
      mutationOfDeletion.mutate(id);
    }
  };

  const newComment = async (comm, id) => {
    mutationOfComment.mutate({ comm, id });
  };

  const increaseLikes = async (newBlog, id) => {
    mutationOfUpdate.mutate({ newBlog, id });
  };
  function BiggerBlogForm() {
    return (
      <div>
        <Toggelable buttonLabel="new blog" ref={refOfBlog}>
          <BlogForm createBlog={createBlog} />
        </Toggelable>
        <div>
          <Table className="table table-striped table-hover">
            <tbody>
              {data &&
                data
                  .map((blog) => (
                    <tr key={blog.id}>
                      <td>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                      </td>
                    </tr>
                  ))
                  .slice()
                  .sort((a, b) => a.id > b.id)}
            </tbody>
          </Table>
        </div>
      </div>
    );
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
        <Route path="/" element={BiggerBlogForm()} />

        <Route path="/blogs">
          <Route
            path="/blogs:blogId"
            element={
              <Blog
                isItSame={isItSame}
                updateLikes={increaseLikes}
                deleteBlog={deleteThepost}
                newComment={newComment}
              />
            }
          />
        </Route>

        <Route path="users" element={<Users />}>
          <Route path="/users:userId" element={<User />} />
        </Route>
      </Routes>

      <div ref={bottomRef} />
    </div>
  );
}

export default App;
