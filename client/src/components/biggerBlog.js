import { Link } from 'react-router-dom'
import {
  Table,
} from 'react-bootstrap'
import Toggelable from './toggle'
import BlogForm from '../Forms/blogForm'

function BiggerBlogForm(createBlog, refOfBlog, data) {
  const mockData = [...data].slice().sort((a, b) => a.likes < b.likes)
  return (
    <div>
      <Toggelable buttonLabel="new blog" ref={refOfBlog}>
        <BlogForm createBlog={createBlog} />
      </Toggelable>
      <div>
        <Table className="table table-striped table-hover">
          <tbody>
            {mockData
                            && mockData
                              .map((blog) => (
                                <tr key={blog.id}>
                                  <td>
                                    <Link className="BlogButton" to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                  </td>
                                </tr>
                              ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
export default BiggerBlogForm
