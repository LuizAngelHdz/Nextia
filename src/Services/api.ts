// /services/api.ts

import axios from "axios";
import { User, Post, Comment } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com";

// Obtener usuarios
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

// Obtener un usuario por id
export const fetchUserById = async (id: number): Promise<User> => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

// Obtener posts
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

// Obtener los posts de un usuario
export const fetchPostsByUser = async (userId: number): Promise<Post[]> => {
  const response = await axios.get(`${API_URL}/posts?userId=${userId}`);
  return response.data;
};

// Obtener comentarios de un post
export const fetchCommentsByPost = async (postId: number): Promise<Comment[]> => {
  const response = await axios.get(`${API_URL}/comments?postId=${postId}`);
  return response.data;
};

// Crear un post
export const createPost = async (post: Post): Promise<Post> => {
  const response = await axios.post(`${API_URL}/posts`, post);
  return response.data;
};

// Editar un post
export const editPost = async (post: Post): Promise<Post> => {
  const response = await axios.put(`${API_URL}/posts/${post.id}`, post);
  return response.data;
};
