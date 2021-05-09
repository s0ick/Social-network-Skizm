const initialState = {
  item: [
    {url:'/profile', link: 'Profile'},
    // {url:'/messages', link: 'Messages'},
    {url:'/news', link: 'News'},
    // {url:'/music', link: 'Music'},
    // {url:'/users', link: 'Friends'},
    {url:'/tomato', link: 'Pomodoro'},
    {url:'/settings', link: 'Settings'},
    {url:'/todo', link: 'Todo'}
  ]
};

const sideBarReducer = (state = initialState, action) => {
  switch(action.type) {
    default: return state; 
  }
};

export default sideBarReducer;