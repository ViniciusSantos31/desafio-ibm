import { screen, render, waitFor } from "@testing-library/react";
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
});
