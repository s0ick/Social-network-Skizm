import React from 'react';
import style from '../Messages.module.css';

const MessageItem = ({id, message}) => {
  return (
  <div className={id % 2 === 0 ? style.messageFriend : style.messageYou}>
    <span id={id} className={style.text}>{message}</span>
  </div>
  );
}

export default MessageItem;