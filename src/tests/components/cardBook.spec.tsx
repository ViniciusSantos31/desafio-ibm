import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { Book } from "services/books/types";
import { useFav } from "../../services/hooks/useFav";
import { CardBook } from "../../components/cardBook";

const bookMock: Partial<Book> = {
  volumeInfo: {
    title: "Test Title",
    allowAnonLogging: true,
    authors: ["Test Authors"],
    publishedDate: "Test",
    description: "Test",
    industryIdentifiers: [{ type: "ISBN_10", identifier: "Test" }],
    readingModes: { text: true, image: true },
    pageCount: 10,
    printType: "Test",
    categories: ["Test"],
    averageRating: 10,
    ratingsCount: 10,
    maturityRating: "Test",
    contentVersion: "Test",
    canonicalVolumeLink: "Test",
    infoLink: "Test",
    language: "Test",
    previewLink: "Test",
  },
  id: "test",
  slug: "test-slug",
};

jest.mock("next/router");

jest.mock("../../services/hooks/useFav", () => {
  return {
    useFav: jest.fn(() => ({
      favs: [],
      addFav: jest.fn(),
    })),
  };
});

jest.mock("../../services/hooks/useQuery", () => {
  return {
    useQuery: jest.fn(() => ({
      query: "query test",
      updateQuery: jest.fn(),
    })),
  };
});

describe("CardBook", () => {
  it("should render correctly", () => {
    const { container } = render(
      <CardBook book={bookMock as Book} key={bookMock.id} />
    );
    expect(container).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<CardBook book={bookMock as Book} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should render the authors", () => {
    render(<CardBook book={bookMock as Book} />);
    expect(screen.getByText("Test Authors")).toBeInTheDocument();
  });

  it("should be not fav book", () => {
    render(<CardBook book={bookMock as Book} />);
    const favIcon = screen.getByTestId("fav-icon");

    fireEvent.click(favIcon);

    expect(screen.getByTestId("fav-icon")).toBeVisible();
  });

  it("should redirect to book", () => {
    const useRouterMock = jest.mocked(useRouter);
    const pushMocked = jest.fn();

    useRouterMock.mockReturnValue({
      push: pushMocked,
    } as any);

    render(<CardBook book={bookMock as Book} />);
    const bookLink = screen.getByTestId("book-link");
    fireEvent.click(bookLink);

    expect(pushMocked).toHaveBeenCalledWith({
      pathname: "/test-slug",
      query: { search: "query test", startIndex: 1, slug: "test-slug" },
    });
  });

  it("should not be fav book", () => {
    render(<CardBook book={bookMock as Book} />);
    const favIcon = screen.getByTestId("fav-icon");
    expect(favIcon).toHaveClass("hidden");
  });

  it("should be fav book", () => {
    const useFavMock = jest.mocked(useFav);
    useFavMock.mockReturnValue({
      favs: [bookMock as Book],
      addFav: jest.fn(),
    } as any);

    render(<CardBook book={bookMock as Book} />);

    expect(screen.getByTestId("fav-icon")).not.toHaveClass("hidden");
  });
});
