import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { createPost, editPost } from "../../Services";

interface FormPostModalProps {
  open: boolean;
  onClose: () => void;
  postId?: string; 
  postData?: { title: string; body: string }; 
  onPostCreatedOrUpdated: (message: string) => void; 
}

const FormPostModal: React.FC<FormPostModalProps> = ({ open, onClose, postId, postData, onPostCreatedOrUpdated }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (postId && postData) {
      setTitle(postData.title);
      setBody(postData.body);
    }
  }, [postId, postData]);

    /**
     * Handles the submission of a post, either creating a new post or updating an existing one.
     * 
     * @async
     * @function handleSubmit
     * @returns {Promise<void>}
     */
    const handleSubmit = async () => {
        const post = { title, body };
    
        if (postId) {
        try {
            await editPost({
                id: parseInt(postId), ...post,
                userId: 0
            });
            onPostCreatedOrUpdated("Post actualizado correctamente.");
            onClose();
        } catch (error) {
            onPostCreatedOrUpdated("Error al actualizar el post.");
        }
        } else {
            try {
                const newPost = await createPost(post);
                onPostCreatedOrUpdated("Post creado correctamente.");
                onClose(); 
            } catch (error) {
                onPostCreatedOrUpdated("Error al crear el post.");
            }
        }
    };
    

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: 24,
          minWidth: "300px",
        }}
      >
        <Typography variant="h6">{postId ? "Editar Post" : "Crear Nuevo Post"}</Typography>
        <TextField
          label="Título"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Cuerpo"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: "16px" }}
        >
          {postId ? "Actualizar Post" : "Crear Post"}
        </Button>
      </Box>
    </Modal>
  );
};

export default FormPostModal;
