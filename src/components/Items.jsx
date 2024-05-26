import React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
  console.log(shopItems);

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div>
      <h1>My items</h1>
      {shopItems.map((item) => (
        <Card key={item.id} sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
            <CardMedia
              sx={{ height: 140 }}
              image={item.imageUrl}
              title={item.title}
            />
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
      ))}
    </div>
  );
}

export default Items;
