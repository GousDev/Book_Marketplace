import SearchIcon from "@mui/icons-material/Search";
import "../../styles/home.css";
import Sellabout from "./Sellabout";
import Features from "../buy/features";
import { useNavigate } from "react-router-dom";

const Sellhome = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="home d-flex flex-column flex-lg-row flex-md-column flex-sm-column flex-xs-column">
        <section className="main-left w-100 w-lg-50 p-4 d-flex flex-column justify-content-center align-items-center">
          <div>
            <h1 className="bitter main-left-heading">
              Sell
              <br />
              Old BOOKS
            </h1>
            <p className="bitter fs-5 mt-3">Discover Your Next Adventure</p>
            <div className="search-container">
              <input
                type="text"
                className="search w-95 ps-4 "
                placeholder="Search"
              />
              <SearchIcon className="search-icon" />
            </div>
          </div>
        </section>

        <section className="main-right w-100 w-lg-50 p-4 d-flex flex-column justify-content-center align-items-center">
          <div className="main-right-inner d-flex justify-content-center align-items-center gap-5">
            <div className="img1">
              <img src="/images/old1.png" alt="" />
            </div>

            <div className="img2">
              <img src="/images/old2.png" alt="" />
            </div>

            <div className="img3">
              <img src="/images/old3.png" alt="" />
            </div>
          </div>
          <p className="bitter mt-3 fs-5 ">Most popular this week</p>
        </section>
      </main>
      <Sellabout />
      <Features />
      <main className="sell-section d-flex flex-column justify-content-center align-items-center">
        <h2 className="bitter">Fill Out Form To Add Your Book To Sell</h2>
        <button
          className="varela mt-3"
          onClick={() => navigate("/upload-book")}
        >
          FORM
        </button>
      </main>
    </>
  );
};

export default Sellhome;
