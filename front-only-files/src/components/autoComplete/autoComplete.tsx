/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

interface IAutoCompleteFieldProps {
  id: string;
  value: string;
  label: string;
  onTyping?: (
    key: string,
    value: string,
    callback: (options: Array<string>) => void
  ) => Promise<Array<string> | undefined>;
  onSelection?: (key: string, option: string) => void;
}

const AutoCompleteField: React.FC<IAutoCompleteFieldProps> = (
  props: IAutoCompleteFieldProps
) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState<Array<string>>([]);

  const populteOptions = async (options) => {
    setOptions(options);
  };

  useEffect(() => {}, [props]);

  useEffect(() => {
    if (!(inputValue.length > 0)) {
      return undefined;
    }
    if (props.onTyping && typeof props.onTyping == "function") {
      let populatedOptions = props.onTyping(
        props.id,
        inputValue,
        populteOptions
      );
      if (!populatedOptions) populteOptions([]);
    }
  }, [inputValue]);

  useEffect(() => {
    if (!selectedValue || !(selectedValue.length > 0)) {
      return undefined;
    }
    if (props.onSelection) props.onSelection(props.id, selectedValue);
  }, [selectedValue]);

  return (
    <Autocomplete
      id={`autoCompleteField-${props.id}`}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      getOptionLabel={(option) => option}
      value={props.value}
      onChange={(event: any, newValue: any) => {
        setSelectedValue(newValue);
      }}
      onClose={(event: any) => {
        setOptions([]);
      }}
      onInputChange={(event: any, newInputValue: any) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label={props.label} variant="outlined" />
      )}
    />
  );
};

export default AutoCompleteField;
