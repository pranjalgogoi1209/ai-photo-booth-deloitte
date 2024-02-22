import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CaptureImagePage from "./pages/CaptureImagePage";
import KnowMorePage from "./pages/KnowMorePage";
import AvatarPage from "./pages/AvatarPage";
import GeneratedImagePage from "./pages/GeneratedImagePage";
import SelectGenderPage from "./pages/SelectGenderPage";

export default function App() {
  const [capturedImage, setCapturedImg] = useState();
  const [generatedImage, setGeneratedImage] = useState();
  const [selectedGender, setSelectedGender] = useState();
  const [url, setUrl] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/select-gender"
          element={
            <SelectGenderPage
              setSelectedGender={setSelectedGender}
              selectedGender={selectedGender}
            />
          }
        />
        <Route
          path="/capture-image"
          element={<CaptureImagePage setCapturedImg={setCapturedImg} />}
        />
        <Route path="/know-more" element={<KnowMorePage />} />
        <Route
          path="/avatar"
          element={
            <AvatarPage
              capturedImage={capturedImage}
              setGeneratedImage={setGeneratedImage}
              selectedGender={selectedGender}
              setUrl={setUrl}
            />
          }
        />
        <Route
          path="/generated-image"
          element={
            <GeneratedImagePage generatedImage={generatedImage} url={url} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
