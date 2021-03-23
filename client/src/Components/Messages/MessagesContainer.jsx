import { addMessage } from '../../Redux/Reducer/messageReducer';
import Messages from './Messages';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {reset} from 'redux-form';

let mapStateToProps = (state) => {
  return {
    dialogs: state.MessagesPage.dialogs,
    messages: state.MessagesPage.messages
  };
};


export default compose(
  connect(mapStateToProps, {addMessage, reset})
)(Messages);