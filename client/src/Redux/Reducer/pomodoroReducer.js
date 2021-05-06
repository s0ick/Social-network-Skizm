import { TimerAPI } from '../../API/api';

const VALUE_ONLINE = 'Tomato/VALUE_ONLINE',
      VALUE_OFFLINE = 'Tomato/VALUE_OFFLINE',
      BLOCKED = 'Tomato/BLOCKED',
      DATE_BLOCKED = 'Tomato/DATE_BLOCKED';

const initialState = {
  valueOnline: 20,
  valueOffline: 5,
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
export const setBlocked = (blocked) => ({type: BLOCKED, blocked});
export const setDateBlocked = (dateBlocked) => ({type: DATE_BLOCKED, dateBlocked});


// THUNK CREATORS
export const updatePomodoro = (username, valueOnline, valueOffline, blocked, dateBlocked) => async (dispatch) => {
  const response = await TimerAPI.updatePomodoro(username, valueOnline, valueOffline, blocked, dateBlocked);

  if(response.status === 200) {
    dispatch(setValueOnline(response.data.valueOnline));
    dispatch(setValueOffline(response.data.valueOffline));
    dispatch(setBlocked(response.data.blocked));
    dispatch(setDateBlocked(response.data.dateBlocked));
  }
};

export default pomodoroReducer;