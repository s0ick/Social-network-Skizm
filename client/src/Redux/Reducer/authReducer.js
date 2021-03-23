import { AuthAPI } from '../../API/api';
import { setAvatarPhoto, setBackgroundPhoto } from './profileReducer';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'Auth/SET-USER-DATA';

let initial = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
};

const authReducer = (state = initial, action) => {
  switch(action.type) {
    case SET_USER_DATA:
      return { ...state,
        ...action.payload
      };

     default: return state; 
  }
}

// ACTION CREATORS
export const setUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}});

// THUNK CREATORS
export const registration = (username, email, password, password1) => async (dispatch) => {
  if(password !== password1) {
    let message = 'Passwords do not match';
    dispatch(stopSubmit('registration', {_error: message}));
  }

  const response = await AuthAPI.registration({email, username, password});
  if(response.status === 201) {
    dispatch(authLogin(response.data.username, response.data.password));
  }
};
export const authLogin = (username, password) => async (dispatch) => {
  const response = await AuthAPI.authLogin(username, password);
  
  if(response.status === 200) {
    let {pk, email, username} = response.data;
    dispatch(setUserData(pk, email, username, true));
  } else {
    let message = 'Incorrect data';
    dispatch(stopSubmit("login", {_error: message}));
  }
};
export const authLogout = () => async (dispatch) => {
  dispatch(setUserData(null, null, null, false));
  dispatch(setAvatarPhoto(null));
  dispatch(setBackgroundPhoto(null));

  localStorage.removeItem('login');
  localStorage.removeItem('password');
};
export default authReducer;