import "../../styles/about.css";

const Sellabout = () => {
  return (
    <>
      <section className="about h-100 ">
        <img src="/images/about.jpg" alt="About image" />
        <div className="about-header w-100 d-flex flex-column justify-content-center align-items-center">
          <h1 className="bitter text-black">
            Books Reborn: New and Preloved Treasures
          </h1>
          <p className="bitter mt-2 text-center">
            Discover a world of literary treasures, where new and preloved books
            find new homes and ignite imaginations.
          </p>
        </div>
      </section>
    </>
  );
};

export default Sellabout;
