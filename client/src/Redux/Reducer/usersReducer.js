import { UserAPI, FollowedAPI } from '../../API/api';

const TOGGLE_FOLLOW = 'Users/TOGGLE-FOLLOW',
      SET_CURRENT_PAGE = 'Users/SET-CURRENT-PAGE',
      TOTAL_COUNT = 'Users/TOTAL-COUNT',
      TOGGLE_IS_FETCHING = 'Users/TOGGLE-IS-FETCHING',
      FOLLOWING_PROGRESS = 'Users/FOLLOWING-PROGRESS',
      SET_USERS = 'Users/SET-USERS';
    
const initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 5,
  isFetching: false,
  isLoading: []
};
const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_FOLLOW:
      return { ...state,
        //users: updateObjectInArray(state.users, action.userID, "id", {followed: true/false})
        users: state.users.map(u => {
          if(u.id === action.userID) return {...u, followed: !u.followed};
          return u;
        })
      };
    
    case SET_USERS:
      return { ...state,
        users: action.users
      };

    case SET_CURRENT_PAGE:
      return {...state,
        currentPage: action.currentPage
      };
      
    case TOTAL_COUNT:
      return {...state,
        totalUsersCount: action.count
      };
   
    case TOGGLE_IS_FETCHING:
      return {...state,
        isFetching: action.isFetching
      };
    
    case FOLLOWING_PROGRESS:
      return { ...state,
        isLoading: action.isLoading 
        ? [...state.isLoading, action.userId]
        : state.isLoading.filter(id => id !== action.userId)

      };  
    
    default: return state;
  }
};

// ACTION CREATORS
export const toggleFollow= (userID) => ({type: TOGGLE_FOLLOW, userID});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setUsersTotalCount = (count) => ({type: TOTAL_COUNT, count});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const progressLoading = (isLoading, userId) => ({type: FOLLOWING_PROGRESS, isLoading, userId});

// THUNK CREATORS
export const requestUsers = (currentPage , pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
    
  const response = await UserAPI.getUsers(currentPage, pageSize);
  
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(response.items));
  dispatch(setUsersTotalCount(response.totalCount));
}
export const following = (followed, id) => async (dispatch) => {
  const activeToggle = (res) => {
    if(res.resultCode === 0) {
      dispatch(toggleFollow(id));
    } dispatch(progressLoading(false, Number(id)));
  }
  
  dispatch(progressLoading(true, Number(id)));
  if(followed) {
    const response = await FollowedAPI.unFollowed(id)
    activeToggle(response);
  } else {
    const response = await FollowedAPI.followed(id)
    activeToggle(response);
  }
}

export default usersReducer;