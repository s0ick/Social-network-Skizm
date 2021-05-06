import { PostAPI } from '../../API/api';

const FETCHING = 'Profile/FETCHING';

const initialState = {
  fetching: false,
};     

const postReducer = (state = initialState, action) => {
  switch(action.type) {
      
    case FETCHING:
      return {...state,
        fetching: action.value
      };
    
    default: return state;  
  }
};

// ACTIONS CREATOR
export const updateFetching = (value) => ({type: FETCHING, value});

// THUNK CREATORS
export const setPost = (photo, {postBody, tags, login}) => async (dispatch) => {
  await PostAPI.setPost(photo, postBody, tags, login);
  dispatch(updateFetching(false));
};

export const deletePost = (id) => async () => {
  await PostAPI.deletePost(id);
};

export const updatePost = (photo, {postBody, tags, username, id}) => async (dispatch) => {
  await PostAPI.updatePost(id, photo, postBody, tags, username)
  dispatch(updateFetching(false));
};

export const likePost = (id, username) => async () => {
  await PostAPI.likePost(id, username);
};

export const commentPost = (id, username, comment) => async () => {
  await PostAPI.commentPost(id, username, comment);
};


export default postReducer;