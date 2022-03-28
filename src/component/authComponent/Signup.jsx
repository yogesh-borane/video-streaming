import React, { useState } from "react";
import { toast } from "react-toastify";
import Styles from "./auth.module.css";
import { auth } from "../../api/firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import md5 from "md5";
const Signup = () => {
  let navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [loading, setLoading] = useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        toast.error("password is not matched");
      } else {
        let userData = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("User created successfully");
        let confirmationMail = `verification mail has been sent to ${email} address and verify`;
        console.log(userData);
        let user = userData.user;
        sendEmailVerification(user);
        updateProfile(user, {
          photoURL:
            `https://www.gravatar.com/avatar/${md5(email)}q=identicon`,
          displayName: username,
        });
        navigate("/login");
        toast.info(confirmationMail);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message.slice(9));
    }
    setLoading(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <section id={Styles.authSection}>
      <article className={Styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Sign up</h2>
        <div className={Styles.formBlock}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className={Styles.formLabel}>
                username
              </label>
              <input
                type="text"
                value={username}
                className={Styles.formControl}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
                type="password"
                className={Styles.formControl}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className={Styles.formLabel}>
                Confirm password
              </label>
              <input
                type="password"
                className={Styles.formControl}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <p className={Styles.gotoAuth}>
                already registered{""}
                <Link to="/login" className={Styles.gotoAuthLink}>
                  Login
                </Link>
              </p>
            </div>
            <div className="form-group">
              <button className={Styles.btn}>
                {loading ? "loading..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default Signup;
