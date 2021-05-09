import { TimerAPI } from '../../API/api';

const VALUE_ONLINE = 'Tomato/VALUE_ONLINE',
      VALUE_OFFLINE = 'Tomato/VALUE_OFFLINE',
      BLOCKED = 'Tomato/BLOCKED',
      REST_ONLINE = 'Tomato/REST_ONLINE',
      LOCK_UP_DATE = 'Tomato/LOCK_UP_DATE';

const initialState = {
  valueOnline: 40,
  valueOffline: 5,
  blocked: false,
  lockUpDate: new Date().getTime() + new Date(25 * 60000).getTime(),
  restOnline: 1200000
};

const pomodoroReducer = (state = initialState, action) => {
  switch(action.type) {

    case VALUE_ONLINE:
      return {...state,
        valueOnline: action.valueOnline
      };

    case VALUE_OFFLINE:
      return {...state,
        valueOffline: action.valueOffline
      };

    case BLOCKED:
      return {...state,
        blocked: action.blocked
      };

    case REST_ONLINE:
      return {...state,
        restOnline: action.restOnline    
      };

    case LOCK_UP_DATE:
      return {...state,
        lockUpDate: action.lockUpDate
      };  
      
    default: return state;  
  }
};

// ACTIONS CREATOR
export const setValueOnline = (valueOnline) => ({type: VALUE_ONLINE, valueOnline});
export const setValueOffline = (valueOffline) => ({type: VALUE_OFFLINE, valueOffline});
export const setBlocked = (blocked) => ({type: BLOCKED, blocked});
export const setLockUpDate = (lockUpDate) => ({type: LOCK_UP_DATE, lockUpDate});
export const setRestOnline = (restOnline) => ({type: REST_ONLINE, restOnline});


// THUNK CREATORS
export const getTimer = (username) => async (dispatch) => {
  const response = await TimerAPI.getTimer(username);

  if(response.status === 200) {
    dispatch(setValueOnline(response.data.valueOnline));
    dispatch(setValueOffline(response.data.valueOffline));
    dispatch(setBlocked(response.data.blocked));
    dispatch(setLockUpDate(response.data.lockUpDate));
    dispatch(setRestOnline(response.data.restOnline));
  }
};

export const updatePomodoro = (username, valueOnline, valueOffline, blocked, lockUpDate) => async (dispatch) => {
  const response = await TimerAPI.updatePomodoro(username, valueOnline, valueOffline, blocked, lockUpDate);

  if(response.status === 200) {
    dispatch(setValueOnline(response.data.valueOnline));
    dispatch(setValueOffline(response.data.valueOffline));
    dispatch(setBlocked(response.data.blocked));
    dispatch(setLockUpDate(response.data.lockUpDate));
  }
};

export const updateRestTime = (username, restOnline) => async (dispatch) => {
  const response = await TimerAPI.updateRestTime(username, restOnline);

  if(response.status === 200) {
    dispatch(setRestOnline(response.data));
  }
};

export default pomodoroReducer;