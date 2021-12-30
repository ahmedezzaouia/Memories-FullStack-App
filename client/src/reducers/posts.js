import { FETCH_ALL, CREATE, UPDATE, DELETE, GET_POSTS_BY_SEARCH } from "../constants/actionTypes";
const reducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case GET_POSTS_BY_SEARCH:
      console.log(action.payload);
      return action.payload;
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case CREATE:
      return (posts = [...posts, action.payload]);
    case UPDATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    default:
      return posts;
  }
};

export default reducer;
