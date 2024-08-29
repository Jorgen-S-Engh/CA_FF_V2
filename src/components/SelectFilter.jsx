import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useState } from "react";

const tags = [
  "perfume",
  "beauty",
  "toy",
  "headphones",
  "storage",
  "electronics",
  "audio",
  "fashion",
  "bags",
  "skin care",
  "shoes",
  "glasses",
  "accessories",
  "watches",
  "jewelry",
  "watch",
  "wearables",
  "shampoo",
  "peripherals",
  "gaming",
  "computers",
];

function SelectFilter({ onCategoryChange }) {
  const [tagName, setTagName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedTags = typeof value === "string" ? value.split(",") : value;
    setTagName(selectedTags);
    onCategoryChange(selectedTags); // Kall funksjonen med de valgte kategoriene
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Filter</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={tagName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {tags.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectFilter;
