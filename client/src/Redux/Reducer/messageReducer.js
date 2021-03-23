const ADD_MESSAGE = 'Messages/ADD-MESSAGE';
    
const initialState = {
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
    {id: 2, message: 'How your social-s0ick?'},
    {id: 3, message: 'Cool'}
  ]
}      
const messageReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_MESSAGE:
      return { ...state,
        messages: [...state.messages, {
          id: state.messages[state.messages.length - 1].id + 1,
          message: action.newMessageBody
        }]
      };
      
    default: return state;
  }
};
export const addMessage = (newMessageBody) => ({type: ADD_MESSAGE, newMessageBody});

export default messageReducer;