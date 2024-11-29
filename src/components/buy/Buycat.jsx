import "../../styles/cat.css";
import CC from "../catalogue-container/CC";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Buycat = () => {
  return (
    <>
      <main className="cat">
        <section>
          <h3 className="cat-header inc-sans text-center p-4">
            Explore Categories
          </h3>
        </section>
        <section className="cat-main d-flex flex-wrap mt-3 justify-content-center align-items-center gap-5  p-4">
          <CC title="Story Books" src="/images/story.png" click="story" />
          <CC title="College Books" src="/images/college.png" click="college" />
          <CC
            title="History  Books"
            src="/images/history.png"
            click="history"
          />
          <CC
            title="Religious Books"
            src="/images/religious.png"
            click="religious"
          />
        </section>

        {/* MOBILE NAVIGATION */}

        <section className="cat-mobile d-none flex-wrap mt-3  gap-5  p-4">
          <Swiper
            spaceBetween={100}
            slidesPerView={1}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide className="slide">
              <CC title="Story Books" src="/images/story.png" click="story" />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <CC
                title="College Books"
                src="/images/college.png"
                click="college"
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <CC
                title="History  Books"
                src="/images/history.png"
                click="history"
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <CC
                title="Religious Books"
                src="/images/religious.png"
                click="religious"
              />
            </SwiperSlide>
          </Swiper>
        </section>
      </main>
    </>
  );
};

export default Buycat;
