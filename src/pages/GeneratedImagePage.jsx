import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import exportAsImage from "../utils/exportAsImage";
import logo from "./../assets/logo.png";
import frame from "./../assets/generated-image-frame.png";

export default function GeneratedImagePage({ generatedImage }) {
  const exportRef = useRef();
  //   const [isLoading, setIsLoading] = useState(false);
  generatedImage && console.log(generatedImage);

  /* useEffect(() => {
    if (generatedImage) {
      setIsLoading(true);
    }
  }, [generatedImage]); */

  return (
    <GeneratedImageWrapper>
      {/* header starts here */}
      <header>
        <div className="title">
          <h1>Download Your Image</h1>
        </div>
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </header>
      {/* header ends here */}
      {generatedImage ? (
        <div className="generatedImageContainer">
          <div className="generatedImageParent" ref={exportRef}>
            <img
              src={generatedImage}
              alt="generated image"
              className="generatedImage"
            />
            <img src={frame} alt="generated image frame" className="frame" />
          </div>
          <button
            onClick={() =>
              exportAsImage(exportRef.current, "ai-photobooth-freedom-fighter")
            }
          >
            Download
          </button>
        </div>
      ) : (
        <div className="loading">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </GeneratedImageWrapper>
  );
}

const GeneratedImageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* border: 1px solid black; */

  /* header starts here */
  header {
    /* border: 1px solid black; */
    display: flex;
    justify-content: space-between;
    .title {
      /* border: 1px solid red; */
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 10vw;
      h1 {
        border: 0.15vw solid black;
        padding: 0.1vw 0.4vw;
        font-size: 3vw;
        font-weight: 600;
        border-radius: 0.7vw;
      }
    }
    .logo {
      width: 10vw;
      height: 10vw;
      /* border: 1px solid red; */
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  /* header ends here */
  .generatedImageContainer {
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    gap: 4vw;
    margin-top: 3vw;
    .generatedImageParent {
      /* border: 1px solid black; */
      margin: 0 auto;
      width: 40vh;
      position: relative;
      .generatedImage {
        width: 100%;
        height: 100%;
        box-shadow: 0.2vh 0.2vh 0.8vh rgba(0, 0, 0, 0.5);
        /* border-radius: 3.5vh; */
      }
      .frame {
        position: absolute;
        top: 0;
        left: 0;
        width: 100.3%;
        height: 100.3%;
      }
    }

    button {
      border: none;
      outline: none;
      padding: 0.5vw 2vw;
      font-weight: 600;
      font-size: 1.5vw;
      border-radius: 0.6vw;
      cursor: pointer;
      background-color: #fcb017;
      margin: 0 auto;
      display: block;
      box-shadow: 0.1vw 0.1vw 0.4vw rgba(0, 0, 0, 0.5);
      transform: translateY(-0.1vw);
      transition: all ease 0.5s;
      &:hover {
        box-shadow: none;
        transform: translateY(0);
      }
    }
  }

  /* loading starts here */
  .loading {
    margin: auto;
    .lds-ring {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      margin: 8px;
      border: 8px solid #fff;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #fff transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  /* loading ends here */
`;
