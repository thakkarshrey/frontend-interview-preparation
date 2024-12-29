/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./Carousel.css";

const Carousel = ({
  images = [],
  imageLimit = images.length,
  loading = false,
  imagesPerSlide = 1,
  customPreviousButton,
  customNextButton,
}) => {
  const [currentIndex, setCurrentIndex] = useState();
  const imageRef = useRef(null);
  const [imageWidth, setImageWidth] = useState(0);

  useEffect(() => {
    if (images.length > 0) setCurrentIndex(0);
  }, [images]);

  const onPreviousClick = () => {
    setCurrentIndex((prevValue) =>
      prevValue === 0 ? imageLimit - imagesPerSlide : prevValue - 1
    );
    // setCurrentIndex((prevValue) =>
    //   prevValue === 0 ? imageLimit - 1 : prevValue - 1
    // );
  };
  const onNextClick = () => {
    setCurrentIndex((prevValue) =>
      prevValue === imageLimit - imagesPerSlide ? 0 : prevValue + 1
    );
    // setCurrentIndex((prevValue) =>
    //   prevValue === imageLimit - 1 ? 0 : prevValue + 1
    // );
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="carousel" style={{ width: imagesPerSlide * imageWidth }}>
      <div
        className="carousel__image-container"
        style={{
          transform: `translateX(-${currentIndex * imageWidth}px)`,
        }}
      >
        {images
          ?.slice(0, imageLimit > images.length ? images.length : imageLimit)
          ?.map((element) => {
            return (
              <img
                key={element.id}
                src={element.url}
                ref={imageRef}
                onLoad={() => {
                  setImageWidth(imageRef?.current?.offsetWidth);
                }}
              />
            );
          })}
      </div>
      {customPreviousButton instanceof Function ? (
        customPreviousButton(onPreviousClick)
      ) : (
        <button className="carousel__btn previous" onClick={onPreviousClick}>
          {"<"}
        </button>
      )}
      {customNextButton instanceof Function ? (
        customNextButton(onNextClick)
      ) : (
        <button className="carousel__btn next" onClick={onNextClick}>
          {">"}
        </button>
      )}
    </div>
  );
};

export default Carousel;
