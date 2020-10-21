import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";

import ListDevelopers from "./list";

const Developers: React.FC = () => (
  <Grid container spacing={10} direction="column" md={10}>
    <Box>
      <Typography align="center" variant="h4" gutterBottom>
        Developers
      </Typography>
    </Box>
    <ListDevelopers />
  </Grid>
);

export default Developers;
