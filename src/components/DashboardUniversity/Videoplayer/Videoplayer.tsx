import React, { useEffect, useRef, useState } from 'react';
import { Frame } from '../../Auth/SIgnIn/SignIn.styled';
import { Container } from './Videoplayer.styled';
import { IVideo } from '../../../redux/slices/universityVideo/universityVideoSlice';
import { Title } from '../MenuVideos/MenuVideos.styled';
import { DateToString } from '../../../hooks/useDateToString';
import video from '../../../assets/img/dashboard/Video.svg';

interface VideoplayerProps {
  setIsOpen: (value: boolean) => void;
  videoData: IVideo;
  setVideoData: (value: IVideo | undefined) => void;
}

type ContainerClick = MouseEvent & { path: Node[] };

const Videoplayer: React.FC<VideoplayerProps> = ({ setIsOpen, videoData, setVideoData }) => {
  const [widthVideo, setWidthVideo] = useState({ width: 320, height: 240 });

  const frameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sizeRateRef = useRef(1);
  const ref: any = useRef();

  const observer = useRef(
    new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      if (width < 1401) sizeRateRef.current = 0.7;
      else sizeRateRef.current = 1;
      setWidthVideo({ width: 480 * sizeRateRef.current, height: 360 * sizeRateRef.current });
    }),
  );

  const tag = videoData.tag.length ? videoData.tag : 'missing';

  useEffect(() => {
    observer.current.observe(ref.current);
  }, [ref, observer]);

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      const _event = event as ContainerClick;

      if (
        containerRef.current &&
        frameRef.current &&
        _event.path.includes(frameRef.current) &&
        !_event.path.includes(containerRef.current)
      ) {
        setIsOpen(false);
        setVideoData(undefined);
      }
    };

    document.body.addEventListener('click', clickOutsideHandler);

    return () => {
      document.body.removeEventListener('click', clickOutsideHandler);
    };
  }, []);
  return (
    <Frame ref={ref}>
      <Frame ref={frameRef}>
        <Container ref={containerRef}>
          <video
            style={{ backgroundColor: 'silver', borderRadius: '2%' }}
            width={widthVideo.width}
            height={widthVideo.height}
            src={videoData.url}
            controls
            // preload='none'
            preload='metadata'
            // poster={video}
          />
          <Title fontSize='22px'>Title: {videoData.title}</Title>
          <p>{`Ambassador Name: ${videoData.ambassadorName}`}</p>
          <p>{`Created: ${DateToString(videoData.createdAt.seconds)}`}</p>
          <p>{`Status: ${videoData.status}`}</p>
          <p>{`Tags: ${tag}`}</p>
          <p>{`Comments: ${videoData.comments.length}`}</p>
          <p>{`Likes: ${videoData.likes.length}`}</p>
        </Container>
      </Frame>
    </Frame>
  );
};

export default Videoplayer;
