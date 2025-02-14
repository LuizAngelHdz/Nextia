import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";
import { Comment as CommentIcon } from "@mui/icons-material";
import { fetchCommentsByPost } from "../../Services";

const PostComments = () => {
  const [comments, setComments] = useState<any[]>([]);
  const { postId } = useParams();

  /**
   * Asynchronously fetches comments for a specific post and updates the state accordingly.
   *
   * @async
   * @function fetchComments
   * @param {number} postId - The ID of the post for which to fetch comments.
   * @returns {Promise<void>}
   */
  const fetchComments = async () => {
    if (postId) {
      try {
        const data = await fetchCommentsByPost(Number.parseInt(postId));
        setComments(data);
      } catch (error) {
        console.error("Error al cargar los comentarios:", error);
      }
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);


  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Comentarios del Post
      </Typography>
      {comments.length > 0 ? (
        <Paper elevation={2}>
          <List>
            {comments.map((comment, index) => (
              <React.Fragment key={comment.id}>
                <ListItem alignItems="flex-start" sx={{ mb: 2 }}>
                  <ListItemAvatar>
                    <Avatar>
                      <CommentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {comment.email}
                        </Typography>
                        {" — " + comment.body}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < comments.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ) : (
        <Paper elevation={2} sx={{ textAlign: "center", p: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No hay comentarios para este post.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default PostComments;
