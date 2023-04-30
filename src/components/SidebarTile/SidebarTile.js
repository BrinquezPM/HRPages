
import "./SidebarTile.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const SidebarTile = (props) => {

  const [tileClass, setTileClass] = useState("sidebar-normal");

  function toggleTile() {
    setTileClass("sidebar-red");
    props.onActivate();
  }

  // function toggleTile() {
  //   if (tileClass === "sidebar-normal"){
  //     setTileClass("sidebar-red");
  //   } 
  //   else if (tileClass === "sidebar-red"){
  //     setTileClass("sidebar-normal");
  //   } 

  // }

  return (
   <Link to={props.path}>
      <button
        id={props.id}
        onClick={() => toggleTile(props.id)}
        className={`sidebar-tile ${props.isActive ? "sidebar-red" : "sidebar-normal"}`}
      >
        <img src={props.img} alt="tile-icon" />
        <span style={{textDecoration: "none"}}>{props.txt}</span>
      </button>
    </Link>
    
  );
};

export default SidebarTile;
