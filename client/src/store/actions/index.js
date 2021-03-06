export { setAlert } from './alert';
export { register, loadUser, login, logout } from './auth';
export {
  getCurrentProfile,
  getProfiles,
  getProfileById,
  getGithubRepos,
  createProfile,
  addExperience,
  addEducation,
  deleteEducation,
  deleteExperience,
  deleteAccount,
} from './profile';
export {getPosts , addLike, removeLike, deletePost, addPost, getPost, addComment, deleteComment} from './post';
