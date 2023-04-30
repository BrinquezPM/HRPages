import "./ProfileTile.css";
import { useState } from "react";

const ProfileTile = (props) => {
  const [tileClass, setTileClass] = useState("profile-tile-normal");
  function toggleTile() {
    if (tileClass === "profile-tile-normal") setTileClass("profile-tile-red");
    else if (tileClass === "profile-tile-red")
      setTileClass("profile-tile-normal");
  }
  return (
    <button onClick={toggleTile} className={`profile-tile ${tileClass}`}>
      <img src="./images/main-layout/james-reid.png" alt="profile-picture" />
      <div className="profile-tile-txts">
        <p id="profile-tile-name">Mel Jefferson Gabutan</p>
        <p id="profile-tile-role">Admin</p>
      </div>
    </button>
  );
};

export default ProfileTile;
