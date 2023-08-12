import { useEffect, useRef, useState } from "react";

const LazyImage = ({ src, alt, className }) => {
  const imgRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(
    "https://icon-library.com/images/progress-icon-gif/progress-icon-gif-7.jpg"
  );

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setImgSrc(src);
        observer.disconnect();
      }
    });
    const imgElement = imgRef.current;
    if (imgElement) {
      observer.observe(imgElement);
    }
    return () => observer.unobserve(imgElement);
  }, []);

  const handleLoad = () => {
    setIsVisible(true);
  };

  return (
    <>
      <img
        src={imgSrc}
        alt={alt}
        onLoad={handleLoad}
        ref={imgRef}
        className={className}
      />
    </>
  );
};

export default LazyImage;
