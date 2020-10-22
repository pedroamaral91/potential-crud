import styled from "styled-components";
import base64 from "./base64";

export const Logo = styled.div`
  height: 10vh;
  background-image: url(${base64});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
`;
