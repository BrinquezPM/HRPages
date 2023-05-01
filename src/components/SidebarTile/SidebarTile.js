import "./SidebarTile.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const SidebarTile = (props) => {
  const [tileClass, setTileClass] = useState("sidebar-normal");

  function toggleTile() {
    setTileClass("sidebar-red");
    props.onActivate();
  }

  function removePng(str) {
    return str.replace(/\.png$/i, "");
  }

  return (
    <Link to={props.path}>
      <button
        id={props.id}
        onClick={() => toggleTile(props.id)}
        className={`sidebar-tile ${
          props.isActive ? "sidebar-red" : "sidebar-normal"
        }`}
      >
        <img
          src={props.isActive ? `${removePng(props.img)}-red.png` : props.img}
          alt="tile-icon"
        />
        <span id={props.isActive ? "sidebar-txt-active" : ""}>{props.txt}</span>
      </button>
    </Link>
  );
};

export default SidebarTile;
