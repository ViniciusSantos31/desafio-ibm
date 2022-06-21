/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useContext } from "react";
import { FiHeart, FiStar } from "react-icons/fi";
import { Book } from "services/books/types";
import { FavContext, useFav } from "../../services/hooks/useFav";
import { QueryContext, useQuery } from "../../services/hooks/useQuery";

type CardBookProps = {
  book: Book;
};

export function CardBook({ book }: CardBookProps) {
  const router = useRouter();
  const { query } = useQuery();

  function handleBookPage(slug?: string) {
    router.push({
      pathname: `/${slug}`,
      query: { slug, startIndex: 1, search: query },
    });
  }

  const { favs, addFav } = useFav();
  const isFav = favs.some((fav) => fav.id === book?.id);

  return (
    <div
      data-testid="card-book"
      className="h-full w-full flex items-start justify-start p-3 bg-gray-800 shadow-md rounded-md gap-2 relative group text-white"
    >
      <div
        onClick={() => addFav(book)}
        data-testid="fav-icon"
        className={`${
          !isFav && "hidden"
        } absolute bottom-4 right-4 block cursor-pointer group-hover:block`}
      >
        <FiHeart
          fontSize={25}
          className={`${
            isFav && "fill-pink-500 stroke-pink-500"
          } hover:fill-pink-500 hover:text-pink-500`}
        />
      </div>
      <div className="object-cover rounded-md ">
        <img
          className="min-w-[8rem] min-h-[8rem]"
          src={
            book?.imageLinks?.thumbnail ??
            "https://books.google.com.br/googlebooks/images/no_cover_thumb.gif"
          }
          alt={book?.volumeInfo?.title}
        />
      </div>
      <div className="flex flex-col items-start justify-around gap-2">
        <p
          data-testid="book-link"
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
