import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOne } from "../services/blogservice";
import { Button } from "react-bootstrap";
const Blog = ({ updateLikes, deleteBlog, isItSame, newComment }) => {
  const [blog, setBlog] = useState(null);
  const params = useParams();
  useEffect(() => {
    getOne(params.blogId).then((blog) => setBlog(blog));
  }, [params]);

  if (!blog) {
    return null;
  }

  const postComment = async (event) => {
    event.preventDefault();
    const comm = event.target.comm.value;
    event.target.comm.value = "";
    await newComment(comm, blog.id);
  };

  const updateShow = async () => {
    const updatedBlog = {
      user: blog.user.id,
      url: blog.url,
      author: blog.author,
      likes: blog.likes,
    };
    await updateLikes(updatedBlog, blog.id);
  };
  const deleteShow = async () => {
    await deleteBlog(blog.id);
  };

  return (
    <li className="Blog">
      <div>
        {blog.title} {blog.author}
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <div id="likeNumber">likes {blog.likes}</div>
        <Button onClick={updateShow} className="LikeButton">
          Like
        </Button>
        <br></br>
        {isItSame(blog) ? (
          <Button
            className="DeleteButton"
            variant="danger"
            onClick={deleteShow}
          >
            delete
          </Button>
        ) : (
          <></>
        )}
        <div>
          <ul>
            {blog.comm.map((commw, index) => (
              <li key={index}>
                <p>{commw}</p>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={postComment}>
          <input name="comm" />
          <Button variant="success" type="submit">
            send
          </Button>
        </form>
      </div>
    </li>
  );
};
export default Blog;