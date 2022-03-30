import React, { useContext, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Styles from "./navbar.module.css";
import { AuthContext } from "../../../api/AuthContext";
import { FaUser } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../../api/firebase";
import { toast } from "react-toastify";
const Menu = () => {
  let [toggle, setToggle] = useState(false);
  let USER = useContext(AuthContext);
  let toggleRef = useRef();
  let dropdownMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setToggle(!toggle);
  };

  let LogOut = async () => {
    await signOut(auth);
    window.sessionStorage.removeItem("TOKEN");
    toast.success("successfully logout");
    window.location.assign("/login");
  };

  let AuthenticatedUser = () => {
    return (
      <>
        <li onClick={dropdownMenu}>
          <NavLink to={{ pathname: "/" }} className={Styles.navbarIconLink}>
            <span>
              <img
                src={USER.photoURL}
                alt={USER.displayName}
                className={Styles.navbarIcon}
              />
            </span>
            {/* <span>{USER.displayName}</span> */}
            <span>profile</span>
          </NavLink>
          <div className={toggle === true ? "dropDown show" : "dropDown hide"}>
            <ul>
              <li>
                <NavLink to="/myprofile">
                  <span>
                    <FaUser />
                  </span>
                  My profile
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <a href="#" onClick={LogOut} className={Styles.navbarAnchor}>
            Logout
          </a>
        </li>
      </>
    );
  };
  let AnonymouseUser = () => {
    return (
      <>
        <li>
          <NavLink
            to={{ pathname: "login" }}
            activeclassname="active"
            className={Styles.navbarAnchor}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{ pathname: "signup" }}
            activeclassname="active"
            className={Styles.navbarAnchor}
          >
            Signup
          </NavLink>
        </li>
      </>
    );
  };
  return (
    <div className={Styles.menu}>
      <ul>
        <li>
          <NavLink
            to={{ pathname: "/" }}
            activeclassname="active"
            className={Styles.navbarAnchor}
          >
            Home
          </NavLink>
        </li>
        {USER ? <AuthenticatedUser /> : <AnonymouseUser />}
      </ul>
    </div>
  );
};

export default Menu;
