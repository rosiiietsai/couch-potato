import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PasswordInput({ value, onChange }) {
  // toggle eye button for revealing password
  const [toggleShowPassword, setToggleShowPassword] = useState(false);

  return (
    <div className="auth-form__password-field">
      <input
        className="auth-form__password-input"
        type={toggleShowPassword ? 'text' : 'password'}
        required
        onChange={onChange}
        value={value}
      />
      {!toggleShowPassword && (
        <FaEyeSlash
          className="icon--gray"
          onClick={() => setToggleShowPassword(!toggleShowPassword)}
        />
      )}
      {toggleShowPassword && (
        <FaEye
          className="icon--gray"
          onClick={() => setToggleShowPassword(!toggleShowPassword)}
        />
      )}
    </div>
  );
}
