import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signup } from '../store';
import PasswordInput from '../components/PasswordInput';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [formError, setFormError] = useState(null);
  const { user, isLoading, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== passwordConfirm)
      return setFormError('Please confirm again your password.');
    dispatch(signup({ email, password, displayName }));
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <form className="auth-form wrapper" onSubmit={handleSubmit}>
      <h1 className="heading-1">Sign up now</h1>
      <label>
        <span className="auth-form__label">Email</span>
        <input
          type="email"
          required
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span className="auth-form__label">Password</span>
        <PasswordInput
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span className="auth-form__label">Re-enter password</span>
        <PasswordInput
          onChange={e => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
        />
      </label>
      <label>
        <span className="auth-form__label">Display name</span>
        <input
          type="text"
          required
          onChange={e => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>

      <button
        className="btn btn--large btn--primary auth-form__btn--submit"
        disabled={isLoading}>
        {isLoading ? 'loading...' : 'Sign up'}
      </button>

      {error && <div className="error">{error}</div>}
      {formError && <div className="error">{formError}</div>}
    </form>
  );
}
