import axios from 'axios';

import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  POST_DELETED,
  POST_ADDED,
  GET_POST,
  COMMENT_ADDED,
  COMMENT_REMOVED
} from './actionTypes';

export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err && err.response && err.response.statusText,
        status: err && err.response && err.response.status
      }
    });
  }
};

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err && err.response && err.response.statusText,
        status: err && err.response && err.response.status
      }
    });
  }
};

// Add like
export const addLike = postId => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/like/${postId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err && err.response && err.response.statusText,
        status: err && err.response && err.response.status
      }
    });
  }
};

// Remove like
export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/unlike/${postId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err && err.response && err.response.statusText,
        status: err && err.response && err.response.status
      }
    });
  }
};

// Delete a post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);
    dispatch({
      type: POST_DELETED,
      payload: id
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err && err.response && err.response.statusText,
        status: err && err.response && err.response.status
      }
    });
  }
};

// Add a post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      'http://localhost:5000/api/posts',
      formData,
      config
    );
    dispatch({
      type: POST_ADDED,
      payload: res.data
    });
    dispatch(setAlert('Post Added', 'success'));
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err && err.response && err.response.statusText,
        status: err && err.response && err.response.status
      }
    });
  }
};

// Add a comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: COMMENT_ADDED,
      payload: res.data
    });
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err && err.response && err.response.statusText,
        status: err && err.response && err.response.status
      }
    });
  }
};

// Delete a comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/posts/comment/${postId}/${commentId}`
    );
    dispatch({
      type: COMMENT_REMOVED,
      payload: res.data
    });
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err && err.response && err.response.statusText,
        status: err && err.response && err.response.status
      }
    });
  }
};


/* 

http://localhost:5000/api/posts/comment/5e0a3d236fb968239b40dacd/5e0b88a221d11125788f6f8f


*/