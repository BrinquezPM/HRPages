import "./TopBar.css";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

const TopBar = (props) => {
  const [isLogoutModalActive, setIsLogoutModalActive] = useState(false);
  const toggleLogoutModal = () => {
    setIsLogoutModalActive(!isLogoutModalActive);
  };
  const [isProfileActive,setIsProfileActive] = useState(false);
  useEffect(() => {
    // Function to update the state based on the current pathname
    function updateIsProfileActive(){
      setIsProfileActive(window.location.pathname === "/profile");
    }
    // Event listener to the window to listen for changes to the pathname
    window.addEventListener("popstate", updateIsProfileActive);
    // Calling the update function once to set the initial state based on the current pathname
    updateIsProfileActive();
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", updateIsProfileActive);
    };
  }, []);
  return (
    <div className="top-bar">
      <SearchBar 
        searchVisibility={`${isProfileActive ? "hidden" : "visible"}`}
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
