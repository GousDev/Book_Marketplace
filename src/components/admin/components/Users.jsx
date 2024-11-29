import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/layout.css";
import "../styles/users.css";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import toast from "react-hot-toast";

const Addbook = () => {
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
      const result = await axios.get(`http://localhost:8000/get-all-users`);
      //   console.log(result);
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

  //search handle button
  const handleSearch = async () => {
    const result = await axios.get(
      `http://localhost:8000/get-serched-user?value=${search}`
    );
    if (result.data.success) {
      setData(result.data.result);
    }
  };

  //User delete function
  const handleDelete = async (id) => {
    const result = await axios.delete(
      `http://localhost:8000/delete-user?id=${id}`
    );
    toast.success("User deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  //User Chnage role function
  const handlechangeRole = async (id) => {
    const result = await axios.put(
      `http://localhost:8000/change-role?id=${id}`
    );
    console.log(result);
    if (result.data.success) {
      toast.success("Role Updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast.error("Something went wrong");
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

          <a href="/admin/products" className="sans mt-2">
            <InventoryIcon className="me-1 ms-2 fs-5" /> Products
          </a>

          <a href="/admin/users" className="sans active mt-2">
            <PeopleAltIcon className="me-1 ms-2 fs-5" /> Users
          </a>

          {/* <a href="/admin/orders" className="sans mt-2">
            <CurrencyRupeeIcon className="me-1 ms-2 fs-5 " /> Orders
          </a> */}
        </div>

        {/* Body of dashboard */}
        <div className="users-body py-3 px-2">
          <section className="users-header mb-2 px-2 py-2 d-flex align-items-center justify-content-between">
            <div>
              <button
                className="btn btn-primary"
                onClick={() => (window.location.href = "/admin/users/add-user")}
              >
                Add User
              </button>
            </div>
            <div className="d-flex  w-50">
              <input
                type="text"
                placeholder="Search User"
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
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Email</th>
                <th scope="col">Contact</th>
                <th scope="col">State</th>
                <th scope="col">Country</th>
                <th scope="col">Role</th>
                <th scope="col">Change Role</th>
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
                      <td className="sans">{item.surname}</td>
                      <td className="sans">{item.email}</td>
                      <td className="sans">{item.mobile}</td>
                      <td className="sans">{item.state}</td>
                      <td className="sans">{item.country}</td>
                      <td className="sans">{item.role}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary sans"
                          onClick={() => handlechangeRole(item._id)}
                        >
                          Change
                        </button>
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
                  <td colSpan="10">No user of this name</td>
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

export default Addbook;
