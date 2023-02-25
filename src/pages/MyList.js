import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useFetchCollectionQuery } from '../store';
import { Card } from '../components/Card';
import Skeleton from '../components/Skeleton';

export default function MyList() {
  const [mediaType, setMediaType] = useState('movie');
  const { listType } = useParams();
  const { user } = useSelector(state => state.auth);
  const { data, isFetching } = useFetchCollectionQuery({
    user,
    subcollection: mediaType,
  });

  const getList = listType => {
    if (listType === 'watchlist') return data.filter(item => item.isWatchlist);
    if (listType === 'favorite') return data.filter(item => item.isFavorite);
  };

  return (
    <div className="my-list">
      <div className="wrapper">
        <h1 className="heading-1">
          My {listType.replace(listType[0], listType[0].toUpperCase())}
        </h1>

        <div className="my-list__types">
          <button
            className={`btn btn--large  ${
              mediaType === 'movie' ? 'btn--primary btn--bold' : 'btn--dark'
            } `}
            onClick={() => setMediaType('movie')}>
            Movies
          </button>
          <button
            className={`btn btn--large  ${
              mediaType === 'tv' ? 'btn--primary btn--bold' : 'btn--dark'
            } `}
            onClick={() => setMediaType('tv')}>
            TV shows
          </button>
        </div>

        {isFetching && (
          <Skeleton
            times={8}
            itemsClassName="card-list"
            itemClassName="card__skeleton"
          />
        )}
        {data && (
          <div className="card-list">
            {getList(listType).map(item => (
              <Card key={item.id} data={item} mediaType={mediaType} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
