import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Exercise1, Exercise2, Exercise3 } from "../Components";
import { Home } from "../Pages/Home";

export const Router = () => {
  const basePath = "/exercise";
  const components = [<Exercise1 />, <Exercise2 />, <Exercise3 />];
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {components.map((component, index) => (
          <Route
            path={`${basePath}-${index + 1}`}
            element={component}
            key={`-${index + 1}`}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
