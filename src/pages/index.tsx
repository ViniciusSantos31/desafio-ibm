import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useEffect } from "react";
import { CardBook } from "../components/cardBook";
import Books from "../services/books/books";
import { useBooks } from "../services/hooks/useBooks";

const Home: NextPage = () => {
  const { data, isFetching, isLoading } = useBooks({
    query: "harry potter",
    startIndex: 1,
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {!isLoading && <CardBook book={data?.items?.[0]} query="harry potter" />}
    </div>
  );
};

export default Home;
