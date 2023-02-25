import { useFormatDate } from './useFormatDate';

export const useFormatMediaDetails = (data, mediaType) => {
  const { date: releaseDate, year: releaseYear } = useFormatDate(
    data?.release_date || data?.first_air_date
  );
  const { year: endYear } = useFormatDate(data?.last_air_date);
  const runtime = data?.runtime || data?.episode_run_time?.[0];
  const runtimeHour = runtime && Math.trunc(runtime / 60);
  const runtimeMin = runtime && runtime % 60;

  const getYear = () => {
    if (mediaType === 'movie') return releaseYear;

    if (mediaType === 'tv' && data?.number_of_seasons > 1) {
      return `${releaseYear} \u2013 ${data?.in_production ? '' : endYear}`;
    } else {
      return `${releaseYear}${data?.in_production ? '\u2013' : ''}`;
    }
  };

  // format received data
  let formattedData = {
    id: data?.id,
    title: data?.title || data?.name,
    year: getYear(),
    releaseDate,
    runtime: `${runtimeHour ? `${runtimeHour}h` : ''}${
      runtimeMin ? ` ${runtimeMin}m` : ''
    }`,
    tagline: data?.tagline,
    rating: `${(data?.vote_average / 2).toFixed(1)}/5`, //convert score of 10 to 5
    posterPath: data?.poster_path,
    backdropPath: data?.backdrop_path,
    genres: data?.genres,
    overview: data?.overview,
    trailer: data?.videos.results.find(video => video.type === 'Trailer'),
    cast: data?.credits.cast,
    similar: data?.similar.results,
    recommendations: data?.recommendations.results,
  };

  // extra data for tv show
  if (mediaType === 'tv') {
    formattedData = {
      ...formattedData,
      status: data?.status,
      seasonNum: data?.number_of_seasons,
      episodeNum: data?.number_of_episodes,
    };
  }

  return { formattedData };
};
