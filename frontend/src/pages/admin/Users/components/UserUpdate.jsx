import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:6969/users/${id}`)
      .then((res) => {
        const userData = res.data;
        setUser(userData);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:6969/update/${id}`, user);
      navigate("/admin/users");
      alert("Update successful");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Edit User</h2>
      <form className="row g-3 w-50">
        <div className="col-12">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            autoComplete="off"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            autoComplete="off"
            name="password"
            value={user.password}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="col-12">
          <label className="form-label">Role</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Role"
            autoComplete="off"
            name="role"
            value={user.role}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserUpdate;
