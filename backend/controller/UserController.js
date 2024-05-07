const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModels");

// function authenticateUser(req, res, next) {
//   const token = req.headers["authorization"];
//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Access denied. No token provided." });
//   }

//   jwt.verify(token, "access-token-secret", (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Invalid token." });
//     }
//     req.user = decoded;
//     next();
//   });
// }

// function authorizeAdmin(req, res, next) {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     return res
//       .status(403)
//       .json({ message: "Access denied. Requires admin role." });
//   }
// }

function login(req, res) {
  userModel.getUserByEmail(req.body.email, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error." });
    }
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, response) => {
          if (err) {
            return res.status(500).json({ error: "Internal server error." });
          }
          if (response) {
            const user = result[0];
            const accessToken = jwt.sign(
              {
                userId: user.id,
                role: user.role,
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "1h",
              }
            );
            const refreshToken = jwt.sign(
              {
                userId: user.id,
              },
              process.env.REFRESH_TOKEN_SECRET
            );
            return res.json({
              Status: "Success",
              AccessToken: accessToken,
              RefreshToken: refreshToken,
              Role: user.role,
            });
          } else {
            return res.json({
              Status: "Error",
              Error: "Wrong Email or Password",
            });
          }
        }
      );
    } else {
      return res.json({
        Status: "Error",
        Error: "Wrong Email or Password",
      });
    }
  });
}

function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required." });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error in hashing password:", err);
      return res.status(500).json({ error: "Error in hashing password." });
    }
    userModel.createUser(name, email, hash, (err, result) => {
      if (err) {
        console.error("Error in creating user:", err);
        return res.status(500).json({ error: "Error in creating user." });
      }
      return res.status(201).json({ message: "User registered successfully." });
    });
  });
}

function getUsers(req, res) {
  userModel.getUsers((err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Error fetching users." });
    }
    return res.status(200).json(result);
  });
}

function createOneUser(req, res) {
  const { name, email, password, role } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error in hashing password:", err);
      return res.status(500).json({ error: "Error in hashing password." });
    }
    userModel.createOneUser(name, email, hash, role, (err, result) => {
      if (err) {
        console.error("Error in creating user:", err);
        return res.status(500).json({ error: "Error in creating user." });
      }
      return res.status(201).json({ message: "User created successfully." });
    });
  });
}

function getUser(req, res) {
  const userId = req.params.id;
  userModel.getUserById(userId, (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Error fetching user." });
    }
    return res.status(200).json(result);
  });
}

function updateUser(req, res) {
  const { id, name, email, password, role } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error in hashing password:", err);
      return res.status(500).json({ error: "Error in hashing password." });
    }
    userModel.updateUser(id, name, email, hash, role, (err, result) => {
      if (err) {
        console.error("Error in updating user:", err);
        return res.status(500).json({ error: "Error in updating user." });
      }
      return res.status(200).json({ message: "User updated successfully." });
    });
  });
}

function deleteUser(req, res) {
  const { id } = req.params;
  userModel.deleteUser(id, (err, result) => {
    if (err) {
      console.error("Error in deleting user:", err);
      return res.status(500).json({ error: "Error in deleting user." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json({ message: "User deleted successfully." });
  });
}

module.exports = {
  login,
  register,
  getUser,
  getUsers,
  createOneUser,
  updateUser,
  deleteUser,
};
