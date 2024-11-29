import "../../styles/about.css";

const Buyabout = () => {
  return (
    <>
      <section className="about h-100 ">
        <img src="/images/about.jpg" alt="About image" />
        <div className="about-header w-100 d-flex flex-column justify-content-center align-items-center">
          <h1 className="bitter text-black">Books for All, New and Preloved</h1>
          <p className="bitter mt-2 text-center">
            Explore new and preloved books, indulge in captivating stories, and
            embrace the joy of sustainable reading.
          </p>
        </div>
      </section>
    </>
  );
};

export default Buyabout;
