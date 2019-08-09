import { authorConstants } from "../constants";
import { http, appConfig } from "../helpers";
import { parseString } from "react-native-xml2js";

export const authorActions = {
  getAuthorBooks,
  getBook
};

function getAuthorBooks() {
  return dispatch => {
    dispatch(request());
    http
      .get(
        `${appConfig.apiEndpoint}author/list/205?&key=LuYr2rf9C00TLe2Ub2lbSg`
      )
      .then(response => {
        let xml = response.data;
        parseString(xml, (err, result) => {
          dispatch(success(result.GoodreadsResponse.author[0].books[0].book));
        });
      })
      .catch(function(error) {
        dispatch(failure(error));
      });
  };
  function request() {
    return { type: authorConstants.AUTHOR_BOOKS_GET_REQUEST };
  }
  function success(books) {
    return { type: authorConstants.AUTHOR_BOOKS_GET_SUCCESS, books };
  }

  function failure(error) {
    return { type: authorConstants.AUTHOR_BOOKS_GET_FAILURE, error };
  }
}

function getBook(bookId) {
  return dispatch => {
    dispatch(request());
    http
      .get(
        `${
          appConfig.apiEndpoint
        }book/show/${bookId}?&key=LuYr2rf9C00TLe2Ub2lbSg`
      )

      .then(response => {
        let xml = response.data;
        parseString(xml, (err, result) => {
          dispatch(success(result.GoodreadsResponse.book[0]));
        });
      })
      .catch(function(error) {
        dispatch(failure(error));
      });
  };
  function request() {
    return { type: authorConstants.AUTHOR_BOOK_GET_REQUEST };
  }
  function success(book) {
    return { type: authorConstants.AUTHOR_BOOK_GET_SUCCESS, book };
  }

  function failure(error) {
    return { type: authorConstants.AUTHOR_BOOK_GET_FAILURE, error };
  }
}
