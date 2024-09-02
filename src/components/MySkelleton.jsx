import { Skeleton, Box, Stack, Typography } from "@mui/material";

function MySkelleton({ headline, amount }) {
  const skeletons = [];
  if (!amount) {
    amount = 10;
  }
  console.log(amount);

  for (let i = 0; i < amount; i++) {
    skeletons.push(
      <Box
        key={i}
        sx={{
          margin: "20px",
        }}
      >
        <Stack spacing={2}>
          <Skeleton variant="rounded" width={210} height={100} />
          <Skeleton variant="rounded" width={210} height={20} />
          <Skeleton variant="rounded" width={210} height={20} />
        </Stack>
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
        {headline}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        {skeletons}
      </Box>
    </>
  );
}

export default MySkelleton;
