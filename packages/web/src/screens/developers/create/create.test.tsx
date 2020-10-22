import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import CreateDeveloper from ".";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

describe("Suit tests for CreateDeveloper component", () => {
  it("<CreateDeveeloper /> change input events", async () => {
    const container = render(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CreateDeveloper />
      </MuiPickersUtilsProvider>
    );
    const [name, hobby, age, dateOfBirth, sex, button] = await waitFor(() => [
      container.getByTestId("nome").querySelector("input")!,
      container.getByTestId("hobby").querySelector("input")!,
      container.getByTestId("age").querySelector("input")!,
      container.getByTestId("date_of_birth").querySelector("input")!,
      container.getByTestId("sex").querySelector("input")!,
      container.getByText("Salvar"),
    ]);
    act(() => {
      fireEvent.input(name, {
        target: { value: "Teste" },
      });
      fireEvent.input(age, {
        target: { value: 3 },
      });
      fireEvent.input(hobby, {
        target: { value: "qualquer" },
      });
      fireEvent.input(sex, {
        target: { value: "M" },
      });
      fireEvent.input(dateOfBirth, {
        target: { value: "08/12/1991" },
      });
      fireEvent.click(button);
    });
    expect(name).toHaveValue("Teste");
    expect(age).toHaveValue(3);
    expect(hobby).toHaveValue("qualquer");
    expect(sex).toHaveValue("M");
    expect(dateOfBirth).toHaveValue("08/12/1991");
  });
});
