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

  useEffect(function loadProductData() {
    getProductData();
  }, []);

  if (productData) {
    console.log(productData);
  }

  if (!productData) {
    return <MySkelleton amount={1} />;
  }

  const handleAddToCart = () => {
    addToCart(productData);
  };

  return (
    <Grid
      container
      spacing={4}
      sx={{
        bgcolor: "rgba(250, 249, 241, 0.8)",
        padding: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={10}
        sm={6}
        md={4}
        lg={4}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box sx={{}}>
          <img
            style={{ width: "100%", borderRadius: "10px" }}
            src={productData.imageUrl}
            alt={productData.title}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
              <Typography sx={{ fontWeight: "bold" }}>
                Price: {Math.round(productData.price)}
              </Typography>
            ) : (
              <>
                <Typography sx={{ fontSize: "0.8rem", marginBottom: "10px" }}>
                  Before: {Math.round(productData.price)}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  Now: {Math.round(productData.discountedPrice)}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  Save{" "}
                  {Math.round(productData.price) -
                    Math.round(productData.discountedPrice)}
                  !
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
            <>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Rating
                  name="half-rating-read"
                  defaultValue={productData.rating}
                  precision={0.5}
                  readOnly
                />
                <Typography sx={{ marginLeft: "10px" }}>
                  ({productData.reviews.length})
                </Typography>
              </Box>
            </>
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10}>
        {productData.reviews.map((item) => (
          <Box
            key={item.username}
            sx={{ maxWidth: "400px", margin: "20px 0px" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginBottom: "5px",
              }}
            >
              <Rating defaultValue={item.rating} readOnly size="small"></Rating>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                {item.username}
              </Typography>
            </Box>
            <Typography sx={{ fontStyle: "italic", fontSize: "0.8rem" }}>
              {item.description}
            </Typography>
            <hr />
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}

export default Product;
