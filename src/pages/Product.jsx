import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { cartStore } from "../cartStore";
import { Button } from "@mui/material";
import MySkelleton from "../components/MySkelleton";

function Product() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const addToCart = cartStore((state) => state.addToCart);

  const getProductData = async () => {
    try {
      const response = await axios.get(
        `https://api.noroff.dev/api/v1/online-shop/${id}`
      );
      setProductData(response.data);
    } catch (error) {}
  };

  useEffect(
    function loadProductData() {
      getProductData();
    },
    [id]
  );

  if (!productData) {
    return <MySkelleton amount={1} />;
  }

  const handleAddToCart = () => {
    addToCart(productData);
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{
        bgcolor: "rgba(250, 249, 241, 0.8)",
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box sx={{ width: "300px" }}>
          <img
            style={{ width: "100%", borderRadius: "10px" }}
            src={productData.imageUrl}
            alt=""
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box>
          <Box>
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
          ></Box>
          <Box sx={{ marginTop: "20px" }}>
            <Button sx={{ border: "solid 1px gray" }} onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Box>
        </Box>
        <Grid item sx={{ marginTop: "20px" }}>
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
    </Grid>
  );
}

export default Product;
