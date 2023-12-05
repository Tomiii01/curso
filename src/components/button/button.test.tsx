/**
 * @jest-environment jsdom
 */
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
// import all stories from the stories file

import * as stories from "./button.stories";

const { Base } = composeStories(stories);

it("App Router: Works with Client Counter (React State)", () => {
  const onClickSpy = jest.fn();
  render(<Base onClick={onClickSpy} />);
  const buttonElement = screen.getByText(/SampleButton/i);
  expect(buttonElement).not.toBeNull();
  buttonElement.click();
  expect(onClickSpy).toHaveBeenCalled();
  //expect(screen.getByRole("heading")).toHaveTextContent("0");
  //fireEvent.click(screen.getByRole("button"));
  //expect(screen.getByRole("heading")).toHaveTextContent("1");
});
