import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "./../assets/logo.png";
import { useNavigate } from "react-router-dom";
import select from "./../assets/select.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { maleCardsActual, femaleCardsActual } from "./../utils/constantsActual";
import { maleCards, femaleCards } from "../utils/constants";
import { Link } from "react-router-dom";

export default function AvatarPage({
  capturedImage,
  setGeneratedImage,
  selectedGender,
  setUrl,
}) {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [cards, setCards] = useState();

  capturedImage && console.log("capturedImage =>", capturedImage.split(",")[1]);
  selectedImage && console.log("selectedImage =>", selectedImage.split(",")[1]);

  // converting selectedImage to base64 format
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const getImageData = img => {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    return canvas.toDataURL("image/png");
  };

  selectedGender &&
    useEffect(() => {
      if (selectedGender.toLowerCase() === "female") {
        setCards(femaleCards);
      } else if (selectedGender.toLowerCase() === "male") {
        setCards(maleCards);
      }
    }, [selectedGender]);

  cards && console.log(cards);

  // filtering card image with actual image
  const filterActualImg = index => {
    if (selectedGender.toLowerCase() === "female") {
      const filteredActualImgArr = femaleCardsActual.filter(
        (actualImg, ActualIndex) => ActualIndex === index
      );
      return filteredActualImgArr[0];
    } else if (selectedGender.toLowerCase() === "male") {
      const filteredActualImgArr = maleCardsActual.filter(
        (actualImg, ActualIndex) => ActualIndex === index
      );
      return filteredActualImgArr[0];
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

  // submitting the selected image and post request to api
  const handleSubmit = () => {
    console.log("clicked");
    setGeneratedImage("");
    if (selectedImage) {
      axios
        .post("https://03f2-103-17-110-127.ngrok-free.app/rec", {
          image: capturedImage.split(",")[1],
          choice: selectedImage.split(",")[1],
        })
        .then(function (response) {
          console.log(response);
          setGeneratedImage(`data:image/webp;base64,${response.data.result}`);

          // upload image on server
          axios
            .post("https://adp24companyday.com/aiphotobooth/upload.php", {
              // img: generatedImage.split(",")[1],
              img: response.data.result,
            })
            .then(function (response) {
              console.log(response);
              // setUrl(response.data.url);
              setUrl(response.data.url);
              console.log("image uploaded");
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
      navigate("/generated-image");
    } else {
      toast.error("Please select an image...", toastOptions);
    }
  };
  return (
    <AvatarPageWrapper>
      <header>
        <h1>Select Your Avatar</h1>
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </header>

      <main>
        {cards?.map((src, index) => (
          <div
            key={index}
            className="singleImageContainer"
            id={index == 3 ? "ml" : ""}
            onClick={() => {
              setSelectedImageIndex(index);
              console.log("img", src);
              var img = new Image();
              const actualImg = filterActualImg(index);
              img.src = actualImg;
              img.onload = () => {
                console.log("actual+>", actualImg);
                setSelectedImage(getImageData(img));
              };
            }}
          >
            <div className="imageParent">
              <img src={src} alt="images" />
              <div className="imageHoverContainer"></div>
            </div>
            <img
              src={select}
              alt="selected"
              className={`selectIcon ${
                selectedImageIndex === index ? "showSelectIcon" : ""
              }`}
            />
          </div>
        ))}
      </main>
      <footer>
        <button onClick={handleSubmit} className="btn">
          Submit
        </button>
      </footer>

      <ToastContainer />
    </AvatarPageWrapper>
  );
}

const AvatarPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vw;
  main {
    margin: 0 auto;
    width: 60%;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2vw;
    flex-wrap: wrap;
    .singleImageContainer {
      width: 10vw;
      height: 13vw;
      border: 0.15vw solid #fff;
      position: relative;
      overflow: hidden;
      box-shadow: 0.1vw 0.1vw 0.4vw rgba(0, 0, 0, 0.5);
      border-radius: 0.9vw;
      cursor: pointer;
      .imageParent {
        width: 100%;
        height: 100%;
        /* border: 1px solid black; */
        img {
          /* border: 1px solid black; */
          width: 100%;
          height: 100%;
          border-radius: 0.9vw;
          transition: all ease 0.5s;
        }
        &:hover img {
          transform: scale(1.1);
        }
        &:hover .imageHoverContainer {
          opacity: 1;
        }
        .imageHoverContainer {
          background: linear-gradient(
            transparent,
            transparent,
            rgba(0, 0, 0, 1)
          );
          opacity: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 0.9vw;
          transition: all ease 0.5s;
        }
      }
      .selectIcon {
        display: none;
        position: absolute;
        bottom: 5%;
        left: 40%;
        width: 2vw;
      }
      .showSelectIcon {
        display: flex;
      }
    }
    /*  #ml {
      margin-left: 5vw;
    } */
  }
  .btn {
    display: block;
    margin: 0 auto;
  }

  /*   @media screen and (min-width: 1440px) {
    main {
      background-color: red;
      height: 100vh;
    }
  }

  @media screen and (max-width: 1440px) {
    main {
      height: 95vh;
    }
  }

  @media screen and (max-width: 1440px) {
    main {
      height: 95vh;
    }
  }

  @media screen and (max-width: 1340px) {
    main {
      height: 90vh;
    }
  }

  @media screen and (max-width: 1024px) {
    main {
      height: 90vh;
    }
  }
  @media screen and (max-width: 1024px) {
    background: url("./../src/assets/tablet-background-image.png");
    background-position: center;
    background-size: cover;
    background-repeat: repeat;
    height: 100%;
  }*/
`;
