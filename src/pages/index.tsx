import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import Lottie, { Options as LottieOptions } from "react-lottie";
import animationData from "../animations/typing.json";
import { CardBook } from "../components/cardBook";
import { Input } from "../components/input";
import { Pagination } from "../components/pagination";
import { Spinner } from "@chakra-ui/react";
import Books from "../services/books/books";
import { Book, GetBookResponse } from "../services/books/types";

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
  const [query, setQuery] = useState("");

  const [data, setData] = useState({} as GetBookResponse);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) setLoading(true);
    Books.getBooksByQuery({
      query: query,
      startIndex: page,
    })
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query, page]);

  return (
    <div className="w-full h-full flex flex-col items-center p-6 justify-start">
      <div className="w-full max-w-screen-lg h-full items-center justify-center">
        <div className="flex items-center justify-center mb-4">
          <Input
            placeholder="Pesquise um termo"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <p className="flex items-center text-white ml-4 group hover:text-pink-500 cursor-pointer font-bold">
            <FiHeart fontSize={20} className="mr-2 group-hover:fill-pink-500" />
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
              <Pagination
                onPageChange={setPage}
                totalCount={data?.totalItems ?? 0}
                currentPage={page}
                registersPerPage={20}
              />
            </div>
            <div className="grid w-full grid-cols-3 gap-4">
              {data?.items.map((book: Book) => (
                <CardBook book={book} query={query} key={book.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// !isLoading && <CardBook book={data?.items?.[0]} query="harry potter" />

export default Home;
