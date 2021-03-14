// Libs
import { FC, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

// Types
import { FaceParcerProps } from './types';

// Styles
import styles from './FaceParcer.module.scss';

export const FaceParcer: FC<FaceParcerProps> = ({ stream, onLaugh }) => {
  const video = useRef<HTMLVideoElement | null>(null);
  const [isLaught, setIsLaught] = useState(false);

  const setLaughting = () => {
    setIsLaught(true);

    setTimeout(() => {
      setIsLaught(false);
    }, 1000);
  }

  const detectFace = async () => {
    if (!video?.current) {
      return;
    }

    const face = await faceapi.detectSingleFace(
      video.current as HTMLVideoElement,
      new faceapi.TinyFaceDetectorOptions({
        inputSize: 512,
        scoreThreshold: 0.5,
      }),
    ).withFaceExpressions();

    if (face?.expressions?.happy > 0.7) {
      setLaughting();
      onLaugh();
    }

    setTimeout(() => detectFace());
  };

  useEffect(() => {
    if (video?.current && !video?.current.srcObject) {
      video.current.srcObject = stream;
      video.current.onloadedmetadata = () => video?.current?.play();
      setTimeout(() => detectFace(), 1000);
    }
  }, [video]);

  return (
    <>
      <video ref={video} className={`${styles.video} ${isLaught ? styles.laught : ''}`} />
    </>
  );
};

export default FaceParcer;
