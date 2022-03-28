import React, { useState } from "react";
import { toast } from "react-toastify";
import Styles from "./auth.module.css";
import { auth } from "../../api/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [toggle, setToggle] = useState(false);
  let [passwordShow, setPasswordShow] = useState(false);

  let ChangeIcon = () => {
    setToggle(!toggle);
    setPasswordShow(!passwordShow);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let userData = await signInWithEmailAndPassword(auth, email, password);
      if (userData.user.emailVerified === true) {
        toast.success("succesfully user logen in");
        navigate("/");
      } else {
        navigate("/login");
        toast.error("user not yet verified");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message.slice(9));
    }
    setLoading(false);
    setEmail("");
    setPassword("");
  };
  return (
    <section id={Styles.authSection}>
      <article className={Styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Sign In</h2>
        <div className={Styles.formBlock}>
          <Link to="/phone-reset">try with mobile number</Link>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className={Styles.formLabel}>
                email
              </label>
              <input
                type="email"
                value={email}
                className={Styles.formControl}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className={Styles.formLabel}>
                password
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
                new to stream base{""}
                <Link to="/signup" className={Styles.gotoAuthLink}>
                  Signup
                </Link>
              </p>
            </div>
            <div className="form-group">
              <button className={Styles.btn}>
                {loading ? "loading..." : "Login"}
              </button>
              <p style={{ clear: "both", padding: "3px 0", float: "right" }}>
                <Link to="/password-reset" className={Styles.gotoAuthLink}>
                  Forgot password ?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default Login;
