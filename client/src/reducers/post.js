import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  POST_DELETED,
  POST_ADDED,
  GET_POST,
  COMMENT_ADDED,
  COMMENT_REMOVED
} from '../actions/actionTypes';
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case POST_ADDED:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      let newState = {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.postId
            ? { ...post, likes: [...payload.likes] }
            : post
        ),
        loading: false
      };
      return newState;
    case POST_DELETED:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case COMMENT_ADDED:
    case COMMENT_REMOVED:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [...payload],
          loading: false
        },
        loading: false
      };
    case 'COMMENT_DELETEDd':
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };

    default:
      return state;
  }
}
