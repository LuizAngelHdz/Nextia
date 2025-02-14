import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const Layout = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
    <>
      <Header setIsAuthenticated={handleLogout} />
      <div style={{ marginTop: 20 }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
