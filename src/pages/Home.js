import { GiPotato } from 'react-icons/gi';

import {
  useGetNowPlayingMoviesQuery,
  useGetTopRatedMediaQuery,
  useGetTrendingMediaQuery,
} from '../store';
import Skeleton from '../components/Skeleton';
import Slider from '../components/Slider';
import CardScroller from '../components/CardScroller';

export default function Home() {
  const { data: nowPlayingMovies, isLoading: isLoadingNowPlayingMovies } =
    useGetNowPlayingMoviesQuery();

  const { data: trendingMovies, isLoading: isLoadingTrendingMovies } =
    useGetTrendingMediaQuery('movie');
  const { data: trendingTVShows, isLoading: isLoadingTrendingTVShows } =
    useGetTrendingMediaQuery('tv');
  const { data: topRatedMovies, isLoading: isLoadingTopRatedMovies } =
    useGetTopRatedMediaQuery('movie');
  const { data: topRatedTVShows, isLoading: isLoadingTopRatedTVShows } =
    useGetTopRatedMediaQuery('tv');

  const scrollerLists = [
    {
      title: 'Trending Movies',
      data: trendingMovies,
      isLoading: isLoadingTrendingMovies,
      mediaType: 'movie',
    },
    {
      title: 'Trending TV Shows',
      data: trendingTVShows,
      isLoading: isLoadingTrendingTVShows,
      mediaType: 'tv',
    },
    {
      title: 'Top Rated Movies',
      data: topRatedMovies,
      isLoading: isLoadingTopRatedMovies,
      mediaType: 'movie',
    },
    {
      title: 'Top Rated TV Shows',
      data: topRatedTVShows,
      isLoading: isLoadingTopRatedTVShows,
      mediaType: 'tv',
    },
  ];

  return (
    <div className="home">
      <div className="home__hero">
        {isLoadingNowPlayingMovies && (
          <Skeleton itemClassName="home__hero" times={1} />
        )}
        {nowPlayingMovies && (
          <Slider data={nowPlayingMovies.results.slice(0, 5)} />
        )}
      </div>

      <div className="wrapper">
        {scrollerLists.map(list => (
          <div key={list.title} className="section">
            <h2 className="section-title heading-2">
              <GiPotato className="icon--primary" />
              {list.title}
            </h2>
            {list.isLoading && (
              <Skeleton
                times={5}
                className="card-scroller__content"
                itemsClassName="card-scroller__items"
                itemClassName="card-scroller__item-skeleton"
              />
            )}
            {list.data && (
              <CardScroller
                data={list.data.results}
                mediaType={list.mediaType}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
