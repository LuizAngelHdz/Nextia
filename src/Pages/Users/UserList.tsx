import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../Components/Table";
import { Edit, Visibility, Add } from "@mui/icons-material";
import { fetchUsers } from "../../Services";

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
/**
 * Retrieves a list of users from the server and updates the state with the fetched data.
 * 
 * @async
 * @function getListUsers
 * @returns {Promise<void>} A promise that resolves when the users are fetched and the state is updated.
 */
const getListUsers = async () => {
  const data = await fetchUsers();
  setUsers(data);
};

  useEffect(() => {
    getListUsers();
  }, []);

  const headers = [
    { label: "Nombre", key: "name" },
    { label: "Correo", key: "email" },
    { label: "Teléfono", key: "phone" },
  ];

  const actions = [
    {
      label: "Ver Detalles",
      onClick: (user: any) => navigate(`/user/${user.id}`),
      icon: <Visibility />,
      tooltip: "Ver detalles del usuario",
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Usuarios
      </Typography>
      <TableComponent
        headers={headers}
        rows={users}
        actions={actions}
      />
    </Container>
  );
};

export default UserList;
