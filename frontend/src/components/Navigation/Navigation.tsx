
import './Navigation.css';

interface NavigationProps {
  onPageChange: (page: string) => void;
}

const Navigation = ({ onPageChange }: NavigationProps) => {
  return (
    <nav className="main-nav">
      <button onClick={() => onPageChange('home')} >
        Главная
      </button>
      <button onClick={() => onPageChange('projects')} >
        Проекты
      </button>
      <button onClick={() => onPageChange('profile')} >
        Профиль пользователя
      </button>
    </nav>
  );
};

export default Navigation;