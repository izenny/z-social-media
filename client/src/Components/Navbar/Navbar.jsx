import React from "react";
import "../Navbar/Navbar.css";
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeData } from "../../Redux/Userredux";
const Navbar = () => {
  const Ldispatch = useDispatch();
  const Logout = () => {
    Ldispatch(removeData());
  };
  return (
    <div className="nav-p">
      <div className="nav-c">
        <div className="logo-nav">
          <img
            src="https://i.pinimg.com/736x/47/6e/34/476e349199ec2d764f541017daa8a7ab.jpg"
            alt=""
          />
        </div>

        <div className="icons-nav">
          <NavLink to={"/"}>
            <div className="icons-fa">
              <FaHome className="icon" />
            </div>
          </NavLink>
          <NavLink to={"/profile"}>
            <div className="icons-fa">
              <FaUser className="icon" />
            </div>
          </NavLink>
          <NavLink to={"/messages"}>
            <div className="icons-fa">
              <FaEnvelope className="icon" />
            </div>
          </NavLink>
          <NavLink to={"/notifications"}>
            <div className="icons-fa">
              <FaBell className="icon" />
            </div>
          </NavLink>
          <NavLink to={"/settings"}>
            <div className="icons-fa">
              <FaCog className="icon" />
            </div>
          </NavLink>

          <NavLink to={"/"}>
            {" "}
            <div className="icons-fa" onClick={Logout}>
              <FaSignOutAlt className="icon" />
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
