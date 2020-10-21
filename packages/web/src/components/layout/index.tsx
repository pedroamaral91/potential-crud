import React from "react";

import { Grid } from "@material-ui/core";
import Header from "./header/index";

const Layout: React.FC = ({ children }) => {
  return (
    <Grid container alignItems="center" justify="center">
      <Header />
      {children}
    </Grid>
  );
};

export default Layout;
