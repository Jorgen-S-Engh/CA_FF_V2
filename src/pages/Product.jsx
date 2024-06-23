import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useStore from "../store";
import DropdownExample from "../components/DropDown";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

function Product() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const addToCart = useStore((state) => state.addToCart);
  // const increase = useStore((state) => state.increase);
  // const decrease = useStore((state) => state.decrease);

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

  let priceContainer = (
    <Box>
      <Typography variant="h5">{Math.round(productData.price)} kr</Typography>
    </Box>
  );

  if (productData.price != productData.discountedPrice) {
    priceContainer = (
      <Box>
        <Typography variant="h5">
          {Math.round(productData.discountedPrice)} Kr
        </Typography>
        <Typography style={{ textDecoration: "line-through" }}>
          Before: {Math.round(productData.price)} kr
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "50px",
        display: "flex",
        justifyContent: "start",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          bgcolor: "rgba(250, 249, 241, 0.8)",
          padding: "30px",
        }}
      >
        <Grid xs={6}>
          <Box>
            <img
              style={{ maxWidth: "100%" }}
              src={productData.imageUrl}
              alt=""
            />
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1>{productData.title}</h1>
            <Typography sx={{}}>{productData.description}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{priceContainer}</span>
            {/* <Typography variant="h4">
              {productData.price === productData.discountedPrice
                ? productData.price
                : productData.discountedPrice}
            </Typography> */}
            <DropdownExample />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Product;
