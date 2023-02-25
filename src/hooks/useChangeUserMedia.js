import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  useAddDocumentMutation,
  useDeleteDocumentMutation,
  useUpdateDocumentMutation,
} from '../store';

export const useChangeUserMedia = (
  media,
  mediaType,
  isFetching,
  isWatchlist,
  isFavorite,
  setIsWatchlist,
  setIsFavorite
) => {
  let isCreated = isWatchlist || isFavorite;
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [addDocument] = useAddDocumentMutation();
  const [deleteDocument] = useDeleteDocumentMutation();
  const [updateDocument] = useUpdateDocumentMutation();

  const changeDocumentStatus = (isWatchlist, isFavorite) => {
    // delete document
    if (!isWatchlist && !isFavorite) {
      deleteDocument({ user, subcollection: mediaType, id: media.id });
    } else {
      if (!isCreated) {
        // create document
        addDocument({
          user,
          subcollection: mediaType,
          id: media.id,
          document: {
            title: media.title,
            releaseDate: media.releaseDate,
            posterPath: media.posterPath,
            isWatchlist,
            isFavorite,
          },
        });
      } else {
        // update document
        updateDocument({
          user,
          subcollection: mediaType,
          id: media.id,
          updates: { isWatchlist, isFavorite },
        });
      }
    }
  };

  const toggleWatchlist = e => {
    // prevent from clicking the link of parent element
    e.stopPropagation();

    // avoid changing state before fetching is finished
    if (isFetching) return;

    if (user) {
      changeDocumentStatus(!isWatchlist, isFavorite);
      setIsWatchlist(state => !state);
    } else {
      navigate('/login');
    }
  };

  const toggleFavorite = e => {
    // prevent from clicking the link of parent element
    e.stopPropagation();

    // avoid changing state before fetching is finished
    if (isFetching) return;

    if (user) {
      changeDocumentStatus(isWatchlist, !isFavorite);
      setIsFavorite(state => !state);
    } else {
      navigate('/login');
    }
  };

  return { toggleWatchlist, toggleFavorite };
};
