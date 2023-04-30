import "./SidebarTile.css";
import { useState } from "react";

const SidebarTile = (props) => {
  const [tileClass, setTileClass] = useState("sidebar-normal");
  function toggleTile() {
    if (tileClass === "sidebar-normal") setTileClass("sidebar-red");
    else if (tileClass === "sidebar-red") setTileClass("sidebar-normal");
  }
  return (
    <button
      id={props.id}
      onClick={toggleTile}
      className={`sidebar-tile ${tileClass}`}
    >
      <img src={props.img} alt="tile-icon" />
      <span>{props.txt}</span>
    </button>
  );
};

export default SidebarTile;
