import { useState } from "react";
import "../../styles/card.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteIcon from "@mui/icons-material/Delete";

const Card = (props) => {
  // console.log(props);
  const [count, setCount] = useState(1);
  var num = props.price * count;

  const handleDeleteCard = () => {
    const deleteId = props.id;
    let ids = JSON.parse(localStorage.getItem("cartItems")) || [];

    const indexToDelete = ids.indexOf(deleteId);
    if (indexToDelete !== -1) {
      ids.splice(indexToDelete, 1);
      localStorage.setItem("cartItems", JSON.stringify(ids));
      window.location.href = "";
    }
  };

  return (
    <main className="cart-card d-flex">
      <section className="cart-card-item1 d-flex justify-content-start align-items-center">
        <span className="ms-3">
          <img src={props.src} alt="" loading="lazy" />
        </span>
        <span className="w-50 d-flex flex-column justify-content-end align-items-start p-2">
          <h6 className="varela fw-bold mb-0">{props.name}</h6>
          <p>#{props.id}</p>
          <p>{props.author}</p>
        </span>
      </section>
      <section className="cart-card-item2 d-flex flex-column justify-content-center align-items-center">
        <span className="d-flex flex-column justify-content-center align-items-start gap-1">
          <p>-{props.pages} Pages</p>
          <p>-2018</p>
          <h6>
            {props.price}
            <CurrencyRupeeIcon className="fs-6" />
          </h6>
        </span>
      </section>
      <section className="cart-card-item3 d-flex justify-content-center align-items-center">
        <span className="d-flex justify-content-center align-items-center">
          <button
            className="btn me-2"
            onClick={() => setCount(count - 1)}
            disabled={count <= 1}
          >
            -
          </button>
          <h6 className="d-inline-block mb-0">{count}</h6>
          <button className="btn ms-2" onClick={() => setCount(count + 1)}>
            +
          </button>
        </span>
      </section>
      <section className="cart-card-item4 d-flex align-items-center justify-content-center">
        <h6>₹{num}</h6>
        <button
          className="btn btn-danger ms-5 d-flex justify-content-center align-items-center"
          onClick={handleDeleteCard}
        >
          <DeleteIcon className="fs-6" />
        </button>
      </section>
    </main>
  );
};

export default Card;
