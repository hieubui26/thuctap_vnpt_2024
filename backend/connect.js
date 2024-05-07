const mysql = require("mysql");

// const con = mysql.createConnection({
//   host: "10.144.13.87",
//   user: "ipcc_voice",
//   password: "ipcc_voice@11x@2018@HCM123",
//   database: "thuctap",
// });
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "26070833857552",
  database: "signup",
});

con.connect(function (err) {
  if (err) {
    console.log("Error in connection");
  } else {
    console.log("Connected");
  }
});

module.exports = con;
