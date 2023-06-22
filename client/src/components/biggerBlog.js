import { Link } from 'react-router-dom'
import {
  Table,
} from 'react-bootstrap'
import Toggelable from './toggle'
import BlogForm from '../Forms/blogForm'

function BiggerBlogForm(createBlog, refOfBlog, data) {
  return (
    <div>
      <Toggelable buttonLabel="new blog" ref={refOfBlog}>
        <BlogForm createBlog={createBlog} />
      </Toggelable>
      <div>
        <Table className="table table-striped table-hover">
          <tbody>
            {data
                            && data
                              .map((blog) => (
                                <tr key={blog.id}>
                                  <td>
                                    <Link className="BlogButton" to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                  </td>
                                </tr>
                              ))
                              .slice()
                              .sort((a, b) => a.id > b.id)}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
export default BiggerBlogForm
