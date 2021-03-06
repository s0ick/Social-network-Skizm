import { ProfileAPI } from '../../API/api';

const FETCHING = 'Profile/FETCHING',
      AVATAR_PHOTO = 'Profile/AVATAR_PHOTO',
      BACKGROUND_PHOTO = 'Profile/BACKGROUND_PHOTO',
      MATCH_LOGIN = 'Profile/MATCH_LOGIN',
      SET_USER_PROFILE = 'Profile/SET-USER-PROFILE';

const initialState = {
  profile: null,
  fetching: false,
  avatarPhoto: null,
  backgroundPhoto: null,
  matchLogin: ''
};     

const profileReducer = (state = initialState, action) => {
  switch(action.type) {
      
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

    case MATCH_LOGIN:
      return {...state,
        matchLogin: action.matchLogin
      }; 
    
    default: return state;  
  }
};

// ACTIONS CREATOR
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const updateFetching = (value) => ({type: FETCHING, value});
export const setAvatarPhoto = (url) => ({type: AVATAR_PHOTO, url});
export const setBackgroundPhoto = (url) => ({type: BACKGROUND_PHOTO, url});
export const setMatchLogin = (matchLogin) => ({type: MATCH_LOGIN, matchLogin});

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

export const setPhoto = (photo, {login, flag}) => async (dispatch) => {
  const response = await ProfileAPI.setPhoto(photo, login, flag);
  dispatch(updateFetching(false));
  if(response.status === 200) {
    if(flag === 'avatar') dispatch(setAvatarPhoto(response.data.avatarURL))
    else dispatch(setBackgroundPhoto(response.data.backgroundURL))  
  }
};


export default profileReducer;