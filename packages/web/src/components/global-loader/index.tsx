import React from "react";
import { Container, LogoImage, Overlay } from "./styles";

const GlobalLoader: React.FC = () => {
  return (
    <Container>
      <Overlay />
      <LogoImage />
    </Container>
  );
};
export default GlobalLoader;
