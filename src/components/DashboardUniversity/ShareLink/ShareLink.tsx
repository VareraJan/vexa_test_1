import React, { useEffect, useRef } from 'react';
import { LinkProps } from '../MenuVideos/MenuVideos';
import { Container, Frame } from './ShareLink.styled';

interface ShareLinkProps {
  setIsOpen: (value: LinkProps) => void;
  publicLink: LinkProps;
}

type ContainerClick = MouseEvent & { path: Node[] };

const ShareLink: React.FC<ShareLinkProps> = ({ publicLink, setIsOpen }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      const _event = event as ContainerClick;

      if (
        containerRef.current &&
        frameRef.current &&
        _event.path.includes(frameRef.current) &&
        !_event.path.includes(containerRef.current)
      ) {
        setIsOpen({ isOpen: false, link: '' });
      }
    };

    document.body.addEventListener('click', clickOutsideHandler);

    return () => {
      document.body.removeEventListener('click', clickOutsideHandler);
    };
  }, []);

  return (
    <Frame ref={frameRef}>
      <Container ref={containerRef}>
        <h2>{publicLink.link}</h2>
      </Container>
    </Frame>
  );
};

export default ShareLink;
