import React from "react";
import { Grid, Divider } from "@material-ui/core";

import { Logo } from "../../logo";

const Header: React.FC = () => {
  return (
    <Grid item xs={12} md={12} sm={12} style={{ marginBottom: "5rem" }}>
      <Logo />
      <Divider />
    </Grid>
  );
};

export default Header;
