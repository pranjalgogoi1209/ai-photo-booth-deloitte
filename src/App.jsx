import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CaptureImagePage from "./pages/CaptureImagePage";
import KnowMorePage from "./pages/KnowMorePage";
import AvatarPage from "./pages/AvatarPage";
import GeneratedImagePage from "./pages/GeneratedImagePage";

export default function App() {
  const [capturedImage, setCapturedImg] = useState();
  const [generatedImage, setGeneratedImage] = useState();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
            />
          }
        />
        <Route
          path="/generated-image"
          element={<GeneratedImagePage generatedImage={generatedImage} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
