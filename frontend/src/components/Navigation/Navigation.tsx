import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Главная
      </NavLink>
      <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
        Проекты
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
        Профиль
      </NavLink>
    </nav>
  );
};

export default Navigation;