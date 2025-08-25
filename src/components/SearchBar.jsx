import { TextField } from "@mui/material";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
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

export default SearchBar;
