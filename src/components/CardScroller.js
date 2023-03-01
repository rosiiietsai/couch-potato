import { useCallback, useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import { Card } from './Card';

export default function CardScroller({ data, mediaType, className = '' }) {
  const [displayedItemFirstIndex, setDisplayedItemFirstIndex] = useState(0);
  const [displayedItemLastIndex, setDisplayedItemLastIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const scrollerContentRef = useRef();
  const itemsRef = useRef([]);

  // observe the displayed items
  const observeItem = useCallback(() => {
    // set intersecting first and last item
    const displayItem = function (entries, observer) {
      const displayedItemsIndex = entries
        .filter(entry => entry.isIntersecting)
        .map(entry => entry.target.dataset.index);

      setDisplayedItemFirstIndex(+displayedItemsIndex.at(0));
      setDisplayedItemLastIndex(+displayedItemsIndex.at(-1));

      // unobserve
      entries.forEach(entry => observer.unobserve(entry.target));
    };

    const itemObserver = new IntersectionObserver(displayItem, {
      root: scrollerContentRef.current,
      rootMargin: '0px',
      threshold: [0.95],
    });

    itemsRef.current.forEach(item => itemObserver.observe(item));
  }, []);

  // will cause bug when the scrollerContent element is not entirely in the viewport
  // const scrollToItem = itemIndex => {
  //   const displayedItemEl = itemsRef.current.at(itemIndex);
  //   displayedItemEl.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'nearest',
  //   });
  // };

  const goToPrevCard = () => {
    if (displayedItemFirstIndex === 0) return;
    // scrollToItem(displayedItemFirstIndex - 1);

    const displayedItemEl = itemsRef.current.at(displayedItemFirstIndex - 1);
    const scrollerContentEl = scrollerContentRef.current;
    scrollerContentEl.scrollTo({
      top: 0,
      left:
        scrollerContentEl.scrollLeft -
        (scrollerContentEl.getBoundingClientRect().left -
          displayedItemEl.getBoundingClientRect().left) -
        20,
      behavior: 'smooth',
    });

    setDisplayedItemFirstIndex(prevState => prevState - 1);
    setDisplayedItemLastIndex(prevState => prevState - 1);
  };

  const goToNextCard = () => {
    if (displayedItemLastIndex !== data.length - 1) {
      // scrollToItem(displayedItemLastIndex + 1);

      const displayedItemEl = itemsRef.current.at(displayedItemLastIndex + 1);
      const scrollerContentEl = scrollerContentRef.current;

      scrollerContentEl.scrollTo({
        top: 0,
        // left:
        //   displayedItemEl.offsetLeft +
        //   displayedItemEl.offsetWidth -
        //   scrollerContentEl.offsetWidth +
        //   20,
        left:
          scrollerContentEl.scrollLeft +
          (displayedItemEl.getBoundingClientRect().right -
            scrollerContentEl.getBoundingClientRect().right) +
          20,
        behavior: 'smooth',
      });

      setDisplayedItemFirstIndex(prevState => prevState + 1);
      setDisplayedItemLastIndex(prevState => prevState + 1);
    } else {
      // if it's the last one, scroll to the initial position
      scrollerContentRef.current.scrollTo(0, 0);
      observeItem();
    }
  };

  // for touch device
  const handleTouchMove = e => {
    if (touchStart === null) return;

    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;
    const threshold = 50;

    // swipe right or left -> active all items
    if (diff > threshold || diff < -threshold) {
      setDisplayedItemFirstIndex(0);
      setDisplayedItemLastIndex(data.length - 1);
    }
  };

  // for window resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // cleanup function
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // for window resize
  useEffect(() => {
    observeItem();
  }, [windowWidth, observeItem]);

  // for loading page
  useEffect(() => {
    // scroll to the initial position
    scrollerContentRef.current.scrollTo(0, 0);
    // resize the array (data size is not known)
    itemsRef.current = itemsRef.current.slice(0, data.length);
    observeItem();
  }, [data, observeItem]);

  return (
    <div className={`card-scroller ${className}`}>
      {displayedItemFirstIndex !== 0 && (
        <div
          className="card-scroller__btn card-scroller__btn--left"
          onClick={goToPrevCard}>
          <FaAngleLeft className="card-scroller__btn-icon" />
        </div>
      )}
      <div
        className="card-scroller__content"
        ref={scrollerContentRef}
        onTouchStart={e => setTouchStart(e.targetTouches[0].clientX)}
        onTouchMove={handleTouchMove}>
        <div className="card-scroller__items">
          {data.map((item, i) => (
            <Card
              className={`card-scroller__item ${
                i >= displayedItemFirstIndex && i <= displayedItemLastIndex
                  ? ''
                  : 'card-scroller__item--inactive'
              }`}
              key={item.id}
              data={item}
              mediaType={mediaType}
              index={i}
              ref={el => (itemsRef.current[i] = el)}
            />
          ))}
        </div>
      </div>

      {displayedItemLastIndex < data.length - 1 && (
        <div
          className="card-scroller__btn card-scroller__btn--right"
          onClick={goToNextCard}>
          <FaAngleRight className="card-scroller__btn-icon" />
        </div>
      )}
    </div>
  );
}
