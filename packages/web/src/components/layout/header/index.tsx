import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Divider } from "@material-ui/core";

import { Logo } from "../../logo";

const Header: React.FC = () => {
  const history = useHistory();
  return (
    <Grid item xs={12} md={12} sm={12} style={{ marginBottom: "5rem" }}>
      <Logo onClick={() => history.push("/")} />
      <Divider />
    </Grid>
  );
};

export default Header;
