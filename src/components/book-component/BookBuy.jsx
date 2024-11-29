import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/bookbuy.css";
import { useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../features/addToCart.js";
import toast from "react-hot-toast";
import axios from "axios";

const BookBuy = () => {
  const location = useLocation();
  const data = location.state;
  const cartItems = useSelector((state) => state.cart.values);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(data);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    dispatch(addItemsToCart(data.id));
    toast.success("Item added to cart");
  };
  const addToWishlist = async () => {
    try {
      const result = await axios.post("http://localhost:8000/wishlist", {
        data,
      });
      if (result.data.success) {
        toast.success("Item added to wishlist");
      } else {
        toast.error("Item already in wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleBuyNow = () => {
    const item = {
      quantity: 1,
      author: data.author,
      discount: data.discount,
      _id: data.id,
      imagename: data.imagename,
      pages: data.pages,
      price: data.price,
      src1: data.src1,
      title: data.title,
    };
    navigate("/checkout", { state: [item] });
  };

  return (
    <>
      <main className="bookInfo d-flex align-items-center p-4">
        <section className="book-info-name d-flex flex-column align-items-end justify-content-center">
          <div className="book-info-name-inner">
            <p className="varela fw-bold mb-2">EXCLUSIVE</p>
            <h1 className="varela fw-bold">{data.title}</h1>
          </div>
        </section>

        <section className="book-info-img d-flex align-items-center justify-content-start">
          <div className="book-info-img-inner">
            <img src={data.src1} alt="" />
          </div>
        </section>

        <section className="book-info-buttons d-flex flex-column align-items-start justify-content-center gap-3">
          <button className="inc-sans fw-semibold" onClick={addToWishlist}>
            Save
          </button>
          <button className="inc-sans fw-semibold" onClick={handleAddToCart}>
            ADD TO CART
          </button>
          <button className="inc-sans fw-semibold" onClick={handleBuyNow}>
            BUY NOW
          </button>
          <button
            className="inc-sans fw-semibold mt-5"
            onClick={() => window.scrollTo(1, 620)}
          >
            Read More <KeyboardArrowDownIcon />
          </button>
        </section>
      </main>

      <main className="bookInfo-body d-flex">
        <section className="grid-start d-flex flex-column item1 w-25 p-1">
          <div></div>
          <div className="d-flex flex-column align-items-center justify-content-center p-4">
            <h6 className="inc-sans fw-bold">Diverse Selection</h6>
            <p className="varela text-center">
              Explore a rich variety of genres
            </p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center p-4">
            <h6 className="inc-sans fw-bold">Expert Curation</h6>
            <p className="varela text-center">
              Carefully selected titles for exceptional reading
            </p>
          </div>
        </section>

        <section className="grid-middle d-flex flex-column item2 w-50 p-1">
          <div className="grid-middle1 d-flex align-items-center justify-content-center">
            <h2 className="varela fw-bold">Why Choose Us</h2>
          </div>
          <div className="grid-middle2 d-flex align-items-center justify-content-center">
            <img src="/features2.jpg" alt="" />
          </div>
        </section>

        <section className="grid-end d-flex flex-column item3 w-25 p-1">
          <div></div>
          <div className="d-flex flex-column align-items-center justify-content-center p-4">
            <h6 className="inc-sans fw-bold">User-Friendly Interface</h6>
            <p className="varela text-center">
              Intuitive design for a seamless experience
            </p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center p-4">
            <h6 className="inc-sans fw-bold">Exclusive Deals</h6>
            <p className="varela text-center">
              Access special promotions and discounts
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default BookBuy;
