import { useLocation } from 'react-router-dom';

import { useGetSearchResultsQuery } from '../store';
import { Card } from '../components/Card';
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');
  const page = queryParams.get('page');
  const mediaType = queryParams.get('media_type');
  const { data, isFetching, error } = useGetSearchResultsQuery({
    query,
    mediaType,
    page,
  });

  return (
    <div className="search">
      <div className="wrapper">
        <h1 className="heading-1">
          Search results of {mediaType === 'tv' ? 'tv show' : mediaType} for "
          {query}"
        </h1>

        {isFetching && (
          <Skeleton
            times={8}
            itemsClassName="card-list"
            itemClassName="card__skeleton"
          />
        )}

        {error && (
          <p className="error error--large">
            {error.status} - {error.data.status_message}
          </p>
        )}

        {data?.results.length > 0 && (
          <div className="card-list">
            {data.results.map(item => (
              <Card key={item.id} data={item} mediaType={mediaType} />
            ))}
          </div>
        )}

        {data?.results.length === 0 && (
          // will still get an empty results back if the page does not exist
          <p className="error error--large">This page dose not exist.</p>
        )}
      </div>

      {data?.results.length > 0 && (
        // will still get an empty results back if the page does not exist
        <Pagination
          baseUrl={`/search?q=${query}&media_type=${mediaType}&page=`}
          currentPage={+page}
          totalPages={data.total_pages}
        />
      )}
    </div>
  );
}
