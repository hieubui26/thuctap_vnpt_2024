import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/admin/Login/login.jsx";
import Signup from "./pages/admin/Login/signup.jsx";
import Dashboard from "./components/dashboard";
import Home from "./components/home";
import { RequireToken } from "./components/Auth.jsx";
import User from "./pages/admin/Users/index.jsx";
import AddUser from "./pages/admin/Users/components/UserCreate.jsx";
import UpdateUser from "./pages/admin/Users/components/UserUpdate.jsx";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <RequireToken>
                <Dashboard />
              </RequireToken>
            }
          >
            <Route path="" element={<Home />}></Route>
            <Route path="/admin/users" element={<User />}></Route>
            <Route path="/admin/create" element={<AddUser />}></Route>
            <Route path="/update/:id" element={<UpdateUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
