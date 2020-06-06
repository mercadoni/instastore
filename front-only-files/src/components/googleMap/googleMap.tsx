import React from "react";
import GoogleMapReact from "google-map-react";
import { Wrapper } from "./styled";

const API_KEY = process.env.REACT_APP_MAPS_API_KEY as string;

const GoogleMap = ({ children, ...props }) => (
  <Wrapper>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_MAP_KEY || API_KEY,
        language: "en",
        libraries: ["places", "directions"],
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </Wrapper>
);

export default GoogleMap;
