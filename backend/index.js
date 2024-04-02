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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hash", (req, res) => {
  bcrypt.hash("12345678", 10, (err, hash) => {
    if (err) return res.json({ Error: "Error is hashing password" });
    const values = [hash];
    return res.json({ result: hash });
  });
});

app.post("/login", (req, res) => {
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(req.body.email)) {
  //   return res.json({ Error: "Invalid email format" });
  // }
  const sql = "SELECT * FROM hieuuser Where email=?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in running query" });
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "password error" });
          if (response) {
            const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            return res.json({ Status: "Success", Token: token });
          } else {
            return res.json({
              Status: "Error",
              Error: "Wrong Email or Password",
            });
          }
        }
      );
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});

app.post("/register", (req, res) => {
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(req.body.email)) {
  //   return res.json({ Error: "Invalid email format" });
  // }
  const sql = "INSERT INTO hieuuser (`name`,`email`,`password`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: "Error in hashing password" });
    const values = [req.body.name, req.body.email, hash];
    // console.log(values.toString());
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Error query" });
      return res.json({ Status: "Success" });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
