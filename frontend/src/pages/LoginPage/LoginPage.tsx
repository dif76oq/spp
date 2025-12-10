import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { AuthLoginPayload } from '../../types';
import './LoginPage.css';

const LoginPage = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<AuthLoginPayload>({
    login: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/projects', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (field: keyof AuthLoginPayload) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await login({ login: form.login.trim(), password: form.password });
    } catch (err) {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Вход</h2>
        {error && <p className="auth-error">{error}</p>}
        <input
          type="text"
          placeholder="Логин"
          value={form.login}
          onChange={handleChange('login')}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange('password')}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

