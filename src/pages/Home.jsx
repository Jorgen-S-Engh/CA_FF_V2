import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MySkelleton from "../components/MySkelleton";

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shopItems, setShopItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const getResults = async () => {
    try {
      const response = await axios.get(
        "https://api.noroff.dev/api/v1/online-shop"
      );
      setShopItems(response.data);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  console.log(shopItems);
  const combinedFilter = shopItems.filter((item) => {
    const matchedSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchedCategory = category === "" || item.tags.includes(category);

    return matchedCategory && matchedSearch;
  });

  const uniqueCat = shopItems.reduce(
    (acc, curr) => [...new Set(acc.concat(curr.tags))],
    []
  );

  if (loading) {
    return <MySkelleton headline="Products" amount={10} />;
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <h1>Something went wrong</h1>
        <p>{errorMessage}</p>
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <TextField
          label="Search"
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "50%" }}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Filter"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {uniqueCat.map((item, index) => (
                <MenuItem key={item + index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center", margin: "20px" }}
      >
        Products
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {combinedFilter.map((item) => (
          <Grid item xs="auto" key={item.id}>
            <Card
              elevation={0}
              sx={{
                width: 300,
                height: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "solid 1px gray",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <CardMedia
                  sx={{
                    height: 200,
                  }}
                  image={item.imageUrl}
                  title={item.title}
                />
                <Typography gutterBottom variant="h5">
                  {item.title}
                </Typography>
                <Box>
                  {item.price !== item.discountedPrice ? (
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
                </Box>
              </CardContent>
              <Box
                sx={{
                  paddingBottom: 2,
                  marginLeft: "10px",
                }}
              >
                <Link to={`/product/${item.id}`}>
                  <Button>View details</Button>
                </Link>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
