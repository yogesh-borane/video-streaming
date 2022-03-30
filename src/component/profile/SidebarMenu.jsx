import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { MdOutlineAccountCircle, MdUploadFile } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import Styles from "./myprofile.module.css";
import { deleteUser } from "firebase/auth";
import { AuthContext } from "../../api/AuthContext";
const SidebarMenu = () => {
  let USER = useContext(AuthContext);
  let RemoveAccount = async () => {
    let deletedUser = await deleteUser(USER);
    if (window.confirm("Are you sure delete an account ?")) {
      window.sessionStorage.removeItem("TOKEN");
      window.location.assign("/signup");
      return deletedUser;
    }
  };
  return (
    <div>
      <ul className={Styles.sideMenu}>
        <li>
          <Link to="/myprofile/my-account">
            <span>
              <MdOutlineAccountCircle />
            </span>
            <span>My Account</span>
          </Link>
        </li>
        <li>
          <Link to="/myprofile/upload-photo">
            <span>
              <MdUploadFile />
            </span>
            <span>upload photo</span>
          </Link>
        </li>
        <li>
          <Link to="/myprofile/update-password">
            <span>
              <MdUploadFile />
            </span>
            <span>update password</span>
          </Link>
        </li>
        <li className={Styles.lastChild} onClick={RemoveAccount}>
          <a to="#">
            <span>
              <TiUserDelete />
            </span>
            <span>Remove account</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
