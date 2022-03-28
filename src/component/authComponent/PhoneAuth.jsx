import React, { useState } from "react";
import { toast } from "react-toastify";
import Styles from "./auth.module.css";
import { auth } from "../../api/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
const PhoneAuth = () => {
  let navigate = useNavigate();
  let [phone, setPhone] = useState("");
  let [loading, setLoading] = useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let recaptchVerifier = new RecaptchaVerifier(
        "captcha-container",
        {
          size: "invisible",
          callback: (Response) => {
            //reCAPTCHA solved ,allow signInWithPhoneNumber
          },
        },
        auth
      );
      //send otp
      let sendOTP = await signInWithPhoneNumber(auth, phone, recaptchVerifier);
      let confirmationMesage = window.prompt("enter your phone otp");
      await sendOTP.confirm(confirmationMesage);
      toast.success("succesfully logged in");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <section id={Styles.authSection}>
      <article className={Styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Sign in with phone number</h2>
        <div className={Styles.formBlock}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone" className={Styles.formLabel}>
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                className={Styles.formControl}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <p className={Styles.gotoAuth}>
                go back to stream base{""}
                <Link to="/login" className={Styles.gotoAuthLink}>
                  login
                </Link>
              </p>
            </div>
            <div id="captcha-container"></div>
            <div className="form-group">
              <button className={Styles.btn}>
                {loading ? "loading..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default PhoneAuth;
