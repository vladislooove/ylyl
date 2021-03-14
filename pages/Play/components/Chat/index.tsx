// Libs
import { ChangeEvent, FC, useState } from 'react';

// Components
import Input from '../../../../components/Input';

// Styles
import styles from './Chat.module.scss';

// Types
import { ChatProps } from './types';

export const Chat: FC<ChatProps> = ({ onSubmit, messages, user }) => {
  const [message, setMessage] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if(event.key === 'Enter'){
      onSubmit(message);
      setMessage('');
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${msg.user === user?.id ? styles.messageCurrent : ''}`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <Input value={message} onChange={onChange} onKeyPress={handleKeyPress} disabled={!user?.isMoving} />
    </div>
  );
};

export default Chat;