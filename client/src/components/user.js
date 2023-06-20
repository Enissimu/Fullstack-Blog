import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../services/userservice";

export function User() {
  const [user, setUser] = useState(null);
  const params = useParams();
  useEffect(() => {
    getUser(params.userId).then((user) => setUser(user));
  }, [params]);
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>
        Blogs of
        {user.name}
      </h2>
      {user.blogs.map((blog) => (
        <p key={blog.id}>{blog.title}</p>
      ))}
    </div>
  );
}
