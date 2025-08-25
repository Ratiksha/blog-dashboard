import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Paper, Grid, Divider } from "@mui/material";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { mockPosts } from "../data/mockPosts";

const ViewBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts] = useLocalStorage("blogPosts", mockPosts);

  const post = posts.find((p) => p.id === Number(id));
  if (!post) return <Typography>Post not found</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          {post.title}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">Author</Typography>
            <Typography variant="body1">{post.author}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">Status</Typography>
            <Typography variant="body1">{post.status}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary">Date</Typography>
            <Typography variant="body1">{post.date}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Content
        </Typography>
        <Typography variant="body1" paragraph>
          {post.content}
        </Typography>

        <Button variant="contained" onClick={() => navigate(-1)}>
          Back to Dashboard
        </Button>
      </Paper>
    </Container>
  );
}

export default ViewBlogPage;
