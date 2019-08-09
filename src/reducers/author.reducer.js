import { authorConstants } from "../constants";

export function authorBooks(state = {}, action) {
  switch (action.type) {
    case authorConstants.AUTHOR_BOOKS_GET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case authorConstants.AUTHOR_BOOKS_GET_SUCCESS:
      return {
        ...state,
        books: action.books,
        loading: false
      };
    case authorConstants.AUTHOR_BOOKS_GET_FAILURE:
      return {
        ...state,
        books: [],
        loading: false
      };
    case authorConstants.AUTHOR_BOOK_GET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case authorConstants.AUTHOR_BOOK_GET_SUCCESS:
      return {
        ...state,
        book: action.book,
        loading: false
      };
    case authorConstants.AUTHOR_BOOK_GET_FAILURE:
      return {
        ...state,
        book: {},
        loading: false
      };

    default:
      return state;
  }
}
