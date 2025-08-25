import { TextField } from "@mui/material";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <TextField
      label="Search by Title or Author"
      variant="outlined"
      fullWidth
      margin="normal"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
