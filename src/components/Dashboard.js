import { Container, Button, Grid } from "@mui/material";
import { useState } from "react";
import { mockPosts } from "../data/mockPosts";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SearchBar from "../components/SearchBar";
import BlogTable from "../components/BlogTable";
import BlogFormDialog from "../components/BlogFormDialog";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Dashboard() {
  const [posts, setPosts] = useLocalStorage("blogPosts", mockPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedPost(null);
    setFormOpen(true);
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setFormOpen(true);
  };

  const handleDelete = (post) => {
    setSelectedPost(post);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setPosts(posts.filter((p) => p.id !== selectedPost.id));
    setConfirmOpen(false);
  };

  const handleSave = (post) => {
    const exists = posts.find((p) => p.id === post.id);
    if (exists) setPosts(posts.map((p) => (p.id === post.id ? post : p)));
    else setPosts([...posts, post]);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Grid>
        <Grid item xs={12} sm={6} textAlign="right">
          <Button variant="contained" onClick={handleAdd}>
            Add Post
          </Button>
        </Grid>
      </Grid>

      <BlogTable posts={filteredPosts} onEdit={handleEdit} onDelete={handleDelete} />
      <BlogFormDialog open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} post={selectedPost} />
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this post?"
      />
    </Container>
  );
}
