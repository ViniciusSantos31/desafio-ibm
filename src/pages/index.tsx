import { Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import Lottie, { Options as LottieOptions } from "react-lottie";
import animationData from "../animations/typing.json";
import { CardBook } from "../components/cardBook";
import { Input } from "../components/input";
import { Pagination } from "../components/pagination";
import Books from "../services/books/books";
import { Book, GetBookResponse } from "services/books/types";
import { FavContext, useFav } from "../services/hooks/useFav";
import { QueryContext, useQuery } from "../services/hooks/useQuery";

const defaultOptions: LottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
    clearCanvas: true,
    scaleMode: "fit",
  },
};

const Home: NextPage = () => {
  const [data, setData] = useState({} as GetBookResponse);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFavPage, setIsFavPage] = useState(false);
  const { favs } = useFav();
  const { query, updateQuery } = useQuery();

  function handleGetBooks() {
    if (data) setLoading(true);
    setIsFavPage(false);
    Books.getBooksByQuery({
      query: query,
      startIndex: page + 20 * (page - 1),
    })
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    handleGetBooks();
  }, [query, page]);

  return (
    <div
      data-testid="homePage"
      className="w-full h-full flex flex-col items-center p-6 justify-start"
    >
      <div className="w-full max-w-screen-lg h-full items-center justify-center">
        <div className="flex items-center justify-center mb-4">
          <Input
            data-testid="searchInput"
            placeholder="Pesquise um termo"
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
          />
          <p
            data-testid="showFavorites"
            onClick={() => setIsFavPage(!isFavPage)}
            className={`flex items-center text-white ml-4 group hover:text-pink-500 cursor-pointer font-bold ${
              isFavPage && "text-pink-500"
            }`}
          >
            <FiHeart
              fontSize={20}
              className={`mr-2 ${
                isFavPage && "fill-pink-500"
              } group-hover:fill-pink-500`}
            />
            Favoritos
          </p>
        </div>
        {!!!query && !!data ? (
          <div className="w-full h-full flex flex-col justify-around items-center">
            <div className="h-full flex flex-col items-center justify-center text-white gap-2">
              <Lottie
                options={defaultOptions}
                width={150}
                height={150}
                isClickToPauseDisabled
                style={{ cursor: "default" }}
              />
              <p className="font-bold text-gray-100 text-xl">Digite algo...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full text-white flex gap-2 items-center justify-end">
              {loading && <Spinner />}
              {!isFavPage && (
                <Pagination
                  onPageChange={setPage}
                  totalCount={data?.totalItems ?? 0}
                  currentPage={page}
                  registersPerPage={20}
                />
              )}
            </div>
            <div className="grid content-between w-full grid-cols-1 gap-4 md:grid-cols-2">
              {!isFavPage &&
                data?.items?.map((book: Book) => (
                  <CardBook data-testid="bookCard" book={book} key={book.id} />
                ))}
            </div>
          </>
        )}
        {isFavPage && (
          <div className="grid content-between w-full grid-cols-1 gap-4 md:grid-cols-2">
            {favs.map((book: Book) => (
              <CardBook book={book} key={book.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// !isLoading && <CardBook book={data?.items?.[0]} query="harry potter" />

export default Home;
