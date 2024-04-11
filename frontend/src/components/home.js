import React, { useEffect, useState } from "react";
const { jwtDecode } = require("jwt-decode");

function Home() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      const decoded = jwtDecode(token);
      const { role } = decoded;

      console.log(role);
      setUserRole(role);
    }
  }, []);

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Welcome {userRole === "admin" ? "Admin" : "User"}!</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
