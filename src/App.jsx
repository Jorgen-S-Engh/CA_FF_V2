import "./App.css";
import Items from "./components/Items";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout></Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
