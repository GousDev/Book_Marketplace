import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/layout.css";
import "../styles/adduser.css";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import toast from "react-hot-toast";

const AddUser = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("user");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [room, setRoom] = useState("");
  const [apartment, setApartment] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [account, setAccount] = useState("");
  const [bank, setBank] = useState("");

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

    const result = await axios.post("http://localhost:8000/add-user", {
      name,
      surname,
      email,
      password,
      roles,
      mobile,
      dob,
      room,
      apartment,
      area,
      city,
      state,
      pincode,
      country,
      ifsc,
      account,
      bank,
    });
    if (result.data.success) {
      toast.success("User Added successfully");
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

          <a href="/admin/products" className="sans mt-2">
            <InventoryIcon className="me-1 ms-2 fs-5" /> Products
          </a>

          <a href="/admin/users" className="sans active mt-2">
            <PeopleAltIcon className="me-1 ms-2 fs-5" /> Users
          </a>

          <a href="/admin/orders" className="sans mt-2">
            <CurrencyRupeeIcon className="me-1 ms-2 fs-5 " /> Orders
          </a>
        </div>

        {/* Body of dashboard */}
        <div className="adduser-body d-flex justify-content-center py-3 px-2">
          <div className="adduser-form d-flex flex-column align-items-center w-75 px-3">
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
                id="surname"
                label="Surname"
                className="w-100 mb-4 mt-3"
                autoComplete="off"
                onChange={(e) => setSurname(e.target.value)}
              />

              <TextField
                required
                id="email"
                label="Email"
                className="w-100 mb-4 mt-3"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                id="password"
                label="Password"
                className="w-100 mb-4 mt-3"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={roles}
                label="Role"
                onChange={(e) => setRoles(e.target.value)}
                className="w-100 mb-4"
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>

              <input
                type="number"
                className="form-control mb-2"
                placeholder="Mobile"
                onChange={(e) => setMobile(e.target.value)}
              />

              <input
                type="date"
                className="form-control mb-3 mt-4"
                placeholder="DOB"
                onChange={(e) => setDob(e.target.value)}
              />

              <TextField
                required
                id="room"
                label="Room"
                className="w-100 mb-4 mt-3"
                autoComplete="off"
                onChange={(e) => setRoom(e.target.value)}
              />

              <TextField
                required
                id="apartment"
                label="Apartment"
                className="w-100 mb-4 mt-3"
                autoComplete="off"
                onChange={(e) => setApartment(e.target.value)}
              />
              <TextField
                required
                id="area"
                label="Area"
                className="w-100 mb-4 mt-3"
                autoComplete="off"
                onChange={(e) => setArea(e.target.value)}
              />
              <TextField
                required
                id="city"
                label="City"
                className="w-100 mb-4 mt-3"
                autoComplete="off"
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                required
                id="state"
                label="State"
                className="w-100 mb-4 mt-3"
                autoComplete="off"
                onChange={(e) => setState(e.target.value)}
              />
              <TextField
                required
                id="pincode"
                label="Pincode"
                className="w-100 mb-4 mt-3"
                autoComplete="off"
                onChange={(e) => setPincode(e.target.value)}
              />
              <TextField
                required
                id="country"
                label="Country"
                className="w-100 mb-4 mt-3"
                autoComplete="off"
                onChange={(e) => setCountry(e.target.value)}
              />
              <TextField
                required
                id="ifsc"
                label="Ifsc"
                className="w-100 mb-4 mt-3"
                autoComplete="off"
                onChange={(e) => setIfsc(e.target.value)}
              />
              <TextField
                required
                id="account"
                label="Account"
                className="w-100 mb-4 mt-3"
                autoComplete="off"
                onChange={(e) => setAccount(e.target.value)}
              />
              <TextField
                required
                id="bank"
                label="Bank"
                className="w-100 mb-4 mt-3"
                autoComplete="off"
                onChange={(e) => setBank(e.target.value)}
              />
              <button className="btn btn-success">Submit</button>
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

export default AddUser;
