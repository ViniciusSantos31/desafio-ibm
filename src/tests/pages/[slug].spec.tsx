import { render, screen } from "@testing-library/react";
import { Book } from "../../services/books/types";
import PageBook from "../../pages/[slug]";

const bookMock: Partial<Book> = {
  volumeInfo: {
    title: "Test Title",
    allowAnonLogging: true,
    authors: ["Test Authors"],
    publishedDate: "Test",
    description: "Test description",
    industryIdentifiers: [{ type: "ISBN_10", identifier: "Test" }],
    readingModes: { text: true, image: true },
    pageCount: 10,
    printType: "Test",
    categories: ["Test categorie 1", "Test categorie 2"],
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

describe("Book page", () => {
  it("should render the book page", () => {
    render(<PageBook book={bookMock as Book} query="query test" />);
    expect(screen.getByTestId("bookPage")).toBeInTheDocument();
  });

  it("should render the book page with the book title", () => {
    render(<PageBook book={bookMock as Book} query="query test" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should render the book page with the book authors", () => {
    render(<PageBook book={bookMock as Book} query="query test" />);
    expect(screen.getByText("Test Authors")).toBeInTheDocument();
  });

  it("should render the book page with the book description", () => {
    render(<PageBook book={bookMock as Book} query="query test" />);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("should render the book page if the book has no description", () => {
    const bookMockWithoutDescription = {
      volumeInfo: {
        title: "Test Title",
        allowAnonLogging: true,
        authors: ["Test Authors"],
        publishedDate: "Test",
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
    render(
      <PageBook book={bookMockWithoutDescription as Book} query="query test" />
    );
    expect(screen.getByText("Descrição não disponível")).toBeInTheDocument();
  });

  it("should render the book page with the book categories", () => {
    render(<PageBook book={bookMock as Book} query="query test" />);
    expect(
      screen.getByText("Test categorie 1 | Test categorie 2")
    ).toBeInTheDocument();
  });

  it("should render cover image if the book has one", () => {
    render(<PageBook book={bookMock as Book} query="query test" />);
    expect(screen.getByTestId("coverImage")).toBeInTheDocument();
  });
});
