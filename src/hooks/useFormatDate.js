export const useFormatDate = _date => {
  const optDate = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  const d = _date && new Date(_date);

  const date =
    d && new Intl.DateTimeFormat(navigator.language, optDate).format(d);

  const year = d && d.getFullYear();

  return { date, year };
};
