import React from "react";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>No page found</h1>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default NoPage;
