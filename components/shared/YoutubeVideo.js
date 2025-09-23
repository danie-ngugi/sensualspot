import { useState, createRef, useEffect } from 'react';

const YoutubeVideo = ({ video }) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = video;
  if (!videoId) return <div></div>;
  if (typeof window === 'undefined' && typeof document === 'undefined') {
    return <div></div>;
  }

  const container = createRef()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (window && 'IntersectionObserver' in window) {
      if (container && container.current) {
        videoObserver.observe(container.current);
      }
    } else {
      setShowVideo(true);
    }
  }, [container]);

  const videoObserver = new IntersectionObserver(onVideoIntersection, {
    rootMargin: '100px 0px',
    threshold: 0.25,
  });

  function onVideoIntersection(entries) {
    if (!entries || entries.length <= 0) {
      return;
    }

    if (entries[0].isIntersecting) {
      setShowVideo(true);
      videoObserver.disconnect();
    }
  }

  return (
    <div ref={container}>
      {showVideo && (
        <iframe
          className="w-full aspect-video"
          width="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer;
        autoplay;
        encrypted-media;
        gyroscope;
        picture-in-picture"
          allowFullScreen
          title="Product Review"
        ></iframe>
      )}
    </div>
  );
};
export default YoutubeVideo;
