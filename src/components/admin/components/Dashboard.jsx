import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/layout.css";
import "../styles/dashboard.css";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

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
          <a href="/admin/dashboard" className="sans active">
            <HomeIcon className="me-1 ms-2 fs-4" /> Dashboard
          </a>

          <a href="/admin/products" className="sans mt-2">
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
        <div className="dashboard-body py-3 px-2">
          
        </div>
      </div>
    </>
  ) : (
    //redirect to login page if not authenticated
    <button>Login please</button>
  );
};

export default Dashboard;
