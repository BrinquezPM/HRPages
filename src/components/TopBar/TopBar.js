import "./TopBar.css";
import SearchBar from "../SearchBar/SearchBar";

const TopBar = (props) => {
  return (
    <div className="top-bar">
      <SearchBar searchVisibility="visible" />
      <button id="logout-btn">
        <img
          id="logout-img"
          src="./images/main-layout/logout.png"
          alt="logout-icon"
        />
      </button>
    </div>
  );
};

export default TopBar;
