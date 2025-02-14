import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material"


const Header = ({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) => {
  const navigate = useNavigate();

/**
 * Handles the logout functionality by setting the authentication status to false and navigating to the home page.
 *
 * @param {Function} setIsAuthenticated - A function to update the authentication status.
 * @returns {void}
 */
const handleLogout = () => {
  setIsAuthenticated(false);
  navigate("/");
};

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Nextia
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Usuarios
          </Button>
          <Button color="inherit" component={Link} to="/posts">
            Posts
          </Button>
          <IconButton color="inherit" onClick={handleLogout} aria-label="Cerrar sesión">
            <Logout />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
