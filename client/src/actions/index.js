import { setAlert } from './alert';
import { register, login, loadUser, logout } from './auth';
import {
  getPosts,
  addLike,
  removeLike,
  deletePost,
  addPost,
  getPost,
  addComment,
  deleteComment
} from './post';
import {
  getCurrentProfile,
  createProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  deleteAccount,
  getProfiles,
  getProfileById,
  getGithubRepos
} from './profile';

export {
  setAlert,
  register,
  login,
  loadUser,
  logout,
  getCurrentProfile,
  createProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  deleteAccount,
  getProfiles,
  getProfileById,
  getGithubRepos,
  getPosts,
  addLike,
  removeLike,
  deletePost,
  addPost,
  getPost,
  addComment,
  deleteComment
};
