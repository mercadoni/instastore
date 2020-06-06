import React from "react";
import {
  HomeRounded,
  StorefrontRounded,
  MapRounded,
  AlarmOnRounded,
} from "@material-ui/icons";
import styles from "./styled";
import { MarkerType } from "types/mapTypes";

const MapMarker = (props) => {
  return (
    <styles.MarkerPosCentered
      hoover={props.$hover}
      size={2}
      className="lookatme"
      type={props.type}
    >
      {props.type === MarkerType.User && <HomeRounded />}
      {props.type === MarkerType.Store && <StorefrontRounded />}
      {props.type === MarkerType.Distance && <MapRounded />}
      {props.type === MarkerType.Time && <AlarmOnRounded />}
    </styles.MarkerPosCentered>
  );
};
export default MapMarker;
