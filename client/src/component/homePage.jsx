import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import "./homePage.css";
import app from "../config/axiosConfig";
const HomePage = () => {
  const [url, seturl] = useState("");
  const [isSafe, setisSafe] = useState("");
  const [isSet, setisSet] = useState(false);
  const changeHandler = (e) => {
    seturl(e.target.value);
    setisSet(false);
  };
  const fetchData = async (e) => {
    e.preventDefault();
    try {
      const res = await app.get(`/${url}`);
      setisSafe(res.data.result);
      setisSet(true);
      console.log(res.data.result);
      console.log("URL: " + url);
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchData(event);
    }
  };
  return (
    <div className="homepage" onKeyDown={handleKeyDown}>
      <h1>Phishing URL detector</h1>
      <h5>Using machine learning techniques</h5>
      <div className="text-box">
        <input
          type="text"
          placeholder="Enter the URL here"
          name="url"
          onChange={changeHandler}
        />
        <div className="button" onClick={fetchData}>
          <CheckCircleIcon className="tick-mark" />
          <span className="test-url">Test URL</span>
        </div>
      </div>
      {isSet && (
        <div className="result">
          <p>The website that you entered is</p>
          {isSafe === "good" ? (
            <div className="result-text safe">
              <CheckCircleIcon sx={{ fontSize: 40 }} className="check" />
              <p>Safe</p>
            </div>
          ) : (
            <div className="result-text unsafe">
              <CancelIcon sx={{ fontSize: 40 }} className="check" />
              <p>Unsafe</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
