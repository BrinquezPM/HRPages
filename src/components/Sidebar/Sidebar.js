import "./Sidebar.css";
import ProfileTile from "../ProfileTile/ProfileTile";
import SidebarTile from "../SidebarTile/SidebarTile";
import { useState } from "react";

const Sidebar = (props) => {
  const [isApplicantsActive, setIsApplicantsActive] = useState(false);
  const [isUsersActive, setIsUserssActive] = useState(false);

  function activateApplicants() {
    setIsApplicantsActive(true);
  }

  function activateUsers() {
    setIsApplicantsActive(true);
  }

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <img
          id="sidebar-img"
          src="./images/login-page/alliance-logo.png"
          alt="alliance-logo"
        />
        <ProfileTile />
        <p className="sidebar-general">General</p>
        <SidebarTile
          id="/applicants"
          txt="Applicants"
          img="./images/main-layout/applicants-icon.png"
        />
        <SidebarTile
          id="/users"
          txt="Users"
          img="./images/main-layout/users-icon.png"
        />
      </div>
      <div className="vertical-bar"></div>
    </div>
  );
};

export default Sidebar;
