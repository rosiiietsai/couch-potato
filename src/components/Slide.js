import { Link } from 'react-router-dom';

import { useGetMovieImagesQuery } from '../store';
import { useImgSrc } from '../hooks/useImgSrc';
import Skeleton from './Skeleton';

export default function Slide({
  data,
  slideIndex,
  currentSlideIndex,
  // size,
  onTransitionEnd,
  toggleTransition,
}) {
  const { data: images, isLoading } = useGetMovieImagesQuery(data.id);
  const src1280 = useImgSrc(images?.backdrops[0]?.file_path, 1280);
  const src780 = useImgSrc(images?.backdrops[0]?.file_path, 780);
  const src500 = useImgSrc(images?.backdrops[0]?.file_path, 500);
  const src400 = useImgSrc(images?.backdrops[0]?.file_path, 400);

  // currentSlideIndex = 0, translateX: 0%, 100%, 200%, 300%, 400%
  // currentSlideIndex = 1, translateX: -100$, 0%, 100%, 200%, 300%
  // currentSlideIndex = 2, translateX: -200%, -100$, 0%, 100%, 200%,

  return (
    <>
      {isLoading && <Skeleton itemClassName="home__hero" times={1} />}
      <div
        className="slider__slide"
        style={{
          transform: `translateX(${(slideIndex - currentSlideIndex) * 100}%)`,
          transition: `all ${toggleTransition ? '0.6s' : '0s'}`,
        }}
        onTransitionEnd={onTransitionEnd}>
        {images?.backdrops[0] ? (
          <Link to={`/movie/${data.id}`}>
            <img
              srcSet={`${src1280} 1280w, ${src780} 780w, ${src500} 500w, ${src400} 400w`}
              src={src1280}
              alt={data.title}
              loading="lazy"
            />
          </Link>
        ) : (
          <div className="slider__slide--placeholder">
            No backdrop available
          </div>
        )}
      </div>
    </>
  );
}
