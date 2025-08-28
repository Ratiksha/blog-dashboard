import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";

const BlogFormDialog = ({ open, onClose, onSave, post }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    status: "Draft"
  });
  const [errors, setErrors] = useState({});

  const resetForm = useCallback(() => {
      setFormData(
        post ? post : { 
            title: "", 
            author: "", 
            content: "", 
            status: "Draft" 
          }
      );
      setErrors({});
    }, [post]);

  
  useEffect(() => {
    resetForm();
  }, [resetForm, open]);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const validate = () => {
    const tempErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) tempErrors[field] = "Required";
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave({ 
        ...formData, 
        id: post?.id ?? Date.now(), 
        date: new Date().toISOString().split("T")[0] 
      });
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
  }

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>{post ? "Edit Post" : "Add Post"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          margin="dense"
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          fullWidth
          error={!!errors.author}
          helperText={errors.author}
        />
        <TextField
          margin="dense"
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          error={!!errors.content}
          helperText={errors.content}
        />
        <TextField
          select
          margin="dense"
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="Draft">Draft</MenuItem>
          <MenuItem value="Published">Published</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{post ? "Save" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default BlogFormDialog;