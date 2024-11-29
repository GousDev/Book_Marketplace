import "../../styles/bookuniversalcategory.css";
import BookCard from "../book-component/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8000/get-historyBooks");
      setData(result.data.result);
    };
    fetchData();
  }, []);
  // console.log(data);

  return (
    <main className="universal-book d-flex flex-column justify-content-center align-items-center">
      <section className="d-flex flex-column justify-content-center align-items-center gap-1 mt-2 mb-3">
        <h1 className="bitter fw-semibold">Explore the Past Today</h1>
        <p className="text-center fw-semibold">
          Dive into the richness of history with our curated collection of
          books.
          <br /> From ancient civilizations to modern events, embark on a
          journey through time
        </p>
      </section>
      <section className="wishlist-main w-100 h-100 d-flex flex-wrap gap-5 mt-2">
        {data.length > 0 ? (
          data.map((items, i) => (
            <BookCard
              key={items._id}
              imagename={items.imagename}
              src1={items.imageURL}
              src2={""}
              src3={""}
              title={items.name}
              author={items.author}
              price={items.price}
              discount={items.discount}
              pages={items.pages}
              description={items.description}
              country={items.country}
              id={items._id}
              category={items.category}
            />
          ))
        ) : (
          <div>No Book found</div>
        )}
      </section>
    </main>
  );
};

export default History;
