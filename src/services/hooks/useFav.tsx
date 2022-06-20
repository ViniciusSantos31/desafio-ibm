import Router from "next/router";
import { createContext, useEffect, useState } from "react";

import api from "../api";
import { Book } from "../books/types";

type FavContextProps = {
  favs: Book[];
  addFav: (book: Book) => void;
};

export const FavContext = createContext<FavContextProps>({} as FavContextProps);

type FavProviderProps = {
  children: React.ReactNode;
};

export function FavProvider({ children }: FavProviderProps) {
  const [favs, setFavs] = useState<Book[]>([]);

  function addFav(book: Book) {
    if (favs.some((fav) => fav.id === book.id)) {
      setFavs(favs.filter((fav) => fav.id !== book.id));
      return;
    }
    setFavs([...favs, book]);
  }

  return (
    <FavContext.Provider value={{ favs, addFav }}>
      {children}
    </FavContext.Provider>
  );
}
