// Libs
import { FC, useState, useEffect, useMemo } from 'react';
import * as faceapi from 'face-api.js';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

// Components
import Loader from '../../components/Loader';
import CameraStreamError from './components/CameraStreamError';
import User from './components/User';
import Chat from './components/Chat';
import FaceParcer from './components/FaceParcer';

// Constants
import {
  SOCKET_USER_ENTER,
  SOCKET_UPDATE_USERS_LIST,
  SOCKET_POST_MESSAGE,
  SOCKET_UPDATE_MESSAGES,
  SOCKET_UPDATE_TIMER,
} from '../api/socketio/constants';

// Types
import { Socket } from 'socket.io';
import { User as IUser, Message } from '../../interfaces';

// Styles
import styles from './Play.module.scss';

export const Play: FC = () => {
  const router = useRouter();
  const [generatedId] = useState(uuidv4());
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [cameraStreamError, setCameraStreamError] = useState(false);
  const [stream, setStream] = useState<null | MediaStream>(null);

  useEffect(() => {
    fetch('/api/socketio').finally(() => {
      const socket = io();
      setSocketInstance(socket);

      socket.emit(SOCKET_USER_ENTER, {
        name: router?.query?.name ?? generatedId,
        id: generatedId,
      });

      socket.on(SOCKET_UPDATE_USERS_LIST, (users: IUser[]) => {
        setUsersList(users);
      });

      socket.on(SOCKET_UPDATE_MESSAGES, (messages: Message[]) => {
        setMessages(messages);
      });

      socket.on(SOCKET_UPDATE_TIMER, (time: number) => {
        setTimeLeft(time);
      });
    });
  }, []);

  const user = useMemo(() => {
    return usersList.find(({ id }) => id === generatedId);
  }, [usersList, generatedId]);

  const userMove = useMemo(() => {
    const user = usersList.find(({ isMoving }) => isMoving);

    return user?.name || user?.id;
  }, [usersList]);

  const initVideo = async () => {
    try {
      setIsLoading(true);
      await navigator.permissions.query({ name: 'camera' });
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.loadFaceExpressionModel('/models');
      const cameraStream = await navigator.mediaDevices.getUserMedia({ video: {} });
      setStream(cameraStream);
    } catch (e) {
      setCameraStreamError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onLaugh = () => {
    console.log('LOOSE');
  };

  const onPostMessage = (message: string) => {
    socketInstance?.emit(SOCKET_POST_MESSAGE, {
      content: message,
      user: user?.id,
    });
  };

  useEffect(() => {
    initVideo();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (cameraStreamError) {
    return <CameraStreamError />
  }
  
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>
        Now its your time to move, <b>{userMove}</b>
      </h2>
      <h3 style={{ textAlign: 'center' }}>
        {timeLeft} seconds left
      </h3>
      <div className={styles.container}>
        <div className={styles.users}>
          {usersList.map((item) => (
            <User
              key={item.id}
              user={item}
              current={item.id === user?.id}
            />
          ))}
        </div>
        <Chat onSubmit={onPostMessage} messages={messages} user={user} />
        {stream && <FaceParcer stream={stream} onLaugh={onLaugh} />}
      </div>
    </>
  );
}

export default Play;
