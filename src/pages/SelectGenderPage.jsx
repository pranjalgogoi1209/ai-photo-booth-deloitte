import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiMale } from "react-icons/bi";
import { BiFemale } from "react-icons/bi";
import logo from "./../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SelectGenderPage({
  setSelectedGender,
  selectedGender,
}) {
  const navigate = useNavigate();
  const [selectedGenderIndex, setSelectedGenderIndex] = useState();

  const data = [
    { gender: "Male", img: "#", icon: <BiMale />, color: "#6083ce" },
    { gender: "Female", img: "#", icon: <BiFemale />, color: "#d7909a" },
  ];

  // toast options
  const toastOptions = {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleSubmit = () => {
    console.log("selectedGender", selectedGender);
    if (selectedGender) {
      navigate("/capture-image");
    } else {
      toast.error("Please select your gender", toastOptions);
    }
  };

  return (
    <SelectGenderWrapper>
      <header>
        <h1>Select Your Gender</h1>
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </header>

      <div className="gender">
        {data?.map((item, index) => (
          <div
            key={index}
            className={`genderContainer ${
              index === selectedGenderIndex ? "selectedGender" : ""
            }`}
            onClick={() => {
              setSelectedGenderIndex(index);
              setSelectedGender(item.gender);
            }}
          >
            <div className="icon" style={{ color: `${item.color}` }}>
              {item.icon}
            </div>
            <button className="btn">{item.gender}</button>
          </div>
        ))}
      </div>

      <div className="submit" onClick={handleSubmit}>
        <button className="btn">Submit</button>
      </div>
      <ToastContainer />
    </SelectGenderWrapper>
  );
}

const SelectGenderWrapper = styled.div`
  /* border: 1px solid red; */
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  gap: 4vw;
  justify-content: space-between;

  .gender {
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
    gap: 10vw;
    .genderContainer {
      /* border: 1px solid black; */
      display: flex;
      flex-direction: column;
      gap: 2vw;
      align-items: center;
      cursor: pointer;
      .icon {
        border: 2px solid black;
        display: flex;
        align-items: center;
        border-radius: 1vw;
        font-size: 10vw;
        padding: 1vw 0vw;
        transition: background ease 0.5s;
      }
      button {
        width: 100%;
      }
    }
    .selectedGender {
      .icon {
        background-color: #c72041;
        border-color: transparent;
      }
    }
  }
  .submit {
    margin: 0 auto;
  }
`;
