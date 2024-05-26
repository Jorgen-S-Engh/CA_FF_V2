import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import OutlinedCard from "./components/Card";
import Items from "./components/Items";

function App() {
  return (
    <>
      <OutlinedCard></OutlinedCard>
      <Items></Items>
    </>
  );
}

export default App;
