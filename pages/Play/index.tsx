// Libs
import { FC, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

// Components
import Loader from '../../components/Loader';
import CameraStreamError from './components/CameraStreamError';
import User from './components/User';
import FaceParcer from './components/FaceParcer';

// Constants
import { SOCKET_USER_ENTER, SOCKET_UPDATE_USERS_LIST, SOCKET_USER_EXIT } from '../api/socketio/constants';

// Types
import { User as IUser } from '../../interfaces';

// Styles
import styles from './Play.module.scss';

export const Play: FC = () => {
  const router = useRouter();
  const generatedId = uuidv4();

  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [cameraStreamError, setCameraStreamError] = useState(false);
  const [stream, setStream] = useState<null | MediaStream>(null);

  useEffect(() => {
    fetch('/api/socketio').finally(() => {
      const socket = io();

      socket.emit(SOCKET_USER_ENTER, {
        name: router?.query?.name ?? generatedId,
        id: generatedId,
      });

      socket.on(SOCKET_UPDATE_USERS_LIST, (users: User[]) => {
        setUsersList(users);
      });

      socket.on('disconnect', () => {
        socket.emit(SOCKET_USER_EXIT, generatedId);
      });
    });
  }, []);


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
    <div className={styles.container}>
      <div className={styles.users}>
        {usersList.map((item) => <User key={item.id} user={item} current={item.id === generatedId} />)}
      </div>
      {/* {stream && <FaceParcer stream={stream} onLaugh={onLaugh} />} */}
    </div>
  );
}

export default Play;
