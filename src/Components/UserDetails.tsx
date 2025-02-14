
import React, { useEffect, useState } from "react"
import { fetchUserById, fetchPostsByUser } from "../services/api"
import { User, Post } from "../types"
import { useParams } from "react-router-dom"
import PostList from "../Pages/Posts/PostList"
import { Typography, Box, Card, CardContent, Avatar, Chip, Grid, Skeleton, Tabs, Tab } from "@mui/material"
import { Email, Phone, Language, Work } from "@mui/icons-material"

const UserDetails = () => {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [tabValue, setTabValue] = useState(0)
  const { userId } = useParams<{ userId: string }>()

  useEffect(() => {
    const loadUserData = async () => {
      if (userId) {
        const userData = await fetchUserById(userId)
        setUser(userData)
        const postsData = await fetchPostsByUser(userId)
        setPosts(postsData)
      }
    }
    loadUserData()
  }, [userId])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  if (!user) {
    return (
      <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Skeleton variant="text" width="60%" height={40} sx={{ mt: 2 }} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mt: 1 }} />
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 100, height: 100, bgcolor: "primary.main" }}>{user.name.charAt(0)}</Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" component="h2" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                @{user.username}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip icon={<Email />} label={user.email} variant="outlined" sx={{ mr: 1, mb: 1 }} />
                <Chip icon={<Phone />} label={user.phone} variant="outlined" sx={{ mr: 1, mb: 1 }} />
                {user.website && (
                  <Chip icon={<Language />} label={user.website} variant="outlined" sx={{ mr: 1, mb: 1 }} />
                )}
                {user.company && <Chip icon={<Work />} label={user.company.name} variant="outlined" sx={{ mb: 1 }} />}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Posts" />
          <Tab label="Información adicional" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && <PostList userPosts={posts} />}
        {tabValue === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Dirección
              </Typography>
              <Typography>
                {user.address.street}, {user.address.suite}
              </Typography>
              <Typography>
                {user.address.city}, {user.address.zipcode}
              </Typography>
              {user.company && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Compañía
                  </Typography>
                  <Typography>{user.company.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.company.catchPhrase}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.company.bs}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  )
}

export default UserDetails

