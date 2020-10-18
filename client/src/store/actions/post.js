import axios from 'axios';
import * as actionType from './types';
import * as actions from './index';

//GET POSTS
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: actionType.GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
          });        
    }
}

//Add like
export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);
        dispatch({
            type: actionType.UPDATE_LIKES,
            payload: {id: postId, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
          });        
    }
}

//Remove like
export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({
            type: actionType.UPDATE_LIKES,
            payload: {id: postId, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
          });        
    }
}

//Delete Post
export const deletePost = postId => async dispatch => {
    try {
        await axios.delete(`/api/posts/${postId}`);
        dispatch({
            type: actionType.DELETE_POST,
            payload:{id:postId}
        })

        dispatch(actions.setAlert('Post Removed' , 'danger'))
    } catch (err) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
          });        
    }
}

//Add Post
export const addPost = formData => async dispatch => {
    const config ={ 
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/posts', formData , config);
        dispatch({
            type: actionType.ADD_POST,
            payload: res.data
        })

        dispatch(actions.setAlert('Post Created' , 'success'))
    } catch (err) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
          });        
    }
}

//GET POST
export const getPost = postId => async dispatch => {
    dispatch({type: actionType.CLEAR_POST})
    try {
        const res = await axios.get(`/api/posts/${postId}`);
        dispatch({
            type: actionType.GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
          });        
    }
}

//Add Comment
export const addComment = (postId, formData) => async dispatch => {
    const config ={ 
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData , config);
        dispatch({
            type: actionType.ADD_COMMENT,
            payload: res.data
        })

        dispatch(actions.setAlert('Comment Added' , 'success'))
    } catch (err) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
          });        
    }
}

//Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type: actionType.REMOVE_COMMENT,
            payload: commentId
        })

        dispatch(actions.setAlert('Comment Deleted' , 'danger'))
    } catch (err) {
        dispatch({
            type: actionType.POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
          });        
    }
}