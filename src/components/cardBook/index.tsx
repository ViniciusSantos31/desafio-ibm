/* eslint-disable @next/next/no-img-element */
import { FiHeart, FiStar } from "react-icons/fi";
import noThumb from "../../images/nothumbnail.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { Book } from "../../services/books/types";

interface CardBookProps {
  book?: Book;
  query?: string;
}

export function CardBook({ book, query }: CardBookProps) {
  const router = useRouter();

  function handleBookPage(slug?: string) {
    router.push({
      pathname: `/${slug}`,
      query: { slug, startIndex: 1, search: query },
    });
  }
  return (
    <div className="h-full flex items-start justify-start p-3 bg-gray-800 shadow-md rounded-md max-w-sm gap-2 relative group text-white">
      <div className="absolute bottom-4 right-4 group-hover:block hidden cursor-pointer">
        <FiHeart
          fontSize={25}
          className="hover:fill-pink-500 hover:text-pink-500"
        />
      </div>
      <div className="object-cover rounded-md max-w-[8rem]">
        <img
          src={
            book?.imageLinks?.thumbnail ??
            "http://centrodametropole.fflch.usp.br/sites/centrodametropole.fflch.usp.br/files/user_files/livros/imagem/capa-no-book-cover.png"
          }
          alt={book?.volumeInfo?.title}
        />
      </div>
      <div className="flex flex-col items-start justify-around gap-2">
        <p
          className="text-lg font-bold cursor-pointer text-gray-50 hover:text-pink-500 text-ellipsis overflow-hidden"
          onClick={() => handleBookPage(book?.slug)}
        >
          {book?.volumeInfo?.title}
        </p>
        <b className="flex select-none items-center gap-1 text-yellow-500 font-black">
          <FiStar />
          {book?.volumeInfo.averageRating ?? "0"}
        </b>
        <span className="text-gray-200">
          {book?.volumeInfo?.authors?.join(", ")}
        </span>
      </div>
    </div>
  );
}
