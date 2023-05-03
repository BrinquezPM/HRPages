import "./ProfileTile.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfileTile = (props) => {
  const [tileClass, setTileClass] = useState("profile-tile-normal");
  function toggleTile() {
    setTileClass("profile-tile-red");
    props.onActivate();
  }

  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          "http://localhost:55731/api/UserAPI/getUser?id=0ffab3f7-fb85-4806-a0fa-ee9d419de037"
        )
        .then((response) => {
          setUser(response.data);
          console.log(response.data);
        });
    };
    fetchData();
  }, []);

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
          <p id="profile-tile-name">
            {user.user_firstName} {user.user_lastName}
          </p>
          <p id="profile-tile-role">Admin</p>
        </div>
      </button>
    </Link>
  );
};

export default ProfileTile;
