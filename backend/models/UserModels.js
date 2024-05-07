// userModel.js

const con = require("../connect");

function getUserByEmail(email, callback) {
  const sql = "SELECT * FROM hieuuser WHERE email=?";
  con.query(sql, [email], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
}

function createUser(name, email, password, callback) {
  const sql =
    "INSERT INTO hieuuser (`name`, `email`, `password`, `role`) VALUES (?, ?, ?, ?)";
  const values = [name, email, password, "user"];

  con.query(sql, values, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
}

function getUsers(callback) {
  const sql = "SELECT * FROM hieuuser";
  con.query(sql, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
}

function createOneUser(name, email, password, role, callback) {
  const sql =
    "INSERT INTO hieuuser (`name`, `email`, `password`, `role`) VALUES (?, ?, ?, ?)";
  const values = [name, email, password, role];

  con.query(sql, values, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
}

function getUserById(id, callback) {
  const sql = "SELECT * FROM hieuuser WHERE id=?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result[0]);
  });
}

function updateUser(id, name, email, password, role, callback) {
  const sql =
    "UPDATE hieuuser SET `name` = ?, `email` = ?, `password` = ?, `role` = ? WHERE `id` = ?";
  const values = [name, email, password, role, id];

  con.query(sql, values, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
}

function deleteUser(id, callback) {
  const sql = "DELETE FROM hieuuser WHERE `id` = ?";
  const values = [id];

  con.query(sql, values, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  getUsers,
  createOneUser,
  updateUser,
  deleteUser,
};
