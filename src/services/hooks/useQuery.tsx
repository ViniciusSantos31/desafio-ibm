import { createContext, useContext, useState } from "react";

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

export function useQuery() {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error("useQuery must be used within a QueryProvider");
  }
  return context;
}
