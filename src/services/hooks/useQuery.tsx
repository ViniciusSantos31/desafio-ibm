import Router from "next/router";
import { createContext, useEffect, useState } from "react";

import api from "../api";
import { Book } from "../books/types";

type QueryContextProps = {
  query: string;
  updateQuery: (query: string) => void;
};

export const QueryContext = createContext<QueryContextProps>(
  {} as QueryContextProps
);

type QueryProviderProps = {
  children: React.ReactNode;
};

export function QueryProvider({ children }: QueryProviderProps) {
  const [query, setQuery] = useState<string>("");

  function updateQuery(newQuery: string) {
    setQuery(newQuery);
  }

  return (
    <QueryContext.Provider value={{ query, updateQuery }}>
      {children}
    </QueryContext.Provider>
  );
}
