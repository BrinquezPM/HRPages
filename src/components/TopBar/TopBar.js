import "./TopBar.css";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { useLocation } from "react-router";

const TopBar = (props) => {
  const [isLogoutModalActive, setIsLogoutModalActive] = useState(false);
  const toggleLogoutModal = () => {
    setIsLogoutModalActive(!isLogoutModalActive);
  };
  // const [isProfileActive,setIsProfileActive] = useState(false);
  // useEffect(() => {
  //   // Function to update the state based on the current pathname
  //   function updateIsProfileActive(){
  //     setIsProfileActive(window.location.pathname === "/profile" || window.location.pathname === "/user");
  //   }
  //   // Event listener to the window to listen for changes to the pathname
  //   window.addEventListener("popstate", updateIsProfileActive);
  //   // Calling the update function once to set the initial state based on the current pathname
  //   updateIsProfileActive();
  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("popstate", updateIsProfileActive);
  //   };
  // }, []);
  const curPath = useLocation();
  let searchVisibility = false;
  if(curPath.pathname === "/user" || curPath.pathname === "/profile"){
    searchVisibility = "hidden";
  }
  else{
    searchVisibility = "visible"
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
