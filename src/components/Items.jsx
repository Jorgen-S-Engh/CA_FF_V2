import React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

function Items() {
  const [shopItems, setShopItems] = useState([]);

  const getResults = async () => {
    await axios
      .get("https://api.noroff.dev/api/v1/online-shop")
      .then((response) => {
        setShopItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div>
      <h1>My items</h1>
      <Grid
        container
        gap={2}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {shopItems.map((item) => (
          <Grid item xs={4} key={item.id}>
            <Card>
              <CardContent>
                <CardMedia
                  sx={{
                    height: 300,
                    borderRadius: 10,
                  }}
                  image={item.imageUrl}
                  title={item.title}
                />
                <Typography gutterBottom variant="h5">
                  {item.title}
                </Typography>
                <Typography>
                  {item.price != item.discountedPrice ? (
                    <>
                      <Typography
                        variant="span"
                        sx={{
                          textDecoration: "line-through",
                        }}
                      >
                        {item.price}
                      </Typography>
                      <Typography variant="span" sx={{ marginLeft: "10px" }}>
                        {item.discountedPrice}
                      </Typography>
                      <Typography>
                        Save: {Math.floor(item.price - item.discountedPrice)}
                      </Typography>
                    </>
                  ) : (
                    <Typography>{item.price}</Typography>
                  )}
                </Typography>
                <Link to={`/product/${item.id}`}>
                  <Button
                    sx={{
                      margin: "10px",
                    }}
                    variant="outlined"
                  >
                    View details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Items;
