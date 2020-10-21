import styled, { keyframes } from "styled-components";
import { Logo } from "../logo";

const scale = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Overlay = styled(Container)`
  background-color: #000;
  opacity: 0.3;
`;

export const LogoImage = styled(Logo)`
  width: 12.5rem;
  height: 6.25rem;
  animation: 1s ${scale} ease-in infinite;
`;
