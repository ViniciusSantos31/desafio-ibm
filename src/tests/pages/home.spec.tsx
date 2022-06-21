import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { useQuery } from "../../services/hooks/useQuery";
import Home from "../../pages";
import Books from "../../services/books/books";
import { Book, GetBookResponse } from "services/books/types";

jest.mock("../../services/hooks/useQuery", () => {
  return {
    useQuery: jest.fn(() => ({
      query: "query test",
      updateQuery: jest.fn(),
    })),
  };
});

jest.mock("../../services/books/books", () => {
  return {
    getBooksByQuery: jest.fn(() =>
      Promise.resolve({
        items: [
          {
            id: "1",
            volumeInfo: {
              title: "Book 1",
              authors: ["Author 1"],
              description: "Description 1",
            },
            slug: "book-1",
          },
        ],
        totalItems: 1,
        kind: "books#volumes",
      })
    ),
  };
});

describe("Home page", () => {
  it("should render the home page", () => {
    render(<Home />);
    expect(screen.getByTestId("homePage")).toBeInTheDocument();
  });

  it("should render the home page with the search input", () => {
    render(<Home />);
    expect(screen.getByTestId("searchInput")).toBeInTheDocument();
  });

  it("should render the pagination", () => {
    render(<Home />);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("should render button to show favorites", () => {
    render(<Home />);
    expect(screen.getByTestId("showFavorites")).toBeInTheDocument();
  });

  it("should not render fav page", () => {
    render(<Home />);

    screen.getByTestId("showFavorites");
    expect(screen.getByTestId("showFavorites")).not.toHaveClass(
      "text-pink-500"
    );
  });

  it("should render fav page", () => {
    render(<Home />);

    const button = screen.getByTestId("showFavorites");
    fireEvent.click(button);
    expect(button).toHaveClass("text-pink-500");
  });

  it("should render the books", () => {
    render(<Home />);
    const button = screen.getByTestId("showFavorites");
    expect(button).not.toHaveClass("text-pink-500");
    fireEvent.click(button);
    expect(button).toHaveClass("text-pink-500");
    fireEvent.click(button);
    expect(button).not.toHaveClass("text-pink-500");
  });
});
