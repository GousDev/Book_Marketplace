import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import "../styles/footer.css";

const Footer = () => {
  return (
    <>
      <footer className="foot d-flex flex-column justify-content-center align-items-center p-5">
        <h3 className="foot-header anton">BOOK LX</h3>

        <section className="foot-links d-flex gap-4 mt-1 fs-5">
          <a href="/" className="text-decoration-none text-dark ">
            <li className="foot-link">Buy</li>
          </a>
          <a href="/sell" className="text-decoration-none text-dark">
            <li className="foot-link">Sell</li>
          </a>
          <a href="/about" className="text-decoration-none text-dark">
            <li className="foot-link">About</li>
          </a>
          <a href="/contact" className="text-decoration-none text-dark">
            <li className="foot-link">Contact</li>
          </a>
        </section>

        <section className="social-media-links d-flex justify-content-center align-items-center gap-4 mt-2 ">
          <a href="#" target="_blank">
            <TwitterIcon />{" "}
          </a>
          <a href="https://www.linkedin.com/in/gousdev/" target="_blank">
            <LinkedInIcon />{" "}
          </a>
          <a href="#" target="_blank">
            <FacebookIcon />{" "}
          </a>
          <a href="https://www.instagram.com/gous_f59" target="_blank">
            <InstagramIcon />{" "}
          </a>
        </section>

        <section className="copyright mt-4">
          BOOK LX © 2022. All rights reserved.
        </section>
      </footer>
    </>
  );
};

export default Footer;
