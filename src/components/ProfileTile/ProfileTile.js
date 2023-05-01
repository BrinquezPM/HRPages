import "./ProfileTile.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProfileTile = (props) => {
  const [tileClass, setTileClass] = useState("profile-tile-normal");
  function toggleTile() {
    setTileClass("profile-tile-red");
    props.onActivate();
  }
  return (
    <Link to={props.path}>
      <button
        onClick={toggleTile}
        className={`profile-tile ${
          props.isActive ? "profile-tile-red" : "profile-tile-normal"
        }`}
      >
        <img src="./images/main-layout/james-reid.png" alt="profile-picture" />
        <div className="profile-tile-txts">
          <p id="profile-tile-name">Mel Jefferson Gabutan</p>
          <p id="profile-tile-role">Admin</p>
        </div>
      </button>
    </Link>
  );
};

export default ProfileTile;
