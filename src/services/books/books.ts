import { api } from "../api";
import { GetBookBySearchRequest } from "./types";

const Books = {
  getBooksByQuery: async (props: GetBookBySearchRequest) => {
    const { query, startIndex } = props;
    return await api.get(`${query}&startIndex=${startIndex}&maxResults=20`);
  },
};

export default Books;
