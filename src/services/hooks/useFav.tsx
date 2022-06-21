import Router from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

import api from "../api";
import { Book } from "../books/types";

export type FavContextProps = {
  favs: Book[];
  addFav: (book: Book[]) => void;
};

export const FavContext = createContext<FavContextProps>({
  favs: [],
  addFav: () => {},
} as FavContextProps);

type FavProviderProps = {
  children: React.ReactNode;
};

export function FavProvider({ children }: FavProviderProps) {
  const [favs, setFavs] = useState<Book[]>([]);

  function addFav(books: Book[]) {
    setFavs([...books]);
  }

  useEffect(() => {
    addFav([...favs]);
  });

  return (
    <FavContext.Provider value={{ favs, addFav }}>
      {children}
    </FavContext.Provider>
  );
}

export function useFav() {
  const { favs, addFav } = useContext(FavContext);

  async function handleAddFav(book: Book) {
    if (favs.some((fav) => fav.id === book.id)) {
      addFav(favs.filter((fav) => fav.id !== book.id));
      return;
    }
    addFav([...favs, book]);
  }

  return { favs, addFav: handleAddFav };
}
