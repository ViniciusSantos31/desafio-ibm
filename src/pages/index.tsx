import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import Books from "../services/books/books";
import { useBooks } from "../services/hooks/useBooks";

const Home: NextPage = () => {
  const { data, isFetching, isLoading } = useBooks({
    query: "harry potter",
    startIndex: 1,
  });

  console.log(data);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      Oi IBM
    </div>
  );
};

export default Home;
