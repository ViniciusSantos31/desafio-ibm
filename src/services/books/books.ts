import { slugify } from "../../utils/slugfy";
import { api } from "../api";
import { Book } from "./types";
import { GetBookBySearchRequest } from "./types";

const Books = {
  getBooksByQuery: async (props: GetBookBySearchRequest) => {
    const { query, startIndex } = props;
    const { data } = await api.get(
      `${query}&startIndex=${startIndex}&maxResults=20`
    );
    const formattedBook = data.items.map((book: Book) => ({
      ...book,
      slug: slugify(book.volumeInfo.title),
    }));
    return {
      ...data,
      items: formattedBook,
    };
  },
};

export default Books;
