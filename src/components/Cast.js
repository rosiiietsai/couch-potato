import placeholderAvatar from '../assets/placeholder-avatar.png';

import { useImgSrc } from '../hooks/useImgSrc';

export default function Cast({ person }) {
  const src185 = useImgSrc(person.profile_path, 185);

  return (
    <div className="cast">
      {person.profile_path && (
        <div className="cast__photo">
          <img src={src185} alt={person.name} />
        </div>
      )}
      {!person.profile_path && (
        <div className="cast__photo cast__photo--placeholder">
          <img src={placeholderAvatar} alt="Avatar placeholder" />
        </div>
      )}
      <div>
        <p className="cast__name">
          <strong>{person.name}</strong>
        </p>
        <p className="cast__character">{person.character}</p>
      </div>
    </div>
  );
}
