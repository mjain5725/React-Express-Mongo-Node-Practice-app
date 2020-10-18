import * as actionType from '../actions/types';

const initialState ={
    posts:[],
    post:null,
    loading:true,
    error:{}
}

export default function(state= initialState, action){
    const {type, payload} = action;
    switch(type){
        case actionType.GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case actionType.GET_POST:
            return{
                ...state,
                post: payload,
                loading: false
            }
        case actionType.POST_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            }
        case actionType.UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(
                    post => post._id === payload.id ? {...post, likes: payload.likes} : post
                    ),
                loading: false
            }
        case actionType.DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== payload.id),
                loading: false
            }
        case actionType.ADD_POST:
            return{
                ...state,
                posts: [payload,...state.posts],
                loading: false
            }
        case actionType.ADD_COMMENT:
            return{
                ...state,
                post: {
                    ...state.post,
                    comments: payload
                },
                loading: false
            }
        case actionType.REMOVE_COMMENT:
            return{
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload)
                },
                loading: false
            }
        case actionType.CLEAR_POST:
            return{
                ...state,
                post: null,
                loading: false
            }
        default: 
            return state
    }
}