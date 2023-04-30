import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons";
import allianceLogo from "../Images/AllianceLogo.png";
import ProfileSample from "../Images/ProfileSample.png";
import "bootstrap/dist/css/bootstrap.min.css";
import emergency from "../Images/emergency-exit.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Navbar() {
  const [sidebar, setSidebar] = useState(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <br></br>

        <div className="navbar">
          <div style={{ paddingInlineStart: "15.5%" }}>
            <div class="input-group mb-3 input-group-lg">
              <div class="input-group-prepend">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  style={{ border: "0" }}
                >
                  <FaIcons.FaSearch size={35} />
                </button>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="e.g. John Doe"
                aria-label=""
                aria-describedby="basic-addon1"
              ></input>
            </div>
          </div>
          <div className="navbar-right">
            <FaIcons.FaSignOutAlt
              className="logout-icon"
              size={30}
              style={{ display: "flex", marginLeft: -110 }}
              onClick={handleShow}
            />
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="/" className="menu-bars">
                <br></br>

                <img src={allianceLogo} alt="Logo" className="navbar-logo" />
              </Link>
            </li>
            <br></br>
            <li className="navbar-button" style={{ listStyleType: "none" }}>
              <button
                className="admin-button"
                style={{ width: 200, height: 60, border: 0 }}
              >
                <img
                  src={ProfileSample}
                  alt="Admin"
                  style={{ display: "flex" }}
                />
                <div className="admin-info">
                  <span className="admin-name">John Doe</span>
                  <span className="admin-title">Admin</span>
                </div>
              </button>
            </li>

            <br></br>
            <p>General</p>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <img
                src={emergency}
                alt="emergency"
                style={{ alignContent: "center" }}
              ></img>
              <h2>Sign Out</h2>
              <span>Are you sure you want to sign out?</span>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              display: "flex",
              justifyContent: "center",
              border: "none",
            }}
          >
            <Button variant="success" onClick={handleClose} size="lg">
              Sign Out
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Navbar;
