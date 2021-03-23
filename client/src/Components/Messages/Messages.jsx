import React from 'react';
import style from './Messages.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import MessageForm from './MessageForm';

const Messages = React.memo(({addMessage, reset, dialogs, messages}) => {
  const addNewMessage = (values) => {
    addMessage(values.newMessageBody);
    reset('AddMessage'); 
  };

  const dialogElems = dialogs
        .map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>);

  const messageElems = messages
        .map(m => <MessageItem key={m.id} id={m.id} message={m.message}/>);

  return (
    <div className={style.block}>
      <div className={style.dialogsblock}>
        {dialogElems}
      </div>
      <div className={style.messageBlock}>
        <div className={style.messages}>
          {messageElems}
        </div>
        <MessageForm onSubmit={addNewMessage} />
      </div>
    </div>
  );
});
export default Messages;