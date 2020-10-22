import React from "react";
import nock from "nock";
import { render, waitFor } from "@testing-library/react";
import ListDeveloper from ".";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: () => {} }),
}));

describe("Suit tests for ListDeveloper component", () => {
  it("<ListDeveloper /> should fill table with requested data", async () => {
    const fakeDevelopers = [
      {
        id: "1",
        name: "Test 1",
        age: 13,
        sex: "M",
        date_of_birth: new Date().toISOString(),
        hobby: "tester",
      },
      {
        id: "2",
        name: "Test 2",
        age: 15,
        sex: "F",
        date_of_birth: new Date().toISOString(),
        hobby: "testador",
      },
    ];
    nock(process.env.REACT_APP_API_URL)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
      })
      .get("/developers?page=1")
      .reply(200, { developers: fakeDevelopers, page: 1, total: 2 });

    const container = render(<ListDeveloper />);

    const [name, hobby, sex] = await waitFor(() => [
      container.getByText(fakeDevelopers[0].name),
      container.getByText(fakeDevelopers[0].hobby),
      container.getByText(fakeDevelopers[0].sex),
    ]);
    expect(name).toHaveTextContent(fakeDevelopers[0].name);
    expect(hobby).toHaveTextContent(fakeDevelopers[0].hobby);
    expect(sex).toHaveTextContent(fakeDevelopers[0].sex);
  });
});
