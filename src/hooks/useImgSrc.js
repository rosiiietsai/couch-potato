import { IMG_URL } from '../configs/config';

export const useImgSrc = (path, width) => {
  const src = path && `${IMG_URL}/w${width}${path}`;

  return src;
};
