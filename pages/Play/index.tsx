// Libs
import { FC, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

// Components
import Loader from '../../components/Loader';
import CameraStreamError from './components/CameraStreamError';

export const Play: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cameraStreamError, setCameraStreamError] = useState(false);
  const [stream, setStream] = useState<null | MediaStream>(null);

  const initVideo = async () => {
    try {
      setIsLoading(true);
      await navigator.permissions.query({ name: 'camera' });
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      const cameraStream = await navigator.mediaDevices.getUserMedia({ video: {} });
      setStream(cameraStream);
    } catch (e) {
      setCameraStreamError(true);
    } finally {
      setIsLoading(false);
    }
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
      
    </div>
  );
}

export default Play;
