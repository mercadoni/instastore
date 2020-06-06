import styled from "styled-components";
import {
  TextField as MTextField,
  InputAdornment as MInputAdornment,
  Button as MButton,
  Switch as MSwitch,
  FormControlLabel as MFormControlLabel,
} from "@material-ui/core";

export const TextField = styled(MTextField)``;
export const InputAdornment = styled(MInputAdornment)``;
export const FormControlLabel = styled(MFormControlLabel)``;
export const Switch = styled(MSwitch)``;
export const Button = styled(MButton)`
  background: palevioletred;
`;

const AutoCompleteFieldWraper = styled.div``;
const PanelContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 100vh;
  width: 100%;
`;
const HelperLabel = styled.h1`
  font-size: 1.5rem;
  color: palevioletred;
  text-align: left;
`;

const OptionsPanel = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 450px;
  overflow-y: scroll;
  padding: 4rem 0rem;
  ${TextField} {
    margin: 1rem 2.5rem;
  }
  ${Button} {
    margin: 2.5rem 2.5rem;
    max-width: 12rem;
    background: palevioletred;
  }
  ${InputAdornment} {
    color: palevioletred;
  }
  ${HelperLabel} {
    padding: 0 3rem;
  }

  h3 {
    margin: 0 4rem;
    color: palevioletred;
    font-size: 1.2rem;
    text-align: left;
  }
  ${FormControlLabel} {
    margin: 1.5rem 4rem 1rem 4rem;
    color: palevioletred;
  }
`;

const Board = styled.div`
  flex-direction: column;
  min-width: 250px;
  flex-grow: 1;
  width: auto;
  overflow-y: scroll;
  justify-content: center;
  align-items: center;
  padding: 4rem 4rem;
  ${AutoCompleteFieldWraper} {
    margin: 1rem 2.5rem;
  }
  ${Button} {
    background: palevioletred;
  }
`;
const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  color: palevioletred;
  background: peachpuff;
  margin: 0;
  padding: 0;
`;

const MapContainer = styled.div`
  flex-direction: column;
  flex-grow: 1;
  align-items: stretch;
  height: 32rem;
  margin: 4rem 2rem;
  /* decorations */
  border-radius: 41px 41px 41px 41px;
  -moz-border-radius: 41px 41px 41px 41px;
  -webkit-border-radius: 41px 41px 41px 41px;
  border: 3px solid palevioletred;
  -webkit-box-shadow: 0px 40px 30px 15px rgba(0, 0, 0, 0.52);
  -moz-box-shadow: 0px 40px 30px 15px rgba(0, 0, 0, 0.52);
  box-shadow: 0px 40px 30px 15px rgba(0, 0, 0, 0.52);
  overflow: hidden;
`;

const ModalContent = styled.div`
  display: flex;
  background: white;
  margin: 5rem auto;
  height: 20rem;
  width: 35rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  /* //decoration */
  border-radius: 41px 41px 41px 41px;
  -moz-border-radius: 41px 41px 41px 41px;
  -webkit-border-radius: 41px 41px 41px 41px;
  border: 3px solid palevioletred;
  -webkit-box-shadow: 0px 40px 30px 15px rgba(0, 0, 0, 0.52);
  -moz-box-shadow: 0px 40px 30px 15px rgba(0, 0, 0, 0.52);
  box-shadow: 0px 40px 30px 15px rgba(0, 0, 0, 0.52);
  overflow: hidden;
  h2 {
    max-width: 25rem;
    color: palevioletred;
    font-weight: 600;
    font-size: 1.6rem;
  }
  h3 {
    max-width: 25rem;
    font-size: 1.2rem;
  }
  :focus {
    outline: none;
  }
`;

const styles = {
  Title,
  OptionsPanel,
  PanelContainer,
  Board,
  TextField,
  MapContainer,
  AutoCompleteFieldWraper,
  HelperLabel,
  ModalContent,
};

export default styles;
