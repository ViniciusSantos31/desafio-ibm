import { useQuery } from "react-query";
import Books from "../books/books";
import { getBooksByQueryProps, GetUserResponse } from "./types";

export async function getBooksByQuery({
  query,
  startIndex = 1,
}: getBooksByQueryProps): Promise<GetUserResponse> {
  const { data } = await Books.getBooksByQuery({ query, startIndex });

  const books = data.items;

  return books;
}

export function useBooks({ query, startIndex = 1 }: getBooksByQueryProps) {
  return useQuery(
    ["books", startIndex],
    () => getBooksByQuery({ query, startIndex }),
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );
}
