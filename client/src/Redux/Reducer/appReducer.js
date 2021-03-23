//import { AuthMe } from "./authReducer";

const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS';

let initial = {
  initialized: false,
};

const appReducer = (state = initial, action) => {
  switch(action.type) {
    case INITIALIZED_SUCCESS:
      return { ...state,
        initialized: true
      };

     default: return state; 
  }
}

// ACTION CREATORS
export const setInitializedSuccess = () => ({type: INITIALIZED_SUCCESS});

// THUNK CREATORS
export const initializeApp = () => async (dispatch) => {
  // let promise = dispatch(AuthMe());
  // await Promise.all([promise]);
  
  dispatch(setInitializedSuccess());
};

export default appReducer;