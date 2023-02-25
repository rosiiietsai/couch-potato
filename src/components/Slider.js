import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

import Slide from './Slide';

export default function Slider({ data }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  const [toggleTransition, setToggleTransition] = useState(true);
  const [isTransitionEnd, setIsTransitionEnd] = useState(true);

  // clone the first and the last one
  // e.g. 4' 0  1  2  3  4  0'
  const slides = [data[data.length - 1], ...data, data[0]];

  const goToNextSlide = function () {
    // avoid going to next slide before the transition ends
    if (!isTransitionEnd) return;

    setToggleTransition(true);
    setCurrentSlideIndex(state => (state + 1) % slides.length);
    setIsTransitionEnd(false);
  };

  const goToPreSlide = function () {
    // avoid going to prev slide before the transition ends
    if (!isTransitionEnd) return;

    setToggleTransition(true);
    setCurrentSlideIndex(state => (state - 1) % slides.length);
    setIsTransitionEnd(false);
  };

  // after transition, if the current slide is a clone, jump to the real one instead
  const handleTransitionEnd = () => {
    setIsTransitionEnd(true);

    // jump to real last one
    if (currentSlideIndex === 0) {
      setToggleTransition(false);
      setCurrentSlideIndex(slides.length - 2);
    }

    // jump to real first one
    if (currentSlideIndex === slides.length - 1) {
      setToggleTransition(false);
      setCurrentSlideIndex(1);
    }
  };

  return (
    <div className="slider">
      <button className="slider__btn slider__btn--left" onClick={goToPreSlide}>
        <BsChevronCompactLeft />
      </button>

      {slides &&
        slides.map((slide, i) => (
          <Slide
            key={i}
            data={slide}
            slideIndex={i}
            currentSlideIndex={currentSlideIndex}
            // size={slides.length}
            onTransitionEnd={handleTransitionEnd}
            toggleTransition={toggleTransition}
          />
        ))}

      <button
        className="slider__btn slider__btn--right"
        onClick={goToNextSlide}>
        <BsChevronCompactRight />
      </button>

      <div className="slider__dots">
        {data.map((item, i) => (
          <button
            key={item.id}
            className={`slider__dots-dot ${
              i === (currentSlideIndex - 1 + data.length) % data.length
                ? 'slider__dots-dot--active'
                : ''
            }`}
            onClick={() => setCurrentSlideIndex(i + 1)}></button>
        ))}
      </div>
    </div>
  );
}
