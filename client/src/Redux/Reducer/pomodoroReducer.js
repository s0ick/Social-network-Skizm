import { ProfileAPI } from '../../API/api';

const VALUE_ONLINE = 'Tomato/VALUE_ONLINE',
      VALUE_OFFLINE = 'Tomato/VALUE_OFFLINE',
      DISABLED = 'Tomato/DISABLED',
      BLOCKED = 'Tomato/BLOCKED',
      DATE_BLOCKED = 'Tomato/DATE_BLOCKED';

const initialState = {
  valueOnline: 20,
  valueOffline: 5,
  disabled: false,
  blocked: false,
  dateBlocked: new Date(new Date().getTime() + new Date(6 * 60000).getTime())
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
      
    case DISABLED: 
      return {...state,
        disabled: action.disabled
      };

    case BLOCKED:
      return {...state,
        blocked: action.blocked
      };

    case DATE_BLOCKED:
      return {...state,
        dateBlocked: action.dateBlocked
      };  
      
    default: return state;  
  }
};

// ACTIONS CREATOR
export const setValueOnline = (valueOnline) => ({type: VALUE_ONLINE, valueOnline});
export const setValueOffline = (valueOffline) => ({type: VALUE_OFFLINE, valueOffline});
export const setDisabled = (disabled) => ({type: DISABLED, disabled});
export const setBlocked = (blocked) => ({type: BLOCKED, blocked});
export const setDateBlocked = (dateBlocked) => ({type: DATE_BLOCKED, dateBlocked});


// THUNK CREATORS
export const updatePomodoro = (username, valueOnline, valueOffline, disabled, blocked, dateBlocked) => async (dispatch) => {
  const response = await ProfileAPI.updatePomodoro(username, valueOnline, valueOffline, disabled, blocked, dateBlocked);

  if(response.status === 200) {
    dispatch(setValueOnline(response.data.valueOnline));
    dispatch(setValueOffline(response.data.valueOffline));
    dispatch(setDisabled(response.data.disabled));
    dispatch(setBlocked(response.data.blocked));
    dispatch(setDateBlocked(response.data.dateBlocked));
  }
};

export const updateState = (username, valueOnline, valueOffline, disabled, blocked, dateBlocked) => async (dispatch) => {
  await ProfileAPI.updatePomodoro(username, valueOnline, valueOffline, disabled, blocked, dateBlocked);
};

export default pomodoroReducer;