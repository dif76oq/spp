import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { AuthRegisterPayload } from '../../types';
import './RegisterPage.css';

const RegisterPage = () => {
  const { register, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<AuthRegisterPayload>({
    login: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/projects', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (field: keyof AuthRegisterPayload) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (form.password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      await register({ login: form.login.trim(), password: form.password });
    } catch (err) {
      setError('Не удалось зарегистрироваться');
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
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
        <input
          type="password"
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;

