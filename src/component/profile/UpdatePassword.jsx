import React, { useState, useContext } from "react";
import Styles from "../authComponent/auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { updatePassword } from "firebase/auth";
import {AuthContext} from "../../api/AuthContext"
const UpdatePassword = () => {
  let USER = useContext(AuthContext);
  let navigate = useNavigate();
  let [password, setPassword] = useState("");
  let [passwordShow, setPasswordShow] = useState(false);
  let [toggle, setToggle] = useState(false);
  let [loading, setLoading] = useState(false);
  let ChangeIcon = () => {
    setToggle(!toggle);
    setPasswordShow(!setPasswordShow);
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updatePassword(USER, password);

      toast.success("successfully password updated");
      navigate("/myprofile");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false);
    setPassword("");
  };
  return (
    <section id={Styles.authSection}>
      <article className={Styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>update password</h2>
        <div className={Styles.formBlock}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password" className={Styles.formLabel}>
                New password
              </label>
              <input
                type={passwordShow === true ? "text" : `password`}
                className={Styles.formControl}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className={Styles.eyeIcon} onClick={ChangeIcon}>
                {toggle !== true ? (
                  <FaEyeSlash className={Styles.eyeIconSVG} />
                ) : (
                  <FaEye className={Styles.eyeIconSVG} />
                )}
              </span>
            </div>
            <div className="form-group">
              <p className={Styles.gotoAuth}>
                <Link to="/myprofile" className={Styles.gotoAuthLink}>
                  go back to my profile
                </Link>
              </p>
            </div>
            <div className="form-group">
              <button className={Styles.btn}>
                {loading ? "loading..." : "Password Update"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default UpdatePassword;
