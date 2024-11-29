import { useEffect, useState } from "react";
import "../../styles/wishlist.css";
import BookCard from "../book-component/BookCard";
import axios from "axios";

const Wishlist = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await axios.get("http://localhost:8000/get-wishBooks");
        console.log(result.data.result);
        setData(result.data.result);
      } catch (error) {
        console.log("Internal server Error", error);
      }
    };
    fetchBooks();
  }, []);
  return (
    <main className="wishlist d-flex flex-column justify-content-start align-items-center">
      <section className="wishlist-header d-flex flex-column justify-content-center align-items-center w-100 pt-2">
        <h1 className="bitter">Dreamy Booklist</h1>
        <p className="text-center">
          Unlock the Magic of Literature: Journey through Worlds
          <br /> of Imagination with Your Dreamy Booklist Today
        </p>
      </section>

      <section className="wishlist-main w-100 h-100 d-flex flex-wrap gap-5 mt-2">
        {data.length > 0 ? (
          data.map((item) => (
            <BookCard
              key={item._id}
              imagename={item.imagename}
              src1={item.imageURL}
              title={item.title}
              author={item.author}
              country={item.country}
              description={item.description}
              discount={item.discount}
              price={item.price}
            />
          ))
        ) : (
          <div>No Books dded Here</div>
        )}
      </section>
    </main>
  );
};

export default Wishlist;
