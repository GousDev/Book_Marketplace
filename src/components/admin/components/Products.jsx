import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/layout.css";
import "../styles/products.css";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import toast from "react-hot-toast";

const Products = () => {
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  //check and reset token
  useEffect(() => {
    const checkToken = async () => {
      await axios.get(
        `http://localhost:8000/checkandresetauth?id=${userId}&token=${token}`
      );
      const result = await axios.get(`http://localhost:8000/get-all`);
      setData(result.data.result);
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

  //book delete function
  const handleDelete = async (id) => {
    const result = await axios.delete(
      `http://localhost:8000/delete-book?id=${id}`
    );
    toast.success("Book deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  //search handle button
  const handleSearch = async () => {
    const result = await axios.get(
      `http://localhost:8000/get-serched-books?value=${search}`
    );
    setData(result.data.result);
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

          <a href="/admin/products" className="sans mt-2 active">
            <InventoryIcon className="me-1 ms-2 fs-5" /> Products
          </a>

          <a href="/admin/users" className="sans mt-2">
            <PeopleAltIcon className="me-1 ms-2 fs-5" /> Users
          </a>

          {/* <a href="/admin/orders" className="sans mt-2">
            <CurrencyRupeeIcon className="me-1 ms-2 fs-5 " /> Orders
          </a> */}
        </div>

        {/* Body of product */}
        <div className="product-body py-3 px-2">
          <section className="product-header mb-2 px-2 py-2 d-flex align-items-center justify-content-between">
            <div>
              <button
                className="btn btn-primary"
                onClick={() =>
                  (window.location.href = "/admin/products/add-book")
                }
              >
                Add Books
              </button>
            </div>
            <div className="d-flex  w-50">
              <input
                type="text"
                placeholder="Search books"
                className="form-control me-2"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />

              <button
                className="btn btn-outline-success"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </section>

          <table class="table" id="myTable">
            <thead>
              <tr>
                <th scope="col">SrNo</th>
                <th scope="col">Book</th>
                <th scope="col">Author</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Pages</th>
                <th scope="col">Preview</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td className="sans">{item.name}</td>
                      <td className="sans">{item.author}</td>
                      <td className="sans">{item.category}</td>
                      <td className="sans">{item.price}</td>
                      <td className="sans">{item.pages}</td>
                      <td className="img-box">
                        <img src={item.imageURL} alt="" />
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger sans"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10">No Book Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  ) : (
    //redirect to login page if not authenticated
    <button>Login please</button>
  );
};

export default Products;
