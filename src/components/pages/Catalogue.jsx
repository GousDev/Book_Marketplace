import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BookCard from "../book-component/BookCard";

const Catalogue = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const value = location.state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8000/catalogue", {
          params: {
            value,
          },
        });
        setData(result.data.result);
        console.log(data);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    fetchData();
  }, [value]);

  return (
    <section className="wishlist-main w-100 h-100 d-flex flex-wrap gap-5 mt-2">
      {data.length > 0 ? (
        data.map((item) => (
          <BookCard
            key={item._id}
            src1={item.imageURLx}
            id={item._id}
            title={item.name}
            author={item.author}
            country={item.country}
            description={item.description}
            price={item.price}
            discount={item.discount}
          />
        ))
      ) : (
        <h1>Not found anything</h1>
      )}
    </section>
  );
};

export default Catalogue;
