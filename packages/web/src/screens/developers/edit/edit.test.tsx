import React from "react";
import nock from "nock";
import { render, waitFor } from "@testing-library/react";
import EditDeveloper from ".";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ developerID: "1" }),
  useHistory: () => ({ push: () => {} }),
}));
describe("Suit tests for EditDeveloper component", () => {
  it("<EditDeveloper /> return null if developer not exists", () => {
    const container = render(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <EditDeveloper />
      </MuiPickersUtilsProvider>
    );
    expect(container.container).toBeEmptyDOMElement();
  });

  it("<EditDeveloper /> fill inputs with reply data request", async () => {
    const fakeDeveloper = {
      name: "Test",
      age: 13,
      sex: "M",
      date_of_birth: "31/12/2019",
      hobby: "tester",
    };
    nock(process.env.REACT_APP_API_URL)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
      })
      .get("/developers/1")
      .reply(200, fakeDeveloper);

    const container = render(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <EditDeveloper />
      </MuiPickersUtilsProvider>
    );

    const [name, hobby, age, sex] = await waitFor(() => [
      container.getByTestId("nome").querySelector("input")!,
      container.getByTestId("hobby").querySelector("input")!,
      container.getByTestId("age").querySelector("input")!,
      container.getByTestId("sex").querySelector("input")!,
    ]);

    expect(name).toHaveValue(fakeDeveloper.name);
    expect(hobby).toHaveValue(fakeDeveloper.hobby);
    expect(age).toHaveValue(fakeDeveloper.age);
    expect(sex).toHaveValue(fakeDeveloper.sex);
  });
});
