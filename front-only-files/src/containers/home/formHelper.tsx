import React, { useState, useEffect } from "react";
import {
  Send,
  DynamicFeed,
  AddAlert,
  Apartment,
  Public,
  LineStyle,
  LocationCity,
  Dialpad,
  EditLocation,
} from "@material-ui/icons";
import styles, {
  TextField,
  Button,
  InputAdornment,
  Switch,
  FormControlLabel,
} from "./styled";
import AutoCompleteField from "components/autoComplete/autoComplete";
import { AutoFieldType } from "./HomeView";

export const TextFieldsFormHelper = (props) => {
  const [checkedB, setCheckedB] = useState(false);

  const handleSwitch = (event: React.ChangeEvent<{}>, checked: boolean) => {
    setCheckedB(checked);
  };

  return (
    <React.Fragment>
      <styles.HelperLabel>
        Complete this information so we can find the Store you need!
      </styles.HelperLabel>
      <TextField
        autoComplete="off"
        value={props.destinationObj.name}
        onChange={props.onTextFieldValueChange("name")}
        label={"Name This Destination"}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DynamicFeed />
            </InputAdornment>
          ),
        }}
        required
        error={props.addressValue !== "" && props.destinationObj.city === ""}
        helperText="This can't be empty"
        placeholder={"The name of your place. i.e. The Batcave"}
      />

      <TextField
        label={"Add DesCription"}
        value={props.destinationObj.description}
        onChange={props.onTextFieldValueChange("description")}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AddAlert />
            </InputAdornment>
          ),
        }}
        placeholder={"Instructions for delivery. i.e. `bark three times`"}
      />

      <TextField
        autoComplete="off"
        value={props.destinationObj.address}
        onChange={props.onTextFieldValueChange("address")}
        label={"Address"}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EditLocation />
            </InputAdornment>
          ),
        }}
        required
        error={props.addressValue !== "" && props.destinationObj.city === ""}
        helperText="This can't be empty"
      />

      <TextField
        label={"Address Two"}
        value={props.destinationObj.address_two}
        onChange={props.onTextFieldValueChange("address_two")}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Apartment />
            </InputAdornment>
          ),
        }}
        placeholder={"Aditional info,i.e. building, apto, secret door etc."}
      />

      <TextField
        autoComplete="off"
        label={"Country"}
        onChange={props.onTextFieldValueChange("country")}
        value={props.destinationObj.country}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Public />
            </InputAdornment>
          ),
        }}
        required
        error={props.addressValue !== "" && props.destinationObj.city === ""}
        helperText="This can't be empty"
      />

      <TextField
        autoComplete="off"
        value={props.destinationObj.state}
        onChange={props.onTextFieldValueChange("state")}
        label={"State"}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LineStyle />
            </InputAdornment>
          ),
        }}
        required
        error={props.addressValue !== "" && props.destinationObj.state === ""}
        helperText="This can't be empty"
      />

      <TextField
        autoComplete="off"
        value={props.destinationObj.city}
        onChange={props.onTextFieldValueChange("city")}
        label={"City"}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationCity />
            </InputAdornment>
          ),
        }}
        required
        error={props.addressValue !== "" && props.destinationObj.city === ""}
        helperText="This can't be empty"
      />

      <TextField
        autoComplete="off"
        value={props.destinationObj.zip_code}
        onChange={props.onTextFieldValueChange("zip_code")}
        label={"Zip Code"}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Dialpad />
            </InputAdornment>
          ),
        }}
        required
        error={
          props.addressValue !== "" && props.destinationObj.zip_code === ""
        }
        helperText="This can't be empty"
      />

      <styles.HelperLabel>
        Are you done? there are a few filters you can apply
      </styles.HelperLabel>

      <h3>Man, is midnight and partying</h3>
      <FormControlLabel
        control={
          <Switch
            checked={checkedB}
            onChange={handleSwitch}
            name="checkedB"
            color="secondary"
          />
        }
        label="Look for Open Stores"
      />
      <h3>Just on the toilet, kind of an urgency</h3>

      <FormControlLabel
        control={
          <Switch
            checked={checkedB}
            onChange={handleSwitch}
            name="checkedB"
            color="secondary"
          />
        }
        label="I want it Quickly"
      />
      <h3>A pretty domiciliary girl?</h3>
      <FormControlLabel
        control={
          <Switch
            checked={checkedB}
            onChange={handleSwitch}
            name="checkedB"
            color="secondary"
          />
        }
        label="I want it Near"
      />

      <Button
        variant="contained"
        color="secondary"
        endIcon={<Send />}
        onClick={props.submitForm}
      >
        Find It!
      </Button>
    </React.Fragment>
  );
};

export const LocalizationFindersHelper = (props: any) => {
  let {
    addressValue,
    locationLoaded,
    mapCenter,
    onAutoCompleFieldOnTyping,
    onCenterFieldSelection,
  } = props;
  return (
    <React.Fragment>
      <styles.AutoCompleteFieldWraper>
        {!locationLoaded && (
          <styles.HelperLabel>
            Since we were unable to activate your Geolocation, let's find the
            city or town where you are located.
          </styles.HelperLabel>
        )}
        {locationLoaded && (
          <styles.HelperLabel>
            Alright! looks like you're somewhere near {mapCenter.name}, move the
            marker in the map to find your address, or you can type it here.
          </styles.HelperLabel>
        )}

        <AutoCompleteField
          id={AutoFieldType.CENTER}
          label={"NearBy Place or City"}
          value={mapCenter ? mapCenter.name : ""}
          onTyping={onAutoCompleFieldOnTyping}
          onSelection={onCenterFieldSelection}
        ></AutoCompleteField>
      </styles.AutoCompleteFieldWraper>
      <styles.AutoCompleteFieldWraper>
        <styles.HelperLabel>
          You can type your address to locate you, look for the hints if you're
          really lost!
        </styles.HelperLabel>
        <AutoCompleteField
          id={AutoFieldType.ADDRESS}
          label={"Address"}
          value={addressValue}
          onTyping={onAutoCompleFieldOnTyping}
          onSelection={onCenterFieldSelection}
        ></AutoCompleteField>
      </styles.AutoCompleteFieldWraper>
    </React.Fragment>
  );
};
