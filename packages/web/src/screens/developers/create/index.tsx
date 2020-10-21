import React from "react";
import { Paper, Grid, Typography, Box, Divider } from "@material-ui/core";

import DeveloperForm from "../form/index";

const CreateDeveloper: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <Paper elevation={1} variant="outlined">
          <Box px={15} py={5}>
            <Box mb={5}>
              <Typography variant="h4" align="center" gutterBottom>
                Novo Developer
              </Typography>
              <Divider />
            </Box>
            <DeveloperForm defaultValues={{ date_of_birth: new Date() }} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateDeveloper;
