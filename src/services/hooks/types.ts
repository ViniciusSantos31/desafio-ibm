export type Book = {
  id: string;
  accessInfo: {
    accessViewStatus: string;
    country: string;
    embeddable: boolean;
    epub: {
      isAvailable: boolean;
    };
    pdf: {
      isAvailable: boolean;
    };
    publicDomain: boolean;
    quoteSharingAllowed: boolean;
    textToSpeechPermission: string;
    viewability: string;
    webReaderLink: string;
  };
  etag: string;
  kind: string;
  selfLink: string;
  saleInfo: {
    country: string;
    isEbook: boolean;
    saleability: string;
  };
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;

    industryIdentifiers: {
      type: string;
      identifier: string;
    }[];
    readingModes: {
      text: boolean;
      image: boolean;
    };
  };
  searchInfo: {
    textSnippet: string;
  };
};

export type GetUserResponse = {
  items: Book[];
  kind: string;
  totalItems: number;
};

export interface getBooksByQueryProps {
  query: string;
  startIndex?: number;
}
