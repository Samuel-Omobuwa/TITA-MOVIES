import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
// import App from './App.jsx'
import StarRating from "./StarRating.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      message={["terrible", "bad", "fair", "good", "amazing"]}
    />
    <StarRating
      size={24}
      maxRating={5}
      color="red"
      className="test"
      defaultRating={3}
    />
  </StrictMode>
);
