import React, { useContext } from "react";
import Styles from "./myprofile.module.css";
import { AuthContext } from "../../api/AuthContext";
import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../pages/spinner/Spinner";

const MyAccount = () => {
  let USER = useContext(AuthContext);

  let ProfileUI = () => {
    console.log(USER);
    let { displayName, email, emailVerified, photoURL } = USER;
    return (
      <>
        <div className={Styles.photoURL}>
          <aside className={Styles.asideIcon}>
            <Link to="/myprofile/upload-photo">
              <figure>
                <img src={photoURL} alt={displayName} />
              </figure>
              <main>
                <span className={Styles.cameraIcon}>
                  <FaCamera />
                </span>
              </main>
            </Link>
          </aside>
          <footer>
            <h2>{displayName}</h2>
          </footer>
        </div>
        <div className={Styles.userInfo}>
          <aside>
            <p>{email}</p>
            <p>{emailVerified}</p>
          </aside>
        </div>
      </>
    );
  };
  return (
    <section>
      <article>{USER === null ? <Spinner /> : <ProfileUI />}</article>
    </section>
  );
};

export default MyAccount;
