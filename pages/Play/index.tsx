// Libs
import { FC, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

// Components
import Loader from '../../components/Loader';
import CameraStreamError from './components/CameraStreamError';
import FaceParcer from './components/FaceParcer';

export const Play: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cameraStreamError, setCameraStreamError] = useState(false);
  const [stream, setStream] = useState<null | MediaStream>(null);

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
    <div>
      {stream && <FaceParcer stream={stream} onLaugh={onLaugh} />}
    </div>
  );
}

export default Play;
