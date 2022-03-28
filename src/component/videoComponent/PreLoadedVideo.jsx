import React, { useRef, useState } from "react";
import VIDEO from "./Kolaveri.mp4";
import Styles from "./video.module.css";
import { FaPlay, FaPause } from "react-icons/fa";
const PreLoadedVideo = () => {
  let videoRef = useRef();
  let [play, setPlay] = useState(true);

  let VideoControls = () => {
    setPlay(!play);
    if (play) {
      videoRef.current.pause();
      videoRef.current.muted = true;
    } else {
      videoRef.current.play();
      videoRef.current.muted = false;
    }
  };
  return (
    <section id={Styles.videoBlock}>
      <div className={Styles.videoDesc}>
        <h2>
          Unlimited movies,TV <br />
          shows and more
        </h2>
        <p>Watch anywhere. Cancel anytime.</p>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <p>
          <main onClick={VideoControls}>
            {play ? (
              <aside className={Styles.videoAside}>
                <FaPause className={Styles.videoPlay} />
                <span>Pause</span>
              </aside>
            ) : (
              <aside className={Styles.videoAside}>
                <FaPlay className={Styles.videoPlay} />
                <span>Play</span>
              </aside>
            )}
          </main>
        </p>
      </div>
      <video
        ref={videoRef}
        src={VIDEO}
        className={Styles.videoBlockPlayer}
        muted
        autoPlay
      ></video>
    </section>
  );
};

export default PreLoadedVideo;
