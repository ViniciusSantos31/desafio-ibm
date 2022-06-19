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
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
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
    allowAnonLogging: boolean;
    authors: string[];
    averageRating: number;
    canonicalVolumeLink: string;
    categories: string[];
    contentVersion: string;
    description: string;
    industryIdentifiers: {
      type: string;
      identifier: string;
    }[];
    infoLink: string;
    language: string;
    maturityRating: string;
    pageCount: number;
    previewLink: string;
    printType: string;
    publishedDate: string;
    ratingsCount: number;
    readingModes: {
      text: boolean;
      image: boolean;
    };
    title: string;
  };
  searchInfo: {
    textSnippet: string;
  };
  slug: string;
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
