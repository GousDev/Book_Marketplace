import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import toast from "react-hot-toast";

const SellForm = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [pages, setPages] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Select");
  const [image, setImage] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("author", author);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("pages", pages);
    formData.append("country", country);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("upload-photo", image);

    const result = await axios.post(
      "http://localhost:8000/upload-books",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (result.data.success) {
      toast.success("Book uploaded successfully");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <main className="sellform d-flex flex-column p-4 container">
      <h2>FORM</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="name"
          label="Name"
          className="w-100 mb-4 mt-3"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="author"
          label="Author"
          className="w-100 mb-4"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          required
          id="price"
          label="Price"
          className="w-100 mb-4"
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          required
          id="discount"
          label="Discount"
          className="w-100 mb-4"
          onChange={(e) => setDiscount(e.target.value)}
        />
        <TextField
          required
          id="pages"
          label="Pages"
          className="w-100 mb-4"
          onChange={(e) => setPages(e.target.value)}
        />
        <TextField
          required
          id="country"
          label="Country of production"
          className="w-100 mb-4"
          onChange={(e) => setCountry(e.target.value)}
        />
        <TextField
          id="description"
          label="Description..."
          required
          multiline
          maxRows={4}
          className="w-100 mb-4"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select
          labelId="book-category-label"
          id="book-category"
          label="Book Category"
          className="w-100 mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="Select">
            <em>Select</em>
          </MenuItem>
          <MenuItem value={"Story Books"}>Story Books</MenuItem>
          <MenuItem value={"College Books"}>College Books</MenuItem>
          <MenuItem value={"History Books"}>History Books</MenuItem>
          <MenuItem value={"Religious Books"}>Religious Books</MenuItem>
        </Select>

        <input
          name="upload-photo"
          type="file"
          className="w-100 mb-4"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <Button type="submit" variant="contained" className="w-100">
          Submit
        </Button>
      </form>
    </main>
  );
};

export default SellForm;
