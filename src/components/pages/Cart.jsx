import Card from "../cart-component/Card";
import "../../styles/cart.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const data = JSON.parse(localStorage.getItem("cartItems"));
  console.log(data)
  useEffect(() => {
    try {
      const fetchItems = async () => {
        setCartItems(data);
        const result = await axios.post("http://localhost:8000/getCart-books", {
          cartItems: data,
        });
        // console.log(result.data.result);
        setFetchedData(result.data.result);
      };
      fetchItems();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }, []);

  const calculateTotal = () => {
    return fetchedData.reduce((total, item) => total + item.price, 0);
  };
  const shippingPrice =
    fetchedData.length === 0 ? 0 : calculateTotal() > 500 ? 0 : 200;
  const subtotal = shippingPrice + calculateTotal();

  const handleCheckout = () => {
    navigate("/checkout", { state: fetchedData });
  };

  return (
    <main className="cart d-flex flex-column justify-content-between align-items-center">
      <section className="cart-header d-flex justify-content-between align-items-center w-100">
        <h1 className="ms-2 varela fw-bold">My Cart</h1>
        <button className="me-3 btn" onClick={() => navigate("/")}>
          <ArrowBackIcon className="arrow-icon" />
          Continue Shopping
        </button>
      </section>

      {/* ---------------------------------------------------- */}
      <section className="cart-middle w-100 d-flex flex-column justify-content-start align-items-center mb-3">
        <div className="cart-middle-title d-flex justify-content-center align-items-center w-100">
          <li>Product</li>
          <li>Price</li>
          <li>Quantity</li>
          <li>Total</li>
        </div>
        <div className="cart-middle-item w-100">
          {fetchedData.length > 0 ? (
            fetchedData.map((item) => (
              <Card
                key={item._id}
                src={item.imageURL}
                name={item.name}
                id={item._id}
                author={item.author}
                pages={item.pages}
                price={item.price}
              />
            ))
          ) : (
            <div className="cart-noItem-Found p-5 fw-bold d-flex justify-content-center">
              <h5>Nothing Items Added In cart</h5>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      <section className="cart-bottom w-100 d-flex justify-content-between align-items-center p-2 pe-4">
        <div className="cart-bottom-ad">
          <img src="/images/ad.png" alt="" />
        </div>

        <div className="cart-bottom-pay d-flex flex-column justify-content-around align-items-center">
          <span className="d-flex justify-content-between align-items-center w-75">
            <h6>SUBTOTAL</h6>
            <p className="fw-semibold">₹{calculateTotal()}</p>
          </span>
          <span className="d-flex justify-content-between align-items-center w-75">
            <h6>SHIPPING</h6>
            <p className="fw-semibold">₹{shippingPrice}</p>
          </span>
          <span className="d-flex justify-content-between align-items-center w-75">
            <h6>TOTAL</h6>
            <p className="fw-semibold">₹{subtotal}</p>
          </span>
          <button
            className={`checkout-btn btn d-flex justify-content-between align-items-center`}
            disabled={fetchedData.length === 0}
            onClick={handleCheckout}
          >
            <h6 className="mb-0">CHECKOUT</h6>
            <p className="fw-semibold mb-0">₹{subtotal}</p>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Cart;
