import { Box, Card, CardMedia, Button } from "@mui/material";

function CategoryImg({ category, onClick }) {
  const centerCategory = {
    position: "absolute",
    bottom: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    textTransform: "none",
  };

  if (!category) {
    category = "beauty";
  }

  return (
    <Box>
      <Card sx={{ position: "relative" }} onClick={onClick}>
        <CardMedia
          component="img"
          image={`/${category}.webp`}
          alt="Beauty category"
          sx={{ width: 300 }}
        />
        <Button
          disableRipple={true}
          variant="contained"
          size="large"
          sx={centerCategory}
        >
          See all
        </Button>
      </Card>
    </Box>
  );
}

export default CategoryImg;
