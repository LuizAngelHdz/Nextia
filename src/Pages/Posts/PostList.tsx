import React, { useState, useEffect } from "react"
import { Container, Typography, Button, Snackbar, Paper, Box, Fab, useTheme, useMediaQuery, Alert } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Edit, Comment, Add } from "@mui/icons-material"
import TableComponent from "../../Components/Table"
import FormPostModal from "./FormPosts"
import { fetchPosts } from "../../Services"

const PostList = ({ userPosts }: { userPosts?: any[] }) => {
  const [posts, setPosts] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<any | null>(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const getListPost = async () => {
    const data = await fetchPosts()
    setPosts(data)
  }

  useEffect(() => {
    if (userPosts) {
      setPosts([...userPosts])
    } else {
        getListPost()
    }
  }, [userPosts])

  const handleCreatePostClick = () => {
    setEditingPost(null)
    setModalOpen(true)
  }

  const handlePostCreatedOrUpdated = (message: string) => {
    setSnackbarMessage(message)
    setOpenSnackbar(true)
    getListPost()
  }

  const headers = [
    { label: "Título", key: "title" },
    { label: "Cuerpo", key: "body" },
  ]

  const actions = [
    {
      label: "Editar",
      icon: <Edit />,
      tooltip: "Editar este post",
      onClick: (post: any) => {
        setEditingPost(post)
        setModalOpen(true)
      },
    },
    {
      label: "Ver Comentarios",
      icon: <Comment />,
      tooltip: "Ver comentarios de este post",
      onClick: (post: any) => navigate(`/post-comments/${post.id}`),
    },
  ]

  return (
    <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            Lista de Posts
          </Typography>
          {!userPosts && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePostClick}
              startIcon={<Add />}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              Crear Post
            </Button>
          )}
        </Box>

        <TableComponent headers={headers} rows={posts} actions={actions} />

        {!userPosts && isMobile && (
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
            }}
            onClick={handleCreatePostClick}
          >
            <Add />
          </Fab>
        )}

        <FormPostModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          postId={editingPost?.id}
          postData={editingPost}
          onPostCreatedOrUpdated={handlePostCreatedOrUpdated}
        />

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
    </Container>
  )
}

export default PostList

