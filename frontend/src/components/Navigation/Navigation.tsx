import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const roleLabel = user?.role === 'ROLE_ADMIN' ? 'Администратор' : 'Участник команды';

  return (
    <nav className="main-nav">
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Главная
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
          Проекты
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
          Профиль
        </NavLink>
      </div>
      <div className="nav-actions">
        {isAuthenticated ? (
          <>
            <span className="nav-user">
              {user?.login} · {roleLabel}
            </span>
            <button onClick={logout} type="button" className="nav-button">
              Выйти
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
              Войти
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
              Регистрация
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;