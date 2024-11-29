import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/order.css";

const Order = () => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:8000/getOrders/${userId}`
      );
      setData(result.data.result);
      console.log(result.data);
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (data.length > 0) {
      const fetchData = async () => {
        const request = data.map(async (item) => {
          const result = await axios.get(
            "http://localhost:8000/getOrderProducts",
            {
              params: {
                product: item.product,
              },
            }
          );
          // console.log(result.data.result);
          setProducts(result.data.result);
        });
        await Promise.all(request);
      };
      fetchData();
    }
  }, [data]);
  const total = products.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  return (
    <main className="order-main container p-2 d-flex flex-column justify-content-center align-items-center gap-3 pt-4 pb-4">
      {data.length > 0 ? (
        data.map((item, i) => (
          <section className="order d-flex" key={i}>
            <div className="order-data p-4 d-flex flex-column">
              <span>
                <p className="inc-sans fw-bold mb-0">Order Id</p>
                <p className="inc-sans">#{item.orderId}</p>
              </span>
              <span>
                <p className="inc-sans fw-bold mb-0">Date</p>
                <p className="inc-sans">
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </span>
              <span>
                <p className="inc-sans fw-bold mb-0">Total Amount</p>
                <p className="inc-sans">₹{total + 200}</p>
              </span>
              <span>
                <p className="inc-sans fw-bold mb-0">Order Status</p>
                <p className="inc-sans">Confirmed</p>
              </span>
            </div>
            <div className="order-detail p-4">
              {products.length > 0 ? (
                products.map((product, i) => (
                  <section
                    className="ordered-product mb-3 d-flex justify-content-between align-items-center pb-2"
                    key={i}
                  >
                    <div className="d-flex p-1">
                      <span className="me-2">
                        <img src={product.imageURL} alt="product image" />
                      </span>
                      <span className="d-flex flex-column justify-content-start align-items-start">
                        <p className="mb-0 inc-sans fw-bold">{product.name}</p>
                        <p className="inc-sans text-success">
                          {product.author}
                        </p>
                        <p className="inc-sans">x 1</p>
                      </span>
                    </div>
                    <div className="d-flex justify-content-center align-items-start inc-sans fw-bold p-1">
                      ₹{(product.price)}
                    </div>
                  </section>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </section>
        ))
      ) : (
        <h5>Please Order Something</h5>
      )}
    </main>
  );
};
export default Order;
