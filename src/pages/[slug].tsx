/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FiBook, FiBookmark, FiPenTool, FiStar } from "react-icons/fi";
import Books from "../services/books/books";
import { Book } from "../services/books/types";

interface PageBookProps {
  book: Book;
}

const PageBook: NextPage<PageBookProps> = ({ book }) => {
  return (
    <div className="w-screen bg-gray-900 text-white flex p-4 items-start justify-center md:items-center">
      <div className="max-w-screen-lg h-full">
        <div className="w-full flex flex-col gap-4 items-center justify-center mb-6 md:flex-row md:items-start ">
          <img
            className="max-w-xs max-h-xs object-fit"
            src={
              book.imageLinks?.thumbnail ??
              "http://centrodametropole.fflch.usp.br/sites/centrodametropole.fflch.usp.br/files/user_files/livros/imagem/capa-no-book-cover.png"
            }
            alt={book.volumeInfo.title}
          />
          <div className="w-full h-full flex flex-col items-start justify-around">
            <h1 className="font-bold text-5xl text-pink-500 mb-4 md:text-6xl lg:text-7xl">
              {book?.volumeInfo.title}
            </h1>
            <span className="text-xl font-bold flex items-center">
              <FiPenTool size={20} className="mr-2" />
              {book?.volumeInfo.authors?.join(", ")}
            </span>
            <span className="text-gray-100 flex items-center">
              <p className="flex-wrap whitespace-pre-line">
                {book?.volumeInfo.categories?.join(" | ")}
              </p>
            </span>
            <b className="flex select-none items-center gap-1 text-yellow-500 font-black">
              <FiStar />
              {book?.volumeInfo.averageRating ?? 0}
            </b>
            <span className="font-bold flex items-center">
              <FiBook size={20} className="mr-2" />
              <b className="text-pink-500 mr-1">
                {book?.volumeInfo.pageCount}
              </b>{" "}
              páginas
            </span>
          </div>
        </div>
        <div>
          <p className="text-lg font text-white mb-4">
            {book?.volumeInfo.description ?? "Descrição não disponível"}
          </p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug, startIndex, search } = query;
  const books = await Books.getBooksByQuery({
    query: String(search),
    startIndex: Number(startIndex),
  });
  const book = books.items.find((book: Book) => book.slug === slug);

  return {
    props: {
      book,
    },
  };
};

export default PageBook;
