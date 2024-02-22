import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo from "./../assets/logo.png";
import frame from "./../assets/bigscreen-capture-image-frame.png";

export default function CaptureImagePage({ setCapturedImg }) {
  const navigate = useNavigate();
  const webRef = useRef();
  const [img, setImg] = useState();

  const handleCapture = e => {
    if (e.target.innerText === "Capture") {
      setImg(webRef.current.getScreenshot());
      e.target.innerText = "Retake";
    } else {
      img && setImg("");
      e.target.innerText = "Capture";
    }
  };

  // toast options
  const toastOptions = {
    position: "bottom-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleSubmit = () => {
    if (img) {
      /* setCapturedImg(`data:image/webp;base64,${img}`); */
      setCapturedImg(img);
      navigate("/avatar");
    } else {
      toast.error("Please capture your image", toastOptions);
    }
  };
  return (
    <CaptureImageWrapper>
      <header>
        <h1>Capture Your Image</h1>
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </header>

      <main>
        <div className="webcamContainer">
          <div className="webcamParent">
            <Webcam
              ref={webRef}
              id="webcam"
              forceScreenshotSourceSize={true}
              // screenshotFormat="image/png"
            />
            {img && (
              <img src={img} alt="captured image" className="capturedImage" />
            )}
          </div>
          {/* <img src={frame} alt="frame" className="frame" /> */}
        </div>

        <div className="capture">
          <button onClick={e => handleCapture(e)} className="captureRetake btn">
            Capture
          </button>
          <button onClick={handleSubmit} className="submit btn">
            Submit
          </button>
        </div>
      </main>
      <ToastContainer />
    </CaptureImageWrapper>
  );
}

const CaptureImageWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 2vw;
  justify-content: space-between;
  main {
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vw;
    .webcamContainer {
      position: relative;
      /* height: 26.25vw; */
      width: 30vw;
      background-color: #c72041;
      border: 5px solid #c72041;
      border-bottom: 0px solid #c72041;
      border-radius: 1vw;
      .webcamParent {
        position: relative;
        /* height: 100%; */
        width: 100%;
        overflow: hidden;
        /* border: 5px solid #212121; */
        #webcam {
          border-radius: 1vw;
          margin: 0 auto;
          width: 100.3%;
          /* height: 100.3%; */
          /* object-fit: cover; */
        }
        .capturedImage {
          position: absolute;
          top: 0;
          left: 0;
          width: 100.3%;
          border-radius: 1vw;
          /* height: 99%; */
        }
      }
      /*  .frame {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      } */
    }
    .capture {
      /* border: 1px solid black; */
      display: flex;
      gap: 2vw;
      .captureRetake {
        /* background-color: #fcb017; */
        width: 10vw;
      }
      .submit {
        border: 0.1vw solid black;
        background-color: transparent;
        color: #000;
      }
    }
  }

  /* captureImage ends here */

  .logo {
    /* border: 1px solid red; */
    width: 10vw;
    height: 10vw;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
