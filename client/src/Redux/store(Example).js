import profileReducer from './Reducer/profileReducer';
import messageReducer from './Reducer/messageReducer';
import sideBarReducer from './Reducer/sideBarReducer';

let store = {
  _state: {
    MessagesPage: {
      dialogs: [
        {id: 1, name: 'Андрей'},
        {id: 2, name: 'Света'},
        {id: 3, name: 'Саша'},
        {id: 4, name: 'Иван'},
        {id: 5, name: 'Кирилл'},
        {id: 6, name: 'Никита'}
      ],
      messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How your socical-s0ick?'},
        {id: 3, message: 'Cool'}
      ],
      newMessageText: ''
    },
    ProfilePage: {
      posts: [
        {id: 1, message: 'Hi, how are you?', likeCount: 12},
        {id: 2, message: "It's my first posts", likeCount: 19}
      ],
      newPostText: ''
    },
    SideBar: {
      item: [
        {url:'/profile', link: 'Profile'},
        {url:'/messages', link: 'Messages'},
        {url:'/news', link: 'News'},
        {url:'/music', link: 'Music'},
        {url:'/settings', link: 'Settings'}
      ],
      fullName: [
        {firstName: 'Андрей', secondName: 'Кисляк'},
        {firstName: 'Константин', secondName: 'Грива'},
        {firstName: 'Никита', secondName: 'Монашкик'},
        {firstName: 'Влад', secondName: 'Бесмертный'},
        {firstName: 'Илья', secondName: 'Гондрабура'},
        {firstName: 'Евегения', secondName: 'Онегина'},
      ]
    },
  },
  _callSubscriber() {},


  subscribe (observer) {
    this._callSubscriber = observer;
  },
  getState() {
    return this._state;
  },


  dispatch(action) {
    this._state.ProfilePage = profileReducer(this._state.ProfilePage, action);
    this._state.MessagesPage = messageReducer(this._state.MessagesPage, action);
    this._state.SideBar = sideBarReducer(this._state.SideBar, action);
  
    this._callSubscriber(this._state);
  }
};

export default store;
