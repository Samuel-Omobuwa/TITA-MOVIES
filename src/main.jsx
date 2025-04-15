import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
// import './index.css'
// import App from './App.jsx'
import StarRating from "./StarRating.jsx";

function Test () {
  const [newRating, setNewRating] = useState(0);
  return (
    <div>
      <StarRating  maxRating={10} color="blue" onSetRating={setNewRating}/>
      <p>This movie has a {newRating} start rating</p>
    </div>
  )
}

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
    <Test />
  </StrictMode>
);
