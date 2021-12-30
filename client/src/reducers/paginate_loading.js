import { START_LOADING, END_LOADING, PAGINATE, FETCH_POST } from "../constants/actionTypes.js";

const reducer = (state = { isLoading: true, currentPage: 1, pagesCount: 1 }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case PAGINATE:
      console.log(action.payload);
      return { ...state, currentPage: action.payload.currentPage, pagesCount: action.payload.pagesCount };
    case FETCH_POST:
      return { ...state, post: action.payload };
    default:
      return state;
  }
};

export default reducer;
