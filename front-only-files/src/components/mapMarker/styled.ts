import styled, { keyframes } from "styled-components";
import { MarkerType } from "types/mapTypes";

interface MarkerProps {
  size: number;
  hoover: boolean;
  type: MarkerType;
}

const breatheAnimation = keyframes`
 0% {transform: scale(1)}
 10% {transform: scale(0.8)}
 50% {transform: scale(2)}
 90% {transform: scale(0.8)}
 100% {transform: scale(1)}
`;

const MarkerPosCentered = styled.div<MarkerProps>`
  position: absolute;
  width: ${(props) => props.size || 1}rem;
  height: ${(props) => props.size || 1}rem;
  left: ${(props) => -props.size / 2 || 1}rem;
  top: ${(props) => -props.size / 2 || 1}rem;

  border: 1px solid black;
  border-radius: 50%;
  text-align: center;
  background: ${(props) => {
    let color = "palevioletred";
    if (props.type === MarkerType.Store) color = "palegreen";
    if (props.type === MarkerType.Distance) color = "gold";
    return color;
  }};

  animation-name: ${breatheAnimation};
  animation-duration: 4s;
  animation-iteration-count: ${(props) => (props.hoover ? "infinite" : "none")};
  font-size: 16;
  font-weight: bold;
  padding: 4;
  cursor: pointer;
  svg {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

const styles = {
  MarkerPosCentered,
};

export default styles;
