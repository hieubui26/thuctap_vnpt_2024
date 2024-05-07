import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function User() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:6969/admin/users")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:6969/admin/delete/${id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Success");
          window.location.reload(true);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Users List</h3>
      </div>
      <Link to="/admin/create" className="btn btn-success">
        Add User
      </Link>
      <div className="mt-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link
                      to={`/update/${user.id}`}
                      className="btn btn-primary btn-sm me-2"
                    >
                      edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-sm btn-danger"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
