import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useStore from "../store";
import DropdownExample from "../components/DropDown";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function Product() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  // const addToCart = useStore((state) => state.addToCart);
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
        spacing={3}
        sx={{
          bgcolor: "rgba(250, 249, 241, 0.8)",
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={6}>
          <Box sx={{ width: "100%", minWidth: "200px", maxWidth: "300px" }}>
            <img style={{ width: "100%" }} src={productData.imageUrl} alt="" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{}}>
            <h1>{productData.title}</h1>
            <Typography>{productData.description}</Typography>
          </Box>
          <Box
            sx={{
              margin: "20px 0px",
            }}
          >
            {productData.price <= productData.discountedPrice ? (
              <Typography>{Math.round(productData.price)}</Typography>
            ) : (
              <>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ margin: "20px 0px" }}
                >
                  SALE:
                </Typography>
                <Typography
                  variant="span"
                  sx={{ textDecoration: "line-through", marginRight: "10px" }}
                >
                  {Math.round(productData.price)}
                </Typography>
                <Typography variant="span">
                  {Math.round(productData.discountedPrice)}
                </Typography>
              </>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <DropdownExample />
          </Box>
        </Grid>
        <Grid item>
          <Stack spacing={1}>
            {productData.rating === 0 ? (
              <Typography>No rating given</Typography>
            ) : (
              <Typography>Rating</Typography>
            )}
            <Rating
              name="half-rating-read"
              defaultValue={productData.rating}
              precision={0.5}
              readOnly
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Product;
