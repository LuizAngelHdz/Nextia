import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import Header from "./Components/Header";
import Login from "./Pages/Login";
import UserList from "./Pages/Users/UserList";
import UserDetails from "./Components/UserDetails";
import PostList from "./Pages/Posts/PostList";
import PostComments from "./Pages/Posts/PostComents";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Router>
      <CssBaseline />
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={handleLogin} />} />
        </Routes>
      ) : (
        <>
          <Header setIsAuthenticated={handleLogout} />
            <Box sx={{ marginTop: 4, padding:'1vh 8vh' }}>
              <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/posts" element={<PostList />} />
                <Route path="/user/:userId" element={<UserDetails />} />
                <Route path="/post-comments/:postId" element={<PostComments />} />
              </Routes>
            </Box>
        </>
      )}
    </Router>
  );
};

export default App;
