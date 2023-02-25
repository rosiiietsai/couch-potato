import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaStar, FaPlay, FaHeart } from 'react-icons/fa';
import { BsBookmarkFill } from 'react-icons/bs';
import { GiPotato } from 'react-icons/gi';
import ReactPlayer from 'react-player/youtube';

import { useFetchCollectionQuery, useGetMediaDetailsQuery } from '../store';

import { useFormatMediaDetails } from '../hooks/useFormatMediaDetails';
import { useChangeUserMedia } from '../hooks/useChangeUserMedia';
import { useImgSrc } from '../hooks/useImgSrc';

import CardScroller from '../components/CardScroller';
import Cast from '../components/Cast';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';

export default function Details() {
  const [toggleModal, setToggleModal] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { mediaType, id } = useParams();
  const { user } = useSelector(state => state.auth);

  const { data, isFetching, error } = useGetMediaDetailsQuery({
    id,
    mediaType,
  });

  const { formattedData } = useFormatMediaDetails(data, mediaType);

  const { data: userMedia, isFetching: isFetchingUserMedia } =
    useFetchCollectionQuery({
      user,
      subcollection: mediaType,
    });

  const { toggleWatchlist, toggleFavorite } = useChangeUserMedia(
    formattedData,
    mediaType,
    isFetchingUserMedia,
    isWatchlist,
    isFavorite,
    setIsWatchlist,
    setIsFavorite
  );

  const posterSrc1280 = useImgSrc(formattedData.posterPath, 1280);
  const posterSrc780 = useImgSrc(formattedData.posterPath, 780);
  const posterSrc500 = useImgSrc(formattedData.posterPath, 500);
  const posterSrc400 = useImgSrc(formattedData.posterPath, 400);
  const posterSrc300 = useImgSrc(formattedData.posterPath, 300);

  const backdropSrc1280 = useImgSrc(formattedData.backdropPath, 1280);
  const backdropSrc780 = useImgSrc(formattedData.backdropPath, 780);
  const backdropSrc500 = useImgSrc(formattedData.backdropPath, 500);
  const backdropSrc400 = useImgSrc(formattedData.backdropPath, 400);
  const backdropSrc300 = useImgSrc(formattedData.backdropPath, 300);

  // set current state according to the fetched userMedia
  useEffect(() => {
    if (!userMedia) return;

    setIsWatchlist(userMedia.some(item => item.id === id && item.isWatchlist));
    setIsFavorite(userMedia.some(item => item.id === id && item.isFavorite));
  }, [id, setIsFavorite, setIsWatchlist, userMedia]);

  return (
    <div className="details">
      {isFetching && <Spinner />}

      {error && (
        <p className="error error--large error--center">
          {error.status} - {error.data.status_message}
        </p>
      )}

      {data && (
        <>
          <div
            className="details__main section"
            style={{
              backgroundImage: `url(
                ${backdropSrc1280}
              )`,
            }}>
            <div className="details__main--bg-filter">
              <div className="wrapper--large">
                <div className="details__poster">
                  {formattedData.posterPath && (
                    <img
                      srcSet={`${posterSrc1280} 1280w, ${posterSrc780} 780w, ${posterSrc500} 500w, ${posterSrc400} 400w, ${posterSrc300} 300w`}
                      sizes="30vw"
                      src={posterSrc780}
                      alt={`Poster of ${formattedData.title}`}
                    />
                  )}
                  {!formattedData.posterPath && (
                    <div className="details__poster details__poster--placeholder">
                      No poster available
                    </div>
                  )}
                </div>
                {formattedData.backdropPath && (
                  <div className="details__backdrop">
                    <img
                      srcSet={`${backdropSrc1280} 1280w, ${backdropSrc780} 780w, ${backdropSrc500} 500w, ${backdropSrc400} 400w, ${backdropSrc300} 300w`}
                      sizes="(max-width: 62.5em) 70vw"
                      src={posterSrc780}
                      alt={`Backdrop of ${formattedData.title}`}
                    />
                  </div>
                )}
                <div className="details__description">
                  <h1 className="details__title heading-1">
                    {formattedData.title}
                    <div className="details__rating">
                      <FaStar className="icon--star" />
                      {formattedData.rating}
                    </div>
                  </h1>
                  <div className="details__subtitle">
                    <p>{formattedData.year}</p>
                    {formattedData.runtime && <p>{formattedData.runtime}</p>}
                    {mediaType === 'tv' && (
                      <p>
                        {formattedData.seasonNum}{' '}
                        {formattedData.seasonNum > 1 ? 'seasons' : 'season'}
                      </p>
                    )}
                    {mediaType === 'tv' && (
                      <p>
                        {formattedData.episodeNum}{' '}
                        {formattedData.episodeNum > 1 ? 'episodes' : 'episode'}
                      </p>
                    )}
                  </div>
                  <div className="details__genres">
                    {formattedData.genres.map(genre => (
                      <span key={genre.id} className="details__genre">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  {formattedData.tagline && (
                    <p className="details__tagline">
                      "{formattedData.tagline}"
                    </p>
                  )}

                  <div className="details__status">
                    <div
                      className={`details__watchlist btn btn__watchlist ${
                        isWatchlist ? '' : 'btn__watchlist--inactive'
                      }`}
                      onClick={toggleWatchlist}>
                      <BsBookmarkFill className="icon--watchlist" />
                    </div>

                    <div
                      className={`details__heart btn btn__heart ${
                        isFavorite ? '' : 'btn__heart--inactive'
                      }`}
                      onClick={toggleFavorite}>
                      <FaHeart className="icon--heart" />
                    </div>
                  </div>

                  <div className="details__overview">
                    <h3>Overview</h3>
                    <p>{formattedData.overview}</p>
                  </div>

                  {formattedData.trailer && (
                    <button
                      className="btn btn__player"
                      onClick={() => setToggleModal(true)}>
                      <FaPlay />
                      Watch Trailer
                    </button>
                  )}
                  {toggleModal && (
                    <Modal onClose={() => setToggleModal(false)}>
                      <div className="details__trailer-wrapper">
                        <ReactPlayer
                          className="details__trailer"
                          url={`https://youtu.be/${formattedData.trailer.key}`}
                          width="100%"
                          height="100%"
                          controls
                        />
                      </div>
                    </Modal>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="wrapper">
            <div className="section">
              <h2 className="section-title heading-2">
                <GiPotato className="icon--primary" />
                Top Cast
              </h2>
              <div className="cast-list">
                {formattedData.cast.length === 0 && <p>No data available</p>}
                {formattedData.cast.length > 0 &&
                  formattedData.cast
                    .slice(0, 12)
                    .map(person => <Cast key={person.id} person={person} />)}
                {formattedData.cast.length >= 12 && (
                  <span className="cast-list__other">and more...</span>
                )}
              </div>
            </div>

            <div className="section">
              <h2 className="section-title heading-2">
                <GiPotato className="icon--primary" />
                Recommendations
              </h2>
              {formattedData.recommendations.length === 0 && (
                <p>No data available</p>
              )}
              {formattedData.recommendations.length > 0 && (
                <CardScroller
                  data={formattedData.recommendations}
                  mediaType={mediaType}
                />
              )}
            </div>

            <div className="section">
              <h2 className="section-title heading-2">
                <GiPotato className="icon--primary" />
                More like this
              </h2>
              {formattedData.similar.length === 0 && <p>No data available</p>}
              {formattedData.similar.length > 0 && (
                <CardScroller
                  data={formattedData.similar}
                  mediaType={mediaType}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
