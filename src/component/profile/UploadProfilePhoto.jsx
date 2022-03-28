import React, { useState, useContext } from "react";
import Styles from "../authComponent/auth.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { storage, auth } from "../../api/firebase";
import {
  ref as photoRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../api/AuthContext";

const UploadProfilePhoto = () => {
  let USER = useContext(AuthContext);
  let [loading, setLoading] = useState(false);
  let [photo, setPhoto] = useState("");
  let [progress, setProgress] = useState(0);
  let [barStatus, setBarstatus] = useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let storageRef = photoRef(storage, `/profile-photo/${photo.name}`);
      let uploadTask = uploadBytesResumable(storageRef, photo);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          //progressing upload photo snapShot
          let progressBar =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          setProgress(progressBar);
          setBarstatus(true);
          setLoading(true);
        },
        (err) => {},
        async () => {
          //completion task
          let downloadURL = await getDownloadURL(storageRef);
          updateProfile(USER, {
            photoURL: downloadURL,
          });
          setBarstatus(false);
          setLoading(false);
          toast.success("successfully photo updated");
          window.location.assign("/");
        }
      );
      //firebase event
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  let ProgressUI = () => {
    return (
      <div class="progress">
        <div class="bar" style={{ width: `${progress}%` }}>
          <p class="percent">{Math.round(progress)}</p>
        </div>
      </div>
    );
  };

  return (
    <section id={Styles.authSection}>
      <header>
        <span>{barStatus === true ? <ProgressUI /> : ""}</span>
      </header>
      <article className={Styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Sign In</h2>
        <div className={Styles.formBlock}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="upload-photo" className={Styles.formLabel}>
                Upload Photo
              </label>
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                className={Styles.formControl}
              />
            </div>
            <div className="form-group">
              <p className={Styles.gotoAuth}>
                go back to profile{""}
                <Link to="/myprofile" className={Styles.gotoAuthLink}>
                  go back
                </Link>
              </p>
            </div>
            <div className="form-group">
              <button className={Styles.btn}>
                {loading ? "loading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default UploadProfilePhoto;
