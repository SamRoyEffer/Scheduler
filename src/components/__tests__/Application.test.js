import React from "react";

import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
} from "@testing-library/react";
import axios from "axios";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const ar = render(<Application />);
    await waitForElement(() => getByText(ar.container, "Archie Cohen"));
    const appointment = getAllByTestId(ar.container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(ar.container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    ar.debug();
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });
});
