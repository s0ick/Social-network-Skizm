import { ProfileAPI } from '../../API/api';
import { stopSubmit } from 'redux-form';

const DELETE_POST = 'Profile/DELETE-POST',
      FETCHING = 'Profile/FETCHING',
      AVATAR_PHOTO = 'Profile/AVATAR_PHOTO',
      BACKGROUND_PHOTO = 'Profile/BACKGROUND_PHOTO',
      SET_USER_PROFILE = 'Profile/SET-USER-PROFILE';

const initialState = {
  profile: null,
  fetching: false,
  avatarPhoto: null,
  backgroundPhoto: null,
};     

const profileReducer = (state = initialState, action) => {
  switch(action.type) {

    case DELETE_POST:
      return {...state,
        posts: state.posts.filter(p => p.id !== action.postId)
      };
      
    case SET_USER_PROFILE:
      return {...state,
        profile: action.profile
      };
      
    case FETCHING:
      return {...state,
        fetching: action.value
      };
      
    case AVATAR_PHOTO:
      return {...state,
        avatarPhoto: action.url
      };

    case BACKGROUND_PHOTO:
      return {...state,
        backgroundPhoto: action.url
      };
    
    default: return state;  
  }
};

// ACTIONS CREATOR
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const updateFetching = (value) => ({type: FETCHING, value});
export const setAvatarPhoto = (url) => ({type: AVATAR_PHOTO, url});
export const setBackgroundPhoto = (url) => ({type: BACKGROUND_PHOTO, url});

// THUNK CREATORS
export const getProfile = (username, login) => async (dispatch) => {
  if(!username) username = login;
  await ProfileAPI.getProfile(username)
    .then(response => {
      dispatch(setUserProfile(response));
    });
  await ProfileAPI.getAvatarPhoto(username)
    .then(response => {
      dispatch(setAvatarPhoto(response.avatarURL));
    });
  await ProfileAPI.getBackgroundPhoto(username, '')
    .then(response => {
      dispatch(setBackgroundPhoto(response.backgroundURL));
    });
};
export const updateProfile = (data, login) => async (dispatch) => {
  const response = await ProfileAPI.updateProfile(data, login);
  dispatch(setUserProfile(response));
};
export const setPost = (photo, {postBody, tags, login, avatarURL}) => async (dispatch) => {
  await ProfileAPI.setPost(photo, postBody, tags, login, avatarURL);
  dispatch(updateFetching(false));
};
export const setPhoto = (photo, {login, flag}) => async (dispatch) => {
  const response = await ProfileAPI.setPhoto(photo, login, flag);
  dispatch(updateFetching(false));
  if(response.status === 200) {
    if(flag === 'avatar') dispatch(setAvatarPhoto(response.data.avatarURL))
    else dispatch(setBackgroundPhoto(response.data.backgroundURL))  
  }
};



export default profileReducer;