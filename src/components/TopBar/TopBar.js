import "./TopBar.css";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

const TopBar = (props) => {
  const [isLogoutModalActive, setIsLogoutModalActive] = useState(false);
  const toggleLogoutModal = () => {
    setIsLogoutModalActive(!isLogoutModalActive);
  };

  const location = useLocation();

  let searchVisibility = false;
  switch (location.pathname) {
    case "/":
    case "/applicants":
    case "/users":
      searchVisibility = "visible";
      break;
    default:
      searchVisibility = "hidden";
  }

  const signOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div className="top-bar">
      <SearchBar searchVisibility={searchVisibility} />
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
          onClose={logout}
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
