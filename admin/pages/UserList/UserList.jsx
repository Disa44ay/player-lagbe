import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './UserList.css'

const UserList = ({ url }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${url}/api/user/list`);
        if (response.data.success) {
          setUsers(response.data.users);
        } else {
          toast.error(response.data.message || "Failed to fetch users");
        }
      } catch (error) {
        toast.error("Error fetching user list");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [url]);

  // Remove user by ID
  const handleRemoveUser = async (userId) => {
    try {
      const response = await axios.post(`${url}/api/user/remove`, { userId });
      if (response.data.success) {
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User removed successfully");
      } else {
        toast.error(response.data.message || "Failed to remove user");
      }
    } catch (error) {
      toast.error("Error removing user");
    }
  };

  // Display a loading indicator while fetching
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password (Hashed)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="name">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button
                  onClick={() => handleRemoveUser(user._id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
