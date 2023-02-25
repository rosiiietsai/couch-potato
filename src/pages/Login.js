import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../store';
import PasswordInput from '../components/PasswordInput';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, isLoading, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (!user) return;
    navigate('/');
  }, [navigate, user]);

  return (
    <form className="auth-form wrapper" onSubmit={handleSubmit}>
      <h1 className="heading-1">Login</h1>
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

      <button
        className="btn btn--large btn--dark auth-form__btn--submit"
        disabled={isLoading}>
        {isLoading ? 'loading...' : 'Login'}
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
}
