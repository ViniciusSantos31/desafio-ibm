import { screen, render, fireEvent } from "@testing-library/react";
import { PaginationItem } from "../../components/pagination/PaginationItem";

describe("Pagination Item", () => {
  it("should render correctly", () => {
    const onPageChangeMock = jest.fn();

    render(
      <PaginationItem
        number={1}
        onPageChange={onPageChangeMock}
        isCurrent={false}
      />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("should be not current page", () => {
    const onPageChangeMock = jest.fn();
    render(
      <PaginationItem
        number={1}
        onPageChange={onPageChangeMock}
        isCurrent={false}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("should call onPageChange if not isCurrent", () => {
    const onPageChangeMock = jest.fn();
    render(
      <PaginationItem
        number={1}
        onPageChange={onPageChangeMock}
        isCurrent={false}
      />
    );

    fireEvent.click(screen.getByText("1"));
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });

  it("should not call onPageChange if isCurrent", () => {
    const onPageChangeMock = jest.fn();
    render(
      <PaginationItem number={1} onPageChange={onPageChangeMock} isCurrent />
    );

    const button = screen.getByText("1");
    fireEvent.click(button);
    expect(onPageChangeMock).toHaveBeenCalledTimes(0);
  });

  it("should not to be current page if dont have isCurrent", () => {
    const onPageChangeMock = jest.fn();
    render(<PaginationItem number={1} onPageChange={onPageChangeMock} />);

    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
