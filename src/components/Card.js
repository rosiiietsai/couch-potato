import { forwardRef, useEffect, useState } from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';
import { BsBookmarkFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useFetchCollectionQuery } from '../store';
import { useFormatDate } from '../hooks/useFormatDate';
import { useChangeUserMedia } from '../hooks/useChangeUserMedia';
import { useImgSrc } from '../hooks/useImgSrc';
import Skeleton from './Skeleton';

// forwardRef lets component expose a DOM node to parent component with a ref
export const Card = forwardRef(({ data, mediaType, index, className }, ref) => {
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { data: userMedia, isFetching } = useFetchCollectionQuery({
    user,
    subcollection: mediaType,
  });
  const { date: releaseDate } = useFormatDate(
    data.release_date || data.first_air_date
  );

  // format received data (from TMDB and firestore)
  const media = {
    id: +data.id,
    title: data.title || data.name,
    releaseDate: data.releaseDate || releaseDate,
    posterPath: data.posterPath || data.poster_path,
    rating: data?.vote_average
      ? `${(data?.vote_average / 2).toFixed(1)}/5`
      : null, // convert score of 10 to 5
  };

  const { toggleWatchlist, toggleFavorite } = useChangeUserMedia(
    media,
    mediaType,
    isFetching,
    isWatchlist,
    isFavorite,
    setIsWatchlist,
    setIsFavorite
  );

  const src500 = useImgSrc(media.posterPath, 500);
  const src400 = useImgSrc(media.posterPath, 400);
  const src300 = useImgSrc(media.posterPath, 300);

  // set current state according to the fetched userMedia
  useEffect(() => {
    if (!userMedia) return;

    setIsWatchlist(
      userMedia.some(item => +item.id === media.id && item.isWatchlist)
    );
    setIsFavorite(
      userMedia.some(item => +item.id === media.id && item.isFavorite)
    );
  }, [media.id, setIsFavorite, setIsWatchlist, userMedia]);

  return (
    <div
      className={`card ${className}`}
      data-index={index}
      ref={ref}
      onClick={() => navigate(`/${mediaType}/${media.id}`)}>
      <div className="card__poster">
        {media.posterPath ? (
          <img
            srcSet={`${src500} 3x, ${src400} 2x, ${src300} 1x`}
            src={src500}
            alt={media.title}
            loading="lazy"
          />
        ) : (
          <div className="card__poster card__poster--placeholder">
            No poster available
          </div>
        )}
      </div>

      <div
        className={`card__watchlist btn btn__watchlist ${
          isWatchlist ? '' : 'btn__watchlist--inactive'
        }`}
        onClick={toggleWatchlist}>
        <BsBookmarkFill className="icon--watchlist" />
      </div>

      <div
        className={`card__heart btn btn__heart ${
          isFavorite ? '' : 'btn__heart--inactive'
        }`}
        onClick={toggleFavorite}>
        <FaHeart className="icon--heart" />
      </div>

      <div className="card__info">
        <p className="card__title">{media.title}</p>
        <p className="card__date">{media.releaseDate}</p>
        {media.rating && (
          <p className="card__rating">
            <FaStar className="icon--star" /> {media.rating}
          </p>
        )}
      </div>
    </div>
  );
});
