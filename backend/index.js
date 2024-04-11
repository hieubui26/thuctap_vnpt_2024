const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  host: "10.144.13.87",
  user: "ipcc_voice",
  password: "ipcc_voice@11x@2018@HCM123",
  database: "thuctap",
});
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "26070833857552",
//   database: "signup",
// });

con.connect(function (err) {
  if (err) {
    console.log("Error is connection");
  } else {
    console.log("Connected");
  }
});

function authenticateUser(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, "access-token-secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
    req.user = decoded;
    next();
  });
}

function authorizeAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access denied. Requires admin role." });
  }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/admin/dashboard", authenticateUser, authorizeAdmin, (req, res) => {
  res.json({ message: "Welcome to admin dashboard." });
});

app.get("/user/profile", authenticateUser, (req, res) => {
  res.json({ message: "Welcome to user profile." });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM hieuuser WHERE email=?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err)
      return res.json({
        Status: "Error",
        Error: "Error in running query",
      });
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Password error" });
          if (response) {
            const user = result[0];
            const accessToken = jwt.sign(
              {
                userId: user.id,
                role: user.role,
              },
              "access-token-secret",
              {
                expiresIn: "1h",
              }
            );
            const refreshToken = jwt.sign(
              {
                userId: user.id,
              },
              "refresh-token-secret"
            );
            // console.log("Access Token:", accessToken);
            // console.log("Refresh Token:", refreshToken);

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
});

app.post("/register", (req, res) => {
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
    const sql =
      "INSERT INTO hieuuser (`name`, `email`, `password`, `role`) VALUES (?, ?, ?, ?)";
    const values = [name, email, hash, "user"];

    con.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error in query:", err);
        return res.status(500).json({ error: "Error in database query." });
      }
      return res.status(201).json({ message: "User registered successfully." });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
