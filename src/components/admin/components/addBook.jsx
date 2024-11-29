import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/layout.css";
import "../styles/addbook.css";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";

const Addbook = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [pages, setPages] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Select");
  const [image, setImage] = useState();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

  //check and reset token
  useEffect(() => {
    const checkToken = async () => {
      const result = await axios.get(
        `http://localhost:8000/checkandresetauth?id=${userId}&token=${token}`
      );
    };
    checkToken();
  }, []);

  //checking for authentication
  const isAuthenticated = async () => {
    const fetchAuth = async () => {
      const result = await axios.get(
        `http://localhost:8000/checkForAuth?id=${userId}&token=${token}`
      );
      return result.data.success;
    };

    const authResult = await fetchAuth();
    if (role === "admin") {
      if (authResult) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  isAuthenticated().then((result) => {
    setAuth(result);
  });

  //handleSubmit function
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
        window.location.href = "/admin/products";
      }, 1000);
    }
  };

  //html coding here

  return auth ? (
    <>
      {/* Header o fdashboard */}
      <div className="layout-header d-flex justify-content-between align-items-center p-3">
        <div className="logo-box d-flex align-items-center gap-1 justify-content-center">
          <div className="logo-img">
            <img src="/public/images/logo.png" alt="logo img" />
          </div>
          <h4 className="mb-0 rubik">BOOK-LX</h4>
        </div>

        <span className="account d-flex justify-content-between align-items-center gap-2">
          <div className="account-pic ms-1">
            <img src="/public/acc.jpg" alt="" />
          </div>
          <p className="mb-0 me-1 sans">VIVEK D</p>
        </span>
      </div>

      <div className="layout-main d-flex">
        {/* Menubar of layout */}
        <div className="layout-menu py-3 pe-4 d-flex flex-column">
          {/* <a href="/admin/dashboard" className="sans">
            <HomeIcon className="me-1 ms-2 fs-4" /> Dashboard
          </a> */}

          <a href="/admin/products" className="sans active mt-2">
            <InventoryIcon className="me-1 ms-2 fs-5" /> Products
          </a>

          <a href="/admin/users" className="sans mt-2">
            <PeopleAltIcon className="me-1 ms-2 fs-5" /> Users
          </a>

          <a href="/admin/orders" className="sans mt-2">
            <CurrencyRupeeIcon className="me-1 ms-2 fs-5 " /> Orders
          </a>
        </div>

        {/* Body of dashboard */}
        <div className="addbook-body d-flex justify-content-center py-3 px-2">
          <div className="addbook-form d-flex flex-column align-items-center w-75 px-3">
            <form className="w-100" onSubmit={handleSubmit}>
              <TextField
                required
                id="name"
                label="Name"
                className="w-100 mb-4 mt-3"
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
              <TextField
                required
                id="author"
                label="Author"
                className="w-100 mb-4"
                onChange={(e) => setAuthor(e.target.value)}
                autoComplete="off"
              />
              <TextField
                required
                id="price"
                label="Price"
                className="w-100 mb-4"
                onChange={(e) => setPrice(e.target.value)}
                autoComplete="off"
              />
              <TextField
                required
                id="discount"
                label="Discount"
                className="w-100 mb-4"
                onChange={(e) => setDiscount(e.target.value)}
                autoComplete="off"
              />
              <TextField
                required
                id="pages"
                label="Pages"
                className="w-100 mb-4"
                onChange={(e) => setPages(e.target.value)}
                autoComplete="off"
              />
              <TextField
                required
                id="country"
                label="Country of production"
                className="w-100 mb-4"
                onChange={(e) => setCountry(e.target.value)}
                autoComplete="off"
              />
              <TextField
                id="description"
                label="Description..."
                required
                multiline
                maxRows={4}
                className="w-100 mb-4"
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
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

              <input
                type="submit"
                value="Submit"
                className="w-100 addbook-submit-btn"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  ) : (
    //redirect to login page if not authenticated
    <button>Login please</button>
  );
};

export default Addbook;
