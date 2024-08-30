import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import useStore from "../store";

function DropdownExample() {
  const [selectedValue, setSelectedValue] = useState(1);
  const [buttonText, setButtonText] = useState("+ add");
  // const increaseBy = useStore((state) => state.increaseBy);
  // const count = useStore((state) => state.count);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleValue = () => {
    // increaseBy(Number(selectedValue));
    setButtonText(`Added ${selectedValue}!`);
    setTimeout(() => {
      setButtonText("+ add");
    }, 1500);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <FormControl>
        <Select
          id="demo-simple-select"
          value={selectedValue}
          onChange={handleChange}
          sx={{ height: "50px" }}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
      <Button sx={{ height: "50px" }} variant="outlined" onClick={handleValue}>
        {buttonText}
      </Button>
    </Box>
  );
}

export default DropdownExample;
