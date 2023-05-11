import "./ProfileTile.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuthUser } from "react-auth-kit";

const ProfileTile = (props) => {
  const [tileClass, setTileClass] = useState("profile-tile-normal");
  function toggleTile() {
    setTileClass("profile-tile-red");
    props.onActivate();
  }

  const [user, setUser] = useState([]);
  // const activeUser = Cookies.get("_auth_state").replace(/['"]+/g, "");
  const auth = useAuthUser();
  const activeUser = auth().user;

  useEffect(() => {
    console.log(activeUser);
    const fetchData = async () => {
      axios
        .get(`http://localhost:55731/api/UserAPI/getUser?id=${activeUser}`)
        .then((response) => {
          setUser(response.data);
          console.log(response.data);
        });
    };
    fetchData();
    console.log(activeUser);
  }, []);

  return (
    <Link to={props.path} state={{ title: "Profile" }}>
      <button
        onClick={toggleTile}
        className={`profile-tile ${
          props.isActive ? "profile-tile-red" : "profile-tile-normal"
        }`}
      >
        <img
          src="../../images/main-layout/james-reid.png"
          alt="profile-picture"
        />
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
