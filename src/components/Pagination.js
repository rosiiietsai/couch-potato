import { Link } from 'react-router-dom';

export default function Pagination({ baseUrl, currentPage, totalPages }) {
  //  pagination 1:  1  2  3 ...  8  9 10
  //  pagination 2: 11 12 13 ... 18 19 20
  //  pagination 3: 21 22 23 ... 28 29 30
  //  pagination 4: 21 22

  const pagesPerPagination = 10;
  const currentPagination = Math.floor((currentPage - 1) / pagesPerPagination);
  const totalPagination = Math.floor((totalPages - 1) / pagesPerPagination);

  // create an empty array with specific length and filled it with page numbers
  const pages = Array.from(
    {
      length:
        currentPagination === totalPagination
          ? totalPages % pagesPerPagination
          : pagesPerPagination,
    },
    (_, i) => {
      const page = i + 1 + pagesPerPagination * currentPagination;

      return (
        <Link
          key={page}
          className={`pagination__page ${
            page === currentPage ? 'pagination__page--active' : ''
          }`}
          to={`${baseUrl}${page}`}>
          {page}
        </Link>
      );
    }
  );

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link
          className="pagination__prev-page"
          to={`${baseUrl}${currentPage - 1}`}>
          Prev Page
        </Link>
      )}

      {pages}

      {totalPages > currentPage && (
        <Link
          className="pagination__next-page"
          to={`${baseUrl}${currentPage + 1}`}>
          Next Page
        </Link>
      )}
    </div>
  );
}
