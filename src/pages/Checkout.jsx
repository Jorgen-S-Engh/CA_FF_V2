import { Link } from "react-router-dom";
import { cartStore } from "../cartStore";
import { Box, Typography, Button } from "@mui/material";

function Checkout() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = cartStore((state) => ({
    clearCart: state.clearCart,
    totalCost: state.totalCost,
    cartItems: state.cartItems,
    increaseQuantity: state.increaseQuantity,
    decreaseQuantity: state.decreaseQuantity,
    removeFromCart: state.removeFromCart,
  }));

  const cartItemCount = cartStore((state) => state.cartItemCount());
  const totalCost = cartStore((state) => state.totalCost());
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" variant="h4">
        Checkout
      </Typography>
      <p>Total Items in Cart: {cartItemCount}</p>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              marginBottom: "20px",
              border: "solid 1px gray",
              padding: "40px",
              width: "auto",
            }}
          >
            <h3>{item.title}</h3>
            <p>Price: {item.price} NOK</p>
            <p>Quantity: {item.quantity}</p>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Button
                variant="contained"
                onClick={() => decreaseQuantity(item.id)}
              >
                -
              </Button>
              <Button
                variant="contained"
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </Button>
              <Button
                variant="contained"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </Box>
          </Box>
        ))
      )}

      {cartItems.length > 0 ? (
        <>
          total cost: {Math.round(totalCost)}
          <Link to="/receipt">
            <Button variant="contained" onClick={clearCart}>
              Buy
            </Button>
          </Link>
        </>
      ) : null}
    </Box>
  );
}

export default Checkout;
