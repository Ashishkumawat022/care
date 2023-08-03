import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall() {
  const [currency, setCurrency] = React.useState("10");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={currency}
        onChange={handleChange}
      >
        <MenuItem value={10}>GBP</MenuItem>
        <MenuItem value={20}>CAD</MenuItem>
        <MenuItem value={30}>USD</MenuItem>
      </Select>
    </FormControl>
  );
}
