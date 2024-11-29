import PaymentsIcon from "@mui/icons-material/Payments";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SellIcon from "@mui/icons-material/Sell";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import "../../styles/features.css";
import { useEffect } from "react";

const Features = () => {
  useEffect(() => {
    const box = document.querySelectorAll(".box");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
          if (entry.isIntersecting) observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.5,
      }
    );
    box.forEach((box) => {
      observer.observe(box);
    });
  }, []);

  return (
    <>
      <main className="features d-flex flex-column align-items-center justify-content-center">
        <h3 className="inc-sans text-center ">More than just a website</h3>
        <p className="inc-sans text-center">Explore What else you like</p>
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 p-5">
          <section className="box d-flex flex-column justify-content-center align-items-center gap-2">
            <PaymentsIcon className="pay-icon text-success fs-2" />
            <h6 className="box-heading varela">Secure Payment</h6>
            <p className="text-center">
              Secure Payments,
              <br />
              Guaranteed
            </p>
          </section>
          <section className="box d-flex flex-column justify-content-center align-items-center gap-2">
            <FavoriteBorderIcon className="wish-icon fs-2" />
            <h6 className="box-heading varela">Wishlist Books</h6>
            <p>Wishlist Favourite Books</p>
          </section>
          <section className="box d-flex flex-column justify-content-center align-items-center gap-2">
            <SellIcon className="sell-icon fs-2" />
            <h6 className="box-heading varela">Verified Seller</h6>
            <p className="text-center">
              Verified Sellers,
              <br />
              Trusted Treasures
            </p>
          </section>
          <section className="box d-flex flex-column justify-content-center align-items-center gap-2">
            <LocalShippingIcon className="ship-icon fs-2" />
            <h6 className="box-heading varela">Fast Delivery</h6>
            <p className="text-center">
              Speedy Delivery,
              <br /> Happy Reading
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Features;
