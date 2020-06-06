import React from "react";
import { TextField, InputAdornment, Icon } from "@material-ui/core";
import styles from "./styled";

interface IInputFieldProps {
  onChange: (id: string) => (event) => void;
  label: string;
  value: any;
  icon?: string;
}
const inputField = (props) => {
  return (
    <TextField
      autoComplete="off"
      //   error={destinationObj.city === ""}
      //   value={destinationObj.city}
      //   onChange={onChange("city")}
      label={"City"}
      required
      variant="outlined"
      helperText="Incorrect entry."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon className="fa fa-plus-circle" />
          </InputAdornment>
        ),
      }}
    />
  );
};
export default inputField;
