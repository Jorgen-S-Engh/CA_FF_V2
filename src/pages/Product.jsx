import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useStore from "../store";

function Product() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const increase = useStore((state) => state.increase);
  const decrease = useStore((state) => state.decrease);
  const count = useStore((state) => state.count);

  const getProductData = async () => {
    try {
      const response = await axios.get(
        `https://api.noroff.dev/api/v1/online-shop/${id}`
      );
      setProductData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    function loadProductData() {
      getProductData();
    },
    [id]
  );
  console.log(productData);

  if (!productData) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <img
          style={{
            width: "400px",
          }}
          src={productData.imageUrl}
          alt=""
        />
        <Box>
          <h1>{productData.title}</h1>
        </Box>
      </Box>
      <Button onClick={increase}>add to cart</Button>

      {count}
      <Button onClick={decrease}> remove from cart</Button>
    </div>
  );
}

export default Product;
