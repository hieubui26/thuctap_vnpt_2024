import axios from "axios";
import React, { useState } from "react";

function UserCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const create = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:6969/admin/create", {
        name: name,
        email: email,
        password: password,
        role: role,
      })
      .then((response) => {
        console.log(response);
        if (response.data.message) {
          setRegisterStatus(response.data.message);
          // Điều hướng đến trang admin/users và reload trang
          window.location.href = "/admin/users";
        } else {
          alert("User created successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error occurred while creating user");
      });
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add User</h2>
      <form className="row g-3 w-50">
        <h1
          style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}
        >
          {registerStatus}
        </h1>
        <div className="col-12">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Role</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Role"
            autoComplete="off"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" onClick={create}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserCreate;
