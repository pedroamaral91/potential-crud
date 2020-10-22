import { createStyles, makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import styled from "styled-components";

export const ButtonLoaderContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

export const useStyles = makeStyles(() =>
  createStyles({
    buttonProgress: {
      color: blue[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
      flex: 1,
    },
  })
);
