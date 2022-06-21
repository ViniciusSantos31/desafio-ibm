import { screen, render } from "@testing-library/react";
import { Pagination } from "../../components/pagination";

const mockProps = {
  onPageChange: jest.fn(),
  totalCount: 20,
  currentPage: 1,
  registerPerPage: 10,
};

const mockPropsWithoutCurrentPage = {
  ...mockProps,
  currentPage: undefined,
};

describe("Pagination", () => {
  it("should render correctly", () => {
    render(<Pagination {...mockProps} />);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("should render the first page without currentPage prop", () => {
    render(<Pagination {...mockPropsWithoutCurrentPage} />);

    const pageItem = screen.getByTestId("pagination-item");
    expect(pageItem).toHaveTextContent("1");
    expect(pageItem).toHaveProperty("disabled", true);
  });

  it("should render the first page", () => {
    render(<Pagination {...mockProps} />);

    const pageItem = screen.getByTestId("pagination-item");

    expect(pageItem).toHaveTextContent("1");
    expect(pageItem).toHaveProperty("disabled", true);
  });

  it("should render the last page", () => {
    render(<Pagination {...mockProps} currentPage={20} />);

    const pageItem = screen.getByTestId("pagination-item");

    expect(pageItem).toHaveTextContent("20");
    expect(pageItem).toHaveProperty("disabled", true);
  });
});
