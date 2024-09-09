import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, Stack, Rating, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MySkelleton from "../components/MySkelleton";
import CategoryImg from "../components/CategoryImg";

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shopItems, setShopItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");

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

  const filterHandler = () => {
    return shopItems.filter((item) => {
      const matchedSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchedCategory = category === "" || item.tags.includes(category);
      return matchedCategory && matchedSearch;
    });
  };

  useEffect(() => {
    setFilter(filterHandler());
  }, [shopItems, search, category]);

  const uniqueCat = shopItems.reduce(
    (acc, curr) => [...new Set(acc.concat(curr.tags))],
    []
  );

  const handleClearAll = () => {
    setSearch("");
    setCategory("");
    setFilter(shopItems);
  };

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
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <TextField
          label="Search"
          variant="standard"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "30%", margin: "0px 20px" }}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Filter</InputLabel>
            <Select
              labelId="select-label"
              variant="standard"
              id="select"
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
        <Button
          size="small"
          onClick={handleClearAll}
          sx={{ marginLeft: "20px" }}
        >
          Clear all
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <CategoryImg onClick={() => setCategory("beauty")} />
        <CategoryImg
          category="electronics"
          onClick={() => setCategory("electronics")}
        />
      </Box>

      <Typography
        variant="h5"
        component="h1"
        sx={{ textAlign: "center", margin: "20px" }}
      >
        {category === "" ? "PRODUCTS" : category.toUpperCase()}
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {filter.map((item) => (
          <Grid item xs="auto" key={item.id}>
            <Link to={`/product/${item.id}`}>
              <Card
                elevation={0}
                sx={{
                  width: 300,
                  height: 400,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <CardMedia
                    sx={{
                      height: 200,
                      borderRadius: "10px",
                    }}
                    image={item.imageUrl}
                    title={item.title}
                  />
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.75rem", marginBottom: "10px" }}
                  >
                    {item.description}
                  </Typography>
                  <Box>
                    {item.price !== item.discountedPrice ? (
                      <>
                        <Typography sx={{ fontSize: "0.75rem" }}>
                          Before: {item.price}
                        </Typography>
                        <Typography sx={{ fontWeight: "bold" }}>
                          Now: {item.discountedPrice}
                        </Typography>
                        {/* <Typography>
                        Save: {Math.floor(item.price - item.discountedPrice)}
                      </Typography> */}
                      </>
                    ) : (
                      <Typography sx={{ fontWeight: "bold" }}>
                        {item.price},-
                      </Typography>
                    )}
                  </Box>
                </CardContent>
                <Box
                  sx={{
                    paddingBottom: 2,
                    marginLeft: "10px",
                  }}
                >
                  <Stack>
                    <Rating
                      readOnly
                      size="small"
                      defaultValue={item.rating}
                    ></Rating>
                  </Stack>
                </Box>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
