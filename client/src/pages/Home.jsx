import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // URL processing logic can be added here
    console.log("Submitted URL:", url);
    // Navigate to the Dashboard page
    navigate("/dashboard");
  };

  return (
    <div className="home-page">
      <header className="app-header">
        <div className="app-name">CommentInsight</div>
      </header>
      <div className="content">
        <h1>Welcome to URL Analyzer</h1>
        <form className="url-form" onSubmit={handleSubmit}>
          <label htmlFor="urlInput">Enter URL:</label>
          <input
            type="text"
            id="urlInput"
            placeholder="Paste your URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
