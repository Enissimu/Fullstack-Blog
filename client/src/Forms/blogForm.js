import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function BlogForm({ createBlog }) {
  const [newBlog, SetnewBlog] = useState({
    title: "",
    url: "",
    author: "",
  });

  const handleNewBlog = async (event) => {
    event.preventDefault();
    await createBlog(newBlog);
    event.target.reset();
  };

  const handleChange = (event) => {
    SetnewBlog({
      ...newBlog,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            className="input-title"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            name="author"
            className="input-author"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Link</Form.Label>
          <Form.Control
            name="url"
            className="input-url"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="success" type="submit" className="createBlog">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default BlogForm;
