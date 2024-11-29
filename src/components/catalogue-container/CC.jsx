import "../../styles/cc.css";
import { useNavigate } from "react-router-dom";

const CC = (props) => {
  const navigate = useNavigate();
  const handleClick = (data) => {
    navigate(`/${data}`);
  };

  return (
    <button className="cc-btn" onClick={() => handleClick(props.click)}>
      <section className="cc d-flex flex-column justify-content-center align-items-center">
        <div className="showcase">
          <img src={props.src} alt="" />
        </div>
        <h5 className="mt-3">{props.title}</h5>
      </section>
    </button>
  );
};

export default CC;
