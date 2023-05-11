import "./Sidebar.css";
import ProfileTile from "../ProfileTile/ProfileTile";
import SidebarTile from "../SidebarTile/SidebarTile";
import { useState } from "react";

const Sidebar = (props) => {
  const [isApplicantsActive, setIsApplicantsActive] = useState(
    window.location.pathname.startsWith("/applicants") ? true : false
  );
  const [isUsersActive, setIsUsersActive] = useState(
    window.location.pathname === "/users" ? true : false
  );
  const [isProfileActive, setIsProfileActive] = useState(
    window.location.pathname === "/profile" ? true : false
  );

  function activateProfile() {
    setIsProfileActive(true);
    setIsApplicantsActive(false);
    setIsUsersActive(false);
  }

  function activateApplicants() {
    setIsApplicantsActive(true);
    setIsUsersActive(false);
    setIsProfileActive(false);
  }

  function activateUsers() {
    setIsApplicantsActive(false);
    setIsUsersActive(true);
    setIsProfileActive(false);
  }

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <img
          id="sidebar-img"
          src="../../images/login-page/alliance-logo.png"
          alt="alliance-logo"
        />
        <ProfileTile
          path="/profile"
          isActive={isProfileActive}
          onActivate={activateProfile}
        />
        <p className="sidebar-general">General</p>
        <SidebarTile
          id="/applicants"
          txt="Applicants"
          img="../../images/main-layout/applicants-icon.png"
          path="/applicants/1"
          isActive={isApplicantsActive}
          onActivate={activateApplicants}
        />
        <SidebarTile
          id="/users"
          txt="Users"
          img="../../images/main-layout/users-icon.png"
          path="/users"
          isActive={isUsersActive}
          onActivate={activateUsers}
        />
      </div>
      <div className="vertical-bar"></div>
    </div>
  );
};

export default Sidebar;
