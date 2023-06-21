import { useQuery } from 'react-query'
import { Link, Outlet } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { getUsers } from '../services/userservice'

function Users() {
  const { status, data, error } = useQuery('users', getUsers, {
    refetchOnWindowFocus: false,
  })

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return (
      <span>
        Error:
        {error.message}
      </span>
    )
  }
  return (
    <div>
      <Table className="table table-striped table-hover">
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Outlet />
    </div>
  )
}

export default Users
