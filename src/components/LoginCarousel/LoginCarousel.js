import "./LoginCarousel.css";

const LoginCarousel = (props) => {
  return (
    <div className="login-carousel">
      <div className="slides-container">
        <div className="slide">
          <img
            src="./images/login-page/first-illustration.png"
            alt="illustration"
          />
          <p>Find top candidates quickly!</p>
        </div>
        {/* <div className="slide">
          <img
            src="./images/login-page/second-illustration.png"
            alt="illustration"
          />
          <p>Manage users efficiently</p>
        </div>
        <div className="slide">
          <img
            src="./images/login-page/third-illustration.png"
            alt="illustration"
          />
          <p>Streamline application process</p>
        </div> */}
      </div>

      <div className="sliders-container">
        <button></button>
        <button></button>
        <button></button>
      </div>
    </div>
  );
};

export default LoginCarousel;
