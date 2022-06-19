import { useQuery } from "react-query";
import { slugify } from "../../utils/slugfy";
import Books from "../books/books";
import { Book, getBooksByQueryProps, GetUserResponse } from "./types";

export async function getBooksByQuery({
  query,
  startIndex = 1,
}: getBooksByQueryProps): Promise<GetUserResponse> {
  const { data } = await Books.getBooksByQuery({ query, startIndex });
  const formattedBook = data.items.map((book: Book) => ({
    ...book,
    slug: slugify(book.volumeInfo.title),
  }));
  return {
    ...data,
    items: formattedBook,
  };
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
