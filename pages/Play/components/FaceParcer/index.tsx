// Libs
import { FC, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

// Types
import { FaceParcerProps } from './types';

export const FaceParcer: FC<FaceParcerProps> = ({ stream, onLaugh }) => {
  const video = useRef<HTMLVideoElement | null>(null);

  const detectFace = async () => {
    const face = await faceapi.detectSingleFace(
      video.current as HTMLVideoElement,
      new faceapi.TinyFaceDetectorOptions({
        inputSize: 512,
        scoreThreshold: 0.5,
      }),
    ).withFaceExpressions();

    if (face?.expressions?.happy > 0.8) {
      return onLaugh();
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
      <video ref={video} />
    </>
  );
};

export default FaceParcer;
