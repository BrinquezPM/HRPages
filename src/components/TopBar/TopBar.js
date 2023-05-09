import "./TopBar.css";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useLocation } from "react-router";

const TopBar = (props) => {
  const [isLogoutModalActive, setIsLogoutModalActive] = useState(false);
  const toggleLogoutModal = () => {
    setIsLogoutModalActive(!isLogoutModalActive);
  };
  const curPath = useLocation();
  let searchVisibility = false;
  if(curPath.pathname === "/applicants" || curPath.pathname === "/users"){
    searchVisibility = "visible";
  }
  else{
    searchVisibility = "hidden"
  }
  return (
    <div className="top-bar">
      <SearchBar 
        searchVisibility={searchVisibility}
      />
      <button onClick={toggleLogoutModal} id="logout-btn">
        <img
          id="logout-img"
          src="./images/main-layout/logout.png"
          alt="logout-icon"
        />
      </button>
      {isLogoutModalActive && (
        <Modal
          onClick={toggleLogoutModal}
          backgroundColor="#4E9E32"
          title="Sign Out"
          description="Are you sure you want to sign out?"
          btnTxt="Sign Out"
          icon="./images/main-layout/sign-out.png"
        />
      )}
    </div>
  );
};

export default TopBar;
