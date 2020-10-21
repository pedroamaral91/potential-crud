import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import Routes from "./routes/index";
import GlobalStyle from "./styles/global";

import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <GlobalStyle />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Routes />
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
};

export default App;
