import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";


// Mock de react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()), // Mock para useNavigate
  };
});

describe("Login Component", () => {
  const mockSetIsAuthenticated = vi.fn();

  test("renders login form", () => {
    render(
      <BrowserRouter>
        <Login setIsAuthenticated={mockSetIsAuthenticated} />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  });

  test("shows error message for invalid credentials", () => {
    render(
      <BrowserRouter>
        <Login setIsAuthenticated={mockSetIsAuthenticated} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'wrongemail@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: 'wrongpassword' },
    });
    
    // Cambiar getByText a getByRole para el botón de inicio de sesión
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    expect(screen.getByText(/Credenciales incorrectas/i)).toBeInTheDocument();
  });

  test("navigates to home on successful login", () => {
    render(
      <BrowserRouter>
        <Login setIsAuthenticated={mockSetIsAuthenticated} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'admin@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: '1234' },
    });
    
    // Cambiar getByText a getByRole para el botón de inicio de sesión
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
  });
});
