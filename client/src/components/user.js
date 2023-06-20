import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../services/userservice";

export const User = () => {
  const [user, setUser] = useState(null);
  const params = useParams();
  useEffect(() => {
    getUser(params.userId).then((user) => setUser(user));
  }, [params]);
  if (!user) {
    return null;
  } else {
    return (
      <div>
        <h2>Blogs of {user.name}</h2>
        {user.blogs.map((blog) => (
          <p key={blog.id}>{blog.title}</p>
        ))}
      </div>
    );
  }
};
