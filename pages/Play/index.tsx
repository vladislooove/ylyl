// Libs
import { FC, useState, useEffect } from 'react';

// Components
import Loader from '../../components/Loader';
import CameraStreamError from './components/CameraStreamError';

export const Play: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cameraStreamError, setCameraStreamError] = useState(false);
  const [stream, setStream] = useState<null | MediaStream>(null);

  const getVideoStream = async () => {
    try {
      setIsLoading(true);
      await navigator.permissions.query({ name: 'camera' });
      const cameraStream = await navigator.mediaDevices.getUserMedia({ video: {} });
      setStream(cameraStream);
    } catch (e) {
      setCameraStreamError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVideoStream();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (cameraStreamError) {
    return <CameraStreamError />
  }
  
  return (
    <div>
      Play
    </div>
  );
}

export default Play;
