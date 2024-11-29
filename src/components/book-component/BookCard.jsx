import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "../../styles/bookcard.css";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../features/addToCart.js";
import toast from "react-hot-toast";

const BookCard = (props) => {
  // console.log(props);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBookCard = () => {
    navigate("/book-info", { state: props });
  };
  const handleAddToCart = () => {
    dispatch(addItemsToCart(props.id));
    toast.success("Item added to cart");
  };

  return (
    <div className="card d-flex flex-column" onClick={handleBookCard}>
      <section className="card-header">
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          <SwiperSlide className="d-flex justify-content-center">
            <img src={props.src1} alt="Slide 1" />
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="room-detail d-flex flex-column align-items-start justify-content-around w-100 t-2">
        <div className="add text-center fs-5 mt-2">{props.title}</div>

        <div className="info d-flex justify-content-between align-items-center w-100 mt-3"></div>

        <div className="get w-100 d-flex justify-content-between align-items-center mt-2">
          <span className="d-flex justify-content-center align-items-center">
            <CurrencyRupeeIcon className="i" />
            <p className="mb-1">{props.price}/-</p>
          </span>
          <span>
            <button className="addtocart-btn" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </span>
        </div>
      </section>
    </div>
  );
};

export default BookCard;
