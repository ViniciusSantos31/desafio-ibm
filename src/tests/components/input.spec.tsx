import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "../../components/input";

describe("Input", () => {
  it("should render correctly", () => {
    render(<Input placeholder="test input" />);
    expect(screen.getByPlaceholderText("test input")).toBeInTheDocument();
  });

  it("should render the placeholder", () => {
    render(<Input placeholder="test input" />);
    expect(screen.getByPlaceholderText("test input")).toBeInTheDocument();
  });

  it("should render the value", () => {
    render(<Input value="test input" />);
    expect(screen.getByDisplayValue("test input")).toBeInTheDocument();
  });

  it("should change the value", () => {
    const onChangeMock = jest.fn();
    render(<Input value="test input" onChange={onChangeMock} />);

    const input = screen.getByTestId("input-component");
    fireEvent.change(input, { target: { value: "test input 2" } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
