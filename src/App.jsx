import "./App.css";
import Items from "./components/Items";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";

import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Receipt from "./pages/Receipt";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout
          style={{
            position: "sticky",
            top: "0px",
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/receipt" element={<Receipt />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
